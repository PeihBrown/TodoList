export interface Task {
  id: string;
  createdAt: string;
  title: string;
  description: string;
  isComplete: boolean;
}

export enum TaskFilter {
  ALL = 'all',
  COMPLETED = 'completed',
  INCOMPLETE = 'incomplete',
}
