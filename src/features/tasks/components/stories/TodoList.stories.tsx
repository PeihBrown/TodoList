import { Meta, StoryFn } from '@storybook/react';
import TodoList from '../TodoList';
import { Task } from '../../interfaces/task';

export default {
  title: 'Tasks/TodoList',
  component: TodoList,
  tags: ['autodocs'],
} as Meta<typeof TodoList>;

const Template: StoryFn<{ initialTasks: Task[] }> = args => <TodoList {...args} />;

export const Default = Template.bind({});
Default.args = {
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
