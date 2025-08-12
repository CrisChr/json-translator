"use client"

import { useTranslate } from "@/context/TranslateContext"
import { useState, useEffect, useRef } from "react"
import { Button } from "./ui/button"
import { CopyIcon, DownloadIcon, XIcon } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import JSZip from 'jszip'
import dynamic from 'next/dynamic';

const VirtualizedJson = dynamic(() => import('./VirtualizedJson'), {
  ssr: false
});

interface JsonPreviewProps {
  dict: {
    jsonPreview: {
      originalJson: string;
      translatedJson: string;
      tips: string;
      placeholder: {
        upload: string;
        translation: string;
      };
      actions: {
        copy: string;
        clear: string;
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
    };
  };
}

export const JsonPreview: React.FC<JsonPreviewProps> = ({ dict }) => {
  const { file, translatedResults, streamContent, isTranslating, currentTranslatingLang, resetTranslation } = useTranslate()
  const [sourceContent, setSourceContent] = useState<string>("")
  const [activeTab, setActiveTab] = useState<string>("")
  const { selectedLangs } = useTranslate()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [containerSize, setContainerSize] = useState({ width: 0, height: 300 });
  const containerRef = useRef<HTMLDivElement>(null);
  const [formattedContent, setFormattedContent] = useState<string>("");

  const translations = {
    originalJson: dict?.jsonPreview?.originalJson || "Original JSON",
    translatedJson: dict?.jsonPreview?.translatedJson || "Translated JSON",
    tips: dict?.jsonPreview?.tips || "Tips: Supports real-time preview and formatting",
    placeholder: {
      upload: dict?.jsonPreview?.placeholder?.upload || "Please upload a JSON file",
      translation: dict?.jsonPreview?.placeholder?.translation || "Translation results will be displayed here"
    },
    actions: {
      copy: dict?.jsonPreview?.actions?.copy || "Copy",
      clear: dict?.jsonPreview?.actions?.clear || "Clear",
      download: dict?.jsonPreview?.actions?.download || "Download",
      downloadAll: dict?.jsonPreview?.actions?.downloadAll || "Download all translations",
      downloadFormat: dict?.jsonPreview?.actions?.downloadFormat || "Download {lang} translation"
    },
    toast: {
      copySuccess: dict?.jsonPreview?.toast?.copySuccess || "Copied to clipboard",
      copyError: dict?.jsonPreview?.toast?.copyError || "Copy failed",
      downloadSuccess: dict?.jsonPreview?.toast?.downloadSuccess || "Downloaded {lang} translation",
      downloadAllSuccess: dict?.jsonPreview?.toast?.downloadAllSuccess || "All translations downloaded",
      downloadError: dict?.jsonPreview?.toast?.downloadError || "Download failed"
    },
    languages: dict?.jsonPreview?.languages || {}
  };

  useEffect(() => {
    if (file) {
      setIsLoading(true)
      const reader = new FileReader()
      reader.onload = (e) => {
        try {
          const content = e.target?.result as string
          const formatted = JSON.stringify(JSON.parse(content), null, 2)
          setSourceContent(formatted)
        } catch (error) {
          console.error('JSON parsing error:', error)
        } finally {
          setIsLoading(false)
        }
      }
      reader.readAsText(file)
    }
  }, [file])

  useEffect(() => {
    if (selectedLangs.length > 0) {
      setActiveTab(selectedLangs[0])
    }
  }, [])

  useEffect(() => {
    if (selectedLangs.length > 0 && (!activeTab || !selectedLangs.includes(activeTab))) {
      setActiveTab(selectedLangs[0])
    }
  }, [selectedLangs, activeTab])

  useEffect(() => {
    if (containerRef.current) {
      const { width } = containerRef.current.getBoundingClientRect();
      setContainerSize(prev => ({ ...prev, width }));
    }
  }, []);

  useEffect(() => {
    if (sourceContent) {
      try {
        const formatted = formatJson(sourceContent);
        setFormattedContent(formatted);
      } catch (error) {
        console.error('JSON formatting error:', error);
      }
    }
  }, [sourceContent]);

  const formatJson = (jsonString: string) => {
    try {
      // If the JSON string is empty or a prompt text, return it directly
      if (!jsonString ||
        jsonString === 'Please upload a JSON file' ||
        jsonString === 'Translation results will be displayed here') {
        return jsonString;
      }

      // Handle streaming output
      if (isTranslating) {
        try {
          // Try to wrap the content into a complete JSON object
          const wrappedContent = `{"temp": ${jsonString}}`;
          const parsed = JSON.parse(wrappedContent);
          return JSON.stringify(parsed.temp, null, 2);
        } catch {
          // If parsing fails, perform basic formatting
          return jsonString
            .split(',')
            .map(line => line.trim())
            .join(',\n  ');
        }
      }

      // Non-streaming output, parse and format normally
      const parsed = JSON.parse(jsonString);
      return JSON.stringify(parsed, null, 2);
    } catch (e) {
      // If all attempts fail, return the original string
      return jsonString;
    }
  }

  const handleCopy = async (content: string) => {
    try {
      await navigator.clipboard.writeText(content)
      toast({
        title: "Success",
        description: translations.toast.copySuccess
      })
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Error",
        description: translations.toast.copyError
      })
    }
  }

  const handleDownload = (lang: string) => {
    const result = translatedResults.find(r => r.lang === lang)
    if (!result) return

    try {
      const blob = new Blob([result.content], { type: 'application/json' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `translated_${lang}.json`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)

      toast({
        title: "Success",
        description: translations.toast.downloadSuccess.replace(
          '{lang}',
          translations.languages[lang] || lang
        )
      })
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Error",
        description: translations.toast.downloadError
      })
    }
  }

  const handleDownloadAll = () => {
    try {
      const zip = new JSZip()
      translatedResults.forEach(result => {
        zip.file(`translated_${result.lang}.json`, result.content)
      })

      zip.generateAsync({ type: "blob" }).then(content => {
        const url = URL.createObjectURL(content)
        const a = document.createElement('a')
        a.href = url
        a.download = 'translations.zip'
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        URL.revokeObjectURL(url)

        toast({
          title: "Success",
          description: translations.toast.downloadAllSuccess
        })
      })
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Error",
        description: translations.toast.downloadError
      })
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="border border-border rounded-3xl p-4 md:p-6 transition-all duration-300 bg-white/90 backdrop-blur-sm">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-lg font-bold">{translations.originalJson}</h3>
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleCopy(sourceContent)}
            >
              <CopyIcon className="h-4 w-4" />
            </Button>
          </div>
        </div>
        {isLoading ? (
          <div className="flex items-center justify-center h-[300px]">
            <span className="loading loading-spinner loading-md"></span>
          </div>
        ) : (
          <>
            <div ref={containerRef} className="h-[300px] overflow-hidden">
              {sourceContent ? (
                <VirtualizedJson
                  content={formattedContent}
                  height={containerSize.height}
                  width={containerSize.width}
                  showLineNumbers={true}
                />
              ) : (
                <VirtualizedJson
                  content={`{
  // ${translations.placeholder.upload}
}`}
                  height={containerSize.height}
                  width={containerSize.width}
                  showLineNumbers={false}
                />
              )}
            </div>
            <div className="mt-4 text-sm text-muted-foreground">
              {translations.tips}
            </div>
          </>
        )}
      </div>

      <div className="border border-border rounded-3xl p-4 md:p-6 transition-all duration-300 bg-white/90 backdrop-blur-sm">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold">{translations.translatedJson}</h3>
          <div className="flex items-center gap-2 flex-wrap">
            {activeTab && translatedResults.find(r => r.lang === activeTab) && (
              <>
                <Button
                  variant="ghost"
                  size="sm"
                  disabled={isTranslating}
                  onClick={() => {
                    const content = translatedResults.find(r => r.lang === activeTab)?.content || '';
                    handleCopy(content);
                  }}
                >
                  <CopyIcon className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  disabled={isTranslating}
                  onClick={() => handleDownload(activeTab)}
                  className="flex items-center gap-2 shadow-none"
                >
                  <DownloadIcon className="h-4 w-4" />
                  {translations.actions.downloadFormat.replace(
                    '{lang}',
                    translations.languages[activeTab] || activeTab
                  )}
                </Button>
              </>

            )}
              {translatedResults.length > 0 && (
                <Button
                  variant="outline"
                  size="sm"
                  disabled={isTranslating}
                  onClick={handleDownloadAll}
                  className="flex items-center gap-2 shadow-none"
                >
                  <DownloadIcon className="h-4 w-4" />
                  {translations.actions.downloadAll}
                </Button>
              )}
              {translatedResults.length > 0 && (
                <Button
                  variant="destructive"
                  size="sm"
                  disabled={isTranslating}
                  onClick={resetTranslation}
                  className="flex items-center gap-2 shadow-none"
                >
                  <XIcon className="h-4 w-4" />
                  {translations.actions.clear}
                </Button>
              )}
            </div>
          </div>

        <Tabs defaultValue={selectedLangs[0]} value={activeTab} onValueChange={setActiveTab} className="w-full">
          <VirtualizedJson
            content={formatJson(
              isTranslating && activeTab === currentTranslatingLang
                ? streamContent
                : (translatedResults.find(r => r.lang === activeTab)?.content || `{
  // ${translations.placeholder.translation}
}`)
            )}
            height={containerSize.height}
            width={containerSize.width}
            showLineNumbers={true}
          />

          <TabsList>
            {selectedLangs.map(lang => (
              <TabsTrigger key={lang} value={lang}>
                {translations.languages[lang] || lang}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>
    </div>
  )
}
