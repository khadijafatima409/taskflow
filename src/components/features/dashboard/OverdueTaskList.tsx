import Badge from '../../Badge';
import Card from '../../Card';
import type { DatedTask } from '../../../types/task';
import type { TeamMember } from '../../../types/team';
import { daysBetween, formatDateKey } from '../../../utils/date';

interface OverdueTaskListProps {
  tasks: DatedTask[];
  members: TeamMember[];
  today: string;
}

function OverdueTaskList({ tasks, members, today }: OverdueTaskListProps) {
  // Build the lookup once: member id -> member (O(1) get instead of find() per task)
  const memberById = new Map(members.map((member) => [member.id, member]));

  const getAssigneeName = (assigneeId: string | null): string => {
    if (assigneeId === null) return 'Unassigned';
    return memberById.get(assigneeId)?.name ?? 'Unknown member';
  };

  return (
    <Card>
      <div className="flex items-center justify-between border-b border-line px-4 py-3">
        <h2 className="text-sm font-semibold">Overdue tasks</h2>
        <span className="text-xs text-muted">{tasks.length}</span>
      </div>

      {tasks.length === 0 ? (
        <p className="px-4 py-6 text-sm text-muted">No overdue tasks.</p>
      ) : (
        <ul className="divide-y divide-line">
          {tasks.map((task) => {
            const daysLate = daysBetween(task.dueDate, today);

            return (
              <li key={task.id} className="flex items-center justify-between gap-4 px-4 py-3">
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium">{task.title}</p>
                  <p className="mt-0.5 text-xs text-muted">
                    {getAssigneeName(task.assigneeId)} · Due {formatDateKey(task.dueDate)} ·{' '}
                    <span className="capitalize">{task.priority}</span> priority
                  </p>
                </div>
                <Badge tone="overdue">
                  {daysLate} {daysLate === 1 ? 'day' : 'days'} late
                </Badge>
              </li>
            );
          })}
        </ul>
      )}
    </Card>
  );
}

export default OverdueTaskList;
