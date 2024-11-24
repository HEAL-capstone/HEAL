"use client"

import { useState } from 'react'
import { User, Calendar, Heart, Lock, Edit, Users, Home } from 'lucide-react'
import Link from 'next/link'
import { Noto_Sans_KR } from 'next/font/google'

const notoSansKR = Noto_Sans_KR({
  weight: ['400', '700'],
  subsets: ['latin'],
  display: 'swap',
})

export default function Dashboard() {
  const [user, setUser] = useState({
    name: "홍길동",
    id: "hong123",
    birthDate: "1990-01-01",
    gender: "남성",
    interests: ["간 건강", "피로 개선", "눈 건강"],
  })
  const [isEditingName, setIsEditingName] = useState(false)
  const [isEditingBirthDate, setIsEditingBirthDate] = useState(false)
  const [isChangingPassword, setIsChangingPassword] = useState(false)
  const [isEditingInterests, setIsEditingInterests] = useState(false)
  const [isEditingGender, setIsEditingGender] = useState(false)
  const [newName, setNewName] = useState(user.name)
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [newBirthDate, setNewBirthDate] = useState(user.birthDate)
  const [newInterests, setNewInterests] = useState(user.interests)
  const [newGender, setNewGender] = useState(user.gender)

  const recommendedSupplements = [
    { name: "오메가-3", description: "심장 건강과 염증 감소에 도움", image: "/placeholder.svg?height=100&width=100" },
    { name: "비타민 C", description: "면역력 강화와 피로 회복에 효과적", image: "/placeholder.svg?height=100&width=100" },
    { name: "루테인", description: "눈 건강 개선과 시력 보호에 도움", image: "/placeholder.svg?height=100&width=100" }
  ]

  const handleNameChange = () => {
    setUser(prev => ({ ...prev, name: newName }))
    setIsEditingName(false)
  }

  const handlePasswordChange = () => {
    console.log("Changing password", { currentPassword, newPassword })
    setIsChangingPassword(false)
    setCurrentPassword("")
    setNewPassword("")
  }

  const handleBirthDateChange = () => {
    setUser(prev => ({ ...prev, birthDate: newBirthDate }))
    setIsEditingBirthDate(false)
  }

  const handleInterestsChange = () => {
    setUser(prev => ({ ...prev, interests: newInterests }))
    setIsEditingInterests(false)
  }

  const handleGenderChange = () => {
    setUser(prev => ({ ...prev, gender: newGender }))
    setIsEditingGender(false)
  }

  const handleDeleteAccount = () => {
    console.log("Deleting account")
    // Here you would typically handle the account deletion logic
  }

  return (
    <div className={`min-h-screen bg-white text-black ${notoSansKR.className}`}>
      <header className="bg-black p-4 shadow-md">
        <h1 className="text-2xl font-bold text-white">마이 페이지</h1>
      </header>
      <main className="container mx-auto p-4">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Left Side - User Info */}
          <div className="md:w-1/3 bg-white p-6 rounded-lg shadow-md flex flex-col justify-between border border-gray-200">
            <div className="space-y-6">
              <div className="flex flex-col items-center space-y-6">
                <div className="bg-[#e6d5c0] p-8 rounded-full">
                  <User size={80} className="text-black" />
                </div>
                <div className="text-center">
                  <p className="text-xl text-gray-600 mb-2">{user.id}</p>
                  <h2 className="text-3xl font-semibold text-black">{user.name}</h2>
                </div>
              </div>
              <Link href="/" className="flex items-center justify-center text-[#8b6b4d] hover:underline">
                <Home size={24} className="mr-2" />
                <span>메인 페이지로</span>
              </Link>
            </div>
            <button
              onClick={handleDeleteAccount}
              className="text-red-500 text-sm hover:underline mt-4"
            >
              회원 탈퇴
            </button>
          </div>

          {/* Right Side */}
          <div className="md:w-2/3 space-y-6">
            {/* User Details */}
            <div className="bg-white p-6 rounded-lg shadow-md space-y-4 border border-gray-200">
              <h3 className="text-xl font-semibold mb-4 text-black">기본 정보</h3>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <User className="text-[#8b6b4d]" />
                  <span>이름: {isEditingName ? (
                    <input
                      type="text"
                      value={newName}
                      onChange={(e) => setNewName(e.target.value)}
                      className="border rounded px-2 py-1 bg-white"
                    />
                  ) : user.name}</span>
                </div>
                <button
                  onClick={() => isEditingName ? handleNameChange() : setIsEditingName(true)}
                  className="text-[#8b6b4d] hover:underline"
                >
                  <Edit size={16} />
                </button>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Calendar className="text-[#8b6b4d]" />
                  <span>생년월일: {isEditingBirthDate ? (
                    <input
                      type="date"
                      value={newBirthDate}
                      onChange={(e) => setNewBirthDate(e.target.value)}
                      className="border rounded px-2 py-1 bg-white"
                    />
                  ) : user.birthDate}</span>
                </div>
                <button
                  onClick={() => isEditingBirthDate ? handleBirthDateChange() : setIsEditingBirthDate(true)}
                  className="text-[#8b6b4d] hover:underline"
                >
                  <Edit size={16} />
                </button>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Users className="text-[#8b6b4d]" />
                  <span>성별: {isEditingGender ? (
                    <select
                      value={newGender}
                      onChange={(e) => setNewGender(e.target.value)}
                      className="border rounded px-2 py-1 bg-white"
                    >
                      <option value="남성">남성</option>
                      <option value="여성">여성</option>
                      <option value="기타">기타</option>
                    </select>
                  ) : user.gender}</span>
                </div>
                <button
                  onClick={() => isEditingGender ? handleGenderChange() : setIsEditingGender(true)}
                  className="text-[#8b6b4d] hover:underline"
                >
                  <Edit size={16} />
                </button>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Lock className="text-[#8b6b4d]" />
                  <span>비밀번호</span>
                </div>
                <button
                  onClick={() => setIsChangingPassword(!isChangingPassword)}
                  className="text-[#8b6b4d] hover:underline"
                >
                  <Edit size={16} />
                </button>
              </div>
              {isChangingPassword && (
                <div className="space-y-2">
                  <input
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    placeholder="현재 비밀번호"
                    className="w-full p-2 border rounded bg-white"
                  />
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="새 비밀번호"
                    className="w-full p-2 border rounded bg-white"
                  />
                  <button
                    onClick={handlePasswordChange}
                    className="bg-[#8b6b4d] text-white px-4 py-2 rounded hover:bg-[#7a5c3d]"
                  >
                    변경
                  </button>
                </div>
              )}
            </div>

            {/* Interests */}
            <div className="bg-white p-6 rounded-lg shadow-md space-y-4 border border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Heart className="text-[#8b6b4d]" />
                  <span className="text-xl font-semibold text-black">관심분야</span>
                </div>
                <button
                  onClick={() => setIsEditingInterests(!isEditingInterests)}
                  className="text-[#8b6b4d] hover:underline"
                >
                  <Edit size={16} />
                </button>
              </div>
              {isEditingInterests ? (
                <div>
                  <input
                    type="text"
                    value={newInterests.join(", ")}
                    onChange={(e) => setNewInterests(e.target.value.split(", "))}
                    className="w-full p-2 border rounded bg-white"
                  />
                  <button
                    onClick={handleInterestsChange}
                    className="mt-2 bg-[#8b6b4d] text-white px-4 py-2 rounded hover:bg-[#7a5c3d]"
                  >
                    저장
                  </button>
                </div>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {user.interests.map((interest, index) => (
                    <span key={index} className="bg-[#e6d5c0] px-3 py-1 rounded-full text-sm text-black">
                      {interest}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Recommended Supplements */}
            <div className="bg-white p-6 rounded-lg shadow-md space-y-4 border border-gray-200">
              <h3 className="text-xl font-semibold text-black">추천 의약품</h3>
              {recommendedSupplements.map((supplement, index) => (
                <div key={index} className="flex items-center space-x-4 border-b border-gray-200 last:border-b-0 pb-4 last:pb-0">
                  <img src={supplement.image} alt={supplement.name} className="w-16 h-16 object-cover rounded" />
                  <div>
                    <h4 className="font-semibold text-black">{supplement.name}</h4>
                    <p className="text-sm text-gray-600">{supplement.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}