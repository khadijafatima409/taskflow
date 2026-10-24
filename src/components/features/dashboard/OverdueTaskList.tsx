import Card from '../../Card';
import type { Task } from '../../../types/task';
import type { TeamMember } from '../../../types/team';
import { getMemberName } from '../../../utils/team';

interface OverdueTaskListProps {
  tasks: Task[];
  members: TeamMember[];
}

function OverdueTaskList({ tasks, members }: OverdueTaskListProps) {
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
          {tasks.map((task) => (
            <li key={task.id} className="flex items-center justify-between gap-4 px-4 py-3">
              <div>
                <p className="text-sm font-medium">{task.title}</p>
                <p className="mt-0.5 text-xs text-muted">
                  {getMemberName(members, task.assigneeId)}
                </p>
              </div>
              <span className="text-xs font-medium text-overdue">Due {task.dueDate}</span>
            </li>
          ))}
        </ul>
      )}
    </Card>
  );
}

export default OverdueTaskList;
