'use client';

import { Box, Text, VStack, useColorModeValue } from '@chakra-ui/react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Task } from '@/features/tasks/interfaces/task';
import { useGetTasks } from '../hooks/useGetTasks';
import { useCreateTask } from '../hooks/useCreateTask';
import { TaskInput } from './TaskInput';
import { FilterButtons } from './FilterButtons';
import { TaskItem } from './TaskItem';
import { useUpdateTask } from '../hooks/useUpdateTask';

interface TodoListProps {
  initialTasks: Task[];
}

export default function TodoList({ initialTasks }: TodoListProps) {
  const { tasks, filter, hasMore, isLoading, handleFilterChange, fetchMoreTasks } =
    useGetTasks(initialTasks);

  const { newTaskTitle, setNewTaskTitle, handleAddTask, isCreating, error, setError } =
    useCreateTask();

  const { handleUpdateTask } = useUpdateTask();

  const bg = useColorModeValue('gray.50', 'gray.700');

  const handleToggleTask = async (task: Task) => {
    try {
      await handleUpdateTask(task);
    } catch (error) {
      console.error('Failed to toggle task:', error);
    }
  };

  return (
    <Box bg={bg} p={6} borderRadius="md" boxShadow="md">
      <TaskInput
        value={newTaskTitle}
        onChange={e => {
          setNewTaskTitle(e);
          setError(null);
        }}
        onAdd={handleAddTask}
        isCreating={isCreating}
        error={error}
      />
      <FilterButtons currentFilter={filter} onFilterChange={handleFilterChange} />
      <InfiniteScroll
        dataLength={tasks.length}
        next={fetchMoreTasks}
        hasMore={hasMore}
        loader={isLoading && <Text>Loading...</Text>}
        endMessage={
          <Text textAlign="center" mt={4}>
            You&apos;ve seen all tasks
          </Text>
        }
        scrollableTarget="scrollableDiv"
      >
        <VStack align="stretch" spacing={2} id="scrollableDiv" maxHeight="400px" overflowY="auto">
          {tasks.map((task, idx) => (
            <TaskItem
              key={`task-${task.id}-idx-${idx}`}
              task={task}
              onToggle={() => handleToggleTask(task)}
            />
          ))}
        </VStack>
      </InfiniteScroll>
    </Box>
  );
}
