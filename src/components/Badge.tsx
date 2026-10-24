import type { ReactNode } from 'react';

export type BadgeTone = 'gray' | 'blue' | 'green' | 'red';

interface BadgeProps {
  children: ReactNode;
  tone?: BadgeTone;
}

const toneClasses: Record<BadgeTone, string> = {
  gray: 'bg-todo/10 text-todo',
  blue: 'bg-progress/10 text-progress',
  green: 'bg-done/10 text-done',
  red: 'bg-overdue/10 text-overdue',
};

function Badge({ children, tone = 'gray' }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${toneClasses[tone]}`}
    >
      {children}
    </span>
  );
}

export default Badge;
