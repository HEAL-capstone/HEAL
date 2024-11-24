"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Pill, Check } from "lucide-react"

const interests = [
  "간 건강", "피로 개선", "눈 건강", "관절/뼈 건강",
  "면역력 강화", "소화 건강", "수면 개선", "스트레스 관리",
  "피부 건강", "혈액순환"
]

export default function InterestSelection() {
  const [selectedInterests, setSelectedInterests] = useState<string[]>([])
  const router = useRouter()

  const handleInterestToggle = (interest: string) => {
    setSelectedInterests(prev => {
      if (prev.includes(interest)) {
        return prev.filter(i => i !== interest)
      } else if (prev.length < 3) {
        return [...prev, interest]
      }
      return prev
    })
  }

  const handleSubmit = () => {
    if (selectedInterests.length === 0) {
      console.log("No interests selected");
    } else {
      console.log("Selected interests:", selectedInterests);
    }
    // Here you would typically handle the submission logic
    router.push('/') // Redirect to home page after submission
  }

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
                <Pill className="w-10 h-10 text-[#E8DCCA]" />
              </div>
            </div>
            <h2 className="text-2xl font-bold text-center text-white mb-6">관심 분야 선택</h2>
            <p className="text-center text-white mb-6">최대 3개까지 선택 가능합니다.</p>
            <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                {interests.map((interest) => (
                  <div key={interest} className="flex items-center">
                    <input
                      type="checkbox"
                      id={interest}
                      checked={selectedInterests.includes(interest)}
                      onChange={() => handleInterestToggle(interest)}
                      className="hidden"
                    />
                    <label
                      htmlFor={interest}
                      className={`flex items-center justify-between w-full p-3 rounded-md cursor-pointer transition-colors ${
                        selectedInterests.includes(interest)
                          ? 'bg-[#E8DCCA] text-gray-700'
                          : 'bg-white bg-opacity-20 text-white'
                      }`}
                    >
                      <span>{interest}</span>
                      {selectedInterests.includes(interest) && (
                        <Check className="w-5 h-5" />
                      )}
                    </label>
                  </div>
                ))}
              </div>
              <button
                type="button"
                onClick={() => router.push('/congratulation')}
                className={`w-full py-2 px-4 rounded-md transition duration-300 ${
                  selectedInterests.length === 0
                    ? 'bg-gray-500 text-white hover:bg-gray-600'
                    : 'bg-gradient-to-r from-[#E8DCCA] to-[#D8CCBA] text-gray-700 hover:from-[#D8CCBA] hover:to-[#C8BCAA]'
                }`}
              >
                {selectedInterests.length === 0 ? '관심분야 없음' : '완료'}
              </button>
            </form>
          </div>
        </div>
      </main>

      <footer className="p-4 text-center text-white text-sm">
        <p>&copy; 2024 HEAL. All rights reserved.</p>
      </footer>
    </div>
  )
}