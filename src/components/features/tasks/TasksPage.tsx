import { seedTasks } from '../../../data/seedTasks';
import { seedTeam } from '../../../data/seedTeam';
import {
  priorityLabels,
  priorityTones,
  statusLabels,
  statusTones,
} from '../../../data/taskOptions';
import Badge from '../../Badge';
import Card from '../../Card';

function TasksPage() {
  function getAssigneeName(assigneeId: string | null): string {
    const member = seedTeam.find((m) => m.id === assigneeId);
    return member ? member.name : 'Unassigned';
  }

  return (
    <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <h1 className="mb-6 text-2xl font-semibold tracking-tight">Tasks</h1>

      <Card>
        <ul className="divide-y divide-line">
          {seedTasks.map((task) => (
            <li
              key={task.id}
              className="flex flex-wrap items-center justify-between gap-3 px-4 py-3"
            >
              <div>
                <p className="text-sm font-medium">{task.title}</p>
                <p className="mt-0.5 text-xs text-muted">
                  {getAssigneeName(task.assigneeId)} · {task.dueDate ?? 'No due date'}
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
