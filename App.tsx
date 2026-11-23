import React, { useState, useMemo, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import LessonView from './components/LessonView';
import ReviewSession from './components/ReviewSession';
import { CURRICULUM } from './constants';
import { AppView, UserProgress, Module, Topic, ChatMessage } from './types';
import { Lock, PlayCircle, CheckCircle2, MessageSquare, Send, Bot, User } from 'lucide-react';
import { chatWithTutor } from './services/geminiService';
import { storageAgent } from './services/storageService';
import ReactMarkdown from 'react-markdown';

export default function App() {
  const [view, setView] = useState<AppView>(AppView.DASHBOARD);
  const [activeModuleId, setActiveModuleId] = useState<string | null>(null);
  const [activeTopicId, setActiveTopicId] = useState<string | null>(null);
  
  // Use storageAgent to initialize state
  const [progress, setProgress] = useState<UserProgress>(() => storageAgent.load());

  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [chatInput, setChatInput] = useState('');
  const [chatLoading, setChatLoading] = useState(false);

  // Auto-save effect: Whenever progress changes, ask the agent to save
  useEffect(() => {
    storageAgent.save(progress);
  }, [progress]);

  const activeTopic = useMemo(() => {
    if (!activeModuleId || !activeTopicId) return null;
    const mod = CURRICULUM.find(m => m.id === activeModuleId);
    return mod?.topics.find(t => t.id === activeTopicId) || null;
  }, [activeModuleId, activeTopicId]);

  const activeModule = useMemo(() => 
    CURRICULUM.find(m => m.id === activeModuleId), 
  [activeModuleId]);

  const allTopicsMap = useMemo(() => {
    const map: Record<string, string> = {};
    CURRICULUM.forEach(m => m.topics.forEach(t => {
        map[t.id] = t.title;
    }));
    return map;
  }, []);

  const handleCompleteTopic = (topicId: string) => {
    if (!progress.completedTopicIds.includes(topicId)) {
      const newProgress = {
        ...progress,
        completedTopicIds: [...progress.completedTopicIds, topicId],
        xp: progress.xp + 100
      };
      setProgress(newProgress);
      // Storage agent handles saving via useEffect
    }
  };

  const handleXPForReview = () => {
      const newProgress = { ...progress, xp: progress.xp + 50 };
      setProgress(newProgress);
      // Storage agent handles saving via useEffect
  }

  const handleOpenLesson = (moduleId: string, topicId: string) => {
    setActiveModuleId(moduleId);
    setActiveTopicId(topicId);
    setView(AppView.LESSON);
  };

  const handleChatSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim() || chatLoading) return;

    const userMsg: ChatMessage = { role: 'user', text: chatInput };
    
    // Update local state for UI
    setChatHistory(prev => [...prev, userMsg]);
    setChatInput('');
    setChatLoading(true);

    // Call API with history that DOES NOT include the new message, and pass new message as 2nd arg
    const responseText = await chatWithTutor(chatHistory, userMsg.text);
    
    setChatHistory(prev => [...prev, { role: 'model', text: responseText }]);
    setChatLoading(false);
  };

  // -- Views Renderers --

  const renderDashboard = () => (
    <div className="p-8 max-w-6xl mx-auto">
      <header className="mb-12">
        <h1 className="text-4xl font-bold text-white mb-4">Currículo de Data Science</h1>
        <p className="text-gray-400 text-lg">Sua jornada estruturada do básico ao avançado.</p>
      </header>

      <div className="space-y-8">
        {CURRICULUM.map((module, mIdx) => {
          // MODIFICAÇÃO: Removemos a trava (isLocked) para deixar todos os módulos ativos (inclusive o 2).
          const isLocked = false; 

          return (
            <div key={module.id} className={`relative pl-8 border-l-2 ${isLocked ? 'border-gray-800' : 'border-blue-500/50'}`}>
              <div className={`absolute -left-[9px] top-0 w-4 h-4 rounded-full ${isLocked ? 'bg-gray-800' : 'bg-blue-500'}`}></div>
              
              <div className="mb-6">
                <div className="flex items-center gap-3 mb-2">
                  <h2 className={`text-2xl font-bold ${isLocked ? 'text-gray-600' : 'text-gray-200'}`}>
                    {module.title}
                  </h2>
                  <span className={`px-2 py-0.5 rounded text-xs font-bold border ${
                    module.level === 'Beginner' ? 'border-green-500/30 text-green-400 bg-green-500/10' :
                    module.level === 'Intermediate' ? 'border-yellow-500/30 text-yellow-400 bg-yellow-500/10' :
                    'border-red-500/30 text-red-400 bg-red-500/10'
                  }`}>
                    {module.level}
                  </span>
                </div>
                <p className="text-gray-500 max-w-2xl">{module.description}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {module.topics.map((topic) => {
                  const isCompleted = progress.completedTopicIds.includes(topic.id);
                  const isAccessible = !isLocked; 

                  return (
                    <button
                      key={topic.id}
                      disabled={!isAccessible}
                      onClick={() => handleOpenLesson(module.id, topic.id)}
                      className={`text-left p-5 rounded-xl border transition-all relative group overflow-hidden ${
                        !isAccessible 
                          ? 'bg-darker border-gray-800 opacity-50 cursor-not-allowed' 
                          : isCompleted
                            ? 'bg-blue-900/10 border-blue-500/30 hover:border-blue-500'
                            : 'bg-paper border-gray-700 hover:border-gray-500 hover:shadow-lg hover:shadow-blue-500/5'
                      }`}
                    >
                      <div className="flex justify-between items-start mb-3">
                        <div className={`p-2 rounded-lg ${isCompleted ? 'bg-blue-500/20 text-blue-400' : 'bg-gray-800 text-gray-400'}`}>
                          {isCompleted ? <CheckCircle2 size={20} /> : isAccessible ? <PlayCircle size={20} /> : <Lock size={20} />}
                        </div>
                      </div>
                      <h3 className="font-semibold text-gray-200 mb-1 group-hover:text-blue-400 transition-colors">{topic.title}</h3>
                      <p className="text-sm text-gray-500 line-clamp-2">{topic.description}</p>
                      
                      {isCompleted && (
                        <div className="absolute top-0 right-0 p-2">
                           <span className="text-xs font-bold text-blue-500/50">COMPLETED</span>
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  const renderChat = () => (
    <div className="flex flex-col h-full bg-dark">
        <header className="p-6 border-b border-gray-800 bg-darker">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <Bot className="text-purple-500" /> AI Tutor de Data Science
            </h2>
            <p className="text-sm text-gray-400">Tire dúvidas sobre código, carreira ou conceitos.</p>
        </header>
        
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {chatHistory.length === 0 && (
                <div className="text-center text-gray-500 mt-20">
                    <MessageSquare size={48} className="mx-auto mb-4 opacity-20" />
                    <p>Olá! Sou seu tutor pessoal.</p>
                    <p className="text-sm">Pergunte-me sobre "Regressão Linear" ou "Como usar Pandas".</p>
                </div>
            )}
            {chatHistory.map((msg, i) => (
                <div key={i} className={`flex gap-4 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    {msg.role === 'model' && <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center shrink-0"><Bot size={16} /></div>}
                    <div className={`max-w-[80%] p-4 rounded-2xl ${
                        msg.role === 'user' 
                        ? 'bg-primary text-white rounded-br-none' 
                        : 'bg-paper border border-gray-700 text-gray-200 rounded-bl-none prose prose-invert prose-sm'
                    }`}>
                        <ReactMarkdown>{msg.text}</ReactMarkdown>
                    </div>
                    {msg.role === 'user' && <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center shrink-0"><User size={16} /></div>}
                </div>
            ))}
            {chatLoading && (
                <div className="flex gap-4">
                    <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center"><Bot size={16} /></div>
                    <div className="bg-paper p-4 rounded-2xl rounded-bl-none border border-gray-700">
                        <span className="animate-pulse">Pensando...</span>
                    </div>
                </div>
            )}
        </div>

        <form onSubmit={handleChatSubmit} className="p-4 border-t border-gray-800 bg-darker">
            <div className="relative max-w-4xl mx-auto">
                <input 
                    type="text" 
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    placeholder="Faça uma pergunta sobre Data Science..."
                    className="w-full bg-gray-800 text-white rounded-full pl-6 pr-14 py-4 focus:outline-none focus:ring-2 focus:ring-purple-500/50 border border-gray-700 placeholder-gray-500"
                />
                <button 
                    type="submit" 
                    disabled={chatLoading || !chatInput.trim()}
                    className="absolute right-2 top-2 p-2 bg-purple-600 text-white rounded-full hover:bg-purple-500 transition-colors disabled:opacity-50"
                >
                    <Send size={20} />
                </button>
            </div>
        </form>
    </div>
  );

  return (
    <div className="flex h-screen bg-dark text-gray-100 font-sans">
      <Sidebar 
        currentView={view} 
        onChangeView={(v) => {
            setView(v);
            setActiveModuleId(null);
            setActiveTopicId(null);
        }} 
        progress={progress} 
      />
      
      <main className="flex-1 ml-64 h-full relative">
        {view === AppView.DASHBOARD && renderDashboard()}
        
        {view === AppView.LESSON && activeTopic && activeModule && (
          <LessonView 
            topic={activeTopic} 
            module={activeModule}
            onComplete={handleCompleteTopic}
            onBack={() => setView(AppView.DASHBOARD)}
          />
        )}

        {view === AppView.REVIEW && (
          <ReviewSession 
            completedTopics={progress.completedTopicIds}
            allTopicsMap={allTopicsMap}
            onClose={() => setView(AppView.DASHBOARD)}
            onSuccess={handleXPForReview}
          />
        )}

        {view === AppView.CHAT && renderChat()}
      </main>
    </div>
  );
}