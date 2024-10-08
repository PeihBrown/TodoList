import { Meta, StoryFn } from '@storybook/react';
import { TaskInput } from '../TaskInput';

export default {
  title: 'Tasks/TaskInput',
  component: TaskInput,
  tags: ['autodocs'],
} as Meta<typeof TaskInput>;

const Template: StoryFn<{
  value: string;
  onChange: (value: string) => void;
  onAdd: () => void;
  isCreating: boolean;
  error: string | null;
}> = args => <TaskInput {...args} />;

export const Empty = Template.bind({});
Empty.args = {
  value: '',
  onChange: value => console.log(`Input changed to: ${value}`),
  onAdd: () => console.log('Add task clicked'),
  isCreating: false,
  error: null,
};

export const Filled = Template.bind({});
Filled.args = {
  value: 'New task',
  onChange: value => console.log(`Input changed to: ${value}`),
  onAdd: () => console.log('Add task clicked'),
  isCreating: false,
  error: null,
};

export const WithError = Template.bind({});
WithError.args = {
  value: '',
  onChange: value => console.log(`Input changed to: ${value}`),
  onAdd: () => console.log('Add task clicked'),
  isCreating: false,
  error: 'Task title cannot be empty',
};
