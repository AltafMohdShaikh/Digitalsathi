"use client"

import { useState } from "react"
import { Send, Mail, Phone, CheckCircle, AlertCircle, Clock, HelpCircle, MessageCircle, Headphones, Shield, Users, Heart, Lightbulb, Search, BookOpen, Star, Zap, Globe, Settings, Info, LifeBuoy, Compass } from "lucide-react"

export default function NeedHelp() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    category: "general",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null)

  const categories = [
    { value: "general", label: "General Inquiry" },
    { value: "technical", label: "Technical Support" },
    { value: "events", label: "Events & Registration" },
    { value: "schemes", label: "Government Schemes" },
    { value: "account", label: "Account Issues" },
    { value: "other", label: "Other" },
  ]

  const faqs = [
    {
      question: "How do I register for events?",
      answer:
        "Navigate to the Events section from the sidebar menu, browse available events, and click 'Register' on your preferred event. You'll need to create an account if you haven't already.",
    },
    {
      question: "What government schemes are available?",
      answer:
        "We provide information on various digital literacy and skill development schemes. Check the Government Schemes section for detailed eligibility criteria and application processes.",
    },
    {
      question: "How can I access learning materials?",
      answer:
        "All learning materials are available in the Popular Platforms section. You can find step-by-step guides for various digital tools and applications.",
    },
    {
      question: "Is there a mobile app available?",
      answer:
        "Currently, Digital Sathi is available as a web platform. We're working on a mobile app that will be launched soon with enhanced features.",
    },
  ]

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Simulating API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      setSubmitStatus("success")
      setFormData({ name: "", email: "", category: "general", subject: "", message: "" })
    } catch (error) {
      setSubmitStatus("error")
    } finally {
      setIsSubmitting(false)
      setTimeout(() => setSubmitStatus(null), 5000)
    }
  }

  const handleButtonMouseEnter = (e) => {
    e.currentTarget.style.backgroundColor = "var(--color-primary-dark)"
  }

  const handleButtonMouseLeave = (e) => {
    e.currentTarget.style.backgroundColor = "var(--color-primary)"
  }

  return (
    <div className="min-h-screen bg-[var(--color-background)]">
      <div className="relative overflow-hidden bg-[var(--color-background)]">
        <div className="absolute inset-0" style={{ backgroundColor: "var(--color-primary)", opacity: 0.05 }}></div>
        <div className="relative text-center py-16 px-4">
          {/* Help Icons */}
          <div className="absolute top-4 right-4 opacity-20 transform rotate-12">
            <HelpCircle size={64} className="text-blue-500" />
          </div>
          <div className="absolute bottom-4 left-4 opacity-20 transform -rotate-12">
            <MessageCircle size={60} className="text-blue-500" />
          </div>
          <div className="absolute top-8 left-8 opacity-15 transform rotate-45">
            <Headphones size={56} className="text-blue-500" />
          </div>
          <div className="absolute bottom-8 right-8 opacity-15 transform -rotate-30">
            <Shield size={52} className="text-blue-500" />
          </div>
          <div className="absolute top-12 left-1/3 opacity-12 transform rotate-90 hidden lg:block">
            <Users size={48} className="text-blue-500" />
          </div>
          <div className="absolute bottom-12 right-1/4 opacity-12 transform -rotate-45 hidden lg:block">
            <Heart size={44} className="text-blue-500" />
          </div>
          <div className="absolute top-16 right-1/3 opacity-10 transform rotate-60 hidden lg:block">
            <Lightbulb size={40} className="text-blue-500" />
          </div>
          <div className="absolute bottom-16 left-1/4 opacity-10 transform -rotate-60 hidden lg:block">
            <Search size={36} className="text-blue-500" />
          </div>
          <div className="absolute top-20 left-1/2 opacity-10 transform rotate-15 hidden lg:block">
            <BookOpen size={32} className="text-blue-500" />
          </div>
          <div className="absolute bottom-20 right-1/2 opacity-10 transform -rotate-15 hidden lg:block">
            <Star size={28} className="text-blue-500" />
          </div>
          <div className="absolute top-6 left-16 opacity-8 transform rotate-75 hidden lg:block">
            <Zap size={24} className="text-blue-500" />
          </div>
          <div className="absolute bottom-6 right-16 opacity-8 transform -rotate-75 hidden lg:block">
            <Globe size={24} className="text-blue-500" />
          </div>
          <div className="absolute top-24 right-20 opacity-8 transform rotate-30 hidden lg:block">
            <Settings size={20} className="text-blue-500" />
          </div>
          <div className="absolute bottom-24 left-20 opacity-8 transform -rotate-30 hidden lg:block">
            <Info size={20} className="text-blue-500" />
          </div>
          <div className="absolute top-28 left-24 opacity-6 transform rotate-120 hidden lg:block">
            <LifeBuoy size={16} className="text-blue-500" />
          </div>
          <div className="absolute bottom-28 right-24 opacity-6 transform -rotate-120 hidden lg:block">
            <Compass size={16} className="text-blue-500" />
          </div>
          <div className="max-w-4xl mx-auto relative z-10">
            <h1 className="text-5xl md:text-6xl font-bold mb-6" style={{ color: "var(--color-primary)" }}>
              Need Help?
            </h1>
            <p className="text-xl text-[var(--color-text-secondary)] leading-relaxed max-w-2xl mx-auto mb-8">
              We're here to support your digital learning journey! Find answers, get support, or connect with our
              community.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-5 pb-16">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-[var(--color-card)] rounded-2xl p-8 shadow-lg">
              <h2 className="text-2xl font-bold mb-6 text-[var(--color-text)]">Get in Touch</h2>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl" style={{ backgroundColor: "var(--color-hover-light)" }}>
                    <Mail className="w-5 h-5" style={{ color: "var(--color-primary)" }} />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1 text-[var(--color-text)]">Email Us</h3>
                    <p className="text-sm text-[var(--color-text-secondary)]">support@digitalsathi.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl" style={{ backgroundColor: "var(--color-hover-light)" }}>
                    <Clock className="w-5 h-5" style={{ color: "var(--color-primary)" }} />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1 text-[var(--color-text)]">Response Time</h3>
                    <p className="text-sm text-[var(--color-text-secondary)]">Usually within 24 hours</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl" style={{ backgroundColor: "var(--color-hover-light)" }}>
                    <Phone className="w-5 h-5" style={{ color: "var(--color-primary)" }} />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1 text-[var(--color-text)]">Support Hours</h3>
                    <p className="text-sm text-[var(--color-text-secondary)]">Mon-Fri, 9:00 AM - 6:00 PM</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="bg-[var(--color-card)] rounded-2xl p-8 shadow-lg" id="contact">
              <h2 className="text-2xl font-bold mb-6 text-[var(--color-text)]">Send us a Message</h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold mb-2 text-[var(--color-text)]">Full Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 transition-all duration-300 focus:ring-2 focus:border-transparent focus:ring-blue-500"
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2 text-[var(--color-text)]">Email Address *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 transition-all duration-300 focus:ring-2 focus:border-transparent focus:ring-blue-500"
                      placeholder="Enter your email"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2 text-[var(--color-text)]">Category</label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] text-[var(--color-text)] transition-all duration-300 focus:ring-2 focus:border-transparent focus:ring-blue-500"
                  >
                    {categories.map((cat) => (
                      <option key={cat.value} value={cat.value}>
                        {cat.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2 text-[var(--color-text)]">Subject *</label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 transition-all duration-300 focus:ring-2 focus:border-transparent focus:ring-blue-500"
                    placeholder="Brief description of your inquiry"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2 text-[var(--color-text)]">Message *</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 transition-all duration-300 focus:ring-2 focus:border-transparent resize-none focus:ring-blue-500"
                    placeholder="Please provide details about your question or concern..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting || !formData.name || !formData.email || !formData.subject || !formData.message}
                  className="w-full py-4 px-6 rounded-xl font-semibold text-white transition-all duration-300 flex items-center justify-center gap-3 hover:shadow-lg transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  style={{ backgroundColor: "var(--color-primary)" }}
                  onMouseEnter={handleButtonMouseEnter}
                  onMouseLeave={handleButtonMouseLeave}
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                      Sending Message...
                    </>
                  ) : (
                    <>
                      <Send size={18} />
                      Send Message
                    </>
                  )}
                </button>
              </form>

              {submitStatus && (
                <div
                  className={`mt-6 p-4 rounded-xl flex items-center gap-3 ${
                    submitStatus === "success"
                      ? "bg-green-50 border border-green-200"
                      : "bg-red-50 border border-red-200"
                  }`}
                >
                  {submitStatus === "success" ? (
                    <CheckCircle size={20} className="text-green-600" />
                  ) : (
                    <AlertCircle size={20} className="text-red-600" />
                  )}
                  <p
                    className={`text-sm font-medium ${submitStatus === "success" ? "text-green-800" : "text-red-800"}`}
                  >
                    {submitStatus === "success"
                      ? "Message sent successfully! We'll get back to you soon."
                      : "Failed to send message. Please try again later."}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="mt-16" id="faq">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[var(--color-text)] mb-4">Frequently Asked Questions</h2>
            <p className="text-[var(--color-text-secondary)] max-w-2xl mx-auto">
              Find quick answers to common questions about Digital Sathi platform and services.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-[var(--color-card)] rounded-2xl p-6 shadow-lg">
                <h3 className="text-lg font-semibold text-[var(--color-text)] mb-3">{faq.question}</h3>
                <p className="text-[var(--color-text-secondary)] leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
