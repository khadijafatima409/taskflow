import { seedTasks } from '../data/seedTasks';
import type { Task } from '../types/task';

const STORAGE_KEY = 'taskflow.tasks';

export function loadTasks(): Task[] {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved === null) {
    return seedTasks;
  }

  try {
    return JSON.parse(saved) as Task[];
  } catch {
    return seedTasks;
  }
}

export function saveTasks(tasks: Task[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}
