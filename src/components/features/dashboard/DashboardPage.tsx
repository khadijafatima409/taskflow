import StatCard from '../../StatCard';
import { seedTasks } from '../../../data/seedTasks';
import { todayKey } from '../../../utils/date';
import { getTaskStats } from '../../../utils/taskStats';

function DashboardPage() {
  const today = todayKey();
  const stats = getTaskStats(seedTasks, today);

  return (
    <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <header className="mb-6">
        <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
        <p className="mt-1 text-sm text-muted">Overview of all tasks across the team.</p>
      </header>

      <section aria-label="Task statistics" className="grid grid-cols-2 gap-4 lg:grid-cols-5">
        <StatCard label="Total tasks" value={stats.total} />
        <StatCard label="Completed" value={stats.completed} tone="done" />
        <StatCard
          label="Pending"
          value={stats.pending}
          tone="progress"
          hint="To do + in progress"
        />
        <StatCard
          label="Overdue"
          value={stats.overdue}
          tone={stats.overdue > 0 ? 'overdue' : 'default'}
        />
        <StatCard
          label="Completion"
          value={`${stats.completionRate}%`}
          hint={`${stats.completed} of ${stats.total} done`}
        />
      </section>
    </main>
  );
}

export default DashboardPage;
