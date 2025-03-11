import { Code, Languages, Sparkles, Shield } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

interface FeaturesSectionProps {
  dict: {
    title: string
    items?: {
      title: string
      description: string
    }[] | {
      [key: string]: {
        title: string
        description: string
      }
    }
  }
}

export function FeaturesSection({ dict }: FeaturesSectionProps) {
  const icons = [
    <Code className="w-8 h-8" key="code" />,
    <Languages className="w-8 h-8" key="languages" />,
    <Sparkles className="w-8 h-8" key="sparkles" />,
    <Shield className="w-8 h-8" key="shield" />
  ]

  const features = Array.isArray(dict.items) 
    ? dict.items 
    : Object.values(dict.items || {})

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">
          {dict.title}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="border-none">
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 text-blue-600 mb-4">
                    {icons[index]}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
