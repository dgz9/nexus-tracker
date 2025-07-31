'use client'

export default function DebugPage() {
  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold mb-8">Debug HeroUI Styles</h1>
      
      {/* Basic Tailwind test */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Tailwind CSS Test</h2>
        <div className="bg-blue-500 text-white p-4 rounded">
          This should have blue background
        </div>
      </div>

      {/* HeroUI Button test without client component */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">HeroUI Classes Test</h2>
        <button className="z-0 group relative inline-flex items-center justify-center box-border appearance-none select-none whitespace-nowrap font-normal subpixel-antialiased overflow-hidden tap-highlight-transparent data-[pressed=true]:scale-[0.97] outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 px-unit-4 min-w-unit-20 h-unit-10 text-small gap-unit-2 rounded-medium [&>svg]:max-w-[theme(spacing.unit-8)] transition-transform-colors-opacity motion-reduce:transition-none bg-primary text-primary-foreground data-[hover=true]:opacity-hover">
          Manual HeroUI Button
        </button>
      </div>

      {/* Check if HeroUI CSS variables exist */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">CSS Variables Check</h2>
        <div className="space-y-2">
          <div style={{color: 'var(--heroui-primary)'}}>Primary color (should be visible if CSS vars loaded)</div>
          <div style={{backgroundColor: 'var(--heroui-primary)', color: 'white'}} className="p-2 rounded">
            Primary background
          </div>
        </div>
      </div>

      {/* Direct style test */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Component Import Test</h2>
        <div className="space-y-4">
          <div className="p-4 bg-gray-100 rounded">
            <p>If you see this page styled correctly, Tailwind CSS is working.</p>
            <p>Check the browser console for any errors.</p>
          </div>
        </div>
      </div>
    </div>
  )
}