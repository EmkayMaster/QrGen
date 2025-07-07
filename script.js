// QR Code Generator Application - Fixed for browser compatibility
import QRCode from "qrcode"

class QRGenerator {
  constructor() {
    this.canvas = document.getElementById("qr-canvas")
    this.activeTab = "url"
    this.settings = {
      size: 300,
      margin: 4,
      errorLevel: "M",
      foregroundColor: "#6366f1",
      backgroundColor: "#ffffff",
    }

    this.init()
  }

  init() {
    this.setupEventListeners()
    this.handleTemplateParams()
    this.generateQRCode()
  }

  handleTemplateParams() {
    // Check URL parameters for template data
    const urlParams = new URLSearchParams(window.location.search)
    const template = urlParams.get("template")

    if (template) {
      this.loadTemplate(template)
    }
  }

  loadTemplate(templateType) {
    const templates = {
      business: {
        tab: "text",
        content: "John Doe\nSoftware Developer\nPhone: +1-555-0123\nEmail: john@example.com\nWebsite: www.johndoe.com",
      },
      wifi: {
        tab: "wifi",
        content: "WIFI:T:WPA;S:MyNetwork;P:MyPassword;;",
      },
      email: {
        tab: "email",
        content: "mailto:contact@example.com?subject=Hello&body=Hi there!",
      },
      phone: {
        tab: "phone",
        content: "tel:+1234567890",
      },
      sms: {
        tab: "sms",
        content: "sms:+1234567890?body=Hello from QR code!",
      },
      location: {
        tab: "location",
        content: "geo:37.7749,-122.4194",
      },
    }

    const template = templates[templateType]
    if (template) {
      this.switchTab(template.tab)
      setTimeout(() => {
        const input = document.querySelector(`#${template.tab}-content .input, #${template.tab}-content .textarea`)
        if (input) {
          input.value = template.content
          this.generateQRCode()
        }
      }, 100)
    }
  }

  setupEventListeners() {
    // Tab switching
    document.querySelectorAll(".tab-trigger").forEach((trigger) => {
      trigger.addEventListener("click", (e) => {
        this.switchTab(e.target.closest(".tab-trigger").dataset.tab)
      })
    })

    // Input changes
    document.querySelectorAll(".input, .textarea").forEach((input) => {
      input.addEventListener("input", () => {
        this.generateQRCode()
      })
    })

    // Color changes
    document.getElementById("fg-color").addEventListener("change", (e) => {
      this.settings.foregroundColor = e.target.value
      document.getElementById("fg-color-text").value = e.target.value
      this.generateQRCode()
    })

    document.getElementById("fg-color-text").addEventListener("input", (e) => {
      if (this.isValidColor(e.target.value)) {
        this.settings.foregroundColor = e.target.value
        document.getElementById("fg-color").value = e.target.value
        this.generateQRCode()
      }
    })

    document.getElementById("bg-color").addEventListener("change", (e) => {
      this.settings.backgroundColor = e.target.value
      document.getElementById("bg-color-text").value = e.target.value
      this.generateQRCode()
    })

    document.getElementById("bg-color-text").addEventListener("input", (e) => {
      if (this.isValidColor(e.target.value)) {
        this.settings.backgroundColor = e.target.value
        document.getElementById("bg-color").value = e.target.value
        this.generateQRCode()
      }
    })

    // Size slider
    document.getElementById("size-slider").addEventListener("input", (e) => {
      this.settings.size = Number.parseInt(e.target.value)
      document.getElementById("size-value").textContent = e.target.value
      document.getElementById("quality-badge").textContent = `${e.target.value} × ${e.target.value} px`
      this.generateQRCode()
    })

    // Margin slider
    document.getElementById("margin-slider").addEventListener("input", (e) => {
      this.settings.margin = Number.parseInt(e.target.value)
      document.getElementById("margin-value").textContent = e.target.value
      this.generateQRCode()
    })

    // Error level select
    document.getElementById("error-level").addEventListener("change", (e) => {
      this.settings.errorLevel = e.target.value
      this.generateQRCode()
    })

    // Download button
    document.getElementById("download-btn").addEventListener("click", () => {
      this.downloadQRCode()
    })
  }

  switchTab(tabName) {
    // Update active tab
    this.activeTab = tabName

    // Update tab triggers
    document.querySelectorAll(".tab-trigger").forEach((trigger) => {
      trigger.classList.remove("active")
    })
    document.querySelector(`[data-tab="${tabName}"]`).classList.add("active")

    // Update tab content
    document.querySelectorAll(".tab-content").forEach((content) => {
      content.classList.remove("active")
    })
    document.getElementById(`${tabName}-content`).classList.add("active")

    // Generate QR code with new content
    this.generateQRCode()
  }

  getCurrentContent() {
    const activeInput = document.querySelector(
      `#${this.activeTab}-content .input, #${this.activeTab}-content .textarea`,
    )
    return activeInput ? activeInput.value : ""
  }

  async generateQRCode() {
    const content = this.getCurrentContent()

    if (!content.trim()) {
      this.clearCanvas()
      return
    }

    try {
      const options = {
        width: this.settings.size,
        margin: this.settings.margin,
        color: {
          dark: this.settings.foregroundColor,
          light: this.settings.backgroundColor,
        },
        errorCorrectionLevel: this.settings.errorLevel,
      }

      await QRCode.toCanvas(this.canvas, content, options)
    } catch (error) {
      console.error("Error generating QR code:", error)
      this.clearCanvas()
    }
  }

  clearCanvas() {
    const ctx = this.canvas.getContext("2d")
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
  }

  downloadQRCode() {
    if (!this.canvas.width || !this.canvas.height) {
      alert("Please generate a QR code first")
      return
    }

    const link = document.createElement("a")
    link.download = "qrcode.png"
    link.href = this.canvas.toDataURL()
    link.click()
  }

  isValidColor(color) {
    const style = new Option().style
    style.color = color
    return style.color !== ""
  }
}

// Initialize the application when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  new QRGenerator()
})

// Add smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  })
})

// Add keyboard shortcuts
document.addEventListener("keydown", (e) => {
  // Ctrl/Cmd + D to download
  if ((e.ctrlKey || e.metaKey) && e.key === "d") {
    e.preventDefault()
    const downloadBtn = document.getElementById("download-btn")
    if (downloadBtn) downloadBtn.click()
  }

  // Ctrl/Cmd + 1-7 to switch tabs
  if ((e.ctrlKey || e.metaKey) && e.key >= "1" && e.key <= "7") {
    e.preventDefault()
    const tabs = ["url", "text", "email", "phone", "sms", "location", "wifi"]
    const tabIndex = Number.parseInt(e.key) - 1
    if (tabs[tabIndex]) {
      const tabButton = document.querySelector(`[data-tab="${tabs[tabIndex]}"]`)
      if (tabButton) tabButton.click()
    }
  }
})

// Add intersection observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1"
      entry.target.style.transform = "translateY(0)"
    }
  })
}, observerOptions)

// Observe elements for animation
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".feature-card, .template-card, .about-feature-card").forEach((el) => {
    el.style.opacity = "0"
    el.style.transform = "translateY(20px)"
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease"
    observer.observe(el)
  })
})
