import * as React from "react"
import * as AccordionPrimitive from "@radix-ui/react-accordion"
import { ChevronDownIcon } from "lucide-react"
import { cva } from "class-variance-authority"
import { cn } from "@/lib/utils"

const accordionTriggerStyle = cva(
    "group flex w-full items-center justify-between px-4 py-3 text-sm font-medium transition-all hover:bg-gray-800/50 hover:text-purple-600"
)

function Accordion(props: React.ComponentProps<typeof AccordionPrimitive.Root>) {
  return <AccordionPrimitive.Root {...props} />
}

function AccordionItem(props: React.ComponentProps<typeof AccordionPrimitive.Item>) {
  return (
    <AccordionPrimitive.Item
      className={cn(
        "border-b last:border-none focus-within:relative focus-within:z-10",
        props.className
      )}
      {...props}
    />
  )
}

function AccordionTrigger({
  children,
  className,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Trigger>) {
  return (
    <AccordionPrimitive.Header className="flex w-full">
      <AccordionPrimitive.Trigger
        className={cn(
          accordionTriggerStyle(),
          className,
          // border bawah saat open
          "data-[state=open]:border-b data-[state=open]:border-gray-200"
        )}
        {...props}
      >
        {children}
        <ChevronDownIcon
          className="ml-2 h-4 w-4 shrink-0 transition-transform duration-300 group-data-[state=open]:rotate-180"
          aria-hidden="true"
        />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  )
}


function AccordionContent({
  children,
  className,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Content>) {
  return (
    <AccordionPrimitive.Content
      className={cn(
        "overflow-hidden text-sm transition-all data-[state=closed]:animate-slideUp data-[state=open]:animate-slideDown",
        className
      )}
      {...props}
    >
      <div className="px-4 py-3 bg-gray-700">{children}</div>
    </AccordionPrimitive.Content>
  )
}

type AccordionItemWrapperProps = {
  children: React.ReactNode
  className?: string
}

function AccordionItemWrapper({ children, className }: AccordionItemWrapperProps) {
  return (
    <div
      className={cn(
        "transition-all group-data-[state=open]:border-2 group-data-[state=open]:border-white",
        className
      )}
    >
      {children}
    </div>
  )
}



export {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
  accordionTriggerStyle,
  AccordionItemWrapper
}
