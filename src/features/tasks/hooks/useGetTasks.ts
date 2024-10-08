import { useEffect, useCallback, useMemo } from 'react';
import { useTaskStore } from '@/stores/task';
import { Task, TaskFilter } from '@/features/tasks/interfaces/task';
import { apiCall } from '@/ultis/api';

export const useGetTasks = (initialTasks: Task[]) => {
  const {
    tasks,
    filter,
    page,
    hasMore,
    isLoading,
    setTasks,
    setFilter,
    setPage,
    setHasMore,
    setIsLoading,
  } = useTaskStore();

  useEffect(() => {
    setTasks(TaskFilter.ALL, initialTasks);
  }, [initialTasks, setTasks]);

  const fetchTasks = useCallback(
    async (currentFilter: TaskFilter) => {
      const currentPage = page[currentFilter];
      setIsLoading(true);
      try {
        const params: Record<string, string> = {
          page: currentPage.toString(),
          limit: '10',
        };

        if (currentFilter === TaskFilter.COMPLETED) {
          params.isComplete = 'true';
        } else if (currentFilter === TaskFilter.INCOMPLETE) {
          params.isComplete = 'false';
        }

        const newTasks = await apiCall<Task[]>('tasks', {
          method: 'GET',
          params,
        });

        setIsLoading(false);
        setHasMore(currentFilter, newTasks.length === 10);
        setTasks(currentFilter, prevTasks => [...prevTasks, ...newTasks]);
        return newTasks;
      } catch (error) {
        console.error('Error fetching tasks:', error);
        setIsLoading(false);
        return undefined;
      }
    },
    [page, setIsLoading, setHasMore, setTasks]
  );

  const handleFilterChange = useCallback(
    (newFilter: TaskFilter) => {
      setFilter(newFilter);
      if (tasks[newFilter].length < 10) {
        setPage(newFilter, 1);
        fetchTasks(newFilter);
      }
    },
    [setFilter, setPage, fetchTasks, tasks]
  );

  const fetchMoreTasks = useCallback(() => {
    if (!isLoading && hasMore[filter]) {
      const nextPage = page[filter] + 1;
      setPage(filter, nextPage);
      fetchTasks(filter);
    }
  }, [isLoading, hasMore, page, setPage, fetchTasks, filter]);

  const filteredTasks = useMemo(() => tasks[filter], [tasks, filter]);

  return {
    tasks: filteredTasks,
    filter,
    hasMore: hasMore[filter],
    isLoading,
    handleFilterChange,
    fetchMoreTasks,
  };
};
