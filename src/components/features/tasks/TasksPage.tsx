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
}

function TasksPage({ tasks, onAdd }: TasksPageProps) {
  const [isFormOpen, setIsFormOpen] = useState(false);

  function handleAdd(data: TaskData) {
    onAdd(data);
    setIsFormOpen(false);
  }

  return (
    <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-semibold tracking-tight">Tasks</h1>
        {!isFormOpen && (
          <Button variant="primary" onClick={() => setIsFormOpen(true)}>
            New task
          </Button>
        )}
      </div>

      {isFormOpen && (
        <TaskForm members={seedTeam} onSubmit={handleAdd} onCancel={() => setIsFormOpen(false)} />
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
              </div>
            </li>
          ))}
        </ul>
      </Card>
    </main>
  );
}

export default TasksPage;
