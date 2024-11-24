"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Pill, Check, ArrowRight } from 'lucide-react'
import Link from "next/link"

export default function CongratulationsPage() {
  const [countdown, setCountdown] = useState(5)
  const router = useRouter()

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prevCount) => {
        if (prevCount <= 1) {
          clearInterval(timer)
          router.push('/') // Redirect to dashboard after countdown
          return 0
        }
        return prevCount - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [router])

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-700 via-gray-800 to-[#E8DCCA]">
      <header className="p-4">
        <div className="container mx-auto">
          <h1 className="text-2xl font-bold text-white">HEAL</h1>
        </div>
      </header>

      <main className="flex-grow flex items-center justify-center p-4">
        <div className="w-full max-w-2xl">
          <div className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-lg shadow-xl p-8">
            <div className="flex justify-center mb-8">
              <div className="w-20 h-20 border-2 border-[#E8DCCA] rounded-full flex items-center justify-center">
                <Check className="w-10 h-10 text-[#E8DCCA]" />
              </div>
            </div>
            <h2 className="text-3xl font-bold text-center text-white mb-6">WELCOME!</h2>
            <p className="text-center text-white mb-6">

            </p>
            <div className="text-center text-white mb-8">
              <p>{countdown}초 후 자동으로 메인 페이지로 이동합니다.</p>
            </div>
            <Link
              href="/"
              className="block w-full py-2 px-4 rounded-md transition duration-300 bg-gradient-to-r from-[#E8DCCA] to-[#D8CCBA] text-gray-700 hover:from-[#D8CCBA] hover:to-[#C8BCAA] text-center"
            >
              메인페이지 이동 <ArrowRight className="inline-block ml-2" />
            </Link>
          </div>
        </div>
      </main>

      <footer className="p-4 text-center text-white text-sm">
        <p>&copy; 2024 HEAL. All rights reserved.</p>
      </footer>
    </div>
  )
}

