import { Input, Button, Flex, Text, Box } from "@chakra-ui/react";

interface TaskInputProps {
  value: string;
  onChange: (value: string) => void;
  onAdd: () => void;
  isCreating: boolean;
  error: string | null;
}

export const TaskInput: React.FC<TaskInputProps> = ({ value, onChange, onAdd, isCreating, error }) => (
  <Box mb={4}>
    <Flex mb={1}>
      <Input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Enter a new task"
      mr={2}
      />
      <Button onClick={onAdd} colorScheme="blue" isDisabled={isCreating}>
        Add Task
      </Button>
    </Flex>
    {error && <Text color="red.500">{error}</Text>}
  </Box>
);
