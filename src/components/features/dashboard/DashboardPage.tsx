import StatCard from '../../StatCard';

function DashboardPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <header className="mb-6">
        <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
        <p className="mt-1 text-sm text-muted">Overview of all tasks across the team.</p>
      </header>

      <section aria-label="Task statistics" className="grid grid-cols-2 gap-4 lg:grid-cols-5">
        <StatCard label="Total tasks" value={10} />
        <StatCard label="Completed" value={4} tone="done" />
        <StatCard label="Pending" value={6} tone="progress" hint="To do + in progress" />
        <StatCard label="Overdue" value={3} tone="overdue" />
        <StatCard label="Completion" value="40%" hint="4 of 10 done" />
      </section>
    </main>
  );
}

export default DashboardPage;
