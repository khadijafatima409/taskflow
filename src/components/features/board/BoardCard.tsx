import Badge from '../../Badge';
import { priorityLabels, priorityTones } from '../../../data/taskOptions';
import type { Task } from '../../../types/task';

interface BoardCardProps {
  task: Task;
  assigneeName: string;
}

function BoardCard({ task, assigneeName }: BoardCardProps) {
  return (
    <li
      draggable
      onDragStart={(e) => e.dataTransfer.setData('text/plain', task.id)}
      className="cursor-grab rounded-md border border-line bg-canvas p-3 active:cursor-grabbing"
    >
      <p className="text-sm font-medium">{task.title}</p>
      <p className="mt-1 text-xs text-muted">
        {assigneeName} · {task.dueDate ?? 'No due date'}
      </p>
      <div className="mt-2">
        <Badge tone={priorityTones[task.priority]}>{priorityLabels[task.priority]}</Badge>
      </div>
    </li>
  );
}

export default BoardCard;
