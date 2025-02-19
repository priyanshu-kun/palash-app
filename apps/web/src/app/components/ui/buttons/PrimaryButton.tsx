import * as React from "react"
import { cn } from "@/app/lib/utils"
import { Button, type ButtonProps } from "@/app/components/ui/Button"

const PrimaryButton = React.forwardRef<HTMLButtonElement, ButtonProps>(({ className, ...props }, ref) => {
  return (
    <Button
      ref={ref}
      className={cn(
        "rounded-full bg-[#012b2b] hover:bg-[#012b2b]/90 text-white transition-colors",
        "disabled:bg-[#012b2b]/50",
        className,
      )}
      {...props}
    />
  )
})
PrimaryButton.displayName = "PrimaryButton"

export { PrimaryButton }

