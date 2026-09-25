"use client"

import React, { useState } from "react"
import Link from "next/link"
import { useLocale, useTranslations } from "next-intl"
import { Heart, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin, Send } from "lucide-react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import toast from "react-hot-toast"
import { brandColors } from "@/lib/theme"

export default function Footer() {
  const locale = useLocale()
  const t = useTranslations("footer")
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  // Couleurs pour les hovers
  const primaryColor = brandColors.primary[600];
  const secondaryColor = brandColors.secondary[500];

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setSuccess(false)

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (response.ok) {
        toast.success(data.message || "✅ Inscription réussie à la newsletter!", {
          duration: 4000,
          position: 'bottom-center',
        })
        setEmail("")
        setSuccess(true)
        
        // Reset success message after 5 seconds
        setTimeout(() => setSuccess(false), 5000)
      } else {
        toast.error(data.error || "Une erreur est survenue", {
          duration: 4000,
          position: 'bottom-center',
        })
      }
    } catch (error) {
      toast.error("Erreur de connexion. Veuillez réessayer.", {
        duration: 4000,
        position: 'bottom-center',
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Section */}
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <img 
                src="/logo.jpeg" 
                alt="M2HC Logo" 
                className="h-12 w-auto object-contain rounded"
              />
              <h2 className="text-xl font-bold">M2HC</h2>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-4">
              {t("description")}
            </p>
            <div className="flex space-x-3">
              <a 
                href="https://www.facebook.com/m2hc19/" 
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-800 p-2 rounded-full transition-colors"
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = primaryColor}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#1f2937'}
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a 
                href="https://x.com/HolisticM2hc/status/1430103192860307456" 
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-800 p-2 rounded-full transition-colors"
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = primaryColor}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#1f2937'}
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="https://www.instagram.com/marguerita_h.h_center?igsh=aG00bWZxb2xueWV4"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-800 p-2 rounded-full transition-colors"
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = secondaryColor}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#1f2937'}
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a 
                href="https://www.linkedin.com/in/marguerita-holistic-health-center-268578209/" 
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-800 p-2 rounded-full transition-colors"
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = primaryColor}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#1f2937'}
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t("quickLinks")}</h3>
            <ul className="space-y-2">
              <li>
                <Link href={`/${locale}/about`} className="text-gray-400 hover:text-white transition-colors text-sm">
                  {t("aboutUs")}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/programs`} className="text-gray-400 hover:text-white transition-colors text-sm">
                  {t("ourPrograms")}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/blog`} className="text-gray-400 hover:text-white transition-colors text-sm">
                  {t("blogNews")}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/contact`} className="text-gray-400 hover:text-white transition-colors text-sm">
                  {t("contactUs")}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/donate`} className="text-gray-400 hover:text-white transition-colors text-sm">
                  {t("donate")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t("contact")}</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <Phone className="h-5 w-5 flex-shrink-0 mt-0.5" style={{ color: primaryColor }} />
                <div className="text-gray-400 text-sm">
                  <div>+237 699 412 460</div>
                  <div>+237 693 480 836</div>
                </div>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="h-5 w-5 flex-shrink-0" style={{ color: primaryColor }} />
                <span className="text-gray-400 text-sm break-all">mholistichealthcenter@gmail.com</span>
              </li>
              <li className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 flex-shrink-0 mt-0.5" style={{ color: primaryColor }} />
                <div className="text-gray-400 text-sm">
                  <div>{t("bankAccount")}</div>
                  <div className="font-medium">679 012 650 01</div>
                </div>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t("newsletter")}</h3>
            <p className="text-gray-400 text-sm mb-4">
              {t("newsletterDesc")}
            </p>
            {success ? (
              <div className="bg-green-600 text-white p-4 rounded-lg text-center animate-pulse">
                <Heart className="h-6 w-6 mx-auto mb-2" />
                <p className="font-semibold">{t("thankYou")}</p>
                <p className="text-sm mt-1">{t("receiveNews")}</p>
              </div>
            ) : (
              <form onSubmit={handleNewsletterSubmit} className="space-y-2">
                <Input
                  type="email"
                  placeholder={t("emailPlaceholder")}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-gray-800 border-gray-700 text-white placeholder-gray-500"
                />
                <Button
                  type="submit"
                  fullWidth
                  disabled={loading}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  {loading ? (
                    t("sending")
                  ) : (
                    <>
                      <Send className="h-4 w-4 mr-2" />
                      {t("subscribe")}
                    </>
                  )}
                </Button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} M2H2. {t("rights")}.
            </p>
            <div className="flex space-x-6">
              <Link href={`/${locale}/privacy`} className="text-gray-400 hover:text-white transition-colors text-sm">
                {t("privacy")}
              </Link>
              <Link href={`/${locale}/terms`} className="text-gray-400 hover:text-white transition-colors text-sm">
                {t("terms")}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
