import { Sparkles } from 'lucide-react'

interface HeroSectionProps {
  dict: {
    badge: string;
    title: string;
    description: string;
    features: {
      multilanguage: string;
      realtime: string;
    }
  }
}

export const HeroSection = ({ dict }: HeroSectionProps) => {
  return (
    <section className="relative">
      <div className="absolute inset-0 h-[500px] bg-gradient-to-br from-blue-600 via-blue-500 to-blue-400/50" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center space-y-4 md:space-y-6 pt-24 pb-8 md:py-12">
          <div className="inline-block animate-bounce-slow">
            <span className="px-4 md:px-6 py-1.5 md:py-2 bg-white/10 rounded-full text-xs md:text-sm font-medium text-white flex items-center gap-2">
              <Sparkles className="w-3 h-3 md:w-4 md:h-4 animate-pulse" />
              {dict.badge}
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white">
            {dict.title}
          </h1>
          <p className="text-base md:text-xl text-white/80 max-w-2xl mx-auto px-4 md:px-0">
            {dict.description}
          </p>
          <div className="pt-4 flex justify-center">
            <a href="https://www.producthunt.com/products/i18n-translator-by-ai?embed=true&utm_source=badge-featured&utm_medium=badge&utm_source=badge-i18n-translator-by-ai" target="_blank"><img src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=1002973&theme=light&t=1754627927606" alt="i18n Translator by AI - Translate i18n JSON file by AI | Product Hunt" style={{width: '250px', height: '54px'}} width="250" height="54" /></a>
          </div>
          <div className="flex flex-col md:flex-row items-center justify-center gap-3 md:gap-6 pt-2 md:pt-4">
            <div className="flex items-center space-x-2 text-xs md:text-sm text-white/90">
              <svg className="w-3 h-3 md:w-4 md:h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"/>
                <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd"/>
              </svg>
              <span>{dict.features.multilanguage}</span>
            </div>
            <div className="flex items-center space-x-2 text-xs md:text-sm text-white/90">
              <svg className="w-3 h-3 md:w-4 md:h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clipRule="evenodd"/>
              </svg>
              <span>{dict.features.realtime}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
