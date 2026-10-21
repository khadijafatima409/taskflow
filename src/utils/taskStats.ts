import type { DatedTask, Task, TaskStatus } from '../types/task';
import { todayKey } from './date';

export interface TaskStats {
  total: number;
  completed: number;
  pending: number;
  overdue: number;
  completionRate: number;
}

// Overdue = not done AND has a due date AND that date is before today
export function isOverdue(task: Task, today: string = todayKey()): task is DatedTask {
  return task.status !== 'done' && task.dueDate !== null && task.dueDate < today;
}

export function countByStatus(tasks: Task[]): Record<TaskStatus, number> {
  return tasks.reduce<Record<TaskStatus, number>>(
    (counts, task) => ({ ...counts, [task.status]: counts[task.status] + 1 }),
    { todo: 0, 'in-progress': 0, done: 0 },
  );
}

export function getTaskStats(tasks: Task[], today: string = todayKey()): TaskStats {
  const byStatus = countByStatus(tasks);
  const total = tasks.length;
  const completed = byStatus.done;
  const pending = byStatus.todo + byStatus['in-progress'];
  const overdue = tasks.filter((task) => isOverdue(task, today)).length;
  const completionRate = total === 0 ? 0 : Math.round((completed / total) * 100);

  return { total, completed, pending, overdue, completionRate };
}

export function getOverdueTasks(tasks: Task[], today: string = todayKey()): DatedTask[] {
  return tasks
    .filter((task): task is DatedTask => isOverdue(task, today))
    .sort((a, b) => a.dueDate.localeCompare(b.dueDate));
}
