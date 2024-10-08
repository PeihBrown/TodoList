import { useState, useCallback } from 'react';
import { useTaskStore } from '@/stores/task';
import { Task } from '@/features/tasks/interfaces/task';
import { apiCall } from '@/ultis/api';

export const useCreateTask = () => {
  const { addTask, tasks } = useTaskStore();
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const validateTask = (title: string): string | null => {
    if (title.trim() === '') {
      return 'Task title cannot be empty';
    }
    if (tasks.some(task => task.title.toLowerCase() === title.toLowerCase())) {
      return 'A task with this name already exists';
    }
    return null;
  };

  const handleAddTask = useCallback(async () => {
    const validationError = validateTask(newTaskTitle);
    if (validationError) {
      setError(validationError);
      return;
    }

    setError(null);
    setIsCreating(true);

    try {
      const newTask: Omit<Task, 'id' | 'createdAt'> = {
        title: newTaskTitle.trim(),
        description: '',
        isComplete: false,
      };

      const createdTask: Task = await apiCall<Task>('tasks', {
        method: 'POST',
        body: newTask,
      });

      addTask(createdTask);
      setNewTaskTitle('');
    } catch (error) {
      console.error("Error creating task:", error);
      setError('Failed to create task. Please try again.');
    } finally {
      setIsCreating(false);
    }
  }, [newTaskTitle, addTask, tasks]);

  return {
    newTaskTitle,
    setNewTaskTitle,
    handleAddTask,
    isCreating,
    error,
    setError,
  };
};
