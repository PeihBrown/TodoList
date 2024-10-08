import { renderHook, act } from '@testing-library/react';
import { useUpdateTask } from '../useUpdateTask';
import * as taskStoreModule from '@/stores/task';
import { apiCall } from '@/ultis/api';
import { Task } from '../../interfaces/task';

jest.mock('@/stores/task');
jest.mock('@/ultis/api');

const mockUseTaskStore = taskStoreModule.useTaskStore as jest.MockedFunction<
  typeof taskStoreModule.useTaskStore
>;

describe('useUpdateTask', () => {
  const mockToggleTaskStatus = jest.fn();
  const originalConsoleError = console.error;

  beforeEach(() => {
    jest.clearAllMocks();
    console.error = jest.fn();
    mockUseTaskStore.mockReturnValue({
      toggleTaskStatus: mockToggleTaskStatus,
    } as any);
  });

  afterEach(() => {
    console.error = originalConsoleError;
  });

  it('should update a task', async () => {
    const task: Task = {
      id: '1',
      title: 'Test Task',
      description: '',
      createdAt: new Date().toISOString(),
      isComplete: false,
    };

    const updatedTask: Task = { ...task, isComplete: true };

    (apiCall as jest.Mock).mockResolvedValue(updatedTask);

    const { result } = renderHook(() => useUpdateTask());

    await act(async () => {
      await result.current.handleUpdateTask(task);
    });

    expect(apiCall).toHaveBeenCalledWith('tasks/1', {
      method: 'PUT',
      body: { isComplete: true },
    });
    expect(mockToggleTaskStatus).toHaveBeenCalledWith(updatedTask);
  });

  it('should handle API errors', async () => {
    const task: Task = {
      id: '1',
      title: 'Test Task',
      description: '',
      createdAt: new Date().toISOString(),
      isComplete: false,
    };

    (apiCall as jest.Mock).mockRejectedValue(new Error('API Error'));

    const { result } = renderHook(() => useUpdateTask());

    await expect(result.current.handleUpdateTask(task)).rejects.toThrow('API Error');
    expect(mockToggleTaskStatus).not.toHaveBeenCalled();
    expect(console.error).toHaveBeenCalledWith('Error updating task:', expect.any(Error));
  });
});
