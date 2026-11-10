import * as React from 'react'

export function Card({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={`rounded-xl border border-border bg-card text-card-foreground ${className || ''}`} {...props}>
      {children}
    </div>
  )
}
