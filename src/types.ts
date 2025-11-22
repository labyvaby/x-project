import type { IconName } from './components/Icon';

export type Tab = 'главная' | 'статьи' | 'достижение' | 'подробнее' | 'профиль';

export type Question = {
  q: string;
  options: string[];
  correctIndex: number;
};

export type Article = {
  id: string;
  section: string;
  title: string;
  content: string[];
  questions: Question[];
};

export type Achievement = {
  id: string;
  title: string;
  summary: string;
  details: string;
  icon: IconName;
  unlocked: boolean;
  reward?: string;
};
