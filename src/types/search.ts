import { ScreenType } from '../types';

export type SearchCategory =
  | 'all'
  | 'academics'
  | 'homework'
  | 'teachers'
  | 'timetable'
  | 'sports'
  | 'certificates'
  | 'ptm'
  | 'navigation'
  | 'student';

export interface SearchResultItem {
  id: string;
  title: string;
  subtitle: string;
  description?: string;
  category: SearchCategory;
  categoryLabel: string;
  targetScreen: ScreenType;
  badge?: {
    text: string;
    variant: 'red' | 'green' | 'blue' | 'amber' | 'purple' | 'slate';
  };
  metadata?: {
    score?: string;
    teacher?: string;
    date?: string;
    time?: string;
    subject?: string;
    status?: string;
    period?: number;
    email?: string;
    phone?: string;
    location?: string;
  };
  keywords: string[];
  actionLabel: string;
}
