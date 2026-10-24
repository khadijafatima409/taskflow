import StatCard from '../../StatCard';
import { seedTeam } from '../../../data/seedTeam';
import { getTaskStats, isOverdue } from '../../../utils/taskStats';
import OverdueTaskList from './OverdueTaskList';
import type { Task } from '../../../types/task';

interface DashboardPageProps {
  tasks: Task[];
}

function DashboardPage({ tasks }: DashboardPageProps) {
  const today = new Date().toISOString().slice(0, 10);
  const stats = getTaskStats(tasks, today);
  const overdueTasks = tasks.filter((task) => isOverdue(task, today));

  return (
    <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <header className="mb-6">
        <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
        <p className="mt-1 text-sm text-muted">Overview of all tasks across the team.</p>
      </header>

      <section className="grid grid-cols-2 gap-4 lg:grid-cols-5">
        <StatCard label="Total tasks" value={stats.total} />
        <StatCard label="Completed" value={stats.completed} tone="done" />
        <StatCard label="Pending" value={stats.pending} tone="progress" />
        <StatCard label="Overdue" value={stats.overdue} tone="overdue" />
        <StatCard label="Completion" value={`${stats.completionRate}%`} />
      </section>

      <section className="mt-8">
        <OverdueTaskList tasks={overdueTasks} members={seedTeam} />
      </section>
    </main>
  );
}

export default DashboardPage;
