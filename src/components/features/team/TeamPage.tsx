import Badge from '../../Badge';
import Card from '../../Card';
import { seedTeam } from '../../../data/seedTeam';
import { statuses, statusLabels, statusTones } from '../../../data/taskOptions';
import type { Task } from '../../../types/task';
import { getInitials } from '../../../utils/team';

interface TeamPageProps {
  tasks: Task[];
}

function TeamPage({ tasks }: TeamPageProps) {
  const unassignedCount = tasks.filter((task) => task.assigneeId === null).length;

  return (
    <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold tracking-tight">Team</h1>
        <p className="mt-1 text-sm text-muted">
          {seedTeam.length} members · {unassignedCount} unassigned tasks
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {seedTeam.map((member) => {
          const memberTasks = tasks.filter((task) => task.assigneeId === member.id);

          return (
            <Card key={member.id} className="p-4">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-soft text-sm font-semibold text-primary">
                    {getInitials(member.name)}
                  </span>
                  <div>
                    <p className="text-sm font-semibold">{member.name}</p>
                    <p className="text-xs text-muted">{member.role}</p>
                  </div>
                </div>
                <span className="text-xs text-muted">{memberTasks.length} tasks</span>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                {statuses.map((status) => {
                  const count = memberTasks.filter((task) => task.status === status).length;
                  return (
                    <Badge key={status} tone={statusTones[status]}>
                      {statusLabels[status]}: {count}
                    </Badge>
                  );
                })}
              </div>
            </Card>
          );
        })}
      </div>
    </main>
  );
}

export default TeamPage;
