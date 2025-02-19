import * as React from "react"
import { cn } from "@/app/lib/utils"
import { Button, type ButtonProps } from "@/app/components/ui/Button"

const SecondaryButton = React.forwardRef<HTMLButtonElement, ButtonProps>(({ className, ...props }, ref) => {
  return (
    <Button
      ref={ref}
      variant="outline"
      className={cn(
        "rounded-full border-2 border-[#012b2b] bg-transparent text-[#012b2b]",
        "hover:bg-[#012b2b]/10 hover:text-[#012b2b]",
        "disabled:border-[#012b2b]/50 disabled:text-[#012b2b]/50",
        className,
      )}
      {...props}
    />
  )
})
SecondaryButton.displayName = "SecondaryButton"

export { SecondaryButton }
