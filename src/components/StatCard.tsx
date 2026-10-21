import Card from './Card';

type StatTone = 'default' | 'done' | 'progress' | 'overdue';

interface StatCardProps {
  label: string;
  value: number | string;
  hint?: string;
  tone?: StatTone;
}

// Full class names on purpose: Tailwind only generates classes it can find written in the code
const toneClasses: Record<StatTone, string> = {
  default: 'text-ink',
  done: 'text-done',
  progress: 'text-progress',
  overdue: 'text-overdue',
};

function StatCard({ label, value, hint, tone = 'default' }: StatCardProps) {
  return (
    <Card className="p-4">
      <p className="text-xs font-medium tracking-wide text-muted uppercase">{label}</p>
      <p className={`mt-2 text-3xl font-semibold tabular-nums ${toneClasses[tone]}`}>{value}</p>
      {hint && <p className="mt-1 text-xs text-muted">{hint}</p>}
    </Card>
  );
}

export default StatCard;
