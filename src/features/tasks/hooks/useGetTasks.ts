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
    setTasks(initialTasks);
  }, [initialTasks, setTasks]);

  const fetchTasks = useCallback(async (currentPage: number, currentFilter: TaskFilter) => {
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
      setHasMore(newTasks.length === 10);
      if (currentPage === 1) {
        setTasks(newTasks);
      } else {
        setTasks((prevTasks) => [...prevTasks, ...newTasks]);
      }
      return newTasks;
    } catch (error) {
      console.error("Error fetching tasks:", error);
      setIsLoading(false);
      return undefined;
    }
  }, [setIsLoading, setHasMore, setTasks]);

  useEffect(() => {
    if (page > 1) {
      fetchTasks(page, filter);
    }
  }, [fetchTasks, filter, page]);

  const handleFilterChange = useCallback(
    (newFilter: TaskFilter) => {
      setFilter(newFilter);
      setPage(1);
      fetchTasks(1, newFilter);
    },
    [setFilter, setPage, fetchTasks]
  );

  const fetchMoreTasks = useCallback(() => {
    if (!isLoading && hasMore) {
      const nextPage = page + 1;
      setPage(nextPage);
      fetchTasks(nextPage, filter);
    }
  }, [isLoading, hasMore, page, setPage, fetchTasks, filter]);

  return {
    tasks,
    filter,
    hasMore,
    isLoading,
    handleFilterChange,
    fetchMoreTasks,
  };
};
