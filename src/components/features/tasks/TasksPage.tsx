import { useState } from 'react';
import Badge from '../../../components/Badge';
import Button from '../../../components/Button';
import Card from '../../../components/Card';
import { seedTeam } from '../../../data/seedTeam';
import {
  priorityLabels,
  priorityTones,
  statusLabels,
  statusTones,
  statuses,
} from '../../../data/taskOptions';
import type { Task, TaskStatus } from '../../../types/task';
import type { TaskData } from '../../../utils/taskForm';
import { getMemberName } from '../../../utils/team';
import TaskForm from './TaskForm';

interface TasksPageProps {
  tasks: Task[];
  onAdd: (data: TaskData) => void;
  onUpdate: (id: string, data: TaskData) => void;
  onDelete: (id: string) => void;
}

function TasksPage({ tasks, onAdd, onUpdate, onDelete }: TasksPageProps) {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<TaskStatus | 'all'>('all');

  const visibleTasks = tasks.filter((task) => {
    const matchesSearch = task.title.toLowerCase().includes(search.trim().toLowerCase());
    const matchesStatus = statusFilter === 'all' || task.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  function openNewForm() {
    setEditingTask(null);
    setIsFormOpen(true);
  }

  function openEditForm(task: Task) {
    setEditingTask(task);
    setIsFormOpen(true);
  }

  function closeForm() {
    setEditingTask(null);
    setIsFormOpen(false);
  }

  function handleSubmit(data: TaskData) {
    if (editingTask) {
      onUpdate(editingTask.id, data);
    } else {
      onAdd(data);
    }
    closeForm();
  }

  function handleDelete(task: Task) {
    if (window.confirm(`Delete "${task.title}"?`)) {
      onDelete(task.id);
      if (editingTask?.id === task.id) {
        closeForm();
      }
    }
  }

  return (
    <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-semibold tracking-tight">Tasks</h1>
        {!isFormOpen && (
          <Button variant="primary" onClick={openNewForm}>
            New task
          </Button>
        )}
      </div>

      {isFormOpen && (
        <TaskForm
          key={editingTask ? editingTask.id : 'new'}
          task={editingTask}
          members={seedTeam}
          onSubmit={handleSubmit}
          onCancel={closeForm}
        />
      )}

      <div className="mb-4 flex flex-wrap gap-3">
        <input
          className="w-full rounded-md border border-line bg-white px-3 py-2 text-sm sm:w-64"
          placeholder="Search by title"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className="rounded-md border border-line bg-white px-3 py-2 text-sm"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as TaskStatus | 'all')}
        >
          <option value="all">All statuses</option>
          {statuses.map((status) => (
            <option key={status} value={status}>
              {statusLabels[status]}
            </option>
          ))}
        </select>
      </div>

      <Card>
        {visibleTasks.length === 0 ? (
          <p className="px-4 py-6 text-sm text-muted">
            {tasks.length === 0
              ? 'No tasks yet. Create your first one.'
              : 'No tasks match your search.'}
          </p>
        ) : (
          <ul className="divide-y divide-line">
            {visibleTasks.map((task) => (
              <li
                key={task.id}
                className="flex flex-wrap items-center justify-between gap-3 px-4 py-3"
              >
                <div>
                  <p className="text-sm font-medium">{task.title}</p>
                  <p className="mt-0.5 text-xs text-muted">
                    {getMemberName(seedTeam, task.assigneeId)} · {task.dueDate ?? 'No due date'}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge tone={priorityTones[task.priority]}>{priorityLabels[task.priority]}</Badge>
                  <Badge tone={statusTones[task.status]}>{statusLabels[task.status]}</Badge>
                  <Button onClick={() => openEditForm(task)}>Edit</Button>
                  <Button variant="danger" onClick={() => handleDelete(task)}>
                    Delete
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </Card>
    </main>
  );
}

export default TasksPage;
