"use client"

import { useState, useEffect } from "react"
import Input from "@/components/ui/Input"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { User } from 'lucide-react'

export default function Component() {
  const [searchTerm, setSearchTerm] = useState("")
  const [recommendations, setRecommendations] = useState([])
  const [currentSupplement, setCurrentSupplement] = useState(0)
  const [isLoggedIn, setIsLoggedIn] = useState(false); // 로그인 여부 상태
  const router = useRouter()

  useEffect(() => {
    // token 쿠키 존재 여부를 확인하여 로그인 상태 설정
    const cookies = document.cookie.split("; ");
    console.log("All Cookies:", cookies);  // 모든 쿠키 출력
    const tokenCookie = cookies.find(cookie => cookie.startsWith("token="));
    
    if (tokenCookie) {
      setIsLoggedIn(true); // token 쿠키가 존재하면 로그인 상태로 설정
    }
  }, []);

  const handleButtonClick = () => {
    if (isLoggedIn) {
      router.push("/dashboard"); // 로그인된 경우 /dashboard로 리디렉션
    } else {
      router.push("/login"); // 로그인되지 않은 경우 /login으로 리디렉션
    }
  };

  const deleteCookie = (cookieName) => {
    document.cookie = `${cookieName}=; Max-Age=-99999999; path=/;`;  // 쿠키 삭제
  };
  
  

  const handleLogout = () => {
    deleteCookie("token");  // "token" 쿠키 삭제
    setIsLoggedIn(false);  // 로그인 상태 갱신
    router.push("/");  // 로그아웃 후 로그인 페이지로 리디렉션
  };

  // JSON 파일에서 추천 영양소 데이터를 불러옴
  useEffect(() => {
    const fetchSupplements = async () => {
      const response = await fetch("/recommendations.json")
      const data = await response.json()
      setRecommendations(data.supplements)
    }
    fetchSupplements()
  }, [])

  useEffect(() => {
    if (recommendations.length > 0) {
      const interval = setInterval(() => {
        setCurrentSupplement((prevIndex) => (prevIndex + 1) % recommendations.length)
      }, 5000)
      return () => clearInterval(interval)
    }
  }, [recommendations])

  const handleSearch = (e) => {
    const term = e.target.value
    setSearchTerm(term)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch('http://localhost:5000/recommend', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user_input: searchTerm }),
      })
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const recommendations = await response.json()
      console.log("Recommendations received: ", recommendations)
      router.push(`/componentPage?search=${searchTerm}&recommendations=${encodeURIComponent(JSON.stringify(recommendations))}`)
    } catch (error) {
      console.error("Error fetching recommendations: ", error)
    }
  }

  return (
<div className="flex flex-col min-h-[100dvh]">
  <header className="bg-gray-100 py-8 dark:bg-gray-800">
    <div className="container mx-auto px-4 md:px-6 flex items-center justify-center gap-4">
      <div className="flex items-center gap-4 mr-4">
        <PillIcon className="h-8 w-8 text-gray-900 dark:text-gray-50" />
        <h1 className="text-3xl font-bold tracking-tighter">Supplement Advisor</h1>
      </div>
      <form className="relative flex-1 max-w-3xl mx-auto" onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="Enter your symptoms..."
          value={searchTerm}
          onChange={handleSearch}
          className="w-full px-6 py-3 rounded-lg"
        />
        <SearchIcon className="absolute right-4 top-1/2 -translate-y-1/2 h-6 w-6 text-gray-500 dark:text-gray-400" />
      </form>

      <div className="flex items-center gap-4">
        {/* 로그인 여부에 따른 버튼 렌더링 */}
        {isLoggedIn ? (
          <>
            {/* 대시보드 버튼을 User 아이콘 모양의 버튼으로 변경 */}
            <button
              onClick={handleButtonClick}
              className="ml-4 p-3 bg-gray-800 rounded-full text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500/50 transition-colors duration-200"
            >
              <User size={24} className="text-white" />
            </button>
            <button
              onClick={handleLogout}  // 로그아웃 버튼 클릭 시 실행될 함수
              className="ml-4 px-4 py-2 text-black bg-transparent border border-gray-800 rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500/50 transition-colors duration-200 font-medium"
            >
              로그아웃
            </button>
          </>
        ) : (
          <button
            onClick={handleButtonClick}
            className="ml-4 px-6 py-2.5 text-white bg-gray-800 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500/50 transition-colors duration-200 font-medium shadow-sm"
          >
            로그인
          </button>
        )}
      </div>
    </div>
  </header>

      {/* 5초마다 바뀌는 Omega-3 Supplement 텍스트 부분 */}
      <section className="w-full flex items-center justify-center py-12 md:py-24 lg:py-32 bg-[#f0f0f0] dark:bg-[#f8f8f0]">
        <div className="container grid items-center gap-6 px-4 md:px-6 lg:grid-cols-2 lg:gap-10">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tighter md:text-3xl">{recommendations[currentSupplement]?.name}</h2>
            <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              {recommendations[currentSupplement]?.description}
            </p>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Link
                href="#"
                className="inline-flex h-10 items-center justify-center rounded-md bg-gray-900 px-8 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
                prefetch={false}
              >
                Buy Now
              </Link>
            </div>
          </div>
          <img
            src={recommendations[currentSupplement]?.image}
            width="400"
            height="400"
            alt="Supplement"
            className="mx-auto aspect-square overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last"
          />
        </div>
      </section>

      <section className="w-full flex items-center justify-center py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
            <div>
              <h2 className="text-2xl font-bold tracking-tighter md:text-3xl">Why Choose {recommendations[currentSupplement]?.name}? </h2>
              <ul className="mt-4 text-gray-500 dark:text-gray-400">
              {recommendations[currentSupplement]?.whyChoose}
              </ul>
            </div>
            <div>
              <h2 className="text-2xl font-bold tracking-tighter md:text-3xl">Ingredients</h2>
              <ul className="mt-4 space-y-2 text-gray-500 dark:text-gray-400">
                <li>
                  <CheckIcon className="mr-2 inline-block h-4 w-4 text-gray-900 dark:text-gray-50" />
                  {recommendations[currentSupplement]?.ingredients[0]}
                </li>
                <li>
                  <CheckIcon className="mr-2 inline-block h-4 w-4 text-gray-900 dark:text-gray-50" />
                  {recommendations[currentSupplement]?.ingredients[1]}
                </li>
                <li>
                  <CheckIcon className="mr-2 inline-block h-4 w-4 text-gray-900 dark:text-gray-50" />
                  {recommendations[currentSupplement]?.ingredients[2]}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      <section className="w-full flex items-center justify-center py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
        <div className="container px-4 md:px-6">
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
            <div>
              <h2 className="text-2xl font-bold tracking-tighter md:text-3xl">Benefits</h2>
              <ul className="mt-4 space-y-2 text-gray-500 dark:text-gray-400">
                <li>
                  <CheckIcon className="mr-2 inline-block h-4 w-4 text-gray-900 dark:text-gray-50" />
                  {recommendations[currentSupplement]?.benefits[0]}
                </li>
                <li>
                  <CheckIcon className="mr-2 inline-block h-4 w-4 text-gray-900 dark:text-gray-50" />
                  {recommendations[currentSupplement]?.benefits[1]}
                </li>
                <li>
                  <CheckIcon className="mr-2 inline-block h-4 w-4 text-gray-900 dark:text-gray-50" />
                  {recommendations[currentSupplement]?.benefits[2]}
                </li>
                <li>
                  <CheckIcon className="mr-2 inline-block h-4 w-4 text-gray-900 dark:text-gray-50" />
                  {recommendations[currentSupplement]?.benefits[3]}
                </li>
              </ul>
            </div>
            <div>
              <h2 className="text-2xl font-bold tracking-tighter md:text-3xl">Precautions!</h2>
              <ul className="mt-4 text-gray-500 dark:text-gray-400">
              <li>
                  {recommendations[currentSupplement]?.precautions[0]}
                </li>
                <li>
                  {recommendations[currentSupplement]?.precautions[1]}
                </li>
                <li>
                  {recommendations[currentSupplement]?.precautions[2]}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      <footer className="bg-gray-100 p-6 md:py-12 w-full dark:bg-gray-800">
        <div className="container mx-auto max-w-7xl grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8 text-sm">
          <div className="grid gap-1">
            <h3 className="font-semibold">Company</h3>
            <Link href="#" prefetch={false}>
              About Us
            </Link>
            <Link href="#" prefetch={false}>
              Our Team
            </Link>
            <Link href="#" prefetch={false}>
              Careers
            </Link>
            <Link href="#" prefetch={false}>
              News
            </Link>
          </div>
          <div className="grid gap-1">
            <h3 className="font-semibold">Products</h3>
            <Link href="#" prefetch={false}>
              Omega-3
            </Link>
            <Link href="#" prefetch={false}>
              Vitamin D
            </Link>
            <Link href="#" prefetch={false}>
              Probiotics
            </Link>
            <Link href="#" prefetch={false}>
              Multivitamin
            </Link>
          </div>
          <div className="grid gap-1">
            <h3 className="font-semibold">Resources</h3>
            <Link href="#" prefetch={false}>
              Blog
            </Link>
            <Link href="#" prefetch={false}>
              FAQ
            </Link>
            <Link href="#" prefetch={false}>
              Guides
            </Link>
            <Link href="#" prefetch={false}>
              Videos
            </Link>
          </div>
          <div className="grid gap-1">
            <h3 className="font-semibold">Legal</h3>
            <Link href="#" prefetch={false}>
              Privacy Policy
            </Link>
            <Link href="#" prefetch={false}>
              Terms of Service
            </Link>
            <Link href="#" prefetch={false}>
              Refund Policy
            </Link>
          </div>
          <div className="grid gap-1">
            <h3 className="font-semibold">Contact</h3>
            <Link href="#" prefetch={false}>
              Support
            </Link>
            <Link href="#" prefetch={false}>
              Sales
            </Link>
            <Link href="#" prefetch={false}>
              Wholesale
            </Link>
            <Link href="#" prefetch={false}>
              Partnerships
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

function CheckIcon(props) {
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
      <path d="M20 6 9 17l-5-5" />
    </svg>
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
      <path d="m21 21-4.35-4.35" />
      <circle cx="10" cy="10" r="7" />
    </svg>
  )
}
