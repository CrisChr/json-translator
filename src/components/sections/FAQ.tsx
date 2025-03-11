'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

interface FAQProps {
  dict: {
    title: string
    description: string
    items: {
      question: string
      answer: string
    }[] | {
      [key: string]: {
        question: string
        answer: string
      }
    }
  }
}

export default function FAQ({ dict }: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const faqs = Array.isArray(dict.items) 
    ? dict.items 
    : Object.values(dict.items)

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">
            {dict.title}
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {dict.description}
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl overflow-hidden"
            >
              <button
                className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-100"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <span className="font-semibold">{faq.question}</span>
                <ChevronDown
                  className={`w-5 h-5 transition-transform ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                />
              </button>
              
              <div
                className={`px-6 transition-all duration-200 ease-in-out ${
                  openIndex === index ? 'py-4' : 'py-0 h-0'
                }`}
              >
                <p className="text-gray-600 whitespace-pre-line">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
} 