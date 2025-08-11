"use client"

import { useState, useEffect } from "react"
import { useTranslate } from "@/context/TranslateContext"
import { getTranslationFunctions } from "@/lib/translate"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { Progress } from "@/components/ui/progress"
import { ChevronDown, Languages, Loader2 } from "lucide-react"
import { encrypt } from "@/lib/utils"

// 临时导入，用于调试 SECRET_KEY (不再需要导入 SECRET_KEY，直接访问 process.env)
// import { SECRET_KEY as CLIENT_SECRET_KEY } from '@/lib/utils';

interface TranslatedResult {
  lang: string;
  content: string;
}

const readFileContent = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => resolve(e.target?.result as string);
    reader.onerror = (e) => reject(e);
    reader.readAsText(file);
  });
};

interface TranslatePanelProps {
  dict: {
    translatePanel: Partial<{
      startTranslate: string;
      translating: string;
      cancel: string;
      uploadFirst: string;
      enterApiKey: string;
      showMoreLanguages: string;
      hideMoreLanguages: string;
      errorTitle: string;
      successTitle: string;
      translationCompleted: string;
      translationCancelled: string;
      cancelled: string;
      translationFailed: string;
      pleaseSelectLanguage: string;
      tip: string;
      allLanguagesTranslated: string;
      foundUnfinished: string;
      continueTranslation: string;
      overallProgress: string;
      translatingLanguage: string;
      completedLanguages: string;
      bytes: string;
      kb: string;
      mb: string;
      gb: string;
      apiKeyErrors: {
        invalidFormat: string;
        invalidOrExpired: string;
        rateLimitReached: string;
        validationFailed: string;
      };
    }>;
    jsonPreview: {
      languages: Record<string, string>;
    };
  };
}

