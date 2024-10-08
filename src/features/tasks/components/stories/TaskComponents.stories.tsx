import { Meta, StoryFn } from '@storybook/react';
import TodoList from '../TodoList';
import { FilterButtons } from '../FilterButtons';
import { TaskItem } from '../TaskItem';
import { TaskInput } from '../TaskInput';
import { Task, TaskFilter } from '../../interfaces/task';

export default {
  title: 'Task Components',
  tags: ['autodocs'],
  component: TodoList,
} as Meta<typeof TodoList>;

// TodoList Story
const TodoListTemplate: StoryFn<{ initialTasks: Task[] }> = args => <TodoList {...args} />;

export const DefaultTodoList = TodoListTemplate.bind({});
DefaultTodoList.args = {
  initialTasks: [
    {
      id: '1',
      title: 'Task 1',
      description: 'Description 1',
      createdAt: new Date().toISOString(),
      isComplete: false,
    },
    {
      id: '2',
      title: 'Task 2',
      description: 'Description 2',
      createdAt: new Date().toISOString(),
      isComplete: true,
    },
    {
      id: '3',
      title: 'Task 3',
      description: 'Description 3',
      createdAt: new Date().toISOString(),
      isComplete: false,
    },
  ],
};

// FilterButtons Story
const FilterButtonsTemplate: StoryFn<{
  currentFilter: TaskFilter;
  onFilterChange: (filter: TaskFilter) => void;
}> = args => <FilterButtons {...args} />;

export const DefaultFilterButtons = FilterButtonsTemplate.bind({});
DefaultFilterButtons.args = {
  currentFilter: TaskFilter.ALL,
  onFilterChange: filter => console.log(`Filter changed to: ${filter}`),
};

// TaskItem Story
const TaskItemTemplate: StoryFn<{
  task: Task;
  onToggle: (id: string) => void;
}> = args => <TaskItem {...args} />;

export const CompletedTaskItem = TaskItemTemplate.bind({});
CompletedTaskItem.args = {
  task: {
    id: '1',
    title: 'Completed Task',
    description: 'Description 1',
    createdAt: new Date().toISOString(),
    isComplete: true,
  },
  onToggle: id => console.log(`Task ${id} toggled`),
};

export const IncompleteTaskItem = TaskItemTemplate.bind({});
IncompleteTaskItem.args = {
  task: {
    id: '2',
    title: 'Incomplete Task',
    description: 'Description 2',
    createdAt: new Date().toISOString(),
    isComplete: false,
  },
  onToggle: id => console.log(`Task ${id} toggled`),
};

// TaskInput Story
const TaskInputTemplate: StoryFn<{
  value: string;
  onChange: (value: string) => void;
  onAdd: () => void;
  isCreating: boolean;
  error: string | null;
}> = args => <TaskInput {...args} />;

export const EmptyTaskInput = TaskInputTemplate.bind({});
EmptyTaskInput.args = {
  value: '',
  onChange: value => console.log(`Input changed to: ${value}`),
  onAdd: () => console.log('Add task clicked'),
  isCreating: false,
  error: null,
};

export const FilledTaskInput = TaskInputTemplate.bind({});
FilledTaskInput.args = {
  value: 'New task',
  onChange: value => console.log(`Input changed to: ${value}`),
  onAdd: () => console.log('Add task clicked'),
  isCreating: false,
  error: null,
};

export const TaskInputWithError = TaskInputTemplate.bind({});
TaskInputWithError.args = {
  value: '',
  onChange: value => console.log(`Input changed to: ${value}`),
  onAdd: () => console.log('Add task clicked'),
  isCreating: false,
  error: 'Task title cannot be empty',
};
