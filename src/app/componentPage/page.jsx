"use client"

import { useState, useEffect } from "react"
import Input from "@/components/ui/Input"
import { useSearchParams, useRouter } from "next/navigation"

export default function Component() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || "")
  const [recommendations, setRecommendations] = useState([])

  useEffect(() => {
    if (searchTerm) {
      processSymptoms(searchTerm)
    }
  }, [searchTerm])

  const handleSearch = (e) => {
    const term = e.target.value
    setSearchTerm(term)
    processSymptoms(term)
  }

  const processSymptoms = (term) => {
    let recommendations = []
    if (term.toLowerCase().includes("heart")) {
      recommendations = [
        {
          name: "Omega-3 Supplement",
          description: "Supports heart health and cardiovascular function",
        },
        {
          name: "Vitamin D",
          description: "Helps maintain healthy heart function",
        },
        {
          name: "Probiotics",
          description: "Supports gut health, which can benefit heart health",
        },
      ]
    } else if (term.toLowerCase().includes("brain")) {
      recommendations = [
        {
          name: "Omega-3 Supplement",
          description: "Promotes brain health and cognitive function",
        },
        {
          name: "Multivitamin",
          description: "Provides essential nutrients for brain function",
        },
        {
          name: "Ginkgo Biloba",
          description: "Helps improve blood flow and oxygen to the brain",
        },
      ]
    } else if (term.toLowerCase().includes("inflammation")) {
      recommendations = [
        {
          name: "Omega-3 Supplement",
          description: "Helps reduce inflammation in the body",
        },
        {
          name: "Turmeric",
          description: "Contains curcumin, a powerful anti-inflammatory compound",
        },
        {
          name: "Ginger",
          description: "Has anti-inflammatory properties and can help reduce pain",
        },
      ]
    }
    setRecommendations(recommendations)
  }

  const goToHomePage = () => {
    router.push('/')
  }

  return (
    <div className="flex flex-col min-h-[100dvh]">
      <header className="bg-gray-100 py-8 dark:bg-gray-800">
        <div className="container px-4 md:px-6 flex items-center justify-center gap-4">
          <div className="flex items-center gap-4 mr-4 cursor-pointer" onClick={goToHomePage}>
            <PillIcon className="h-8 w-8 text-gray-900 dark:text-gray-50" />
            <h1 className="text-3xl font-bold tracking-tighter">Supplement Advisor</h1>
          </div>
          <div className="relative flex-1 max-w-3xl">
            <Input
              type="text"
              placeholder="Enter your symptoms..."
              value={searchTerm}
              onChange={handleSearch}
              className="w-full px-6 py-3 rounded-lg"
            />
            <SearchIcon className="absolute right-4 top-1/2 -translate-y-1/2 h-6 w-6 text-gray-500 dark:text-gray-400" />
          </div>
        </div>
      </header>
      {recommendations.length > 0 && (
        <section className="w-full py-12 md:py-24 lg:py-32 bg-[#f0f0f0] dark:bg-[#f8f8f0]">
          <div className="container grid gap-8 px-4 md:px-6 lg:grid-cols-3">
            {recommendations.map((recommendation, index) => (
              <div
                key={index}
                className="flex flex-col items-start gap-4 rounded-lg bg-white p-6 shadow transition-all hover:scale-105 dark:bg-gray-950"
              >
                <h2 className="text-2xl font-bold tracking-tighter">{recommendation.name}</h2>
                <p className="text-gray-500 dark:text-gray-400">{recommendation.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-[#f0f0f0] dark:bg-[#f8f8f0]">
        <div className="container grid items-center gap-6 px-4 md:px-6 lg:grid-cols-2 lg:gap-10">
          <div className="order-last space-y-4">
            <h2 className="text-2xl font-bold tracking-tighter md:text-3xl">Omega-3 Supplement</h2>
            <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              Boost your heart and brain health with our premium Omega-3 fish oil supplement.
            </p>
            <h2 className="text-2xl font-bold tracking-tighter md:text-3xl">Omega-3 Supplement</h2>
            <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              Boost your heart and brain health with our premium Omega-3 fish oil supplement.
            </p>
            <h2 className="text-2xl font-bold tracking-tighter md:text-3xl">Omega-3 Supplement</h2>
            <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              Boost your heart and brain health with our premium Omega-3 fish oil supplement.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

function PillIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m10.5 20.5 10-10a4.95 4.95 0 1 0-7-7l-10 10a4.95 4.95 0 1 0 7 7Z" />
      <path d="m8.5 8.5 7 7" />
    </svg>
  )
}

function SearchIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  )
}
