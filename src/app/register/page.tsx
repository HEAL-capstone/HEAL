"use client";

import { useState, KeyboardEvent } from "react";
import { useRouter } from "next/navigation";
import { User, Lock, UserCircle, Calendar, Users, Pill } from "lucide-react";

export default function Register() {
  const [step, setStep] = useState(1);
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [gender, setGender] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const focusNextInput = () => {
    const inputs = ["id", "password", "name", "birthDate", "gender"];
    const currentIndex = inputs.indexOf(document.activeElement?.id || "");
    if (currentIndex < inputs.length - 1) {
      const nextInput = document.getElementById(inputs[currentIndex + 1]);
      nextInput?.focus();
    }
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement | HTMLSelectElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (step < 5) {
        setStep(step + 1);
        focusNextInput();
      } else {
        handleNext();
      }
    }
  };

  const validatePassword = (password: string): { isValid: boolean; message: string } => {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    if (password.length < minLength) {
      return { isValid: false, message: `비밀번호는 최소 ${minLength}자 이상이어야 합니다.` };
    }
    if (!hasUpperCase) {
      return { isValid: false, message: "비밀번호에는 대문자가 포함되어야 합니다." };
    }
    if (!hasLowerCase) {
      return { isValid: false, message: "비밀번호에는 소문자가 포함되어야 합니다." };
    }
    if (!hasNumber) {
      return { isValid: false, message: "비밀번호에는 숫자가 포함되어야 합니다." };
    }
    if (!hasSpecialChar) {
      return { isValid: false, message: "비밀번호에는 특수문자가 포함되어야 합니다." };
    }
    return { isValid: true, message: "" };
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setPassword(newPassword);

    const { isValid, message } = validatePassword(newPassword);
    if (!isValid) {
      setError(message); // 오류 메시지 표시
    } else {
      setError(""); // 오류 초기화
    }
  };

  const validateId = (id: string): { isValid: boolean; message: string } => {
    const idPattern = /^[a-zA-Z0-9]{4,}$/;
    if (!idPattern.test(id)) {
      return { isValid: false, message: "아이디는 최소 4자 이상, 영문과 숫자만 포함할 수 있습니다." };
    }
    return { isValid: true, message: "" };
  };

  const validateName = (name: string): { isValid: boolean; message: string } => {
    if (name.trim().length < 2) {
      return { isValid: false, message: "이름은 2자 이상이어야 합니다." };
    }
    return { isValid: true, message: "" };
  };

  const validateBirthDate = (birthDate: string): { isValid: boolean; message: string } => {
    const birthDatePattern = /^\d{4}-\d{2}-\d{2}$/;
    if (!birthDatePattern.test(birthDate)) {
      return { isValid: false, message: "유효한 생년월일을 입력해주세요." };
    }
    return { isValid: true, message: "" };
  };

  const validateGender = (gender: string): { isValid: boolean; message: string } => {
    if (!gender) {
      return { isValid: false, message: "성별을 선택해주세요." };
    }
    return { isValid: true, message: "" };
  };

  const handleNext = () => {
    const idValidation = validateId(id);
    const passwordValidation = validatePassword(password);
    const nameValidation = validateName(name);
    const birthDateValidation = validateBirthDate(birthDate);
    const genderValidation = validateGender(gender);

    if (!idValidation.isValid) {
      setError(idValidation.message);
      return;
    }
    if (!passwordValidation.isValid) {
      setError(passwordValidation.message);
      return;
    }
    if (!nameValidation.isValid) {
      setError(nameValidation.message);
      return;
    }
    if (!birthDateValidation.isValid) {
      setError(birthDateValidation.message);
      return;
    }
    if (!genderValidation.isValid) {
      setError(genderValidation.message);
      return;
    }

    const userData = {
      username: id,
      password: password,
      name: name,
      gender: gender,
      birth_date: birthDate,
    };

    sessionStorage.setItem("userData", JSON.stringify(userData));
    router.push("/interests"); // 관심분야 선택 페이지로 이동
  };

  const transitionClass = "transition-all duration-500 ease-in-out max-h-0 overflow-hidden";

  const renderStep = (currentStep: number) => {
    const isVisible = currentStep <= step;
    const visibilityClass = isVisible ? "max-h-20 opacity-100 mb-4" : "max-h-0 opacity-0";

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
          );
        case 2:
          return (
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                id="password"
                type="password"
                value={password}
                onChange={handlePasswordChange}
                onKeyPress={handleKeyPress}
                required
                className="w-full pl-10 pr-3 py-2 bg-white bg-opacity-20 rounded-md focus:outline-none focus:ring-2 focus:ring-[#E8DCCA] text-white placeholder-gray-300"
                placeholder="비밀번호"
              />
              {error && <p className="mt-1 text-red-500 text-sm">{error}</p>}
            </div>
          );
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
          );
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
          );
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
                <option value="" disabled>
                  성별 선택
                </option>
                <option value="male">남성</option>
                <option value="female">여성</option>
              </select>
            </div>
          );
        default:
          return null;
      }
    };

    return (
      <div className={`${transitionClass} ${visibilityClass}`}>
        {renderContent()}
      </div>
    );
  };

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
                  onClick={handleNext}
                  className="w-full bg-[#E8DCCA] text-gray-700 py-2 px-4 rounded-md hover:bg-[#D8CCBA] transition duration-300"
                >
                  다음
                </button>
              )}
            </form>
            <p className="mt-4 text-sm text-center text-white">
              {step < 5 ? "엔터를 눌러 다음으로 진행하세요" : "모든 정보를 입력한 후 '다음' 버튼을 클릭하세요"}
            </p>
            {error && <p className="mt-2 text-red-500 text-sm text-center">{error}</p>}
          </div>
        </div>
      </main>

      <footer className="p-4 text-center text-white text-sm">
        <p>&copy; 2024 HEAL. All rights reserved.</p>
      </footer>
    </div>
  );
}
