import TodoList from "@/features/tasks/components/TodoList";
import { Heading, Container } from "@chakra-ui/react";
import { Task } from "@/features/tasks/interfaces/task";

async function getTasks(): Promise<Task[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}tasks?page=1&limit=10`, { cache: 'no-store' });
  if (!res.ok) {
    throw new Error('Failed to fetch tasks');
  }
  return res.json();
}

export default async function Home() {
  const initialTasks = await getTasks();

  return (
    <Container maxW="container.md" py={8}>
      <Heading mb={6} textAlign="center">TODO LIST</Heading>
      <TodoList initialTasks={initialTasks} />
    </Container>
  );
}
