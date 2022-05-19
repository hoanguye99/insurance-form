interface SectionProps {
  header: React.ReactNode
  children: React.ReactNode
  className?: string
}

export const Section = (props: SectionProps) => {
  return (
    <div className={props.className || 'pt-10 sm:pt-0'}>
      <div className="md:grid md:grid-cols-3 md:gap-6">
        <div className="md:col-span-1">
          <div className="px-4 sm:px-0">{props.header}</div>
        </div>
        <div className="mt-5 md:mt-0 md:col-span-2">{props.children}</div>
      </div>
    </div>
  )
}

export const Separator = () => {
  return (
    <div className="hidden sm:block " aria-hidden="true">
      <div className="py-5">
        <div className="border-t border-gray-200" />
      </div>
    </div>
  )
}
