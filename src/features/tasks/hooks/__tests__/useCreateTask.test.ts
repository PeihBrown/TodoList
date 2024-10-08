import { renderHook, act } from '@testing-library/react';
import { useCreateTask } from '../useCreateTask';
import * as taskStoreModule from '@/stores/task';
import * as apiModule from '@/ultis/api';
import { Task, TaskFilter } from '../../interfaces/task';

jest.mock('@/stores/task');
jest.mock('@/ultis/api');

const mockUseTaskStore = taskStoreModule.useTaskStore as jest.MockedFunction<
  typeof taskStoreModule.useTaskStore
>;
const mockApiCall = apiModule.apiCall as jest.MockedFunction<typeof apiModule.apiCall>;

describe('useCreateTask', () => {
  const mockAddTask = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseTaskStore.mockReturnValue({
      tasks: { [TaskFilter.ALL]: [] },
      addTask: mockAddTask,
    } as any);
  });

  it('should create a new task', async () => {
    const newTask: Task = {
      id: '109809809',
      title: 'New Task n',
      description: '',
      createdAt: new Date().toISOString(),
      isComplete: false,
    };

    mockApiCall.mockResolvedValue(newTask);

    const { result } = renderHook(() => useCreateTask());

    await act(async () => {
      result.current.setNewTaskTitle('New Task n');
    });

    await act(async () => {
      await result.current.handleAddTask();
    });

    expect(mockApiCall).toHaveBeenCalledWith('tasks', {
      method: 'POST',
      body: expect.objectContaining({ title: 'New Task n', isComplete: false }),
    });
    expect(mockAddTask).toHaveBeenCalledWith(newTask);
    expect(result.current.newTaskTitle).toBe('');
    expect(result.current.error).toBeNull();
  });

  it('should handle validation errors', async () => {
    const { result } = renderHook(() => useCreateTask());

    await act(async () => {
      result.current.setNewTaskTitle('');
      await result.current.handleAddTask();
    });

    expect(result.current.error).toBe('Task title cannot be empty');
    expect(mockApiCall).not.toHaveBeenCalled();
  });

  it('should handle API errors', async () => {
    mockApiCall.mockRejectedValue(new Error('API Error'));

    const { result } = renderHook(() => useCreateTask());

    await act(async () => {
      result.current.setNewTaskTitle('New Task');
      await result.current.handleAddTask();
    });

    expect(result.current.error).toBe('Task title cannot be empty');
    expect(mockAddTask).not.toHaveBeenCalled();
  });
});
