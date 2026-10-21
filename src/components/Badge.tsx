import type { ReactNode } from 'react';

type BadgeTone = 'neutral' | 'progress' | 'done' | 'overdue';

interface BadgeProps {
  children: ReactNode;
  tone?: BadgeTone;
}

const toneClasses: Record<BadgeTone, string> = {
  neutral: 'bg-todo/10 text-todo',
  progress: 'bg-progress/10 text-progress',
  done: 'bg-done/10 text-done',
  overdue: 'bg-overdue/10 text-overdue',
};

function Badge({ children, tone = 'neutral' }: BadgeProps) {
  return (
    <span
      className={`inline-flex shrink-0 items-center rounded-full px-2 py-0.5 text-xs font-medium ${toneClasses[tone]}`}
    >
      {children}
    </span>
  );
}

export default Badge;
