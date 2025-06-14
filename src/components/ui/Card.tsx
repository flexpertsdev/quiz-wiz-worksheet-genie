import type { FC, HTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'bordered' | 'elevated'
}

export const Card: FC<CardProps> = ({
  className,
  variant = 'default',
  children,
  ...props
}) => {
  return (
    <div
      className={cn(
        'rounded-xl p-6',
        {
          'bg-white': variant === 'default',
          'bg-white border border-gray-200': variant === 'bordered',
          'bg-white shadow-lg hover:shadow-xl transition-shadow': variant === 'elevated',
        },
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export const CardHeader: FC<HTMLAttributes<HTMLDivElement>> = ({
  className,
  children,
  ...props
}) => {
  return (
    <div className={cn('mb-4', className)} {...props}>
      {children}
    </div>
  )
}

export const CardTitle: FC<HTMLAttributes<HTMLHeadingElement>> = ({
  className,
  children,
  ...props
}) => {
  return (
    <h3 className={cn('text-xl font-semibold text-gray-900', className)} {...props}>
      {children}
    </h3>
  )
}

export const CardContent: FC<HTMLAttributes<HTMLDivElement>> = ({
  className,
  children,
  ...props
}) => {
  return (
    <div className={cn('text-gray-600', className)} {...props}>
      {children}
    </div>
  )
}