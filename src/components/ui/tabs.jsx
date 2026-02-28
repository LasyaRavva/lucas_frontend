import * as TabsPrimitive from '@radix-ui/react-tabs'

import { cn } from '../../lib/utils'

function Tabs({ className, ...props }) {
  return <TabsPrimitive.Root className={cn('w-full', className)} {...props} />
}

function TabsList({ className, ...props }) {
  return (
    <TabsPrimitive.List
      className={cn(
        'inline-flex items-center gap-2 rounded-full border border-ink/10 bg-white/80 p-1 text-ink/70',
        className
      )}
      {...props}
    />
  )
}

function TabsTrigger({ className, ...props }) {
  return (
    <TabsPrimitive.Trigger
      className={cn(
        'rounded-full px-4 py-2 text-sm font-semibold transition data-[state=active]:bg-ink data-[state=active]:text-white',
        className
      )}
      {...props}
    />
  )
}

function TabsContent({ className, ...props }) {
  return (
    <TabsPrimitive.Content
      className={cn('mt-6 rounded-2xl border border-ink/10 bg-white/85 p-6', className)}
      {...props}
    />
  )
}

export { Tabs, TabsList, TabsTrigger, TabsContent }
