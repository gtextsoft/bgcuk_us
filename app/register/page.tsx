import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { ArrowLeft, CalendarDays } from "lucide-react"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

export default function Register() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />

      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4">
          <Link href="/" className="inline-flex items-center text-red-500 hover:text-red-400 mb-8">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <h1 className="text-3xl md:text-4xl font-bold mb-6">Register for Business Growth Conference</h1>

              <Card className="bg-zinc-900 border-zinc-800 p-6">
                <form className="space-y-8">
                  <div className="space-y-4">
                    <h2 className="text-xl font-semibold">Personal Information</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name</Label>
                        <Input
                          id="firstName"
                          placeholder="Enter your first name"
                          className="bg-zinc-800 border-zinc-700"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input
                          id="lastName"
                          placeholder="Enter your last name"
                          className="bg-zinc-800 border-zinc-700"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="Enter your email address"
                        className="bg-zinc-800 border-zinc-700"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input id="phone" placeholder="Enter your phone number" className="bg-zinc-800 border-zinc-700" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="company">Company/Organization</Label>
                      <Input
                        id="company"
                        placeholder="Enter your company name"
                        className="bg-zinc-800 border-zinc-700"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="jobTitle">Job Title</Label>
                      <Input id="jobTitle" placeholder="Enter your job title" className="bg-zinc-800 border-zinc-700" />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h2 className="text-xl font-semibold">Event Selection</h2>

                    <div className="space-y-2">
                      <Label>Select Location</Label>
                      <RadioGroup defaultValue="uk" className="flex flex-col space-y-2">
                        <div className="flex items-center space-x-2 bg-zinc-800 p-4 rounded-md">
                          <RadioGroupItem value="uk" id="uk" />
                          <Label htmlFor="uk" className="flex-1 cursor-pointer">
                            <div className="font-medium">UK</div>
                            <div className="text-sm text-zinc-400 flex items-center">
                              <CalendarDays className="h-3 w-3 mr-1" />
                              9th August, 2025
                            </div>
                          </Label>
                          <div className="font-bold text-red-500">$997</div>
                        </div>

                        <div className="flex items-center space-x-2 bg-zinc-800 p-4 rounded-md">
                          <RadioGroupItem value="us" id="us" />
                          <Label htmlFor="us" className="flex-1 cursor-pointer">
                            <div className="font-medium">US</div>
                            <div className="text-sm text-zinc-400 flex items-center">
                              <CalendarDays className="h-3 w-3 mr-1" />
                              23rd-24th August, 2025
                            </div>
                          </Label>
                          <div className="font-bold text-red-500">$997</div>
                        </div>
                      </RadioGroup>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h2 className="text-xl font-semibold">Payment Information</h2>

                    <div className="space-y-2">
                      <Label htmlFor="cardName">Name on Card</Label>
                      <Input id="cardName" placeholder="Enter name on card" className="bg-zinc-800 border-zinc-700" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="cardNumber">Card Number</Label>
                      <Input
                        id="cardNumber"
                        placeholder="1234 5678 9012 3456"
                        className="bg-zinc-800 border-zinc-700"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="expiry">Expiry Date</Label>
                        <Input id="expiry" placeholder="MM/YY" className="bg-zinc-800 border-zinc-700" />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="cvc">CVC</Label>
                        <Input id="cvc" placeholder="123" className="bg-zinc-800 border-zinc-700" />
                      </div>
                    </div>
                  </div>

                  <Button type="submit" className="w-full bg-red-600 hover:bg-red-700 text-white py-6 text-lg">
                    Complete Registration
                  </Button>
                  <div className="text-center mt-4 text-sm text-zinc-400">
                    <p>For direct registrations, visit <Link href="https://www.globalwealthfestival.com" className="text-red-500 hover:underline" target="_blank">www.globalwealthfestival.com</Link></p>
                  </div>
                </form>
              </Card>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-6">Order Summary</h2>

              <Card className="bg-zinc-900 border-zinc-800 p-6 mb-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-center pb-4 border-b border-zinc-800">
                    <div>
                      <h3 className="font-semibold">Business Growth Conference</h3>
                      <p className="text-sm text-zinc-400">UK, 9th August, 2025</p>
                    </div>
                    <span className="font-bold">$997</span>
                  </div>

                  <div className="flex justify-between items-center pb-4 border-b border-zinc-800">
                    <span>Subtotal</span>
                    <span>$997</span>
                  </div>

                  <div className="flex justify-between items-center pb-4 border-b border-zinc-800">
                    <span>Tax</span>
                    <span>$0</span>
                  </div>

                  <div className="flex justify-between items-center text-lg font-bold">
                    <span>Total</span>
                    <span className="text-red-500">$997</span>
                  </div>
                </div>
              </Card>

              <Card className="bg-zinc-900 border-zinc-800 p-6">
                <h3 className="font-semibold mb-4">What's Included</h3>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <div className="h-5 w-5 rounded-full bg-red-600 flex-shrink-0 mt-0.5 mr-2"></div>
                    <span>2-day in-person experience</span>
                  </li>
                  <li className="flex items-start">
                    <div className="h-5 w-5 rounded-full bg-red-600 flex-shrink-0 mt-0.5 mr-2"></div>
                    <span>Networking opportunities</span>
                  </li>
                  <li className="flex items-start">
                    <div className="h-5 w-5 rounded-full bg-red-600 flex-shrink-0 mt-0.5 mr-2"></div>
                    <span>Conference materials</span>
                  </li>
                  <li className="flex items-start">
                    <div className="h-5 w-5 rounded-full bg-red-600 flex-shrink-0 mt-0.5 mr-2"></div>
                    <span>Lunch and refreshments</span>
                  </li>
                  <li className="flex items-start">
                    <div className="h-5 w-5 rounded-full bg-red-600 flex-shrink-0 mt-0.5 mr-2"></div>
                    <span>Certificate of participation</span>
                  </li>
                </ul>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
