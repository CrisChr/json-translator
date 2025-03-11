"use client"
import { Upload, Languages, Sparkles, Download } from 'lucide-react'

interface WorkflowSectionProps {
  dict: {
    title: string
    description: string
    steps: {
      [key: string]: {
        title: string
        description: string
      }
    } | {
      title: string
      description: string
    }[]
  }
}

export function WorkflowSection({ dict }: WorkflowSectionProps) {
  const icons = [
    <Upload className="w-6 h-6" key="upload" />,
    <Languages className="w-6 h-6" key="languages" />,
    <Sparkles className="w-6 h-6" key="sparkles" />,
    <Download className="w-6 h-6" key="download" />
  ]

  // 处理 steps 可能是对象或数组的情况
  const steps = Array.isArray(dict.steps) 
    ? dict.steps 
    : Object.values(dict.steps)
  
  return (
    <section className="py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">
            {dict.title}
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {dict.description}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative group">
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 left-full w-full h-px bg-gray-200 -translate-y-1/2 z-0" />
              )}
              
              <div className="relative z-10 bg-white rounded-2xl p-6 h-full">
                <div className="flex justify-between items-start mb-4">
                  <div className="p-3 bg-blue-50 rounded-xl text-blue-600">
                    {icons[index]}
                  </div>
                  <span className="text-5xl font-bold text-gray-100">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  {step.title}
                </h3>
                <p className="text-gray-600">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
