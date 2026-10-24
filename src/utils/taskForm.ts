import type { Task, TaskPriority, TaskStatus } from '../types/task';

// What the form holds while the user types (inputs always give text)
export interface TaskFormValues {
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  assigneeId: string; // '' means unassigned
  dueDate: string; // '' means no due date
}

// A task without its id (App creates the id)
export type TaskData = Omit<Task, 'id'>;

export const emptyFormValues: TaskFormValues = {
  title: '',
  description: '',
  status: 'todo',
  priority: 'medium',
  assigneeId: '',
  dueDate: '',
};

// Convert form text into the Task shape
export function toTaskData(values: TaskFormValues): TaskData {
  return {
    title: values.title.trim(),
    description: values.description.trim() || undefined,
    status: values.status,
    priority: values.priority,
    assigneeId: values.assigneeId || null,
    dueDate: values.dueDate || null,
  };
}
