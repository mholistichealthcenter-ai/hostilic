"use client"

import React, { useState } from "react"
import { motion } from "framer-motion"
import { Mail, Phone, MapPin, Send, Clock, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import toast from "react-hot-toast"
import { useTranslations } from "next-intl"

export default function ContactPage() {
  const t = useTranslations('contact')
  const tInfo = useTranslations('contact.info')
  const tForm = useTranslations('contact.form')
  
  const contactInfo: {
    icon: typeof Phone
    title: string
    details: string
    details2?: string
    subtitle: string
  }[] = [
    {
      icon: Phone,
      title: tInfo('phone'),
      details: tInfo('phoneNumber'),
      details2: tInfo('phoneNumber2'),
      subtitle: tInfo('phoneSubtitle'),
    },
    {
      icon: Mail,
      title: tInfo('email'),
      details: tInfo('emailAddress'),
      subtitle: tInfo('emailSubtitle'),
    },
    {
      icon: MapPin,
      title: tInfo('bank'),
      details: tInfo('bankNumber'),
      subtitle: tInfo('bankSubtitle'),
    },
  ]
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  })
  const [loading, setLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (response.ok) {
        toast.success(
          tForm('successMessage'),
          { duration: 6000, position: 'top-center' }
        )
        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
        })
      } else {
        toast.error(data.error || tForm('errorMessage'), { duration: 4000 })
      }
    } catch (error) {
      toast.error(tForm('errorMessage'))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8 md:mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-full mb-4 md:mb-6" style={{ backgroundColor: '#0D47A1' }}>
              <MessageCircle className="h-8 w-8 md:h-10 md:w-10 text-white" />
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-3 md:mb-4 px-4">
              {t('title')}
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto px-4">
              {t('subtitle')}
            </p>
          </motion.div>
        </div>

        {/* Contact Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-8 md:mb-12">
          {contactInfo.map((info, index) => (
            <motion.div
              key={info.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="text-center h-full hover:shadow-lg transition-shadow">
                <CardContent className="pt-6 md:pt-8 px-4">
                  <div className="inline-flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-full mb-3 md:mb-4" style={{ backgroundColor: '#E3F2FD' }}>
                    <info.icon className="h-6 w-6 md:h-7 md:w-7" style={{ color: '#0D47A1' }} />
                  </div>
                  <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-2">
                    {info.title}
                  </h3>
                  <p className="text-sm md:text-base text-gray-900 font-medium mb-1 break-words">{info.details}</p>
                  {info.details2 && (
                    <p className="text-sm md:text-base text-gray-900 font-medium mb-1 break-words">{info.details2}</p>
                  )}
                  <p className="text-xs md:text-sm text-gray-600">{info.subtitle}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Contact Form and Map */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="text-lg md:text-xl">{tForm('title')}</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4 md:space-y-5">
                  <Input
                    type="text"
                    name="name"
                    label={tForm('name')}
                    placeholder={tForm('name')}
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />

                  <Input
                    type="email"
                    name="email"
                    label={tForm('email')}
                    placeholder={tForm('email')}
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />

                  <Input
                    type="tel"
                    name="phone"
                    label={tForm('phone')}
                    placeholder="+237 6XX XXX XXX"
                    value={formData.phone}
                    onChange={handleChange}
                  />

                  <Input
                    type="text"
                    name="subject"
                    label={tForm('subject')}
                    placeholder={tForm('subject')}
                    value={formData.subject}
                    onChange={handleChange}
                    required
                  />

                  <Textarea
                    name="message"
                    label={tForm('message')}
                    placeholder={tForm('message')}
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    required
                  />

                  <Button type="submit" fullWidth size="lg" disabled={loading} className="w-full">
                    {loading ? tForm('sending') : tForm('send')}
                    <Send className="h-4 w-4 md:h-5 md:w-5 ml-2" />
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          {/* Map and Additional Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            {/* Map Placeholder */}
            <Card>
              <CardContent className="p-0">
                <div className="w-full h-64 bg-gray-200 rounded-t-xl flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-600">Carte interactive</p>
                    <p className="text-sm text-gray-500">Odza , entree Kowait MH2C</p>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-semibold text-gray-900 mb-2">Nous rendre visite</h3>
                  <p className="text-sm text-gray-600">
                    Notre bureau est ouvert du lundi au vendredi de 9h à 18h.
                    Nous vous recommandons de prendre rendez-vous avant votre visite.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Business Hours */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Clock className="h-5 w-5 mr-2" />
                  Horaires d&apos;ouverture
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-700">Lundi - Vendredi</span>
                    <span className="font-medium text-gray-900">9h00 - 18h00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700">Samedi</span>
                    <span className="font-medium text-gray-900">10h00 - 14h00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700">Dimanche</span>
                    <span className="font-medium text-red-600">Fermé</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* FAQ Link */}
            <div style={{ backgroundColor: '#f5f5f5', borderRadius: '0.75rem', padding: '1.5rem' }}>
                <h3 className="font-semibold text-gray-900 mb-3">
                  Questions fréquentes
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  Consultez notre FAQ pour trouver rapidement des réponses aux questions les plus courantes.
                </p>
                <a href="/faq">
                  <Button variant="outline" fullWidth>
                    Voir la FAQ
                  </Button>
                </a>
            </div>
          </motion.div>
        </div>

        {/* Alternative Contact Methods */}
        <div className="mt-12" style={{ backgroundColor: '#0D47A1', borderRadius: '0.75rem' }}>
          <div className="text-white py-8 px-6">
              <div className="text-center">
                <h3 className="text-2xl font-bold mb-4">
                  Besoin d&apos;une assistance immédiate ?
                </h3>
                <p className="text-white/90 mb-6">
                  Notre équipe est disponible pour répondre à vos questions urgentes
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a href="tel:+237693480836">
                    <Button size="lg" className="bg-white hover:bg-gray-100" style={{ color: '#0D47A1' }}>
                      <Phone className="h-5 w-5 mr-2" />
                      Appelez-nous
                    </Button>
                  </a>
                  <a href="mailto:mholistichealthcenter@gmail.com">
                    <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                      <Mail className="h-5 w-5 mr-2" />
                      Envoyez un email
                    </Button>
                  </a>
                </div>
              </div>
          </div>
        </div>
      </div>
    </div>
  )
}
