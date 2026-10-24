import { useState } from 'react';
import type { FormEvent } from 'react';
import {
  emptyFormValues,
  toTaskData,
  type TaskData,
  type TaskFormValues,
} from '../../../utils/taskForm';
import Card from '../../Card';
import { priorities, priorityLabels, statuses, statusLabels } from '../../../data/taskOptions';
import type { TaskPriority, TaskStatus } from '../../../types/task';
import type { TeamMember } from '../../../types/team';
import Button from '../../Button';

interface TaskFormProps {
  members: TeamMember[];
  onSubmit: (data: TaskData) => void;
  onCancel: () => void;
}

const inputClass =
  'mt-1 w-full rounded-md border border-line bg-white px-3 py-2 text-sm font-normal';

function TaskForm({ members, onSubmit, onCancel }: TaskFormProps) {
  const [values, setValues] = useState<TaskFormValues>(emptyFormValues);
  const [error, setError] = useState('');

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (values.title.trim() === '') {
      setError('Title is required.');
      return;
    }

    onSubmit(toTaskData(values));
  }

  return (
    <Card className="mb-6 p-4">
      <h2 className="mb-4 text-sm font-semibold">New task</h2>

      <form onSubmit={handleSubmit} className="grid gap-4 sm:grid-cols-2">
        <label className="text-sm font-medium sm:col-span-2">
          Title
          <input
            className={inputClass}
            value={values.title}
            onChange={(e) => setValues({ ...values, title: e.target.value })}
          />
        </label>

        <label className="text-sm font-medium sm:col-span-2">
          Description
          <textarea
            className={inputClass}
            rows={3}
            value={values.description}
            onChange={(e) => setValues({ ...values, description: e.target.value })}
          />
        </label>

        <label className="text-sm font-medium">
          Status
          <select
            className={inputClass}
            value={values.status}
            onChange={(e) => setValues({ ...values, status: e.target.value as TaskStatus })}
          >
            {statuses.map((status) => (
              <option key={status} value={status}>
                {statusLabels[status]}
              </option>
            ))}
          </select>
        </label>

        <label className="text-sm font-medium">
          Priority
          <select
            className={inputClass}
            value={values.priority}
            onChange={(e) => setValues({ ...values, priority: e.target.value as TaskPriority })}
          >
            {priorities.map((priority) => (
              <option key={priority} value={priority}>
                {priorityLabels[priority]}
              </option>
            ))}
          </select>
        </label>

        <label className="text-sm font-medium">
          Assignee
          <select
            className={inputClass}
            value={values.assigneeId}
            onChange={(e) => setValues({ ...values, assigneeId: e.target.value })}
          >
            <option value="">Unassigned</option>
            {members.map((member) => (
              <option key={member.id} value={member.id}>
                {member.name}
              </option>
            ))}
          </select>
        </label>

        <label className="text-sm font-medium">
          Due date
          <input
            type="date"
            className={inputClass}
            value={values.dueDate}
            onChange={(e) => setValues({ ...values, dueDate: e.target.value })}
          />
        </label>

        {error && <p className="text-sm text-overdue sm:col-span-2">{error}</p>}

        <div className="flex gap-2 sm:col-span-2">
          <Button type="submit" variant="primary">
            Save task
          </Button>
          <Button onClick={onCancel}>Cancel</Button>
        </div>
      </form>
    </Card>
  );
}

export default TaskForm;
