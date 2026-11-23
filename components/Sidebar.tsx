import React from 'react';
import { BookOpen, Brain, MessageSquare, LayoutDashboard, Trophy } from 'lucide-react';
import { AppView, UserProgress } from '../types';

interface SidebarProps {
  currentView: AppView;
  onChangeView: (view: AppView) => void;
  progress: UserProgress;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, onChangeView, progress }) => {
  const menuItems = [
    { id: AppView.DASHBOARD, label: 'Trilha', icon: LayoutDashboard },
    { id: AppView.REVIEW, label: 'Revisão Diária', icon: Brain },
    { id: AppView.CHAT, label: 'AI Tutor', icon: MessageSquare },
  ];

  return (
    <div className="w-64 bg-darker border-r border-gray-800 h-screen flex flex-col fixed left-0 top-0 overflow-y-auto">
      <div className="p-6">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">
          DataMaster AI
        </h1>
        <p className="text-gray-400 text-xs mt-1">Zero to Pro Data Scientist</p>
      </div>

      <div className="px-4 mb-6">
        <div className="bg-paper p-4 rounded-xl border border-gray-700">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-300 text-sm">Seu XP</span>
            <span className="text-yellow-400 font-bold flex items-center gap-1">
              <Trophy size={14} /> {progress.xp}
            </span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div 
              className="bg-yellow-400 h-2 rounded-full transition-all duration-500" 
              style={{ width: `${Math.min(100, (progress.xp % 1000) / 10)}%` }}
            ></div>
          </div>
          <p className="text-xs text-gray-500 mt-2">Nível {Math.floor(progress.xp / 1000) + 1}</p>
        </div>
      </div>

      <nav className="flex-1 px-2 space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onChangeView(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                isActive 
                  ? 'bg-primary/20 text-blue-400 border border-blue-500/30' 
                  : 'text-gray-400 hover:bg-gray-800 hover:text-white'
              }`}
            >
              <Icon size={20} />
              {item.label}
            </button>
          );
        })}
      </nav>

      <div className="p-4 border-t border-gray-800 text-xs text-gray-500">
        <p>Desenvolvido com Gemini AI</p>
      </div>
    </div>
  );
};

export default Sidebar;
