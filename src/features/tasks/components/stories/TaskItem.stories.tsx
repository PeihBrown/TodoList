import { Meta, StoryFn } from '@storybook/react';
import { TaskItem } from '../TaskItem';
import { Task } from '../../interfaces/task';

export default {
  title: 'Tasks/TaskItem',
  component: TaskItem,
  tags: ['autodocs'],
} as Meta<typeof TaskItem>;

const Template: StoryFn<{
  task: Task;
  onToggle: (id: string) => void;
}> = args => <TaskItem {...args} />;

export const Completed = Template.bind({});
Completed.args = {
  task: {
    id: '1',
    title: 'Completed Task',
    description: 'Description 1',
    createdAt: new Date().toISOString(),
    isComplete: true,
  },
  onToggle: id => console.log(`Task ${id} toggled`),
};

export const Incomplete = Template.bind({});
Incomplete.args = {
  task: {
    id: '2',
    title: 'Incomplete Task',
    description: 'Description 2',
    createdAt: new Date().toISOString(),
    isComplete: false,
  },
  onToggle: id => console.log(`Task ${id} toggled`),
};
