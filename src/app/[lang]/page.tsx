import { getDictionary } from '@/lib/getDictionary'
import { HeroSection } from '@/components/sections/HeroSection'
import { JsonPreview } from '@/components/JsonPreview'
import { FileUpload } from '@/components/FileUpload'
import { TranslatePanel } from '@/components/TranslatePanel'
import { FileIcon, Languages } from 'lucide-react'
import { WorkflowSection } from '@/components/sections/WorkflowSection'
import { FeaturesSection } from '@/components/sections/FeaturesSection' 
import { CTASection } from '@/components/sections/CTASection'
import FAQ from '@/components/sections/FAQ'

export default async function Home({
  params,
}: {
  params: { lang: string }
}) {
  const lang = await params.lang
  const dict = await getDictionary(lang)
  
  return (
    <div className="min-h-screen bg-background">
      <HeroSection dict={dict.hero} />
      <main className="relative">
        <div className="container mx-auto p-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
              <div className="md:col-span-4 space-y-4">
                <div className="border border-border rounded-3xl p-4 md:p-6 transition-all duration-300 bg-white/90 backdrop-blur-sm">
                  <h2 className="text-lg md:text-xl font-semibold pb-4 flex items-center gap-2">
                    <FileIcon className="w-5 h-5" />
                    {dict.uploadSection.title}
                  </h2>
                  <FileUpload dict={dict.uploadSection} />
                </div>

                <div className="border border-border rounded-3xl p-4 md:p-6 transition-all duration-300 bg-white/90 backdrop-blur-sm">
                  <h2 className="text-lg md:text-xl font-semibold flex items-center gap-2">
                    <Languages className="w-5 h-5" />
                    {dict.translateSection.title}
                  </h2>
                  <p className="text-sm text-muted-foreground pb-4">
                    {dict.translateSection.description}
                  </p>
                  <TranslatePanel dict={{
                    translatePanel: dict.translatePanel,
                    jsonPreview: {
                      languages: dict.jsonPreview.languages
                    }
                  }} />
                </div>
              </div>

              <div className="md:col-span-8">
                <div className="w-full">
                  <JsonPreview dict={{
                    jsonPreview: dict.jsonPreview as {
                      originalJson: string;
                      translatedJson: string;
                      tips: string;
                      placeholder: {
                        upload: string;
                        translation: string;
                      };
                      actions: {
                        copy: string;
                        download: string;
                        downloadAll: string;
                        downloadFormat: string;
                      };
                      toast: {
                        copySuccess: string;
                        copyError: string;
                        downloadSuccess: string;
                        downloadAllSuccess: string;
                        downloadError: string;
                      };
                      languages: Record<string, string>;
                    }
                  }} />
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <WorkflowSection dict={dict.workflow} />
        <FeaturesSection dict={dict.features} />
        <FAQ dict={dict.faq} />
        <CTASection dict={dict.cta} />
      </main>
    </div>
  )
}
