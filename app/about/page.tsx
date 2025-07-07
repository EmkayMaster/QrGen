"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { QrCode, ArrowLeft, Zap, Shield, Smartphone, Palette, Download, Globe } from "lucide-react"
import Link from "next/link"

export default function AboutPage() {
  const features = [
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Generate QR codes instantly with our optimized algorithms. No waiting, no delays.",
    },
    {
      icon: Shield,
      title: "Privacy First",
      description: "All QR codes are generated locally in your browser. Your data never leaves your device.",
    },
    {
      icon: Smartphone,
      title: "Mobile Friendly",
      description: "Fully responsive design that works perfectly on all devices and screen sizes.",
    },
    {
      icon: Palette,
      title: "Highly Customizable",
      description: "Choose from unlimited colors, sizes, and error correction levels to match your brand.",
    },
    {
      icon: Download,
      title: "Multiple Formats",
      description: "Download your QR codes in PNG format with more formats coming soon.",
    },
    {
      icon: Globe,
      title: "Universal Compatibility",
      description: "Works with all QR code scanners and supports all major content types.",
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
              <Link href="/templates" className="text-gray-700 hover:text-indigo-600 transition-colors">
                Templates
              </Link>
              <Link href="/about" className="text-indigo-600 font-medium">
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
          <h2 className="text-4xl font-bold text-gray-900 mb-4">About qrgen</h2>
          <p className="text-xl text-gray-600 max-w-3xl">
            qrgen is a modern, fast, and user-friendly QR code generator designed to make creating custom QR codes
            simple and enjoyable.
          </p>
        </div>

        {/* Hero Section */}
        <div className="mb-16">
          <Card className="border-0 bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-2xl">
            <CardContent className="p-8 md:p-12">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-3xl font-bold mb-4">The Modern QR Code Generator</h3>
                  <p className="text-indigo-100 text-lg mb-6">
                    Built with cutting-edge web technologies to provide the fastest, most reliable QR code generation
                    experience. Whether you're a business owner, developer, or just need a quick QR code, qrgen has you
                    covered.
                  </p>
                  <Button asChild variant="secondary" size="lg">
                    <Link href="/">Start Creating</Link>
                  </Button>
                </div>
                <div className="flex justify-center">
                  <div className="w-48 h-48 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                    <QrCode className="w-24 h-24 text-white/80" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Features Grid */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-gray-900 text-center mb-12">Why Choose qrgen?</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => {
              const IconComponent = feature.icon
              return (
                <Card
                  key={index}
                  className="border-0 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <CardHeader>
                    <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center mb-4">
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">{feature.description}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>

        {/* Technical Details */}
        <div className="mb-16">
          <Card className="border-0 bg-white/80 backdrop-blur-sm shadow-lg max-w-4xl mx-auto">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Technical Specifications</CardTitle>
              <CardDescription>Built with modern web standards for optimal performance</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3 text-indigo-600">Supported Content Types</h4>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Website URLs</li>
                    <li>• Plain text</li>
                    <li>• Email addresses</li>
                    <li>• Phone numbers</li>
                    <li>• SMS messages</li>
                    <li>• GPS coordinates</li>
                    <li>• WiFi credentials</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-3 text-indigo-600">Customization Options</h4>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Custom foreground colors</li>
                    <li>• Custom background colors</li>
                    <li>• Adjustable size (100px - 800px)</li>
                    <li>• Error correction levels (L, M, Q, H)</li>
                    <li>• Configurable margins</li>
                    <li>• High-resolution output</li>
                  </ul>
                </div>
              </div>
              <div className="pt-4 border-t">
                <h4 className="font-semibold mb-3 text-indigo-600">Technology Stack</h4>
                <p className="text-gray-600">
                  Built with Next.js, React, TypeScript, and Tailwind CSS. QR code generation powered by the qrcode
                  library for reliable, standards-compliant output. All processing happens client-side for maximum
                  privacy and speed.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <Card className="border-0 bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-2xl max-w-2xl mx-auto">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-4">Ready to Get Started?</h3>
              <p className="text-purple-100 mb-6">
                Create your first custom QR code in seconds. It's completely free and requires no registration.
              </p>
              <Button asChild variant="secondary" size="lg">
                <Link href="/">Generate QR Code Now</Link>
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
