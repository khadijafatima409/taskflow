import type { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
}

function Card({ children, className = '' }: CardProps) {
  return <div className={`rounded-lg border border-line bg-white ${className}`}>{children}</div>;
}

export default Card;
