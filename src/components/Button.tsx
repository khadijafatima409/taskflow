import type { ButtonHTMLAttributes } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'danger';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary: 'bg-primary text-white hover:bg-primary/90',
  secondary: 'border border-line bg-white text-ink hover:bg-canvas',
  danger: 'border border-line bg-white text-overdue hover:bg-overdue/10',
};

function Button({ variant = 'secondary', type = 'button', className = '', ...rest }: ButtonProps) {
  return (
    <button
      type={type}
      className={`rounded-md px-3 py-1.5 text-sm font-medium ${variantClasses[variant]} ${className}`}
      {...rest}
    />
  );
}

export default Button;
