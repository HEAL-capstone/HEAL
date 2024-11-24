"use client"

import { useState, KeyboardEvent } from "react"
import { useRouter } from "next/navigation"
import { User, Lock, UserCircle, Calendar, Users, Pill } from "lucide-react"

export default function Register() {
  const [step, setStep] = useState(1)
  const [id, setId] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [birthDate, setBirthDate] = useState("")
  const [gender, setGender] = useState("")
  const router = useRouter()

  const focusNextInput = () => {
    const inputs = ['id', 'password', 'name', 'birthDate', 'gender'];
    const currentIndex = inputs.indexOf(document.activeElement?.id || '');
    if (currentIndex < inputs.length - 1) {
      const nextInput = document.getElementById(inputs[currentIndex + 1]);
      nextInput?.focus();
    }
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement | HTMLSelectElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (step < 5) {
        setStep(step + 1);
        focusNextInput();
      } else {
        handleRegister();
      }
    }
  }

  const handleRegister = () => {
    console.log("회원가입:", { id, password, name, birthDate, gender })
    // Here you would typically handle the registration logic
    router.push('/') // Redirect to home page after registration
  }

  const transitionClass = "transition-all duration-500 ease-in-out max-h-0 overflow-hidden"

  const renderStep = (currentStep: number) => {
    const isVisible = currentStep <= step
    const visibilityClass = isVisible ? "max-h-20 opacity-100 mb-4" : "max-h-0 opacity-0"

    const renderContent = () => {
      switch (currentStep) {
        case 1:
          return (
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                id="id"
                type="text"
                value={id}
                onChange={(e) => setId(e.target.value)}
                onKeyPress={handleKeyPress}
                required
                className="w-full pl-10 pr-3 py-2 bg-white bg-opacity-20 rounded-md focus:outline-none focus:ring-2 focus:ring-[#E8DCCA] text-white placeholder-gray-300"
                placeholder="아이디"
              />
            </div>
          )
        case 2:
          return (
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyPress={handleKeyPress}
                required
                className="w-full pl-10 pr-3 py-2 bg-white bg-opacity-20 rounded-md focus:outline-none focus:ring-2 focus:ring-[#E8DCCA] text-white placeholder-gray-300"
                placeholder="비밀번호"
              />
            </div>
          )
        case 3:
          return (
            <div className="relative">
              <UserCircle className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                onKeyPress={handleKeyPress}
                required
                className="w-full pl-10 pr-3 py-2 bg-white bg-opacity-20 rounded-md focus:outline-none focus:ring-2 focus:ring-[#E8DCCA] text-white placeholder-gray-300"
                placeholder="이름"
              />
            </div>
          )
        case 4:
          return (
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                id="birthDate"
                type="date"
                value={birthDate}
                onChange={(e) => {
                  setBirthDate(e.target.value);
                  if (step < 5) {
                    setStep(step + 1);
                    focusNextInput();
                  }
                }}
                required
                className="w-full pl-10 pr-3 py-2 bg-white bg-opacity-20 rounded-md focus:outline-none focus:ring-2 focus:ring-[#E8DCCA] text-white placeholder-gray-300"
              />
            </div>
          )
        case 5:
          return (
            <div className="relative">
              <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <select
                id="gender"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                onKeyPress={handleKeyPress}
                required
                className="w-full pl-10 pr-3 py-2 bg-white bg-opacity-20 rounded-md focus:outline-none focus:ring-2 focus:ring-[#E8DCCA] text-white [&>option]:text-black"
              >
                <option value="" disabled>성별 선택</option>
                <option value="male">남성</option>
                <option value="female">여성</option>
              </select>
            </div>
          )
        default:
          return null
      }
    }

    return (
      <div className={`${transitionClass} ${visibilityClass}`}>
        {renderContent()}
      </div>
    )
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
            <h2 className="text-2xl font-bold text-center text-white mb-6">회원가입</h2>
            <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
              {Array.from({ length: 5 }, (_, index) => renderStep(index + 1))}
              {step === 5 && (
                <button
                  type="button"
                  onClick={() => router.push('/interests')}
                  className="w-full bg-[#E8DCCA] text-gray-700 py-2 px-4 rounded-md hover:bg-[#D8CCBA] transition duration-300"
                >
                  완료
                </button>
              )}
            </form>
            <p className="mt-4 text-sm text-center text-white">
              {step < 5 ? "엔터를 눌러 다음으로 진행하세요" : "모든 정보를 입력한 후 '완료' 버튼을 클릭하세요"}
            </p>
          </div>
        </div>
      </main>

      <footer className="p-4 text-center text-white text-sm">
        <p>&copy; 2024 HEAL. All rights reserved.</p>
      </footer>
    </div>
  )
}