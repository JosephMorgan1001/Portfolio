import { UserProgress } from '../types';
import { CURRICULUM } from '../constants';

const STORAGE_KEY = 'dm_progress_v1';

const DEFAULT_PROGRESS: UserProgress = {
  completedTopicIds: [],
  currentModuleId: CURRICULUM[0].id,
  currentTopicId: CURRICULUM[0].topics[0].id,
  xp: 0,
  streak: 1
};

export const storageAgent = {
  /**
   * Carrega o progresso do usuário.
   * Se não houver dados salvos ou houver erro, retorna o estado inicial padrão.
   */
  load: (): UserProgress => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (!saved) return DEFAULT_PROGRESS;

      const parsed = JSON.parse(saved);
      
      // Merge com o default para garantir que novos campos no futuro não quebrem o save antigo
      return { ...DEFAULT_PROGRESS, ...parsed };
    } catch (error) {
      console.error('Erro ao carregar progresso:', error);
      return DEFAULT_PROGRESS;
    }
  },

  /**
   * Salva o progresso do usuário.
   */
  save: (progress: UserProgress): void => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
      // Opcional: Aqui você poderia enviar para um backend real no futuro
      console.log('Progresso sincronizado pelo Agente.');
    } catch (error) {
      console.error('Erro ao salvar progresso:', error);
    }
  },

  /**
   * Reseta o progresso (útil para debug ou opção de reiniciar curso).
   */
  reset: (): UserProgress => {
    try {
      localStorage.removeItem(STORAGE_KEY);
      return DEFAULT_PROGRESS;
    } catch (error) {
      return DEFAULT_PROGRESS;
    }
  }
};
