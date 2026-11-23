import React, { useEffect, useState, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import { Topic, Module, ChatMessage } from '../types';
import { generateLessonContent, generateExercise, reviewCode, chatWithTutor, startFeynmanCheck, validateFeynmanCheck } from '../services/geminiService';
import { ArrowLeft, CheckCircle, Play, Code, Loader2, MessageCircleQuestion, X, Send, Bot, BrainCircuit, Mic } from 'lucide-react';

interface LessonViewProps {
  topic: Topic;
  module: Module;
  onComplete: (topicId: string) => void;
  onBack: () => void;
}

const LessonView: React.FC<LessonViewProps> = ({ topic, module, onComplete, onBack }) => {
  const [content, setContent] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'learn' | 'practice'>('learn');
  
  // Feynman Method State
  const [showFeynman, setShowFeynman] = useState(false);
  const [feynmanQuestion, setFeynmanQuestion] = useState('');
  const [userExplanation, setUserExplanation] = useState('');
  const [feynmanLoading, setFeynmanLoading] = useState(false);
  const [feynmanResult, setFeynmanResult] = useState<{score: number, feedback: string} | null>(null);

  // Practice State
  const [exercise, setExercise] = useState<{question: string, starterCode: string} | null>(null);
  const [userCode, setUserCode] = useState('');
  const [feedback, setFeedback] = useState('');
  const [checkingCode, setCheckingCode] = useState(false);
  const [loadingExercise, setLoadingExercise] = useState(false);

  // Contextual Chat State
  const [showChat, setShowChat] = useState(false);
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [chatInput, setChatInput] = useState('');
  const [chatLoading, setChatLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let mounted = true;
    const loadContent = async () => {
      setLoading(true);
      const lessonText = await generateLessonContent(topic.title, module.title, topic.id);
      if (mounted) {
        setContent(lessonText);
        setLoading(false);
      }
    };
    loadContent();
    return () => { mounted = false; };
  }, [topic, module]);

  useEffect(() => {
    if (showChat) {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatHistory, showChat]);

  const handleTabChange = async (tab: 'learn' | 'practice') => {
    setActiveTab(tab);
    if (tab === 'practice' && !exercise) {
        setLoadingExercise(true);
        const ex = await generateExercise(topic.title, content);
        setExercise(ex);
        setUserCode(ex.starterCode);
        setLoadingExercise(false);
    }
  };

  const handleStartFeynman = async () => {
      setShowFeynman(true);
      setFeynmanLoading(true);
      const question = await startFeynmanCheck(topic.title, content);
      setFeynmanQuestion(question);
      setFeynmanLoading(false);
  }

  const handleSubmitFeynman = async () => {
      if (!userExplanation.trim()) return;
      setFeynmanLoading(true);
      const result = await validateFeynmanCheck(feynmanQuestion, userExplanation);
      setFeynmanResult(result);
      setFeynmanLoading(false);

      if (result.score >= 7) {
          onComplete(topic.id);
          // Pequeno delay para ler o feedback antes de liberar
          setTimeout(() => {
             // Optional: Auto move to practice or just show success UI
          }, 2000);
      }
  }

  const checkCode = async () => {
    setCheckingCode(true);
    const result = await reviewCode(topic.title, userCode, exercise?.question || '');
    setFeedback(result);
    setCheckingCode(false);

    const gradeMatch = result.match(/Nota:\s*(\d+)/i);
    const grade = gradeMatch ? parseInt(gradeMatch[1]) : 0;

    if (!topic.completed && grade >= 7) {
       onComplete(topic.id);
    }
  };

  const handleChatSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim() || chatLoading) return;
    
    const userMsg: ChatMessage = { role: 'user', text: chatInput };
    setChatHistory(prev => [...prev, userMsg]);
    setChatInput('');
    setChatLoading(true);

    const currentContext = activeTab === 'learn' 
        ? content 
        : `Exercício: ${exercise?.question}\n\nCódigo Atual do Aluno:\n\`\`\`python\n${userCode}\n\`\`\``;
    
    const response = await chatWithTutor(chatHistory, userMsg.text, currentContext);
    
    setChatHistory(prev => [...prev, { role: 'model', text: response }]);
    setChatLoading(false);
  };

  return (
    <div className="h-full flex flex-col bg-dark overflow-hidden relative">
      {/* Header */}
      <div className="p-6 border-b border-gray-800 flex items-center justify-between bg-darker/50 backdrop-blur z-10">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="p-2 hover:bg-gray-800 rounded-full text-gray-400">
            <ArrowLeft size={20} />
          </button>
          <div>
            <h2 className="text-lg font-semibold text-gray-100">{module.title}</h2>
            <h1 className="text-2xl font-bold text-blue-400">{topic.title}</h1>
          </div>
        </div>
        <div className="flex gap-2 items-center">
            <div className="flex bg-gray-800 rounded-lg p-1 mr-4">
                <button 
                    onClick={() => handleTabChange('learn')}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${activeTab === 'learn' ? 'bg-primary text-white shadow' : 'text-gray-400 hover:text-white'}`}
                >
                    Aprender
                </button>
                <button 
                    onClick={() => handleTabChange('practice')}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${activeTab === 'practice' ? 'bg-secondary text-white shadow' : 'text-gray-400 hover:text-white'}`}
                >
                    Praticar
                </button>
            </div>
            <button 
                onClick={() => setShowChat(!showChat)}
                className={`p-2.5 rounded-full transition-all ${showChat ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/30' : 'bg-gray-800 text-purple-400 hover:bg-gray-700'}`}
                title="Tirar Dúvidas com IA"
            >
                <MessageCircleQuestion size={20} />
            </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-hidden relative flex">
          
          {/* Lesson/Practice Content */}
          <div className="flex-1 overflow-y-auto p-6 scroll-smooth">
            {activeTab === 'learn' ? (
                loading ? (
                    <div className="flex flex-col items-center justify-center h-full text-gray-500">
                        <Loader2 size={40} className="animate-spin mb-4 text-blue-500" />
                        <p>Gerando aula personalizada com IA...</p>
                    </div>
                ) : (
                    <div className="max-w-4xl mx-auto prose prose-invert prose-blue pb-20">
                        <ReactMarkdown
                            components={{
                                code({node, className, children, ...props}) {
                                    return (
                                        <code className={`${className} bg-gray-800 rounded px-1 py-0.5 text-blue-300 font-mono text-sm`} {...props}>
                                            {children}
                                        </code>
                                    )
                                },
                                pre({children}) {
                                    return <pre className="bg-gray-900 border border-gray-700 rounded-xl p-4 overflow-x-auto my-4 shadow-lg">{children}</pre>
                                }
                            }}
                        >
                            {content}
                        </ReactMarkdown>
                        
                        {/* FEYNMAN METHOD INTERFACE */}
                        <div className="mt-16 mb-10 border-t border-gray-800 pt-10">
                            {!showFeynman ? (
                                <div className="bg-gradient-to-br from-blue-900/20 to-purple-900/20 border border-blue-500/30 p-8 rounded-2xl text-center">
                                    <BrainCircuit size={48} className="mx-auto text-blue-400 mb-4" />
                                    <h3 className="text-xl font-bold text-white mb-2">Verificação de Domínio (Método Feynman)</h3>
                                    <p className="text-gray-400 mb-6 max-w-lg mx-auto">
                                        Estudos mostram que apenas ler cria uma ilusão de aprendizado. 
                                        Para avançar, você deve provar que consegue explicar este conceito com suas próprias palavras.
                                    </p>
                                    <button 
                                        onClick={handleStartFeynman}
                                        className="bg-primary hover:bg-blue-600 text-white px-8 py-3 rounded-full font-bold flex items-center gap-2 mx-auto transition-all transform hover:scale-105 shadow-lg shadow-blue-500/20"
                                    >
                                        <Mic size={20} />
                                        Explicar para a IA
                                    </button>
                                </div>
                            ) : (
                                <div className="bg-paper border border-gray-700 p-8 rounded-2xl animate-fade-in">
                                    {feynmanLoading && !feynmanResult ? (
                                        <div className="flex flex-col items-center py-10">
                                            <Loader2 size={32} className="animate-spin text-purple-500 mb-2" />
                                            <p className="text-gray-400">A IA está formulando uma pergunta desafiadora...</p>
                                        </div>
                                    ) : (
                                        <>
                                            <h3 className="text-lg font-bold text-purple-400 mb-4 flex items-center gap-2">
                                                <Bot size={20} /> Professor AI pergunta:
                                            </h3>
                                            <p className="text-xl text-white font-medium mb-6 leading-relaxed">
                                                "{feynmanQuestion}"
                                            </p>
                                            
                                            {!feynmanResult ? (
                                                <div className="space-y-4">
                                                    <textarea 
                                                        value={userExplanation}
                                                        onChange={(e) => setUserExplanation(e.target.value)}
                                                        placeholder="Explique como se estivesse ensinando um colega..."
                                                        className="w-full bg-darker border border-gray-700 rounded-xl p-4 text-gray-200 focus:outline-none focus:border-purple-500 min-h-[120px]"
                                                    />
                                                    <div className="flex justify-end">
                                                        <button 
                                                            onClick={handleSubmitFeynman}
                                                            disabled={!userExplanation.trim() || feynmanLoading}
                                                            className="bg-purple-600 hover:bg-purple-500 text-white px-6 py-2 rounded-lg font-bold disabled:opacity-50 transition-colors"
                                                        >
                                                            {feynmanLoading ? 'Avaliando...' : 'Enviar Explicação'}
                                                        </button>
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className={`p-6 rounded-xl border ${feynmanResult.score >= 7 ? 'bg-green-500/10 border-green-500/30' : 'bg-red-500/10 border-red-500/30'}`}>
                                                    <div className="flex items-center justify-between mb-4">
                                                        <h4 className={`font-bold ${feynmanResult.score >= 7 ? 'text-green-400' : 'text-red-400'}`}>
                                                            {feynmanResult.score >= 7 ? 'Excelente! Conceito Dominado.' : 'Ainda não está claro.'}
                                                        </h4>
                                                        <span className="text-2xl font-bold text-white">{feynmanResult.score}/10</span>
                                                    </div>
                                                    <p className="text-gray-300 mb-6">{feynmanResult.feedback}</p>
                                                    
                                                    {feynmanResult.score >= 7 ? (
                                                        <button 
                                                            onClick={() => handleTabChange('practice')}
                                                            className="w-full bg-green-600 hover:bg-green-500 text-white py-3 rounded-lg font-bold shadow-lg shadow-green-500/20 transition-all"
                                                        >
                                                            Continuar para Prática
                                                        </button>
                                                    ) : (
                                                        <button 
                                                            onClick={() => setFeynmanResult(null)}
                                                            className="w-full bg-gray-700 hover:bg-gray-600 text-white py-3 rounded-lg font-bold transition-all"
                                                        >
                                                            Tentar Novamente
                                                        </button>
                                                    )}
                                                </div>
                                            )}
                                        </>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                )
            ) : (
                <div className="h-full flex flex-col max-w-6xl mx-auto pb-20">
                    {loadingExercise ? (
                        <div className="flex flex-col items-center justify-center h-full text-gray-500">
                            <Loader2 size={40} className="animate-spin mb-4 text-green-500" />
                            <p>Criando desafio prático baseado na aula...</p>
                        </div>
                    ) : (
                        <div className="flex flex-col lg:flex-row gap-6 h-full">
                            {/* Problem Description */}
                            <div className="lg:w-1/3 bg-paper rounded-xl p-6 border border-gray-700 overflow-y-auto h-fit max-h-full">
                                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                                    <Code size={20} className="text-secondary" /> 
                                    Desafio
                                </h3>
                                <p className="text-gray-300 whitespace-pre-line leading-relaxed">
                                    {exercise?.question}
                                </p>
                            </div>

                            {/* Editor & Feedback */}
                            <div className="lg:w-2/3 flex flex-col gap-4 h-full">
                                <div className="bg-darker border border-gray-700 rounded-xl flex-1 flex flex-col overflow-hidden shadow-xl">
                                    <div className="bg-gray-800 px-4 py-2 border-b border-gray-700 text-xs text-gray-400 font-mono flex justify-between">
                                        <span>main.py</span>
                                        <span className="text-gray-500">Python 3.10</span>
                                    </div>
                                    <textarea 
                                        value={userCode}
                                        onChange={(e) => setUserCode(e.target.value)}
                                        className="flex-1 bg-darker text-gray-300 p-4 font-mono text-sm resize-none focus:outline-none leading-relaxed"
                                        spellCheck={false}
                                    />
                                </div>
                                
                                <div className="flex justify-between items-center">
                                    <p className="text-xs text-gray-500">Use o chat lateral para pedir ajuda com o código.</p>
                                    <button 
                                        onClick={checkCode}
                                        disabled={checkingCode}
                                        className="bg-secondary hover:bg-emerald-600 text-white px-6 py-2 rounded-lg font-bold flex items-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-emerald-500/20"
                                    >
                                        {checkingCode ? <Loader2 className="animate-spin" size={18} /> : <Play size={18} />}
                                        Executar e Verificar
                                    </button>
                                </div>

                                {feedback && (
                                    <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 animate-fade-in shadow-lg">
                                        <h4 className="font-bold text-gray-200 mb-2">Relatório de Correção:</h4>
                                        <div className="prose prose-sm prose-invert text-gray-400">
                                            <ReactMarkdown>
                                                {feedback}
                                            </ReactMarkdown>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            )}
          </div>

          {/* Chat Drawer Overlay */}
          <div className={`absolute top-0 right-0 h-full w-full md:w-96 bg-gray-900 border-l border-gray-700 shadow-2xl transform transition-transform duration-300 z-20 flex flex-col ${showChat ? 'translate-x-0' : 'translate-x-full'}`}>
              <div className="p-4 border-b border-gray-700 flex items-center justify-between bg-gray-800">
                 <h3 className="font-bold text-white flex items-center gap-2 text-sm">
                    <Bot className="text-purple-500" size={18}/> 
                    Tutor da Aula
                 </h3>
                 <button onClick={() => setShowChat(false)} className="text-gray-400 hover:text-white p-1 hover:bg-gray-700 rounded-full">
                    <X size={18} />
                 </button>
              </div>
              
              <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-900/95">
                 {chatHistory.length === 0 && (
                     <div className="text-center text-gray-500 mt-10 px-4">
                         <MessageCircleQuestion className="mx-auto mb-2 opacity-50" size={32} />
                         <p className="text-sm font-medium">Estou acompanhando sua aula.</p>
                         <p className="text-xs mt-2">Pergunte coisas como:<br/>"O que acontece se eu mudar este parâmetro?"<br/>"Me dê outro exemplo disso."</p>
                     </div>
                 )}
                 {chatHistory.map((msg, idx) => (
                     <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                         <div className={`max-w-[90%] p-3 rounded-2xl text-sm ${
                             msg.role === 'user' 
                             ? 'bg-purple-600 text-white rounded-br-none' 
                             : 'bg-gray-800 text-gray-200 border border-gray-700 rounded-bl-none'
                         }`}>
                            <ReactMarkdown components={{
                                code({node, className, children, ...props}) {
                                    return <code className="bg-black/30 rounded px-1" {...props}>{children}</code>
                                }
                            }}>
                                {msg.text}
                            </ReactMarkdown>
                         </div>
                     </div>
                 ))}
                 {chatLoading && (
                     <div className="flex justify-start">
                        <div className="bg-gray-800 p-3 rounded-2xl rounded-bl-none text-gray-400 text-xs flex items-center gap-2 border border-gray-700">
                           <Loader2 size={12} className="animate-spin" />
                           Digitando...
                        </div>
                     </div>
                 )}
                 <div ref={chatEndRef} />
              </div>

              <form onSubmit={handleChatSubmit} className="p-3 bg-gray-800 border-t border-gray-700">
                  <div className="relative">
                      <input 
                          type="text" 
                          value={chatInput}
                          onChange={e => setChatInput(e.target.value)}
                          placeholder="Dúvida específica..."
                          className="w-full bg-gray-900 text-white rounded-lg pl-3 pr-10 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-purple-500 border border-gray-700 placeholder-gray-500"
                      />
                      <button 
                          type="submit" 
                          disabled={!chatInput.trim() || chatLoading}
                          className="absolute right-2 top-2 p-1.5 bg-purple-600 text-white rounded-md hover:bg-purple-500 disabled:opacity-50 transition-colors"
                      >
                          <Send size={16} />
                      </button>
                  </div>
              </form>
          </div>
      </div>
    </div>
  );
};

export default LessonView;