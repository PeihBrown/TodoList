import { renderHook, act } from '@testing-library/react';
import { useGetTasks } from '../useGetTasks';
import * as taskStoreModule from '@/stores/task';
import { apiCall } from '@/ultis/api';
import { Task, TaskFilter } from '../../interfaces/task';

jest.mock('@/stores/task');
jest.mock('@/ultis/api');

const mockUseTaskStore = taskStoreModule.useTaskStore as jest.MockedFunction<
  typeof taskStoreModule.useTaskStore
>;

describe('useGetTasks', () => {
  const mockSetTasks = jest.fn();
  const mockSetFilter = jest.fn();
  const mockSetPage = jest.fn();
  const mockSetHasMore = jest.fn();
  const mockSetIsLoading = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseTaskStore.mockReturnValue({
      tasks: { [TaskFilter.ALL]: [], [TaskFilter.COMPLETED]: [], [TaskFilter.INCOMPLETE]: [] },
      filter: TaskFilter.ALL,
      page: { [TaskFilter.ALL]: 1, [TaskFilter.COMPLETED]: 1, [TaskFilter.INCOMPLETE]: 1 },
      hasMore: {
        [TaskFilter.ALL]: true,
        [TaskFilter.COMPLETED]: true,
        [TaskFilter.INCOMPLETE]: true,
      },
      isLoading: false,
      setTasks: mockSetTasks,
      setFilter: mockSetFilter,
      setPage: mockSetPage,
      setHasMore: mockSetHasMore,
      setIsLoading: mockSetIsLoading,
    } as any);
  });

  it('should initialize with initial tasks', () => {
    const initialTasks: Task[] = [
      {
        id: '1',
        title: 'Test Task',
        description: '',
        createdAt: new Date().toISOString(),
        isComplete: false,
      },
    ];
    renderHook(() => useGetTasks(initialTasks));
    expect(mockSetTasks).toHaveBeenCalledWith(TaskFilter.ALL, initialTasks);
  });

  it('should fetch tasks when filter changes', async () => {
    (apiCall as jest.Mock).mockResolvedValue([{ id: '2', title: 'New Task', isComplete: false }]);
    const { result } = renderHook(() => useGetTasks([]));

    await act(async () => {
      result.current.handleFilterChange(TaskFilter.INCOMPLETE);
    });

    expect(mockSetFilter).toHaveBeenCalledWith(TaskFilter.INCOMPLETE);
    expect(mockSetPage).toHaveBeenCalledWith(TaskFilter.INCOMPLETE, 1);
    expect(apiCall).toHaveBeenCalled();
  });

  it('should fetch more tasks', async () => {
    (apiCall as jest.Mock).mockResolvedValue([{ id: '3', title: 'More Task', isComplete: true }]);
    const { result } = renderHook(() => useGetTasks([]));

    await act(async () => {
      result.current.fetchMoreTasks();
    });

    expect(mockSetPage).toHaveBeenCalled();
    expect(apiCall).toHaveBeenCalled();
  });
});
