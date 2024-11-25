"use client"

import { useState, useEffect } from 'react'
import { User, Calendar, Heart, Lock, Edit, Users, Home } from 'lucide-react'
import Link from 'next/link'
import { Noto_Sans_KR } from 'next/font/google'
import React from 'react';

const interests = [
  "간 건강", "피로 개선", "눈 건강", "관절/뼈 건강",
  "면역력 강화", "소화 건강", "수면 개선", "스트레스 관리",
  "피부 건강", "혈액순환",
];

const notoSansKR = Noto_Sans_KR({
  weight: ['400', '700'],
  subsets: ['latin'],
  display: 'swap',
})

export default function Dashboard() {
  const [user, setUser] = useState<{
    username: string;
    name: string;
    birthDate: string;
    gender: string;
    interests: string[];
  }>({
    username: "",
    name: "",
    birthDate: "",
    gender: "",
    interests: []
  });
  
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
  

  // 사용자 정보를 가져오는 API
  const fetchUserData = async () => {
    try {
      const response = await fetch('http://localhost:8000/users/me', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',  // 쿠키가 자동으로 포함되도록
      })

      if (response.ok) {
        const data = await response.json()
        setUser({
          username: data.username,
          name: data.name,
          birthDate: data.birth_date,
          gender: data.gender,
          interests: data.interests || [],
        })
        setNewName(data.name)
        setNewBirthDate(data.birth_date)
        setNewInterests(data.interests || [])
        setNewGender(data.gender)
      } else {
        console.error("Failed to fetch user data", response.status)
      }
    } catch (error) {
      console.error("Error fetching user data:", error)
    }
  }

  // 사용자 정보 수정 API 호출
  const updateUserInfo = async (updatedData) => {
    try {
      const response = await fetch('http://localhost:8000/users/me', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',  // 쿠키 포함
        body: JSON.stringify(updatedData), // 변경된 데이터를 JSON으로 전송
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log(data.message); // "사용자 정보가 업데이트되었습니다."와 같은 응답 메시지 확인
      } else {
        console.error("Failed to update user info", response.status);
      }
    } catch (error) {
      console.error("Error updating user info:", error);
    }
  };

  // 사용자 관심분야 조회 API 호출
  const fetchUserInterests = async () => {
    try {
      const response = await fetch('http://localhost:8000/users/me/interests', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',  // 쿠키 포함
      });

      if (response.ok) {
        const data = await response.json();  // JSON 응답을 받음

        const mappedInterests = []; // 변환된 관심분야를 저장할 배열

        // 서버에서 받은 interests_id를 기반으로 관심분야 카테고리명을 찾음
        for (let i = 0; i < data.interests.length; i++) {
          const interestId = data.interests[i].interests_id; // 관심분야 ID
          const categoryName = interests[interestId - 1];  // 배열의 인덱스를 맞추기 위해 -1을 함
          mappedInterests.push(categoryName || "알 수 없는 관심분야");  // 유효한 카테고리명이 없으면 기본값
        }

        // 관심분야 개수를 콘솔에 로그로 출력
        console.log("사용자의 관심분야 개수:", data.interests.length);

        // 변환된 관심분야 목록을 상태에 저장
        setUser(prev => ({ ...prev, interests: mappedInterests }));
      } else {
        console.error("Failed to fetch user interests", response.status);
      }
    } catch (error) {
      console.error("Error fetching user interests:", error);
    }
  };

  useEffect(() => {
    fetchUserData()
    fetchUserInterests()  // 사용자의 관심분야도 가져옵니다.
  }, []); // 빈 배열은 컴포넌트가 마운트될 때 한 번만 호출되도록 함.

  const handleNameChange = () => { 
    setUser(prev => ({ ...prev, name: newName })); // 로컬 상태에서 이름 업데이트
    updateUserInfo({ name: newName }); // 서버에 이름 변경 요청
    setIsEditingName(false); // 이름 수정 모드 종료
  };

  const handlePasswordChange = async () => {
    if (!currentPassword || !newPassword) {
      alert("현재 비밀번호와 새 비밀번호를 모두 입력해주세요.");
      return;
    }
  
    try {
      // 비밀번호 변경 API 호출
      const response = await fetch('http://localhost:8000/users/me/password', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // 쿠키 포함
        body: JSON.stringify({
          current_password: currentPassword,
          new_password: newPassword
        })
      });
  
      if (response.ok) {
        const data = await response.json();
        alert(data.message || "비밀번호가 성공적으로 변경되었습니다.");
      } else {
        const errorData = await response.json();
        alert(errorData.error || "비밀번호 변경에 실패했습니다.");
      }
    } catch (error) {
      console.error("비밀번호 변경 중 오류 발생:", error);
      alert("비밀번호 변경 중 오류가 발생했습니다. 나중에 다시 시도해주세요.");
    } finally {
      setIsChangingPassword(false);
      setCurrentPassword("");
      setNewPassword("");
    }
  };

  //생일 변경
  const handleBirthDateChange = () => {
    setUser(prev => ({ ...prev, birthDate: newBirthDate })); // 로컬 상태에서 생일 업데이트
    updateUserInfo({ birth_date: newBirthDate }); // 서버에 생일 변경 요청
    setIsEditingBirthDate(false); // 생일 수정 모드 종료
  };
  
  //관심분야 변경
  
  const YourComponent = ({ user }) => {
    const [isEditingInterests, setIsEditingInterests] = useState(false);
    const [newInterests, setNewInterests] = useState(
      user.interests.map((interest) => interests.indexOf(interest)) || []
    );}
  
  // 관심분야 저장 함수
  const handleInterestsChange = async () => {
    try {
      const response = await fetch("http://localhost:8000/users/me/interests", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // 토큰을 쿠키에서 가져오기 위한 설정
        body: JSON.stringify({ interests: newInterests }),
      });

      if (response.ok) {
        alert("관심분야가 업데이트되었습니다!");
        setUser((prev) => ({ ...prev, interests: newInterests }));
        setIsEditingInterests(false);
      } else {
        const errorData = await response.json();
        alert(errorData.error || "업데이트 중 오류가 발생했습니다.");
      }
    } catch (error) {
      console.error("관심분야 업데이트 실패:", error);
      alert("업데이트 중 오류가 발생했습니다.");
    }
  };

  const handleGenderChange = () => {
    setUser(prev => ({ ...prev, gender: newGender })); // 로컬 상태에서 성별 업데이트
    updateUserInfo({ gender: newGender }); // 서버에 성별 변경 요청
    setIsEditingGender(false); // 성별 수정 모드 종료
  };

    const handleDeleteAccount = async () => {
      const confirmed = window.confirm("정말로 계정을 삭제하시겠습니까?");
      if (!confirmed) return;
  
      try {
        const response = await fetch('http://localhost:8000/users/me', {
          method: 'DELETE',
          credentials: 'include', // 쿠키를 포함하여 요청
        });
  
        if (response.ok) {
          alert("회원 탈퇴가 완료되었습니다.");
          // 탈퇴 완료 후 메인 페이지로 이동
          window.location.href = "/";
        } else {
          const errorData = await response.json();
          alert(errorData.error || "회원 탈퇴 중 오류가 발생했습니다.");
        }
      } catch (error) {
        console.error("회원 탈퇴 중 오류 발생:", error);
        alert("회원 탈퇴 중 오류가 발생했습니다.");
      }
    };

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
                  <p className="text-xl text-gray-600 mb-2">{user.username}</p>
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
      className="text-[#8b6b4d] hover:underline flex items-center space-x-1"
    >
      <Edit size={16} />
      <span>{isEditingInterests ? "취소" : "수정"}</span>
    </button>
  </div>

  {isEditingInterests ? (
    <div>
      {/* 카테고리 버튼 리스트 */}
      <div className="flex flex-wrap gap-2 mt-4">
        {interests.map((interest) => (
          <button
            key={interest}
            onClick={() =>
              setNewInterests((prev) =>
                prev.includes(interest)
                  ? prev.filter((item) => item !== interest)
                  : [...prev, interest]
              )
            }
            className={`px-3 py-1 rounded-full text-sm ${
              newInterests.includes(interest)
                ? "bg-[#8b6b4d] text-white"
                : "bg-[#e6d5c0] text-black"
            }`}
          >
            {interest}
          </button>
        ))}
      </div>

      {/* 저장 버튼 */}
      <button
        onClick={handleInterestsChange}
        className="mt-4 bg-[#8b6b4d] text-white px-4 py-2 rounded hover:bg-[#7a5c3d]"
      >
        저장
      </button>
    </div>
  ) : (
    <div className="flex flex-wrap gap-2 mt-4">
      {user.interests.length > 0 ? (
        user.interests.map((interest, index) => (
          <span
            key={index}
            className="bg-[#e6d5c0] px-3 py-1 rounded-full text-sm text-black"
          >
            {interest}
          </span>
        ))
      ) : (
        <p className="text-gray-500 text-sm">선택된 관심분야가 없습니다.</p>
      )}
    </div>
  )}
</div>

          </div>
        </div>
      </main>
    </div>
  )
}