export function TranslatePanel({ dict }: TranslatePanelProps) {
  const [error, setError] = useState("")
  const { toast } = useToast()
  const [controller, setController] = useState<AbortController | null>(null)
  const [completedLangsCount, setCompletedLangsCount] = useState(0)
  const [showMoreLanguages, setShowMoreLanguages] = useState(false)

  const cleanJsonString = (str: string) => {
    return str.replace(/```json/g, "").replace(/```/g, "").trim();
  };

  const {
    file,
    apiKey,
    setApiKey,
    isTranslating,
    setIsTranslating,
    setTranslatedContent,
    progress,
    setProgress,
    cancelTranslation,
    setCancelTranslation,
    streamContent,
    setStreamContent,
    translatedResults,
    setTranslatedResults,
    selectedLangs,
    setSelectedLangs,
    currentTranslatingLang,
    setCurrentTranslatingLang,
    totalProgress,
    estimatedTime,
    setTotalProgress,
    setEstimatedTime,
    aiProvider,
    setAiProvider,
    resetTranslation, // 获取 resetTranslation 函数
  } = useTranslate()

  // 调试：打印前端的 SECRET_KEY
  useEffect(() => {
    console.log('Frontend NEXT_PUBLIC_CRYPTO_SECRET_KEY:', process.env.NEXT_PUBLIC_CRYPTO_SECRET_KEY);
  }, []);

  type TranslatePanelKey = keyof typeof dict.translatePanel | 'apiKeyErrors.invalidFormat' | 'apiKeyErrors.invalidOrExpired' | 'apiKeyErrors.rateLimitReached' | 'apiKeyErrors.validationFailed';

  const getTranslation = (key: TranslatePanelKey, defaultValue: string) => {
    if (key.includes('.')) {
      const [parent, child] = key.split('.');
      return (dict?.translatePanel?.[parent as keyof typeof dict.translatePanel] as any)?.[child] || defaultValue;
    }
    const value = dict?.translatePanel?.[key as keyof typeof dict.translatePanel];
    if (typeof value === 'string') {
      return !value || value.trim() === "" ? defaultValue : value;
    }
    return value || defaultValue;
  }

  // 添加默认值处理
  const translations = {
    showMoreLanguages: getTranslation("showMoreLanguages", "Show More Languages"),
    hideMoreLanguages: getTranslation("hideMoreLanguages", "Hide More Languages"),
    startTranslate: getTranslation("startTranslate", "Start Translate"),
    translating: getTranslation("translating", "Translating..."),
    cancel: getTranslation("cancel", "Cancel"),
    uploadFirst: getTranslation("uploadFirst", "Please upload a file"),
    enterApiKey: getTranslation("enterApiKey", "Please enter API Key"),
    errorTitle: getTranslation("errorTitle", "Error"),
    successTitle: getTranslation("successTitle", "Success"),
    translationCompleted: getTranslation("translationCompleted", "Translation Completed!"),
    translationCancelled: getTranslation("translationCancelled", "Translation Cancelled"),
    cancelled: getTranslation("cancelled", "Cancelled"),
    tip: getTranslation("tip", "Tip"),
    allLanguagesTranslated: getTranslation("allLanguagesTranslated", "All selected languages have been translated"),
    foundUnfinished: getTranslation("foundUnfinished", "Found unfinished translations"),
    continueTranslation: getTranslation("continueTranslation", "Continue Translation"),
    overallProgress: getTranslation("overallProgress", "Overall Progress"),
    translatingLanguage: getTranslation("translatingLanguage", "Translating Language"),
    completedLanguages: getTranslation("completedLanguages", "Completed Languages"),
    languages: dict?.jsonPreview?.languages || {},  // 从 jsonPreview 中获取语言映射
    bytes: "B",
    kb: "KB",
    mb: "MB",
    gb: "GB",
    apiKeyErrors: {
      invalidFormat: getTranslation("apiKeyErrors.invalidFormat", "Invalid API Key format"),
      invalidOrExpired: getTranslation("apiKeyErrors.invalidOrExpired", "Invalid or expired API Key"),
      rateLimitReached: getTranslation("apiKeyErrors.rateLimitReached", "API call limit reached"),
      validationFailed: getTranslation("apiKeyErrors.validationFailed", "API Key validation failed")
    }
  }

  // Common languages (top 20 most common languages)
  const commonLanguages = [
    { value: "en", label: translations.languages["en"] || "English" },
    { value: "ru", label: translations.languages["ru"] || "Russian" },
    { value: "es", label: translations.languages["es"] || "Spanish" },
    { value: "de", label: translations.languages["de"] || "German" },
    { value: "tr", label: translations.languages["tr"] || "Turkish" },
    { value: "fr", label: translations.languages["fr"] || "French" },
    { value: "ja", label: translations.languages["ja"] || "Japanese" },
    { value: "pt", label: translations.languages["pt"] || "Portuguese" },
    { value: "zh", label: translations.languages["zh"] || "Chinese (S)" },
    { value: "zh-TW", label: translations.languages["zh-TW"] || "Chinese (T)" },
    { value: "it", label: translations.languages["it"] || "Italian" },
    { value: "ar", label: translations.languages["ar"] || "Arabic" },
    { value: "pl", label: translations.languages["pl"] || "Polish" },
    { value: "el", label: translations.languages["el"] || "Greek" },
    { value: "nl", label: translations.languages["nl"] || "Dutch" },
    { value: "id", label: translations.languages["id"] || "Bahasa Indonesia" },
    { value: "ko", label: translations.languages["ko"] || "Korean" },
    { value: "th", label: translations.languages["th"] || "Thai" }
  ];

  // More languages
  const moreLanguages = [
    // European languages
    { value: "vi", label: translations.languages["vi"] || "Vietnamese" },
    { value: "fa", label: translations.languages["fa"] || "Persian" },
    { value: "uk", label: translations.languages["uk"] || "Ukrainian" },
    { value: "he", label: translations.languages["he"] || "Hebrew" },
    { value: "sv", label: translations.languages["sv"] || "Swedish" },
    { value: "ro", label: translations.languages["ro"] || "Romanian" },
    { value: "hu", label: translations.languages["hu"] || "Hungarian" },
    { value: "da", label: translations.languages["da"] || "Danish" },
    { value: "sk", label: translations.languages["sk"] || "Slovak" },
    { value: "sr", label: translations.languages["sr"] || "Serbian" },
    { value: "bg", label: translations.languages["bg"] || "Bulgarian" },
    { value: "fi", label: translations.languages["fi"] || "Finnish" },
    { value: "hr", label: translations.languages["hr"] || "Croatian" },
    { value: "lt", label: translations.languages["lt"] || "Lithuanian" },
    { value: "nb", label: translations.languages["nb"] || "Norwegian (Bokmål)" },
    { value: "sl", label: translations.languages["sl"] || "Slovenian" },
    { value: "lv", label: translations.languages["lv"] || "Latvian" },
    { value: "et", label: translations.languages["et"] || "Estonian" },
    { value: "cs", label: translations.languages["cs"] || "Czech" },
    { value: "ca", label: translations.languages["ca"] || "Catalan" },

    // Asian languages
    { value: "hi", label: translations.languages["hi"] || "Hindi" },
    { value: "bn", label: translations.languages["bn"] || "Bengali" },
    { value: "ta", label: translations.languages["ta"] || "Tamil" },
    { value: "ur", label: translations.languages["ur"] || "Urdu" },
    { value: "gu", label: translations.languages["gu"] || "Gujarati" },
    { value: "kn", label: translations.languages["kn"] || "Kannada" },
    { value: "ml", label: translations.languages["ml"] || "Malayalam" },
    { value: "mr", label: translations.languages["mr"] || "Marathi" },
    { value: "ms", label: translations.languages["ms"] || "Malay" },
    { value: "my", label: translations.languages["my"] || "Burmese" },
    { value: "km", label: translations.languages["km"] || "Khmer" },
    { value: "lo", label: translations.languages["lo"] || "Lao" },
    { value: "mn", label: translations.languages["mn"] || "Mongolian" },

    // Other languages
    { value: "az", label: translations.languages["az"] || "Azerbaijani" },
    { value: "ka", label: translations.languages["ka"] || "Georgian" },
    { value: "hy", label: translations.languages["hy"] || "Armenian" },
    { value: "sw", label: translations.languages["sw"] || "Swahili" },
    { value: "af", label: translations.languages["af"] || "Afrikaans" },
    { value: "am", label: translations.languages["am"] || "Amharic" }
  ];

  const formatTime = (seconds: number) => {
    if (seconds < 60) return `${Math.ceil(seconds)} seconds`
    return `${Math.ceil(seconds / 60)} minutes`
  }

  const handleTranslationError = (err: any) => {
    setError(err.message || "Translation failed");
    toast({
      variant: "destructive",
      title: translations.errorTitle,
      description: err.message || "Translation failed"
    });
  }

  const handleTranslate = async () => {
    if (!file || !apiKey) {
      toast({
        variant: "destructive",
        title: translations.errorTitle,
        description: "Please upload a file and enter API Key"
      });
      return;
    }

    // 添加API密钥验证
    const { translate, validateApiKey } = getTranslationFunctions(aiProvider);
    const encryptedApiKeyForValidation = encrypt(apiKey); // 先加密用于验证
    try {
      // 验证时也使用加密后的key，因为后端会解密
      await validateApiKey(encryptedApiKeyForValidation); // 暂时注释掉，因为用户反馈解密后为空
    } catch (err) {
      let errorMessage = translations.apiKeyErrors.validationFailed;

      if (err instanceof Error) {
        if (err.message.includes('format')) {
          errorMessage = translations.apiKeyErrors.invalidFormat;
        } else if (err.message.includes('expired')) {
          errorMessage = translations.apiKeyErrors.invalidOrExpired;
        } else if (err.message.includes('limit')) {
          errorMessage = translations.apiKeyErrors.rateLimitReached;
        }
      }

      toast({
        variant: "destructive",
        title: translations.errorTitle,
        description: errorMessage
      });
      return;
    }

    const controller = new AbortController();
    setController(controller);
    setIsTranslating(true);
    setError("");
    setProgress(0);
    setCancelTranslation(false);
    setCompletedLangsCount(0);

    const startTime = Date.now();

    try {
      const content = await readFileContent(file);
      const jsonContent = JSON.parse(content);

      const fileContent = JSON.stringify(jsonContent, null, 2);
      const totalLangs = selectedLangs.length;
      let currentCompletedLangs = 0;

      const results: TranslatedResult[] = [...translatedResults];

      const remainingLangs = selectedLangs.filter(
        (lang) => !translatedResults.some((r) => r.lang === lang)
      );

      // If all selected languages are already translated
      if (remainingLangs.length === 0) {
        toast({
          title: translations.tip,
          description: translations.allLanguagesTranslated
        });
        return;
      }

      for (const lang of remainingLangs) {
        if (cancelTranslation) break;

        setCurrentTranslatingLang(lang);

        try {
          const translatedContent = await translate(
            fileContent,
            lang,
            encrypt(apiKey), // 确保这里传递的是加密后的key
            controller.signal,
            (progress) => {
              // Since we are not chunking, progress can be simplified
              const overallProgress = ((completedLangsCount + progress / 100) / totalLangs) * 100;
              setTotalProgress(Math.round(overallProgress));
            },
            (streamedContent) => {
              const cleanedContent = cleanJsonString(streamedContent);
              setStreamContent(cleanedContent);
              const resultIndex = results.findIndex((r) => r.lang === lang);
              const newResult = { lang, content: cleanedContent };
              if (resultIndex !== -1) {
                results[resultIndex] = newResult;
              } else {
                results.push(newResult);
              }
              setTranslatedResults([...results]);
            }
          );

          if (translatedContent) {
            const cleanedContent = cleanJsonString(translatedContent);
            const resultIndex = results.findIndex((r) => r.lang === lang);
            if (resultIndex !== -1) {
              results[resultIndex].content = cleanedContent;
            } else {
              results.push({ lang, content: cleanedContent });
            }
            setTranslatedResults([...results]);
            currentCompletedLangs++;
            setCompletedLangsCount(currentCompletedLangs);
            setTotalProgress(Math.round((currentCompletedLangs / totalLangs) * 100));
          }
        } catch (error) {
          if (cancelTranslation || (error instanceof DOMException && error.name === 'AbortError')) {
            break;
          }
          handleTranslationError(error);
          continue;
        }
      }


      // 只有在非取消状态下才显示完成提示
      if (!cancelTranslation) {
        toast({
          title: translations.successTitle,
          description: translations.translationCompleted
        });
      }

    } catch (err) {
      handleTranslationError(err);
    } finally {
      setIsTranslating(false);
      setProgress(0);
      setStreamContent('');
      setCurrentTranslatingLang(null);
      setEstimatedTime(0); // Reset estimated time
    }
  };

  const handleCancel = () => {
    if (controller) {
      controller.abort()
      setController(null)
    }
    setCancelTranslation(true)
    setIsTranslating(false)
    setProgress(0)
    setTotalProgress(0)
    setCurrentTranslatingLang(null)
    setStreamContent("")
    // 清除保存的进度
    if (file) {
      localStorage.removeItem(`translation_progress_${file.name}`)
    }
    toast({
      title: translations.cancelled,
      description: translations.translationCancelled
    })
  }

  // Add a function to check saved progress
  const checkSavedProgress = (fileName: string) => {
    const savedProgress = localStorage.getItem(`translation_progress_${fileName}`);
    if (savedProgress) {
      return {
        hasSavedProgress: true,
        progress: JSON.parse(savedProgress)
      };
    }
    return { hasSavedProgress: false, progress: null };
  };

  // Check for unfinished translations when a file is uploaded
  useEffect(() => {
    if (file) {
      const { hasSavedProgress } = checkSavedProgress(file.name);
      if (hasSavedProgress) {
        toast({
          title: translations.foundUnfinished,
          description: translations.continueTranslation,
          action: (
            <Button onClick={handleTranslate}>
              {translations.continueTranslation}
            </Button>
          )
        });
      }
    }
  }, [file]);

  // Initialize the component
  useEffect(() => {
    setTotalProgress(0);
  }, []);

  // 当选择的语言列表变化时，重置翻译进度
  useEffect(() => {
    resetTranslation();
  }, [selectedLangs, resetTranslation]); // 添加 resetTranslation 到依赖数组

  // 当AI供应商变化时，重置翻译进度
  useEffect(() => {
    resetTranslation();
  }, [aiProvider, resetTranslation]); // 添加 resetTranslation 到依赖数组

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return `0 ${translations.bytes}`
    const k = 1024
    const sizes = [
      translations.bytes,
      translations.kb,
      translations.mb,
      translations.gb
    ]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  // 添加类型检查
  type SupportedLanguage = typeof commonLanguages[number]['value'] | typeof moreLanguages[number]['value'];

  // 检查翻译是否完整
  useEffect(() => {
    const allLanguages = [...commonLanguages, ...moreLanguages].map(l => l.value)
    const missingTranslations = allLanguages.filter(lang => !translations.languages[lang])
    if (missingTranslations.length > 0) {
      // 删除这个警告日志
      // console.warn('Missing translations for languages:', missingTranslations)
    }
  }, [translations.languages])

  return (
    <div className="space-y-4">
      <div>
        <div className="grid grid-cols-3 gap-2 mt-1">
          {/* Common languages */}
          {commonLanguages.map(option => (
            <label
              key={option.value}
              className={`flex items-center justify-center px-4 py-2 rounded-full cursor-pointer transition-colors text-sm ${selectedLangs.includes(option.value)
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted hover:bg-muted/80'
                }`}
            >
              <input
                type="checkbox"
                className="hidden"
                checked={selectedLangs.includes(option.value)}
                onChange={(e) => {
                  if (e.target.checked) {
                    setSelectedLangs([...selectedLangs, option.value])
                  } else {
                    setSelectedLangs(selectedLangs.filter(l => l !== option.value))
                  }
                }}
              />
              <span>{option.label}</span>
            </label>
          ))}
        </div>

        {/* Expand/collapse button */}
        <Button
          variant="outline"
          className="mt-4 w-full rounded-full shadow-none border-none"
          onClick={() => setShowMoreLanguages(!showMoreLanguages)}
        >
          {showMoreLanguages
            ? translations.hideMoreLanguages
            : translations.showMoreLanguages
          }
          <ChevronDown
            className={`ml-2 h-4 w-4 transform ${showMoreLanguages ? "rotate-180" : ""}`}
          />
        </Button>

        {/* More languages */}
        {showMoreLanguages && (
          <div className="grid grid-cols-3 gap-2 mt-2">
            {moreLanguages.map(option => (
              <label
                key={option.value}
                className={`flex items-center justify-center px-4 py-2 rounded-full cursor-pointer transition-colors text-sm ${selectedLangs.includes(option.value)
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted hover:bg-muted/80'
                  }`}
              >
                <input
                  type="checkbox"
                  className="hidden"
                  checked={selectedLangs.includes(option.value)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedLangs([...selectedLangs, option.value])
                    } else {
                      setSelectedLangs(selectedLangs.filter(l => l !== option.value))
                    }
                  }}
                />
                <span>{option.label}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {error && (
        <div className="text-red-500 text-sm">{error}</div>
      )}

      {isTranslating && (
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span>{translations.overallProgress} ({totalProgress}%)</span>
              <span>{translations.completedLanguages}: {completedLangsCount}/{selectedLangs.length}</span>
            </div>
            <Progress value={totalProgress} className="w-full" />
          </div>

          {currentTranslatingLang && (
            <div className="text-sm text-muted-foreground">
              {translations.translatingLanguage}: {
                commonLanguages.find(opt => opt.value === currentTranslatingLang)?.label || currentTranslatingLang
              }
            </div>
          )}
        </div>
      )}

      <div className="flex gap-2">
        <Button
          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-6 text-lg font-medium rounded-full shadow-none"
          onClick={() => {
            if (!file) {
              toast({
                variant: "destructive",
                title: translations.errorTitle,
                description: translations.uploadFirst
              });
              return;
            }
            if (!apiKey) {
              toast({
                variant: "destructive",
                title: translations.errorTitle,
                description: translations.enterApiKey
              });
              return;
            }
            if (isTranslating) {
              return;
            }
            handleTranslate();
          }}
        >
          {isTranslating ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              {translations.translating}
            </>
          ) : (
            <>
              <Languages className="mr-2 h-5 w-5" />
              {translations.startTranslate}
            </>
          )}
        </Button>

        {isTranslating && (
          <Button
            variant="outline"
            onClick={handleCancel}
            className="w-24 py-6 shadow-none rounded-full"
          >
            {translations.cancel}
          </Button>
        )}
      </div>


    </div>
  )
}
