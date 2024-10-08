import { create } from 'zustand';
import { Task, TaskFilter } from '@/features/tasks/interfaces/task';

interface TaskState {
  tasks: Record<TaskFilter, Task[]>;
  filter: TaskFilter;
  page: Record<TaskFilter, number>;
  hasMore: Record<TaskFilter, boolean>;
  isLoading: boolean;
  setTasks: (filter: TaskFilter, tasks: Task[] | ((prevTasks: Task[]) => Task[])) => void;
  addTask: (task: Task) => void;
  toggleTaskStatus: (updatedTask: Task) => void;
  setFilter: (filter: TaskFilter) => void;
  setPage: (filter: TaskFilter, page: number) => void;
  setHasMore: (filter: TaskFilter, hasMore: boolean) => void;
  setIsLoading: (isLoading: boolean) => void;
}

export const useTaskStore = create<TaskState>(set => ({
  tasks: {
    [TaskFilter.ALL]: [],
    [TaskFilter.COMPLETED]: [],
    [TaskFilter.INCOMPLETE]: [],
  },
  filter: TaskFilter.ALL,
  page: {
    [TaskFilter.ALL]: 1,
    [TaskFilter.COMPLETED]: 1,
    [TaskFilter.INCOMPLETE]: 1,
  },
  hasMore: {
    [TaskFilter.ALL]: true,
    [TaskFilter.COMPLETED]: true,
    [TaskFilter.INCOMPLETE]: true,
  },
  isLoading: false,
  setTasks: (filter, tasks) =>
    set(state => {
      const newTasks = typeof tasks === 'function' ? tasks(state.tasks[filter]) : tasks;

      // Remove duplicates based on task name
      const uniqueTasks = newTasks.reduce((acc, task) => {
        if (!acc.some(t => t.title === task.title)) {
          acc.push(task);
        }
        return acc;
      }, [] as Task[]);

      return {
        tasks: {
          ...state.tasks,
          [filter]: uniqueTasks,
        },
      };
    }),
  addTask: task =>
    set(state => {
      // Check if a task with the same name already exists
      const taskExists = state.tasks[TaskFilter.ALL].some(t => t.title === task.title);

      // If the task already exists, return the current state without changes
      if (taskExists) {
        return state;
      }

      // If the task doesn't exist, add it to the store
      return {
        tasks: {
          ...state.tasks,
          [TaskFilter.ALL]: [task, ...state.tasks[TaskFilter.ALL]],
          [TaskFilter.INCOMPLETE]: [task, ...state.tasks[TaskFilter.INCOMPLETE]],
        },
      };
    }),
  toggleTaskStatus: (updatedTask: Task) =>
    set(state => {
      // Update ALL filter
      const updatedAllTasks = state.tasks[TaskFilter.ALL].map(t =>
        t.id === updatedTask.id ? updatedTask : t
      );

      // Update COMPLETED and INCOMPLETE filters
      let updatedCompletedTasks = [...state.tasks[TaskFilter.COMPLETED]];
      let updatedIncompleteTasks = [...state.tasks[TaskFilter.INCOMPLETE]];

      if (updatedTask.isComplete) {
        updatedCompletedTasks = [
          updatedTask,
          ...updatedCompletedTasks.filter(t => t.id !== updatedTask.id),
        ];
        updatedIncompleteTasks = updatedIncompleteTasks.filter(t => t.id !== updatedTask.id);
      } else {
        updatedIncompleteTasks = [
          updatedTask,
          ...updatedIncompleteTasks.filter(t => t.id !== updatedTask.id),
        ];
        updatedCompletedTasks = updatedCompletedTasks.filter(t => t.id !== updatedTask.id);
      }

      return {
        tasks: {
          ...state.tasks,
          [TaskFilter.ALL]: updatedAllTasks,
          [TaskFilter.COMPLETED]: updatedCompletedTasks,
          [TaskFilter.INCOMPLETE]: updatedIncompleteTasks,
        },
      };
    }),
  setFilter: filter => set({ filter }),
  setPage: (filter, page) =>
    set(state => ({
      page: { ...state.page, [filter]: page },
    })),
  setHasMore: (filter, hasMore) =>
    set(state => ({
      hasMore: { ...state.hasMore, [filter]: hasMore },
    })),
  setIsLoading: isLoading => set({ isLoading }),
}));
