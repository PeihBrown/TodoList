import { Button, HStack } from '@chakra-ui/react';
import { TaskFilter } from '@/features/tasks/interfaces/task';

interface FilterButtonsProps {
  currentFilter: TaskFilter;
  onFilterChange: (filter: TaskFilter) => void;
}

export const FilterButtons: React.FC<FilterButtonsProps> = ({ currentFilter, onFilterChange }) => (
  <HStack spacing={2} mb={4}>
    {Object.values(TaskFilter).map(filter => (
      <Button
        key={filter}
        onClick={() => onFilterChange(filter)}
        colorScheme={currentFilter === filter ? 'blue' : 'gray'}
        size="sm"
      >
        {filter.charAt(0).toUpperCase() + filter.slice(1)}
      </Button>
    ))}
  </HStack>
);
