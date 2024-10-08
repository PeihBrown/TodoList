import { Meta, StoryFn } from '@storybook/react';
import { FilterButtons } from '../FilterButtons';
import { TaskFilter } from '../../interfaces/task';

export default {
  title: 'Tasks/FilterButtons',
  component: FilterButtons,
  tags: ['autodocs'],
} as Meta<typeof FilterButtons>;

const Template: StoryFn<{
  currentFilter: TaskFilter;
  onFilterChange: (filter: TaskFilter) => void;
}> = args => <FilterButtons {...args} />;

export const Default = Template.bind({});
Default.args = {
  currentFilter: TaskFilter.ALL,
  onFilterChange: filter => console.log(`Filter changed to: ${filter}`),
};
