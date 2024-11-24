"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { User, Lock, Pill } from "lucide-react"

export default function Login() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const router = useRouter()

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("로그인:", username, password)
    router.push('/')
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-700 via-gray-800 to-[#E8DCCA]">
      <header className="p-4">
        <div className="container mx-auto">
          <h1 className="text-2xl font-bold text-white">HEAL</h1>
        </div>
      </header>
      
      <main className="flex-grow flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-lg shadow-xl p-8">
            <div className="flex justify-center mb-8">
              <div className="w-20 h-20 bg-[#E8DCCA] rounded-full flex items-center justify-center">
                <Pill className="w-10 h-10 text-gray-700" />
              </div>
            </div>
            <h2 className="text-2xl font-bold text-center text-white mb-6">로그인</h2>
            <form onSubmit={handleLogin} className="space-y-6">
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className="w-full pl-10 pr-3 py-2 bg-white bg-opacity-20 rounded-md focus:outline-none focus:outline-none focus:ring-2 focus:ring-[#E8DCCA] text-[#E8DCCA] placeholder-[#E8DCCA]"
                  placeholder="아이디"
                />
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full pl-10 pr-3 py-2 bg-white bg-opacity-20 rounded-md focus:outline-none focus:outline-none focus:ring-2 focus:ring-[#E8DCCA] text-[#E8DCCA] placeholder-[#E8DCCA]"
                  placeholder="비밀번호"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-[#E8DCCA] text-gray-700 py-2 px-4 rounded-md hover:bg-[#D8CCBA] transition duration-300"
              >
                로그인
              </button>
            </form>
            <div className="mt-6 text-center">
              <p className="text-white">계정이 없으신가요?</p>
              <button
                onClick={() => router.push('/register')}
                className="mt-2 w-full border border-[#E8DCCA] text-[#E8DCCA] py-2 px-4 rounded-md hover:bg-[#E8DCCA] hover:text-gray-700 transition duration-300"
              >
                회원가입
              </button>
            </div>
          </div>
        </div>
      </main>
      
      <footer className="p-4 text-center text-white text-sm">
        <p>&copy; 2024 HEAL. All rights reserved.</p>
      </footer>
    </div>
  )
}