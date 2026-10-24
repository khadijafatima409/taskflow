import type { BadgeTone } from '../components/Badge';
import type { TaskPriority, TaskStatus } from '../types/task';

export const statuses: TaskStatus[] = ['todo', 'in-progress', 'done'];
export const priorities: TaskPriority[] = ['low', 'medium', 'high'];

export const statusLabels: Record<TaskStatus, string> = {
  todo: 'To do',
  'in-progress': 'In progress',
  done: 'Done',
};

export const priorityLabels: Record<TaskPriority, string> = {
  low: 'Low',
  medium: 'Medium',
  high: 'High',
};

export const statusTones: Record<TaskStatus, BadgeTone> = {
  todo: 'gray',
  'in-progress': 'blue',
  done: 'green',
};

export const priorityTones: Record<TaskPriority, BadgeTone> = {
  low: 'gray',
  medium: 'blue',
  high: 'red',
};
