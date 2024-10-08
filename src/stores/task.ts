import { create } from 'zustand';
import { Task, TaskFilter } from '@/features/tasks/interfaces/task';

interface TaskState {
  tasks: Task[];
  filter: TaskFilter;
  page: number;
  hasMore: boolean;
  isLoading: boolean;
  setTasks: (tasks: Task[] | ((prevTasks: Task[]) => Task[])) => void;
  addTask: (task: Task) => void;
  toggleTask: (id: string) => void;
  setFilter: (filter: TaskFilter) => void;
  setPage: (page: number) => void;
  setHasMore: (hasMore: boolean) => void;
  setIsLoading: (isLoading: boolean) => void;
}

export const useTaskStore = create<TaskState>((set) => ({
  tasks: [],
  filter: TaskFilter.ALL,
  page: 1,
  hasMore: true,
  isLoading: false,
  setTasks: (tasks) => set((state) => ({ 
    tasks: typeof tasks === 'function' ? tasks(state.tasks) : tasks 
  })),
  addTask: (task) => set((state) => ({ tasks: [task, ...state.tasks] })),
  toggleTask: (id) => set((state) => ({
    tasks: state.tasks.map((task) =>
      task.id === id ? { ...task, isComplete: !task.isComplete } : task
    ),
  })),
  setFilter: (filter) => set({ filter }),
  setPage: (page) => set({ page }),
  setHasMore: (hasMore) => set({ hasMore }),
  setIsLoading: (isLoading) => set({ isLoading }),
}));
