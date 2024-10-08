import { useTaskStore } from '@/stores/task';
import { Task } from '../interfaces/task';
import { apiCall } from '@/ultis/api';

export const useUpdateTask = () => {
  const { toggleTaskStatus } = useTaskStore();

  const handleUpdateTask = async (task: Task) => {
    try {
      const updatedTask = await apiCall<Task>(`tasks/${task.id}`, {
        method: 'PUT',
        body: { isComplete: !task.isComplete },
      });

      toggleTaskStatus(updatedTask);
      return updatedTask;
    } catch (error) {
      console.error('Error updating task:', error);
      throw error;
    }
  };

  return {
    handleUpdateTask,
  };
};
