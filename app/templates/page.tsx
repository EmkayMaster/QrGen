"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { QrCode, ArrowLeft, Globe, Mail, Phone, MessageSquare, MapPin, Wifi, Heart, Star } from "lucide-react"
import Link from "next/link"

export default function TemplatesPage() {
  const templates = [
    {
      id: 1,
      name: "Business Card",
      description: "Professional contact information",
      icon: Globe,
      color: "from-blue-500 to-cyan-500",
      popular: true,
    },
    {
      id: 2,
      name: "WiFi Access",
      description: "Easy WiFi connection sharing",
      icon: Wifi,
      color: "from-green-500 to-emerald-500",
      popular: true,
    },
    {
      id: 3,
      name: "Email Contact",
      description: "Direct email composition",
      icon: Mail,
      color: "from-purple-500 to-pink-500",
      popular: false,
    },
    {
      id: 4,
      name: "Phone Number",
      description: "Quick dial contact",
      icon: Phone,
      color: "from-orange-500 to-red-500",
      popular: false,
    },
    {
      id: 5,
      name: "SMS Message",
      description: "Pre-filled text message",
      icon: MessageSquare,
      color: "from-indigo-500 to-purple-500",
      popular: false,
    },
    {
      id: 6,
      name: "Location",
      description: "GPS coordinates sharing",
      icon: MapPin,
      color: "from-teal-500 to-green-500",
      popular: true,
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
                <QrCode className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                qrgen
              </h1>
            </div>
            <nav className="hidden md:flex items-center space-x-6">
              <Link href="/" className="text-gray-700 hover:text-indigo-600 transition-colors">
                Generator
              </Link>
              <Link href="/templates" className="text-indigo-600 font-medium">
                Templates
              </Link>
              <Link href="/about" className="text-gray-700 hover:text-indigo-600 transition-colors">
                About
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center text-indigo-600 hover:text-indigo-700 mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Generator
          </Link>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">QR Code Templates</h2>
          <p className="text-xl text-gray-600 max-w-2xl">
            Choose from our pre-designed templates to quickly create QR codes for common use cases.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {templates.map((template) => {
            const IconComponent = template.icon
            return (
              <Card
                key={template.id}
                className="shadow-lg border-0 bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300 group cursor-pointer"
              >
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between mb-2">
                    <div
                      className={`w-12 h-12 bg-gradient-to-br ${template.color} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                    >
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    {template.popular && (
                      <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white border-0">
                        <Star className="w-3 h-3 mr-1" />
                        Popular
                      </Badge>
                    )}
                  </div>
                  <CardTitle className="text-xl">{template.name}</CardTitle>
                  <CardDescription className="text-gray-600">{template.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button
                    asChild
                    className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white"
                  >
                    <Link href="/">Use Template</Link>
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Coming Soon Section */}
        <div className="mt-16 text-center">
          <Card className="max-w-2xl mx-auto border-0 bg-white/60 backdrop-blur-sm">
            <CardContent className="p-8">
              <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">More Templates Coming Soon</h3>
              <p className="text-gray-600 mb-6">
                We're working on adding more templates including social media profiles, event tickets, product catalogs,
                and more!
              </p>
              <Button variant="outline" className="border-indigo-200 text-indigo-600 hover:bg-indigo-50 bg-transparent">
                Request a Template
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="w-6 h-6 bg-gradient-to-br from-indigo-500 to-purple-600 rounded flex items-center justify-center">
                <QrCode className="w-4 h-4 text-white" />
              </div>
              <span className="font-semibold">qrgen</span>
            </div>
            <div className="text-center md:text-right">
              <p className="text-gray-400 text-sm">© 2024 qrgen. Created by [Your Name]</p>
              <p className="text-gray-500 text-xs mt-1">Fast, free, and beautiful QR code generation</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
