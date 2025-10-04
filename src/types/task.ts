export type TaskStatus = 'todo' | 'inProgress' | 'completed';

export type TaskCategory = 'work' | 'personal' | 'urgent' | 'ideas';

export interface Task {
  id: string;
  title: string;
  description?: string;
  status: TaskStatus;
  category?: TaskCategory;
  dueDate?: string;
  createdAt: string;
  completedAt?: string;
}

export interface TaskStats {
  total: number;
  todo: number;
  inProgress: number;
  completed: number;
}
