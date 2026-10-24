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
} from '../../../data/taskOptions';
import type { Task } from '../../../types/task';
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

      <Card>
        <ul className="divide-y divide-line">
          {tasks.map((task) => (
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
      </Card>
    </main>
  );
}

export default TasksPage;
