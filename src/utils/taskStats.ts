import type { Task } from '../types/task';

// Overdue = not done AND has a due date AND that date is before today
export function isOverdue(task: Task, today: string): boolean {
  return task.status !== 'done' && task.dueDate !== null && task.dueDate < today;
}

export function getTaskStats(tasks: Task[], today: string) {
  const total = tasks.length;
  const completed = tasks.filter((task) => task.status === 'done').length;
  const pending = total - completed;
  const overdue = tasks.filter((task) => isOverdue(task, today)).length;
  const completionRate = total === 0 ? 0 : Math.round((completed / total) * 100);

  return { total, completed, pending, overdue, completionRate };
}
