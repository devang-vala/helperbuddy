import { Metadata } from 'next'
import dynamic from 'next/dynamic'
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import HeroSection from "@/components/HeroSection"
import ReviewSection from "@/components/ReviewSection"
import FAQSection from "@/components/FAQSection"
import HowItWorksSection from "@/components/HowItWorksSection"
import LatestArticles from "@/components/LatestBlogs"

// Dynamically import ServiceSection with SSR disabled
const ServiceSection = dynamic(() => import('@/components/ServicesSection'), {
  ssr: true
})

export const metadata: Metadata = {
  title: 'Home Services - Professional Home Services at Your Doorstep',
  description: 'Book professional home services including cleaning, repairs, and maintenance. Trusted service providers, competitive prices, and satisfaction guaranteed.',
  keywords: 'home services, cleaning services, repair services, maintenance, professional services',
  openGraph: {
    title: 'Home Services - Professional Home Services at Your Doorstep',
    description: 'Book professional home services including cleaning, repairs, and maintenance. Trusted service providers, competitive prices, and satisfaction guaranteed.',
    type: 'website',
  },
}

export default function Home() {
  return (
    <div className="bg-white dark:bg-gray-900 text-black dark:text-white">
      <Navbar />
      <HeroSection/>
      <ServiceSection />
      <HowItWorksSection />
      <ReviewSection />
      <LatestArticles/>
      <FAQSection/>
      <Footer />
    </div>
  )
}