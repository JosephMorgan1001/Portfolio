export interface Topic {
  id: string;
  title: string;
  description: string;
  completed: boolean;
}

export interface Module {
  id: string;
  title: string;
  description: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  topics: Topic[];
}

export interface UserProgress {
  completedTopicIds: string[];
  currentModuleId: string;
  currentTopicId: string;
  xp: number;
  streak: number;
}

export enum AppView {
  DASHBOARD = 'DASHBOARD',
  LESSON = 'LESSON',
  REVIEW = 'REVIEW',
  CHAT = 'CHAT'
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}
