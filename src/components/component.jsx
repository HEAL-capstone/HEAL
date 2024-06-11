/**
 * v0 by Vercel.
 * @see https://v0.dev/t/1L2JhMCcV1r
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
"use client"

import { useState } from "react"
import Input from "@/components/ui/Input"
import Link from "next/link"

export default function Component() {
  const [searchTerm, setSearchTerm] = useState("")
  const [recommendations, setRecommendations] = useState([])
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
  return (
    <div className="flex flex-col min-h-[100dvh]">
      <header className="bg-gray-100 py-8 dark:bg-gray-800">
        <div className="container mx-auto px-4 md:px-6 flex items-center justify-center gap-4">
          <div className="flex items-center gap-4 mr-4">
            <PillIcon className="h-8 w-8 text-gray-900 dark:text-gray-50" />
            <h1 className="text-3xl font-bold tracking-tighter">Supplement Advisor</h1>
          </div>
          <div className="relative flex-1 max-w-3xl mx-auto">
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
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
          <div className="container grid gap-8 px-4 md:px-6 lg:grid-cols-3">
            {recommendations.map((recommendation, index) => (
              <div
                key={index}
                className="flex flex-col items-start gap-4 rounded-lg bg-white p-6 shadow transition-all hover:scale-105 dark:bg-gray-950"
              >
                <h2 className="text-2xl font-bold tracking-tighter">{recommendation.name}</h2>
                <p className="text-gray-500 dark:text-gray-400">{recommendation.description}</p>
                <Link
                  href="#"
                  className="inline-flex h-10 items-center justify-center rounded-md bg-gray-900 px-8 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
                  prefetch={false}
                >
                  Learn More
                </Link>
              </div>
            ))}
          </div>
        </section>
      )}
      <section className="w-full flex items-center justify-center py-12 md:py-24 lg:py-32 bg-[#f0f0f0] dark:bg-[#f8f8f0]">
        <div className="container grid items-center gap-6 px-4 md:px-6 lg:grid-cols-2 lg:gap-10">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tighter md:text-3xl">Omega-3 Supplement</h2>
            <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              Boost your heart and brain health with our premium Omega-3 fish oil supplement.
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
            src="/supplement.jpg"
            width="400"
            height="400"
            alt="Omega-3 Supplement"
            className="mx-auto aspect-square overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last"
          />
        </div>
      </section>
      <section className="w-full flex items-center justify-center py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
            <div>
              <h2 className="text-2xl font-bold tracking-tighter md:text-3xl">Product Details</h2>
              <p className="mt-4 text-gray-500 dark:text-gray-400">
                Our Omega-3 supplement is made from high-quality fish oil sourced from sustainable fisheries. Each
                softgel contains a potent blend of EPA and DHA to support heart and brain health.
              </p>
            </div>
            <div>
              <h2 className="text-2xl font-bold tracking-tighter md:text-3xl">Ingredients</h2>
              <ul className="mt-4 space-y-2 text-gray-500 dark:text-gray-400">
                <li>
                  <CheckIcon className="mr-2 inline-block h-4 w-4 text-gray-900 dark:text-gray-50" />
                  Fish Oil Concentrate
                </li>
                <li>
                  <CheckIcon className="mr-2 inline-block h-4 w-4 text-gray-900 dark:text-gray-50" />
                  EPA (Eicosapentaenoic Acid)
                </li>
                <li>
                  <CheckIcon className="mr-2 inline-block h-4 w-4 text-gray-900 dark:text-gray-50" />
                  DHA (Docosahexaenoic Acid)
                </li>
                <li>
                  <CheckIcon className="mr-2 inline-block h-4 w-4 text-gray-900 dark:text-gray-50" />
                  Gelatin Capsule
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
                  Supports heart health and cardiovascular function
                </li>
                <li>
                  <CheckIcon className="mr-2 inline-block h-4 w-4 text-gray-900 dark:text-gray-50" />
                  Promotes brain health and cognitive function
                </li>
                <li>
                  <CheckIcon className="mr-2 inline-block h-4 w-4 text-gray-900 dark:text-gray-50" />
                  Helps reduce inflammation in the body
                </li>
                <li>
                  <CheckIcon className="mr-2 inline-block h-4 w-4 text-gray-900 dark:text-gray-50" />
                  Sourced from sustainable fisheries
                </li>
              </ul>
            </div>
            <div>
              <h2 className="text-2xl font-bold tracking-tighter md:text-3xl">Why Choose Our Omega-3?</h2>
              <p className="mt-4 text-gray-500 dark:text-gray-400">
                Our Omega-3 supplement is formulated with the highest quality fish oil to ensure maximum potency and
                purity. We use a proprietary extraction process to concentrate the EPA and DHA for optimal absorption
                and benefits.
              </p>
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
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  )
}


// /**
//  * v0 by Vercel.
//  * @see https://v0.dev/t/1L2JhMCcV1r
//  * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
//  */
// "use client"

