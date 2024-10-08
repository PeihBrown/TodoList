import TodoList from '@/features/tasks/components/TodoList';
import { Heading, Container } from '@chakra-ui/react';
import { Task } from '@/features/tasks/interfaces/task';
import { apiCall } from '@/ultis/api';

async function getTasks(): Promise<Task[]> {
  return apiCall<Task[]>('tasks', {
    method: 'GET',
    params: { page: '1', limit: '10' },
  });
}

export default async function Home() {
  const initialTasks = await getTasks();

  return (
    <Container maxW="container.md" py={8}>
      <Heading mb={6} textAlign="center">
        TODO LIST
      </Heading>
      <TodoList initialTasks={initialTasks} />
    </Container>
  );
}
