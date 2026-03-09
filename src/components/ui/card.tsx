import { cn } from '@/lib/cn';
import { cva } from 'class-variance-authority';

const cardVariants = cva('rounded-2xl text-sm p-6 shadow-lg', {
  variants: {
    variant: {
      default: 'border bg-fd-card',
      secondary: 'bg-fd-primary/10 text-fd-primary-foreground',
      gradient: 'bg-gradient-to-br from-fd-primary/10 to-fd-muted/30',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'secondary' | 'gradient';
}

export function Card({ variant = 'default', className, ...props }: CardProps) {
  return (
    <div className={cn(cardVariants({ variant }), className)} {...props} />
  );
}
