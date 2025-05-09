"use client"

import React, { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  CalendarDays,
  Clock,
  MapPin,
  Users,
  Zap,
  Briefcase,
  DollarSign,
  Award,
  Globe,
  Users2,
  Heart,
  BarChart3,
  TrendingUp,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { TestimonialCard } from "@/components/testimonial-card"
import { TicketCard } from "@/components/ticket-card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { AnimatedText } from "@/components/animated-text"
import { AnimatedSection } from "@/components/animated-section"
import { AnimatedCard } from "@/components/animated-card"
import { HostSection } from "@/components/host-section"
import { SpeakersSection } from "@/components/speakers-section"
import dynamic from "next/dynamic"
import { Suspense } from "react"

// WebGL detection function
const hasWebGL = () => {
  if (typeof window === "undefined") return false
  try {
    const canvas = document.createElement("canvas")
    const context = (canvas.getContext("webgl") || canvas.getContext("experimental-webgl")) as WebGLRenderingContext | null
    const hasContext = !!context
    if (context && typeof context.getParameter === "function") {
      // Additional check to ensure WebGL is fully functional
      try {
        context.getParameter(context.VERSION)
        return true
      } catch (e) {
        return false
      }
    }
    return hasContext
  } catch (e) {
    return false
  }
}

// Fallback components for when 3D fails
const LogoFallback = () => (
  <div className="w-full h-[300px] flex items-center justify-center">
    <div className="text-center">
      <div className="w-24 h-24 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
        <span className="font-bold text-2xl">BGC</span>
      </div>
      <h3 className="text-xl font-bold">Business Growth Conference</h3>
    </div>
  </div>
)

const GrowthChartFallback = () => (
  <div className="w-full h-[400px] flex items-center justify-center bg-zinc-900 rounded-lg">
    <div className="text-center max-w-md px-4">
      <h3 className="text-xl font-bold mb-2">Business Growth Visualization</h3>
      <p className="text-zinc-400 mb-4">
        Our conference will show you proven strategies to scale your business to 10 figures with sustainable growth.
      </p>
      <div className="w-full h-2 bg-zinc-800 rounded-full mb-6">
        <div className="h-full w-3/4 bg-red-600 rounded-full"></div>
      </div>
      <div className="flex justify-between text-sm">
        <span>Starting Point</span>
        <span className="text-red-500 font-bold">500% Growth</span>
        <span>10 Figures</span>
      </div>
    </div>
  </div>
)

const TopicCubeFallback = () => (
  <div className="w-full h-[400px] flex items-center justify-center bg-zinc-900 rounded-lg">
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 p-6 max-w-2xl">
      {["Business Growth", "Sales Mastery", "Team Building", "Digital Leverage", "Funding", "Brand Building"].map(
        (topic, i) => (
          <div key={i} className="bg-black p-4 rounded-lg border border-red-600/30 text-center">
            <h4 className="font-bold">{topic}</h4>
          </div>
        ),
      )}
    </div>
  </div>
)

const LocationGlobeFallback = () => (
  <div className="w-full h-[500px] flex items-center justify-center bg-zinc-900 rounded-lg">
    <div className="text-center max-w-md px-4">
      <h3 className="text-xl font-bold mb-4">Event Locations</h3>
      <div className="grid grid-cols-2 gap-6 mb-6">
        <div className="bg-black p-4 rounded-lg border border-red-600/30">
          <h4 className="font-bold mb-2">US</h4>
          <p className="text-sm text-zinc-400">April 12-13, 2025</p>
        </div>
        <div className="bg-black p-4 rounded-lg border border-red-600/30">
          <h4 className="font-bold mb-2">UK</h4>
          <p className="text-sm text-zinc-400">April 19-20, 2025</p>
        </div>
      </div>
      <p className="text-zinc-400 text-sm">
        Join us at these premier locations for an unforgettable business growth experience.
      </p>
    </div>
  </div>
)

// Dynamically import 3D components with WebGL detection
const AnimatedLogo = dynamic(
  () =>
    hasWebGL()
      ? import("@/components/3d/animated-logo").then((mod) => mod.AnimatedLogo)
      : Promise.resolve(LogoFallback),
  {
    ssr: false,
    loading: () => <LogoFallback />,
  },
)

const GrowthChart = dynamic(
  () =>
    hasWebGL()
      ? import("@/components/3d/growth-chart").then((mod) => mod.GrowthChart)
      : Promise.resolve(GrowthChartFallback),
  {
    ssr: false,
    loading: () => <GrowthChartFallback />,
  },
)

const TopicCube = dynamic(
  () =>
    hasWebGL() ? import("@/components/3d/topic-cube").then((mod) => mod.TopicCube) : Promise.resolve(TopicCubeFallback),
  {
    ssr: false,
    loading: () => <TopicCubeFallback />,
  },
)

const LocationGlobe = dynamic(
  () =>
    hasWebGL()
      ? import("@/components/3d/location-globe").then((mod) => mod.LocationGlobe)
      : Promise.resolve(LocationGlobeFallback),
  {
    ssr: false,
    loading: () => <LocationGlobeFallback />,
  },
)

// Simple error boundary component
class ErrorBoundary extends React.Component<{ children: React.ReactNode; fallback: React.ReactNode }> {
  state = { hasError: false }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error: any, info: any) {
    console.error("3D component error:", error, info)
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback
    }
    return this.props.children
  }
}

