import Card from '../../../components/Card';
import { statuses, statusLabels } from '../../../data/taskOptions';
import type { Task } from '../../../types/task';
import { seedTeam } from '../../../data/seedTeam';
import { getMemberName } from '../../../utils/team';
import BoardCard from './BoardCard';

interface BoardPageProps {
  tasks: Task[];
}

function BoardPage({ tasks }: BoardPageProps) {
  return (
    <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <h1 className="mb-6 text-2xl font-semibold tracking-tight">Board</h1>

      <div className="grid gap-4 md:grid-cols-3">
        {statuses.map((status) => {
          const columnTasks = tasks.filter((task) => task.status === status);

          return (
            <Card key={status} className="p-3">
              <div className="mb-3 flex items-center justify-between">
                <h2 className="text-sm font-semibold">{statusLabels[status]}</h2>
                <span className="text-xs text-muted">{columnTasks.length}</span>
              </div>

              {columnTasks.length === 0 && <p className="text-xs text-muted">No tasks</p>}

              <ul className="space-y-2">
                {columnTasks.map((task) => (
                  <BoardCard
                    key={task.id}
                    task={task}
                    assigneeName={getMemberName(seedTeam, task.assigneeId)}
                  />
                ))}
              </ul>
            </Card>
          );
        })}
      </div>
    </main>
  );
}

export default BoardPage;
