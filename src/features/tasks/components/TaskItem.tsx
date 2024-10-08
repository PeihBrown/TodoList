import { Flex, Checkbox, Text, useColorModeValue } from '@chakra-ui/react';
import { Task } from '@/features/tasks/interfaces/task';
import { FC } from 'react';

interface TaskItemProps {
  task: Task;
  onToggle: (id: string) => void;
}

export const TaskItem: FC<TaskItemProps> = ({ task, onToggle }) => {
  const bg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.600');

  return (
    <Flex
      key={task.id}
      align="center"
      p={2}
      bg={bg}
      borderRadius="md"
      borderWidth={1}
      borderColor={borderColor}
    >
      <Checkbox isChecked={task.isComplete} onChange={() => onToggle(task.id)} mr={2} />
      <Text
        textDecoration={task.isComplete ? 'line-through' : 'none'}
        color={task.isComplete ? 'gray.500' : 'inherit'}
      >
        {task.title}
      </Text>
    </Flex>
  );
};