export default function Home() {
  // Client-side WebGL detection
  const [webGLSupported, setWebGLSupported] = useState(true)

  useEffect(() => {
    setWebGLSupported(hasWebGL())
  }, [])

  // Updated benefits with icons
  const benefits = [
    {
      title: "Proven Scaling Strategies",
      description: "Learn how to expand your business rapidly without incurring debt.",
      icon: TrendingUp,
    },
    {
      title: "Smart Financial Management",
      description: "Discover methods to increase revenue while reducing workload.",
      icon: DollarSign,
    },
    {
      title: "Funding Acquisition",
      description: "Explore avenues to secure funding without falling into debt traps.",
      icon: Briefcase,
    },
    {
      title: "Brand Building",
      description: "Master the art of creating a strong brand that dominates your market.",
      icon: Award,
    },
    {
      title: "Digital Leverage",
      description: "Utilize digital platforms to attract more customers and scale efficiently.",
      icon: Globe,
    },
    {
      title: "Team Building",
      description: "Assemble a powerhouse team that propels your business forward.",
      icon: Users2,
    },
    {
      title: "Customer Retention",
      description: "Implement strategies to convert buyers into loyal, repeat customers.",
      icon: Heart,
    },
    {
      title: "Cost Management",
      description: "Balance quality and cost to deliver premium products/services sustainably.",
      icon: BarChart3,
    },
    {
      title: "Sales Mastery",
      description: "Enhance your lead generation and sales techniques to attract high-paying clients.",
      icon: TrendingUp,
    },
    {
      title: "Business Automation",
      description: "Integrate AI and automation to streamline operations and boost productivity.",
      icon: Zap,
    },
  ]

  // Updated testimonials
  const testimonials = [
    {
      quote:
        "Attending the Business Growth Conference was a game-changer. The insights and strategies shared were invaluable.",
      author: "Sarah W.",
      role: "Entrepreneur",
    },
    {
      quote:
        "Attending this event in Dallas was truly life-changing. The insights from industry leaders were invaluable, and I left with practical strategies to grow my wealth. This event is a must for anyone serious about financial freedom!",
      author: "Michelle K.",
      role: "Financial Consultant",
    },
    {
      quote:
        "I travelled from out of state to attend this event, and it was worth every minute. The knowledge shared was not only practical but also inspiring. The festival left me motivated and equipped to take the next step in my wealth-building journey.",
      author: "Carlos J.",
      role: "Real Estate Developer",
    },
    {
      quote:
        "This event was an eye-opener. From the keynote speakers to the panel sessions, I walked away with a new perspective on wealth creation. It was an empowering experience that's already making a difference in my personal and professional life.",
      author: "Emily L.",
      role: "Business Owner",
    },
  ]

  // Updated target audience
  const targetAudience = [
    {
      title: "Entrepreneurs",
      description: "Aiming to scale their businesses.",
    },
    {
      title: "Business Owners",
      description: "Seeking sustainable growth strategies.",
    },
    {
      title: "Professionals",
      description: "Interested in investment and wealth creation.",
    },
    {
      title: "Startups",
      description: "Looking to establish a strong market presence.",
    },
    {
      title: "Investors",
      description: "Exploring new opportunities for diversification.",
    },
  ]

  // Add speaker information
  const speakers = [
    {
      name: "Dr. Cosmas Maduka",
      role: "Speaker",
      bio: "Distinguished business leader and entrepreneur",
      image: "/images/dr-cosmas.png",
    },
    {
      name: "Dr. Stephen Akintayo",
      role: "Convener",
      bio: "Business Growth Strategist & Founder of Stephen Akintayo Foundation",
      image: "/images/dr-stephen.png",
    },
  ]

  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/placeholder.svg?height=1080&width=1920"
            alt="Business conference"
            fill
            className="object-cover opacity-30"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/90"></div>
        </div>

        <div className="container relative z-10 mx-auto px-4 text-center">
          <AnimatedSection animation="fadeIn" delay={0.5}>
            <div className="mb-6 flex justify-center">
              <ErrorBoundary fallback={<LogoFallback />}>
                <Suspense fallback={<LogoFallback />}>
                  <AnimatedLogo />
                </Suspense>
              </ErrorBoundary>
            </div>
          </AnimatedSection>

          <div className="flex flex-col items-center">
            <div className="flex items-center mb-4">
              <AnimatedText
                text="UK&US"
                className="text-xl md:text-2xl font-medium mb-2 text-white"
                animation="fadeIn"
                delay={1.3}
              />
            </div>
            <AnimatedText
              text="BU$INESS"
              className="text-5xl md:text-7xl font-bold tracking-tight"
              animation="typewriter"
              delay={0.8}
            />
            <AnimatedText
              text="GROWTH"
              className="text-5xl md:text-7xl font-bold tracking-tight text-red-600 mb-2"
              animation="slideUp"
              delay={1.0}
            />
            <AnimatedText
              text="ANNUAL CONFERENCE 2025"
              className="text-2xl md:text-3xl font-medium mb-6"
              animation="slideUp"
              delay={1.2}
            />
          </div>

          <AnimatedText
            text="How To Scale to 10 Figures"
            className="text-xl md:text-2xl font-medium mb-8 text-red-500"
            animation="fadeIn"
            delay={1.4}
          />

          <AnimatedSection animation="fadeIn" delay={1.6}>
            <p className="text-lg mb-8 max-w-3xl mx-auto">
              Join an exclusive, high-level business growth conference crafted for ambitious entrepreneurs and business
              owners who are ready to scale sustainably, increase profits, and minimise risk.
            </p>
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <div className="flex items-center px-4 py-2 rounded-md border border-red-600 relative z-10">
                <CalendarDays className="mr-2 text-red-500" />
                <span>UK: 9th Aug & US: 23rd-24th Aug 2025</span>
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection animation="scale" delay={1.8}>
            <Button asChild size="lg" className="bg-red-600 hover:bg-red-700 text-white px-8 py-6 text-lg rounded-md relative z-10">
              <Link href="https://www.globalwealthfestival.com" target="_blank">Register Now</Link>
            </Button>
          </AnimatedSection>
        </div>
      </section>

      {/* Host Section - With added margin */}
      <div className="relative z-0 mt-20">
        <HostSection />
      </div>

      {/* Speakers Section */}
      <SpeakersSection />

      {/* About Section */}
      <section className="py-20 bg-zinc-900">
        <div className="container mx-auto px-4">
          <AnimatedSection animation="slideUp">
            <h2 className="text-4xl font-bold mb-12 text-center">
              <AnimatedText text="About The Conference" animation="highlight" />
            </h2>
          </AnimatedSection>

          <div className="max-w-3xl mx-auto text-center">
            <AnimatedSection animation="fadeIn" delay={0.2}>
              <p className="text-xl mb-6">
                Join an exclusive, high-level business growth conference crafted for ambitious entrepreneurs and
                business owners who are ready to scale sustainably, increase profits, and minimise risk.
              </p>
            </AnimatedSection>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
              <AnimatedCard delay={0.3}>
                <div className="flex flex-col items-center p-6 bg-black rounded-lg border border-zinc-800">
                  <Clock className="w-12 h-12 text-red-500 mb-4" />
                  <h3 className="text-xl font-bold mb-2">2-Day Experience</h3>
                  <p>Intensive training sessions with industry experts</p>
                </div>
              </AnimatedCard>

              <AnimatedCard delay={0.4}>
                <div className="flex flex-col items-center p-6 bg-black rounded-lg border border-zinc-800">
                  <Users className="w-12 h-12 text-red-500 mb-4" />
                  <h3 className="text-xl font-bold mb-2">Networking</h3>
                  <p>Connect with like-minded entrepreneurs and investors</p>
                </div>
              </AnimatedCard>
            </div>
          </div>
        </div>
      </section>

      {/* Why Attend Section */}
      <section className="py-20 bg-black">
        <div className="container mx-auto px-4">
          <AnimatedSection animation="slideUp">
            <h2 className="text-4xl font-bold mb-12 text-center">
              <AnimatedText text="Why Attend?" animation="highlight" />
            </h2>
          </AnimatedSection>

          <div className="max-w-4xl mx-auto mb-16">
            <AnimatedSection animation="fadeIn" delay={0.2}>
              <ErrorBoundary fallback={<GrowthChartFallback />}>
                <Suspense fallback={<GrowthChartFallback />}>
                  <GrowthChart />
                </Suspense>
              </ErrorBoundary>
            </AnimatedSection>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((item, index) => (
              <AnimatedCard key={index} index={index}>
                <Card className="bg-zinc-900 border-zinc-800 h-full">
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <div className="w-10 h-10 bg-red-600/20 rounded-full flex items-center justify-center mr-3">
                        <item.icon className="w-5 h-5 text-red-500" />
                      </div>
                      <h3 className="text-xl font-bold">{item.title}</h3>
                    </div>
                    <p className="text-zinc-400">{item.description}</p>
                  </CardContent>
                </Card>
              </AnimatedCard>
            ))}
          </div>
        </div>
      </section>

      {/* Key Topics Section */}
      <section className="py-20 bg-zinc-900">
        <div className="container mx-auto px-4">
          <AnimatedSection animation="slideUp">
            <h2 className="text-4xl font-bold mb-12 text-center">
              <AnimatedText text="Key Topics & Curriculum" animation="highlight" />
            </h2>
          </AnimatedSection>

          <div className="max-w-4xl mx-auto mb-16">
            <AnimatedSection animation="fadeIn" delay={0.2}>
              <ErrorBoundary fallback={<TopicCubeFallback />}>
                <Suspense fallback={<TopicCubeFallback />}>
                  <TopicCube
                    topics={[
                      "Business Growth",
                      "Sales Mastery",
                      "Team Building",
                      "Digital Leverage",
                      "Funding",
                      "Brand Building",
                    ]}
                  />
                </Suspense>
              </ErrorBoundary>
            </AnimatedSection>
          </div>

          <AnimatedSection animation="fadeIn" delay={0.2}>
            <Tabs defaultValue="day1" className="max-w-4xl mx-auto">
              <TabsList className="grid w-full grid-cols-2 mb-8">
                <TabsTrigger value="day1" className="text-lg py-3">
                  Day 1: Business Foundations & Sales Strategies
                </TabsTrigger>
                <TabsTrigger value="day2" className="text-lg py-3">
                  Day 2: Scaling, Funding & Investments
                </TabsTrigger>
              </TabsList>

              <TabsContent value="day1" className="bg-black p-6 rounded-lg border border-zinc-800">
                <div className="space-y-12">
                  {[
                    {
                      title: "Module 1",
                      description: "Understanding growth stages and identifying profitable business models.",
                    },
                    {
                      title: "Module 2",
                      description: "Developing winning sales funnels and pricing strategies.",
                    },
                    {
                      title: "Module 3",
                      description: "Leveraging social media and influencer marketing for brand growth.",
                    },
                    {
                      title: "Module 4",
                      description: "Implementing scalable business processes and automation tools.",
                    },
                  ].map((module, index) => (
                    <AnimatedCard key={index} index={index} className="p-4 border-l-4 border-red-600">
                      <h3 className="text-xl font-bold mb-3">{module.title}</h3>
                      <p>{module.description}</p>
                    </AnimatedCard>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="day2" className="bg-black p-6 rounded-lg border border-zinc-800">
                <div className="space-y-12">
                  {[
                    {
                      title: "Module 5",
                      description: "Exploring expansion strategies and revenue diversification.",
                    },
                    {
                      title: "Module 6",
                      description: "Securing investor funding and crafting compelling pitches.",
                    },
                    {
                      title: "Module 7",
                      description: "Building high-performance teams and effective leadership skills.",
                    },
                    {
                      title: "Module 8",
                      description: "Identifying smart investment opportunities for wealth creation.",
                    },
                  ].map((module, index) => (
                    <AnimatedCard key={index} index={index} className="p-4 border-l-4 border-red-600">
                      <h3 className="text-xl font-bold mb-3">{module.title}</h3>
                      <p>{module.description}</p>
                    </AnimatedCard>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </AnimatedSection>
        </div>
      </section>

      {/* Who Should Attend Section */}
      <section className="py-20 bg-black">
        <div className="container mx-auto px-4">
          <AnimatedSection animation="slideUp">
            <h2 className="text-4xl font-bold mb-12 text-center">
              <AnimatedText text="Who Should Attend?" animation="highlight" />
            </h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 max-w-5xl mx-auto">
            {targetAudience.map((item, index) => (
              <AnimatedCard key={index} index={index}>
                <div className="bg-zinc-900 p-6 rounded-lg border border-zinc-800 text-center h-full">
                  <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                  <p className="text-zinc-400">{item.description}</p>
                </div>
              </AnimatedCard>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-zinc-900">
        <div className="container mx-auto px-4">
          <AnimatedSection animation="slideUp">
            <h2 className="text-4xl font-bold mb-12 text-center">
              <AnimatedText text="Testimonials" animation="highlight" />
            </h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <AnimatedCard key={index} index={index}>
                <TestimonialCard quote={testimonial.quote} author={testimonial.author} role={testimonial.role} />
              </AnimatedCard>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 bg-black">
        <div className="container mx-auto px-4">
          <AnimatedSection animation="slideUp">
            <h2 className="text-4xl font-bold mb-4 text-center">
              <AnimatedText text="Frequently Asked Questions" animation="highlight" />
            </h2>
          </AnimatedSection>

          <AnimatedSection animation="fadeIn" delay={0.2}>
            <p className="text-xl text-center mb-12">
              Find answers to common questions about the Business Growth Conference.
            </p>
          </AnimatedSection>

          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              {[
                {
                  question: "What are the dates and locations for the conference?",
                  answer: (
                    <>
                      <p>The Business Growth Conference will be held on:</p>
                      <ul className="list-disc pl-5 mt-2 space-y-1">
                        <li>UK: 9th August, 2025</li>
                        <li>US: 23rd-24th August, 2025</li>
                      </ul>
                      <p className="mt-2">
                        Day 1 (8:00 AM - 5:00 PM) will be in-person, while Day 2 (2:00 PM - 8:00 PM) will be virtual.
                      </p>
                    </>
                  ),
                },
                {
                  question: "How much are the tickets and what's included?",
                  answer: (
                    <>
                      <p>
                        This is a premium 2-day experience packed with training, recordings, and bonuses worth over
                        $2,000 / £2,000. Tickets are heavily discounted. The exact pricing will be shown based on your
                        location (US or UK) after submitting the registration form.
                      </p>
                      <p className="mt-2">Your ticket includes:</p>
                      <ul className="list-disc pl-5 mt-2 space-y-1">
                        <li>Full access to the 2-day conference (in-person and virtual sessions)</li>
                        <li>Conference materials and resources</li>
                        <li>Lunch and refreshments on Day 1</li>
                        <li>Networking opportunities with speakers and attendees</li>
                        <li>Certificate of participation</li>
                        <li>Access to recordings of all sessions</li>
                      </ul>
                    </>
                  ),
                },
                {
                  question: "What payment methods do you accept?",
                  answer: (
                    <p>
                      We accept all major credit cards (Visa, Mastercard, American Express) and PayPal. All payments are
                      processed securely. For corporate registrations or if you need an invoice, please contact our team
                      at products@stephenkintayo.com.
                    </p>
                  ),
                },
                {
                  question: "What should I bring to the conference?",
                  answer: (
                    <>
                      <p>We recommend bringing the following items:</p>
                      <ul className="list-disc pl-5 mt-2 space-y-1">
                        <li>Laptop or tablet for taking notes</li>
                        <li>Business cards for networking</li>
                        <li>A notebook and pen</li>
                        <li>Your conference ticket (digital or printed)</li>
                        <li>Valid ID that matches your registration information</li>
                      </ul>
                    </>
                  ),
                },
                {
                  question: "Is there a dress code?",
                  answer: (
                    <p>
                      The dress code is business casual. We recommend comfortable attire that is professional and
                      presentable, as you'll be networking with other business professionals and potential investors.
                    </p>
                  ),
                },
                {
                  question: "Are there accommodation recommendations?",
                  answer: (
                    <p>
                      Yes, we have negotiated special rates with several hotels near the conference venues. After
                      registration, you'll receive an email with accommodation recommendations and booking instructions.
                      Early booking is recommended as rooms at the discounted rate are limited.
                    </p>
                  ),
                },
                {
                  question: "What is your cancellation policy?",
                  answer: (
                    <>
                      <p>Our cancellation policy is as follows:</p>
                      <ul className="list-disc pl-5 mt-2 space-y-1">
                        <li>60+ days before the event: Full refund minus a $50 processing fee</li>
                        <li>30-59 days before the event: 50% refund</li>
                        <li>
                          Less than 30 days before the event: No refund, but you can transfer your ticket to someone
                          else
                        </li>
                      </ul>
                      <p className="mt-2">
                        All cancellation requests must be submitted in writing to products@stephenkintayo.com.
                      </p>
                    </>
                  ),
                },
                {
                  question: "Will I receive a certificate?",
                  answer: (
                    <p>
                      Yes, all participants who attend both days of the conference will receive a certificate of
                      participation. This will be sent to your registered email address within one week after the
                      conference concludes.
                    </p>
                  ),
                },
                {
                  question: "How do I access the virtual sessions on Day 2?",
                  answer: (
                    <p>
                      You will receive login details for the virtual sessions via email 24 hours before Day 2 begins.
                      The sessions will be hosted on a user-friendly platform that works on all devices. We recommend
                      testing your setup before the sessions start. Technical support will be available if you encounter
                      any issues.
                    </p>
                  ),
                },
                {
                  question: "Are there sponsorship opportunities available?",
                  answer: (
                    <p>
                      Yes, we offer various sponsorship packages for businesses looking to gain exposure to our audience
                      of ambitious entrepreneurs and business owners. For sponsorship inquiries, please contact us at
                      products@stephenkintayo.com or call +234 816 7901 719.
                    </p>
                  ),
                },
              ].map((faq, index) => (
                <AnimatedCard key={index} index={index} className="bg-zinc-900 rounded-lg border border-zinc-800 px-6">
                  <AccordionItem value={`item-${index + 1}`} className="border-none">
                    <AccordionTrigger className="text-lg font-medium py-4">{faq.question}</AccordionTrigger>
                    <AccordionContent className="text-zinc-300 pb-4">{faq.answer}</AccordionContent>
                  </AccordionItem>
                </AnimatedCard>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* Ticket Section */}
      <section id="register" className="py-20 bg-black">
        <div className="container mx-auto px-4">
          <AnimatedSection animation="slideUp">
            <h2 className="text-4xl font-bold mb-4 text-center">
              <AnimatedText text="Secure Your Spot Today!" animation="highlight" />
            </h2>
          </AnimatedSection>

          <AnimatedSection animation="fadeIn" delay={0.2}>
            <p className="text-xl text-center mb-12">
              Don't miss this opportunity to transform your business trajectory.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <AnimatedCard delay={0.3}>
              <TicketCard
                location="UK"
                dates="9th August, 2025"
                price="£2,000"
                features={[
                  "Full-day in-person experience",
                  "Networking opportunities",
                  "Conference materials",
                  "Lunch and refreshments",
                  "Certificate of participation",
                ]}
              />
            </AnimatedCard>

            <AnimatedCard delay={0.4}>
              <TicketCard
                location="US"
                dates="23rd-24th August, 2025"
                price="$2,000"
                features={[
                  "2-day in-person experience",
                  "Networking opportunities",
                  "Conference materials",
                  "Lunch and refreshments",
                  "Certificate of participation",
                ]}
              />
            </AnimatedCard>
          </div>

          <AnimatedSection animation="fadeIn" delay={0.5} className="mt-12 text-center">
            <p className="text-lg mb-6">
              This is a premium 2-day experience packed with training, recordings, and bonuses worth over $2,000 /
              £2,000.
              <br />
              Tickets are heavily discounted. Please proceed if you're ready to invest in your growth.
              <br />
              You'll see the exact pricing and payment details after submitting the form based on your location (US or
              UK).
            </p>
            <Button asChild size="lg" className="bg-red-600 hover:bg-red-700 text-white px-8 py-6 text-lg rounded-md">
              <Link href="/register">Register Now</Link>
            </Button>
          </AnimatedSection>
        </div>
      </section>

      {/* Locations Section */}
      <section className="py-20 bg-zinc-900">
        <div className="container mx-auto px-4">
          <AnimatedSection animation="slideUp">
            <h2 className="text-4xl font-bold mb-12 text-center">
              <AnimatedText text="Event Locations" animation="highlight" />
            </h2>
          </AnimatedSection>

          <div className="max-w-4xl mx-auto mb-16">
            <AnimatedSection animation="fadeIn" delay={0.2}>
              <ErrorBoundary fallback={<LocationGlobeFallback />}>
                <Suspense fallback={<LocationGlobeFallback />}>
                  <LocationGlobe />
                </Suspense>
              </ErrorBoundary>
            </AnimatedSection>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <AnimatedCard delay={0.3}>
              <div className="bg-black p-6 rounded-lg border border-zinc-800">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-red-600 flex items-center justify-center rounded-full mr-4">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-bold">UK</h3>
                </div>
                <div className="mb-4">
                  <div className="flex items-center mb-2">
                    <CalendarDays className="w-5 h-5 mr-2 text-red-500" />
                    <span>9th August, 2025</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-5 h-5 mr-2 text-red-500" />
                    <span>Day 1: 8:00 AM - 5:00 PM</span>
                  </div>
                  <div className="flex items-center ml-7">
                    <span>Day 2: 2:00 PM - 8:00 PM (Virtual)</span>
                  </div>
                </div>
                <p className="text-zinc-400">Venue details will be shared upon registration</p>
              </div>
            </AnimatedCard>

            <AnimatedCard delay={0.4}>
              <div className="bg-black p-6 rounded-lg border border-zinc-800">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-red-600 flex items-center justify-center rounded-full mr-4">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-bold">US</h3>
                </div>
                <div className="mb-4">
                  <div className="flex items-center mb-2">
                    <CalendarDays className="w-5 h-5 mr-2 text-red-500" />
                    <span>23rd-24th August, 2025</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-5 h-5 mr-2 text-red-500" />
                    <span>Day 1: 8:00 AM - 5:00 PM</span>
                  </div>
                  <div className="flex items-center ml-7">
                    <span>Day 2: 2:00 PM - 8:00 PM (Virtual)</span>
                  </div>
                </div>
                <p className="text-zinc-400">Venue details will be shared upon registration</p>
              </div>
            </AnimatedCard>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
