import type { DragEvent } from 'react';
import Card from '../../Card';
import { seedTeam } from '../../../data/seedTeam';
import { statuses, statusLabels } from '../../../data/taskOptions';
import type { Task, TaskStatus } from '../../../types/task';
import { getMemberName } from '../../../utils/team';
import BoardCard from './BoardCard';

interface BoardPageProps {
  tasks: Task[];
  onMove: (id: string, status: TaskStatus) => void;
}

function BoardPage({ tasks, onMove }: BoardPageProps) {
  function handleDrop(event: DragEvent<HTMLDivElement>, status: TaskStatus) {
    event.preventDefault();
    const taskId = event.dataTransfer.getData('text/plain');
    if (taskId) {
      onMove(taskId, status);
    }
  }

  return (
    <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <h1 className="mb-6 text-2xl font-semibold tracking-tight">Board</h1>

      <div className="grid gap-4 md:grid-cols-3">
        {statuses.map((status) => {
          const columnTasks = tasks.filter((task) => task.status === status);

          return (
            <div
              key={status}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => handleDrop(e, status)}
            >
              <Card className="h-full min-h-40 p-3">
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
            </div>
          );
        })}
      </div>
    </main>
  );
}

export default BoardPage;
