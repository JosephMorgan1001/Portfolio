import React, { useState, useEffect } from 'react';
import { generateReviewQuestion, generateReviewCard } from '../services/geminiService';
import { Loader2, Brain, AlertCircle, CheckCircle, Lightbulb, Zap, ArrowRight, BookOpen } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

interface ReviewSessionProps {
  completedTopics: string[];
  allTopicsMap: Record<string, string>; // ID -> Title
  onClose: () => void;
  onSuccess: () => void;
}

interface ReviewCardData {
    concept: string;
    analogy: string;
    example: string;
}

interface QuizData {
    question: string;
    options: string[];
    answer: number;
    explanation: string;
}

const ReviewSession: React.FC<ReviewSessionProps> = ({ completedTopics, allTopicsMap, onClose, onSuccess }) => {
  const [loading, setLoading] = useState(true);
  const [phase, setPhase] = useState<'CARD' | 'QUIZ'>('CARD');
  
  // Data State
  const [currentTopicTitle, setCurrentTopicTitle] = useState('');
  const [cardData, setCardData] = useState<ReviewCardData | null>(null);
  const [quizData, setQuizData] = useState<QuizData | null>(null);

  // Quiz Interaction State
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    const loadReview = async () => {
      // 1. Filter topic titles that are completed
      const titles = completedTopics.map(id => allTopicsMap[id]).filter(Boolean);
      
      if (titles.length === 0) {
        setLoading(false);
        return;
      }

      // 2. Pick ONE random topic to focus on
      const pickedTopic = titles[Math.floor(Math.random() * titles.length)];
      setCurrentTopicTitle(pickedTopic);

      // 3. Parallel fetch: Get the summary card AND the question for THAT topic
      try {
        const [card, quiz] = await Promise.all([
            generateReviewCard(pickedTopic),
            generateReviewQuestion([pickedTopic]) // Pass only this topic to ensure consistency
        ]);
        
        setCardData(card);
        setQuizData(quiz);
      } catch (e) {
        console.error("Failed to load review", e);
      } finally {
        setLoading(false);
      }
    };
    loadReview();
  }, [completedTopics, allTopicsMap]);

  const handleAnswer = (idx: number) => {
    if (showResult) return;
    setSelectedOption(idx);
    setShowResult(true);
    if (idx === quizData?.answer) {
        onSuccess();
    }
  };

  if (completedTopics.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center p-8">
        <Brain size={64} className="text-gray-600 mb-4" />
        <h2 className="text-2xl font-bold text-white mb-2">Sem conteúdo para revisar</h2>
        <p className="text-gray-400 mb-6">Complete algumas aulas primeiro para desbloquear o modo revisão.</p>
        <button onClick={onClose} className="px-6 py-2 bg-primary rounded-lg text-white">Voltar ao Painel</button>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <Loader2 size={48} className="animate-spin text-purple-500 mb-4" />
        <p className="text-gray-400">Preparando sua revisão personalizada...</p>
      </div>
    );
  }

  // --- PHASE 1: DIDACTIC CARD ---
  if (phase === 'CARD' && cardData) {
      return (
          <div className="max-w-2xl mx-auto p-6 flex flex-col justify-center h-full animate-fade-in">
              <div className="mb-6 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-purple-400">
                      <BookOpen size={20} />
                      <span className="text-sm font-bold uppercase tracking-wider">Revisão do Dia</span>
                  </div>
                  <span className="text-gray-500 text-xs bg-gray-800 px-2 py-1 rounded border border-gray-700">
                      {currentTopicTitle}
                  </span>
              </div>

              <div className="bg-paper border border-gray-700 rounded-2xl p-8 shadow-2xl relative overflow-hidden group hover:border-purple-500/30 transition-colors">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
                  
                  {/* Concept Section */}
                  <div className="mb-8">
                      <h2 className="text-2xl font-bold text-gray-100 mb-4">O que é?</h2>
                      <p className="text-gray-300 text-lg leading-relaxed">{cardData.concept}</p>
                  </div>

                  {/* Analogy Section */}
                  <div className="mb-8 bg-blue-900/10 border border-blue-500/20 p-4 rounded-xl">
                      <h3 className="text-blue-400 font-bold mb-2 flex items-center gap-2">
                          <Lightbulb size={18} /> Para entender fácil:
                      </h3>
                      <p className="text-blue-100 italic">"{cardData.analogy}"</p>
                  </div>

                  {/* Example Section */}
                  <div>
                      <h3 className="text-gray-400 text-sm font-bold uppercase tracking-widest mb-3 flex items-center gap-2">
                          <Zap size={14} /> Na Prática
                      </h3>
                      <div className="bg-darker p-4 rounded-lg border border-gray-800 font-mono text-sm text-gray-300 shadow-inner">
                         <ReactMarkdown>{cardData.example}</ReactMarkdown>
                      </div>
                  </div>
              </div>

              <div className="mt-8 flex justify-end">
                  <button 
                    onClick={() => setPhase('QUIZ')}
                    className="bg-primary hover:bg-blue-600 text-white px-8 py-4 rounded-full font-bold flex items-center gap-3 transition-all transform hover:scale-105 shadow-lg shadow-blue-500/20"
                  >
                      Testar Conhecimento <ArrowRight size={20} />
                  </button>
              </div>
          </div>
      )
  }

  // --- PHASE 2: QUIZ ---
  if (phase === 'QUIZ' && quizData) {
      return (
        <div className="max-w-2xl mx-auto p-6 flex flex-col justify-center h-full animate-fade-in">
            <div className="mb-8">
                <span className="bg-purple-500/20 text-purple-300 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                    Desafio Rápido
                </span>
                <h2 className="text-2xl md:text-3xl font-bold text-white mt-4">{quizData.question}</h2>
            </div>

            <div className="space-y-4">
                {quizData.options.map((opt, idx) => {
                    let btnClass = "w-full p-4 rounded-xl border text-left transition-all relative ";
                    if (!showResult) {
                        btnClass += "border-gray-700 bg-paper hover:bg-gray-700 hover:border-gray-600 text-gray-200";
                    } else {
                        if (idx === quizData.answer) {
                            btnClass += "border-green-500 bg-green-500/10 text-green-400";
                        } else if (idx === selectedOption) {
                            btnClass += "border-red-500 bg-red-500/10 text-red-400";
                        } else {
                            btnClass += "border-gray-800 bg-darker text-gray-600 opacity-50";
                        }
                    }

                    return (
                        <button 
                            key={idx}
                            onClick={() => handleAnswer(idx)}
                            disabled={showResult}
                            className={btnClass}
                        >
                            <span className="font-semibold mr-3">{String.fromCharCode(65 + idx)}.</span>
                            {opt}
                            {showResult && idx === quizData.answer && <CheckCircle className="absolute right-4 top-4 text-green-500" size={20} />}
                            {showResult && idx === selectedOption && idx !== quizData.answer && <AlertCircle className="absolute right-4 top-4 text-red-500" size={20} />}
                        </button>
                    )
                })}
            </div>

            {showResult && (
                <div className="mt-8 bg-gray-800/50 p-6 rounded-xl border border-gray-700 animate-fade-in">
                    <h3 className="font-bold text-gray-200 mb-2">Explicação:</h3>
                    <p className="text-gray-400">{quizData.explanation}</p>
                    <div className="mt-6 flex justify-end">
                        <button onClick={onClose} className="px-6 py-2 bg-primary hover:bg-blue-600 text-white rounded-lg transition-colors">
                            Concluir Revisão
                        </button>
                    </div>
                </div>
            )}
        </div>
      );
  }

  return <div className="text-center text-red-400">Erro ao carregar revisão.</div>;
};

export default ReviewSession;
