import { Phone, Mail } from 'lucide-react'
import React from 'react'
import { FaFacebook, FaLinkedin, FaTelegram, FaWhatsapp, FaInstagram, FaYoutube, FaTiktok } from 'react-icons/fa'

const contactMethods = [
  { 
    id: 1, 
    label: "Telephone", 
    icon: Phone, 
    value: "tel:01012312000",
    isLink: true 
  },
  { 
    id: 2, 
    label: "Telegram", 
    icon: FaTelegram, 
    value: "#",
    isLink: true 
  },
  { 
    id: 3, 
    label: "Whatsapp", 
    icon: FaWhatsapp, 
    value: "https://wa.me/201062426868",
    isLink: true 
  },
  { 
    id: 4, 
    label: "LinkedIn", 
    icon: FaLinkedin, 
    value: "https://www.linkedin.com/in/fouadycenter/",
    isLink: true 
  },
  { 
    id: 5, 
    label: "Facebook", 
    icon: FaFacebook, 
    value: "https://www.facebook.com/share/1E1WJMDGL5/",
    isLink: true 
  },
  { 
    id: 6, 
    label: "E-mail", 
    icon: Mail, 
    value: "mailto:info@fouady.center",
    isLink: true 
  },
  { 
    id: 7, 
    label: "Instagram", 
    icon: FaInstagram, 
    value: "https://www.instagram.com/fouady.center/",
    isLink: true 
  },
  { 
    id: 8, 
    label: "YouTube", 
    icon: FaYoutube, 
    value: "https://www.youtube.com/@FouadyCenter",
    isLink: true 
  },
  { 
    id: 9, 
    label: "TikTok", 
    icon: FaTiktok, 
    value: "https://www.tiktok.com/@fouady.center?lang=en",
    isLink: true 
  },
];


export default function ContactUsPage() {
  return (
    <div className="pb-20 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className={`card mb-6`}>
        <div className="p-1 rounded-lg border border-[#232323]">
          <Phone size={30} className="text-(--main-color)" />
        </div>
        <p className="font-bold text-[17px] cursor-pointer text-[#eee]">
          تواصل
        </p>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {contactMethods.map((method) => (
          <a
            key={method.id}
            href={method.value}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center justify-center gap-3 bg-[#171717] border border-[#232323] rounded-[15px] p-3 hover:bg-[#232323] hover:border-(--main-color)/30 transition-all duration-300 shadow-xl"
          >
            <method.icon size={28} className="text-(--main-color)" />
            <p className="text-white text-[10px] font-medium opacity-80">{method.label}</p>
          </a>
        ))}
      </div>

      <button className="auth_btn w-full! mx-auto! rounded-md! mt-10 py-3.5 font-bold text-sm shadow-[0_0_20px_rgba(var(--main-bg-rgb),0.15)]">
        راسلنا من خلال البرنامج
      </button>
    </div>

  )
}