// import { useState } from "react"
// import Input from "@/components/ui/Input"
// import Link from "next/link"

// export default function Component() {
//   const [searchTerm, setSearchTerm] = useState("")
//   const [recommendations, setRecommendations] = useState([])
//   const handleSearch = (e) => {
//     const term = e.target.value
//     setSearchTerm(term)
//     processSymptoms(term)
//   }
//   const processSymptoms = (term) => {
//     let recommendations = []
//     if (term.toLowerCase().includes("heart")) {
//       recommendations = [
//         {
//           name: "Omega-3 Supplement",
//           description: "Supports heart health and cardiovascular function",
//         },
//         {
//           name: "Vitamin D",
//           description: "Helps maintain healthy heart function",
//         },
//         {
//           name: "Probiotics",
//           description: "Supports gut health, which can benefit heart health",
//         },
//       ]
//     } else if (term.toLowerCase().includes("brain")) {
//       recommendations = [
//         {
//           name: "Omega-3 Supplement",
//           description: "Promotes brain health and cognitive function",
//         },
//         {
//           name: "Multivitamin",
//           description: "Provides essential nutrients for brain function",
//         },
//         {
//           name: "Ginkgo Biloba",
//           description: "Helps improve blood flow and oxygen to the brain",
//         },
//       ]
//     } else if (term.toLowerCase().includes("inflammation")) {
//       recommendations = [
//         {
//           name: "Omega-3 Supplement",
//           description: "Helps reduce inflammation in the body",
//         },
//         {
//           name: "Turmeric",
//           description: "Contains curcumin, a powerful anti-inflammatory compound",
//         },
//         {
//           name: "Ginger",
//           description: "Has anti-inflammatory properties and can help reduce pain",
//         },
//       ]
//     }
//     setRecommendations(recommendations)
//   }
//   return (
//     <div className="flex flex-col min-h-[100dvh]">
//       <header className="bg-gray-100 py-8 dark:bg-gray-800">
//         <div className="container px-4 md:px-6 flex items-center justify-center gap-4">
//           <div className="flex items-center gap-4 mr-4">
//             <PillIcon className="h-8 w-8 text-gray-900 dark:text-gray-50" />
//             <h1 className="text-3xl font-bold tracking-tighter">Supplement Advisor</h1>
//           </div>
//           <div className="relative flex-1 max-w-3xl">
//             <Input
//               type="text"
//               placeholder="Enter your symptoms..."
//               value={searchTerm}
//               onChange={handleSearch}
//               className="w-full px-6 py-3 rounded-lg"
//             />
//             <SearchIcon className="absolute right-4 top-1/2 -translate-y-1/2 h-6 w-6 text-gray-500 dark:text-gray-400" />
//           </div>
//         </div>
//       </header>
//       {recommendations.length > 0 && (
//         <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
//           <div className="container grid gap-8 px-4 md:px-6 lg:grid-cols-3">
//             {recommendations.map((recommendation, index) => (
//               <div
//                 key={index}
//                 className="flex flex-col items-start gap-4 rounded-lg bg-white p-6 shadow transition-all hover:scale-105 dark:bg-gray-950"
//               >
//                 <h2 className="text-2xl font-bold tracking-tighter">{recommendation.name}</h2>
//                 <p className="text-gray-500 dark:text-gray-400">{recommendation.description}</p>
//                 <Link
//                   href="#"
//                   className="inline-flex h-10 items-center justify-center rounded-md bg-gray-900 px-8 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
//                   prefetch={false}
//                 >
//                   Learn More
//                 </Link>
//               </div>
//             ))}
//           </div>
//         </section>
//       )}
//       <section className="w-full py-12 md:py-24 lg:py-32 bg-[#f0f0f0] dark:bg-[#f8f8f0]">
//         <div className="container grid items-center gap-6 px-4 md:px-6 lg:grid-cols-2 lg:gap-10">
//           <div className="space-y-4">
//             <h2 className="text-2xl font-bold tracking-tighter md:text-3xl">Omega-3 Supplement</h2>
//             <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
//               Boost your heart and brain health with our premium Omega-3 fish oil supplement.
//             </p>
//             <div className="flex flex-col gap-2 min-[400px]:flex-row">
//               <Link
//                 href="#"
//                 className="inline-flex h-10 items-center justify-center rounded-md bg-gray-900 px-8 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
//                 prefetch={false}
//               >
//                 Buy Now
//               </Link>
//             </div>
//           </div>
//           <img
//             src="/placeholder.svg"
//             width="400"
//             height="400"
//             alt="Omega-3 Supplement"
//             className="mx-auto aspect-square overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last"
//           />
//         </div>
//       </section>
//       <section className="w-full py-12 md:py-24 lg:py-32">
//         <div className="container px-4 md:px-6">
//           <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
//             <div>
//               <h2 className="text-2xl font-bold tracking-tighter md:text-3xl">Product Details</h2>
//               <p className="mt-4 text-gray-500 dark:text-gray-400">
//                 Our Omega-3 supplement is made from high-quality fish oil sourced from sustainable fisheries. Each
//                 softgel contains a potent blend of EPA and DHA to support heart and brain health.
//               </p>
//             </div>
//             <div>
//               <h2 className="text-2xl font-bold tracking-tighter md:text-3xl">Ingredients</h2>
//               <ul className="mt-4 space-y-2 text-gray-500 dark:text-gray-400">
//                 <li>
//                   <CheckIcon className="mr-2 inline-block h-4 w-4 text-gray-900 dark:text-gray-50" />
//                   Fish Oil Concentrate
//                 </li>
//                 <li>
//                   <CheckIcon className="mr-2 inline-block h-4 w-4 text-gray-900 dark:text-gray-50" />
//                   EPA (Eicosapentaenoic Acid)
//                 </li>
//                 <li>
//                   <CheckIcon className="mr-2 inline-block h-4 w-4 text-gray-900 dark:text-gray-50" />
//                   DHA (Docosahexaenoic Acid)
//                 </li>
//                 <li>
//                   <CheckIcon className="mr-2 inline-block h-4 w-4 text-gray-900 dark:text-gray-50" />
//                   Gelatin Capsule
//                 </li>
//               </ul>
//             </div>
//           </div>
//         </div>
//       </section>
//       <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
//         <div className="container px-4 md:px-6">
//           <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
//             <div>
//               <h2 className="text-2xl font-bold tracking-tighter md:text-3xl">Benefits</h2>
//               <ul className="mt-4 space-y-2 text-gray-500 dark:text-gray-400">
//                 <li>
//                   <CheckIcon className="mr-2 inline-block h-4 w-4 text-gray-900 dark:text-gray-50" />
//                   Supports heart health and cardiovascular function
//                 </li>
//                 <li>
//                   <CheckIcon className="mr-2 inline-block h-4 w-4 text-gray-900 dark:text-gray-50" />
//                   Promotes brain health and cognitive function
//                 </li>
//                 <li>
//                   <CheckIcon className="mr-2 inline-block h-4 w-4 text-gray-900 dark:text-gray-50" />
//                   Helps reduce inflammation in the body
//                 </li>
//                 <li>
//                   <CheckIcon className="mr-2 inline-block h-4 w-4 text-gray-900 dark:text-gray-50" />
//                   Sourced from sustainable fisheries
//                 </li>
//               </ul>
//             </div>
//             <div>
//               <h2 className="text-2xl font-bold tracking-tighter md:text-3xl">Why Choose Our Omega-3?</h2>
//               <p className="mt-4 text-gray-500 dark:text-gray-400">
//                 Our Omega-3 supplement is formulated with the highest quality fish oil to ensure maximum potency and
//                 purity. We use a proprietary extraction process to concentrate the EPA and DHA for optimal absorption
//                 and benefits.
//               </p>
//             </div>
//           </div>
//         </div>
//       </section>
//       <footer className="bg-gray-100 p-6 md:py-12 w-full dark:bg-gray-800">
//         <div className="container max-w-7xl grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8 text-sm">
//           <div className="grid gap-1">
//             <h3 className="font-semibold">Company</h3>
//             <Link href="#" prefetch={false}>
//               About Us
//             </Link>
//             <Link href="#" prefetch={false}>
//               Our Team
//             </Link>
//             <Link href="#" prefetch={false}>
//               Careers
//             </Link>
//             <Link href="#" prefetch={false}>
//               News
//             </Link>
//           </div>
//           <div className="grid gap-1">
//             <h3 className="font-semibold">Products</h3>
//             <Link href="#" prefetch={false}>
//               Omega-3
//             </Link>
//             <Link href="#" prefetch={false}>
//               Vitamin D
//             </Link>
//             <Link href="#" prefetch={false}>
//               Probiotics
//             </Link>
//             <Link href="#" prefetch={false}>
//               Multivitamin
//             </Link>
//           </div>
//           <div className="grid gap-1">
//             <h3 className="font-semibold">Resources</h3>
//             <Link href="#" prefetch={false}>
//               Blog
//             </Link>
//             <Link href="#" prefetch={false}>
//               FAQ
//             </Link>
//             <Link href="#" prefetch={false}>
//               Guides
//             </Link>
//             <Link href="#" prefetch={false}>
//               Videos
//             </Link>
//           </div>
//           <div className="grid gap-1">
//             <h3 className="font-semibold">Legal</h3>
//             <Link href="#" prefetch={false}>
//               Privacy Policy
//             </Link>
//             <Link href="#" prefetch={false}>
//               Terms of Service
//             </Link>
//             <Link href="#" prefetch={false}>
//               Refund Policy
//             </Link>
//           </div>
//           <div className="grid gap-1">
//             <h3 className="font-semibold">Contact</h3>
//             <Link href="#" prefetch={false}>
//               Support
//             </Link>
//             <Link href="#" prefetch={false}>
//               Sales
//             </Link>
//             <Link href="#" prefetch={false}>
//               Wholesale
//             </Link>
//             <Link href="#" prefetch={false}>
//               Partnerships
//             </Link>
//           </div>
//         </div>
//       </footer>
//     </div>
//   )
// }

// function CheckIcon(props) {
//   return (
//     <svg
//       {...props}
//       xmlns="http://www.w3.org/2000/svg"
//       width="24"
//       height="24"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     >
//       <path d="M20 6 9 17l-5-5" />
//     </svg>
//   )
// }


// function PillIcon(props) {
//   return (
//     <svg
//       {...props}
//       xmlns="http://www.w3.org/2000/svg"
//       width="24"
//       height="24"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     >
//       <path d="m10.5 20.5 10-10a4.95 4.95 0 1 0-7-7l-10 10a4.95 4.95 0 1 0 7 7Z" />
//       <path d="m8.5 8.5 7 7" />
//     </svg>
//   )
// }


// function SearchIcon(props) {
//   return (
//     <svg
//       {...props}
//       xmlns="http://www.w3.org/2000/svg"
//       width="24"
//       height="24"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     >
//       <circle cx="11" cy="11" r="8" />
//       <path d="m21 21-4.3-4.3" />
//     </svg>
//   )
// }