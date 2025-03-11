'use client'

import { createContext, useContext, useState } from 'react'

type TranslateContextType = {
  file: File | null
  setFile: (file: File | null) => void
  isUploaded: boolean
  setIsUploaded: (isUploaded: boolean) => void
  fileInfo: { name: string; size: string } | null
  setFileInfo: (fileInfo: { name: string; size: string } | null) => void
  selectedLangs: string[]
  setSelectedLangs: (langs: string[]) => void
  translatedResults: { lang: string; content: string }[]
  setTranslatedResults: (results: { lang: string; content: string }[]) => void
  isTranslating: boolean
  setIsTranslating: (isTranslating: boolean) => void
  progress: number
  setProgress: (progress: number) => void
  streamContent: string
  setStreamContent: (content: string) => void
  currentTranslatingLang: string | null
  setCurrentTranslatingLang: (lang: string | null) => void
  estimatedTime: number
  setEstimatedTime: (time: number) => void
  completedChunks: number
  setCompletedChunks: (chunks: number) => void
}

const TranslateContext = createContext<TranslateContextType | undefined>(undefined)

export function TranslateProvider({ children }: { children: React.ReactNode }) {
  const [file, setFile] = useState<File | null>(null)
  const [isUploaded, setIsUploaded] = useState(false)
  const [fileInfo, setFileInfo] = useState<{ name: string; size: string } | null>(null)
  const [selectedLangs, setSelectedLangs] = useState<string[]>([])
  const [translatedResults, setTranslatedResults] = useState<{ lang: string; content: string }[]>([])
  const [isTranslating, setIsTranslating] = useState(false)
  const [progress, setProgress] = useState(0)
  const [streamContent, setStreamContent] = useState('')
  const [currentTranslatingLang, setCurrentTranslatingLang] = useState<string | null>(null)
  const [estimatedTime, setEstimatedTime] = useState(0)
  const [completedChunks, setCompletedChunks] = useState(0)

  return (
    <TranslateContext.Provider
      value={{
        file,
        setFile,
        isUploaded,
        setIsUploaded,
        fileInfo,
        setFileInfo,
        selectedLangs,
        setSelectedLangs,
        translatedResults,
        setTranslatedResults,
        isTranslating,
        setIsTranslating,
        progress,
        setProgress,
        streamContent,
        setStreamContent,
        currentTranslatingLang,
        setCurrentTranslatingLang,
        estimatedTime,
        setEstimatedTime,
        completedChunks,
        setCompletedChunks,
      }}
    >
      {children}
    </TranslateContext.Provider>
  )
}

export function useTranslate() {
  const context = useContext(TranslateContext)
  if (context === undefined) {
    throw new Error('useTranslate must be used within a TranslateProvider')
  }
  return context
} 