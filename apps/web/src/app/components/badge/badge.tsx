import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { LucideIcon } from "lucide-react"

import { cn } from "@/app/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center justify-center gap-1  rounded-full border px-2 py-1 text-[10px] font-semibold transition-colors focus:outline-none  focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-green-100 text-green-800 hover:bg-green-300/80",
        secondary:
          "border-transparent bg-green-100 text-green-800 hover:bg-green-300/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground",
        success: "border-transparent bg-green-100 text-green-800 hover:bg-green-200/80",
        warning: "border-transparent bg-amber-100 text-amber-800 hover:bg-amber-200/80",
        info: "border-transparent bg-blue-100 text-blue-800 hover:bg-blue-200/80",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  icon?: LucideIcon
  iconClassName?: string
}

function Badge({ className, variant, icon: Icon, iconClassName, children, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props}>
      {Icon && <Icon className={cn("h-3 w-3", iconClassName)} />}
      {children}
    </div>
  )
}

export { Badge, badgeVariants }
