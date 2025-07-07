"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { QrCode, Download, Palette, Settings, Globe, Mail, Phone, MessageSquare, MapPin, Wifi } from "lucide-react"
import QRCode from "qrcode"
import Link from "next/link"

export default function HomePage() {
  const [qrData, setQrData] = useState("https://example.com")
  const [qrCodeUrl, setQrCodeUrl] = useState("")
  const [activeTab, setActiveTab] = useState("url")
  const [foregroundColor, setForegroundColor] = useState("#6366f1")
  const [backgroundColor, setBackgroundColor] = useState("#ffffff")
  const [size, setSize] = useState([300])
  const [errorLevel, setErrorLevel] = useState("M")
  const [margin, setMargin] = useState([4])

  const generateQRCode = async () => {
    try {
      const url = await QRCode.toDataURL(qrData, {
        width: size[0],
        margin: margin[0],
        color: {
          dark: foregroundColor,
          light: backgroundColor,
        },
        errorCorrectionLevel: errorLevel as any,
      })
      setQrCodeUrl(url)
    } catch (err) {
      console.error("Error generating QR code:", err)
    }
  }

  useEffect(() => {
    generateQRCode()
  }, [qrData, foregroundColor, backgroundColor, size, errorLevel, margin])

  const downloadQRCode = () => {
    const link = document.createElement("a")
    link.download = "qrcode.png"
    link.href = qrCodeUrl
    link.click()
  }

  const tabData = {
    url: { icon: Globe, label: "Website URL", placeholder: "https://example.com" },
    text: { icon: MessageSquare, label: "Plain Text", placeholder: "Enter your text here" },
    email: { icon: Mail, label: "Email", placeholder: "mailto:example@email.com" },
    phone: { icon: Phone, label: "Phone", placeholder: "tel:+1234567890" },
    sms: { icon: MessageSquare, label: "SMS", placeholder: "sms:+1234567890" },
    location: { icon: MapPin, label: "Location", placeholder: "geo:37.7749,-122.4194" },
    wifi: { icon: Wifi, label: "WiFi", placeholder: "WIFI:T:WPA;S:NetworkName;P:Password;;" },
  }

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
              <Link href="/about" className="text-gray-700 hover:text-indigo-600 transition-colors">
                About
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Generate Custom QR Codes</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Create beautiful, customizable QR codes for any purpose. Fast, free, and easy to use.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Left Panel - Generator */}
          <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Settings className="w-5 h-5" />
                <span>QR Code Generator</span>
              </CardTitle>
              <CardDescription>Choose your content type and customize your QR code</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Content Type Tabs */}
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid grid-cols-4 lg:grid-cols-7 gap-1 h-auto p-1">
                  {Object.entries(tabData).map(([key, { icon: Icon, label }]) => (
                    <TabsTrigger
                      key={key}
                      value={key}
                      className="flex flex-col items-center p-2 text-xs data-[state=active]:bg-indigo-100 data-[state=active]:text-indigo-700"
                    >
                      <Icon className="w-4 h-4 mb-1" />
                      <span className="hidden sm:inline">{label}</span>
                    </TabsTrigger>
                  ))}
                </TabsList>

                {Object.entries(tabData).map(([key, { placeholder }]) => (
                  <TabsContent key={key} value={key} className="mt-4">
                    <div className="space-y-2">
                      <Label htmlFor={`${key}-input`}>Content</Label>
                      <Input
                        id={`${key}-input`}
                        placeholder={placeholder}
                        value={qrData}
                        onChange={(e) => setQrData(e.target.value)}
                        className="text-base"
                      />
                    </div>
                  </TabsContent>
                ))}
              </Tabs>

              {/* Customization Options */}
              <div className="space-y-4 pt-4 border-t">
                <h3 className="font-semibold flex items-center space-x-2">
                  <Palette className="w-4 h-4" />
                  <span>Customization</span>
                </h3>

                {/* Colors */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="fg-color">Foreground Color</Label>
                    <div className="flex items-center space-x-2">
                      <input
                        id="fg-color"
                        type="color"
                        value={foregroundColor}
                        onChange={(e) => setForegroundColor(e.target.value)}
                        className="w-12 h-10 rounded border cursor-pointer"
                      />
                      <Input
                        value={foregroundColor}
                        onChange={(e) => setForegroundColor(e.target.value)}
                        className="flex-1 text-sm"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="bg-color">Background Color</Label>
                    <div className="flex items-center space-x-2">
                      <input
                        id="bg-color"
                        type="color"
                        value={backgroundColor}
                        onChange={(e) => setBackgroundColor(e.target.value)}
                        className="w-12 h-10 rounded border cursor-pointer"
                      />
                      <Input
                        value={backgroundColor}
                        onChange={(e) => setBackgroundColor(e.target.value)}
                        className="flex-1 text-sm"
                      />
                    </div>
                  </div>
                </div>

                {/* Size */}
                <div className="space-y-2">
                  <Label>Size: {size[0]}px</Label>
                  <Slider value={size} onValueChange={setSize} max={800} min={100} step={50} className="w-full" />
                </div>

                {/* Error Correction */}
                <div className="space-y-2">
                  <Label>Error Correction Level</Label>
                  <Select value={errorLevel} onValueChange={setErrorLevel}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="L">Low (7%)</SelectItem>
                      <SelectItem value="M">Medium (15%)</SelectItem>
                      <SelectItem value="Q">Quartile (25%)</SelectItem>
                      <SelectItem value="H">High (30%)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Margin */}
                <div className="space-y-2">
                  <Label>Margin: {margin[0]} modules</Label>
                  <Slider value={margin} onValueChange={setMargin} max={10} min={0} step={1} className="w-full" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Right Panel - Preview */}
          <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <QrCode className="w-5 h-5" />
                <span>Preview</span>
              </CardTitle>
              <CardDescription>Your generated QR code will appear here</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* QR Code Preview */}
              <div className="flex justify-center">
                <div className="p-4 bg-white rounded-lg shadow-inner border-2 border-dashed border-gray-200">
                  {qrCodeUrl ? (
                    <img
                      src={qrCodeUrl || "/placeholder.svg"}
                      alt="Generated QR Code"
                      className="max-w-full h-auto"
                      style={{ maxWidth: "300px" }}
                    />
                  ) : (
                    <div className="w-64 h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                      <QrCode className="w-16 h-16 text-gray-400" />
                    </div>
                  )}
                </div>
              </div>

              {/* Download Options */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-medium">Quality</span>
                  <Badge variant="secondary">
                    {size[0]} × {size[0]} px
                  </Badge>
                </div>

                <Button
                  onClick={downloadQRCode}
                  disabled={!qrCodeUrl}
                  className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white"
                  size="lg"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download PNG
                </Button>

                <div className="grid grid-cols-3 gap-2">
                  <Button variant="outline" size="sm" disabled>
                    SVG
                  </Button>
                  <Button variant="outline" size="sm" disabled>
                    PDF
                  </Button>
                  <Button variant="outline" size="sm" disabled>
                    EPS
                  </Button>
                </div>
                <p className="text-xs text-gray-500 text-center">Additional formats coming soon</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Features Section */}
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-8">Why Choose qrgen?</h3>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <Card className="border-0 bg-white/60 backdrop-blur-sm">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <QrCode className="w-6 h-6 text-white" />
                </div>
                <h4 className="font-semibold mb-2">High Quality</h4>
                <p className="text-gray-600 text-sm">Generate crisp, scalable QR codes up to 800px resolution</p>
              </CardContent>
            </Card>
            <Card className="border-0 bg-white/60 backdrop-blur-sm">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Palette className="w-6 h-6 text-white" />
                </div>
                <h4 className="font-semibold mb-2">Fully Customizable</h4>
                <p className="text-gray-600 text-sm">Choose colors, sizes, and error correction levels</p>
              </CardContent>
            </Card>
            <Card className="border-0 bg-white/60 backdrop-blur-sm">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Download className="w-6 h-6 text-white" />
                </div>
                <h4 className="font-semibold mb-2">Instant Download</h4>
                <p className="text-gray-600 text-sm">Download your QR codes immediately in multiple formats</p>
              </CardContent>
            </Card>
          </div>
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
