import { Phone, Mail, X, Star } from 'lucide-react'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { FaFacebook, FaLinkedin, FaTelegram, FaWhatsapp, FaInstagram, FaYoutube, FaTiktok, FaGoogle } from 'react-icons/fa'
import CustomInput from '../../Common/CustomInput'
import { Link } from 'react-router'


// سكيمة التحقق من البيانات الخاصة بالفيدباك
const reviewSchema = z.object({
  comment: z.string().min(5, "يرجى كتابة رأيك بوضوح (5 أحرف على الأقل)"),
})

const contactMethods = [
  { id: 1, label: "Telephone", icon: Phone, value: "tel:01012312000", isLink: true },
  { id: 2, label: "Telegram", icon: FaTelegram, value: "https://t.me/201017194475", isLink: true },
  { id: 3, label: "Whatsapp", icon: FaWhatsapp, value: "https://wa.me/201012312000", isLink: true },
  { id: 4, label: "LinkedIn", icon: FaLinkedin, value: "https://www.linkedin.com/in/fouadycenter/", isLink: true },
  { id: 5, label: "Facebook", icon: FaFacebook, value: "https://www.facebook.com/share/1E1WJMDGL5/", isLink: true },
  { id: 6, label: "E-mail", icon: Mail, value: "mailto:info@fouady.center", isLink: true },
  { id: 7, label: "Instagram", icon: FaInstagram, value: "https://www.instagram.com/fouady.center/", isLink: true },
  { id: 8, label: "YouTube", icon: FaYoutube, value: "https://www.youtube.com/@FouadyCenter", isLink: true },
  { id: 9, label: "TikTok", icon: FaTiktok, value: "https://www.tiktok.com/@fouady.center?lang=en", isLink: true },
];

export default function ContactUsPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [rating, setRating] = useState(5); // ستيت للنجوم المحددة

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      comment: ""
    }
  });

  const onSubmitReview = (data) => {
    const finalData = { ...data, stars: rating };
    console.log("Review Data Submitted:", finalData);

    reset();
    setIsOpen(false);
  };

  return (
    <div className="max-w-[400px] mx-auto px-4 pb-20 animate-in fade-in slide-in-from-bottom-4 duration-500 relative">


      <div className="card mb-4 mt-10">
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


      {/* <button className="auth_btn w-full! mx-auto! rounded-md! mt-10 py-3.5 font-bold text-sm shadow-[0_0_20px_rgba(var(--main-bg-rgb),0.15)]">
        راسلنا من خلال البرنامج
      </button> */}


      {/* <div className="flex items-center justify-between gap-3 mt-6 w-full px-1">

      {/* ---------------------------------------------------- */}
      {/* الـ Modal الخاص بالتقييم */}
      {isOpen && (
        <div className="fixed inset-0 z-[2000] flex items-center justify-center bg-black/70 backdrop-blur-sm px-4">

          <div className="w-full max-w-[360px] bg-[#171717] border border-[#232323] rounded-2xl p-5 shadow-2xl animate-in zoom-in-95 duration-200">


            <div className="flex items-center justify-between border-b border-[#232323] pb-3 mb-4">
              <h3 className="text-white font-bold text-base">تقييم المنصة عبر Facebook</h3>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-white p-1 rounded-lg transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* الفورم */}
            <form onSubmit={handleSubmit(onSubmitReview)} className="flex flex-col gap-4">


              <div className="flex flex-col items-center justify-center gap-2 my-2">
                <p className="text-xs text-gray-400">ما هو تقييمك لنا بالنجوم؟</p>
                <div className="flex gap-1.5 direction-ltr">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      className="transition-transform active:scale-95"
                    >
                      <Star
                        size={26}
                        className={star <= rating ? "text-[#d49a3e] fill-[#d49a3e]" : "text-gray-600"}
                      />
                    </button>
                  ))}
                </div>
              </div>


              <div className="text-right">
                <CustomInput
                  placeholder="اكتب رأيك أو مقترحاتك هنا..."
                  register={register("comment")}
                  error={errors.comment}
                />
              </div>


              <div className="flex gap-3 mt-2">
                <button
                  type="submit"
                  className="auth_btn flex-1 py-3 font-bold text-xs rounded-md!"
                >
                  إرسال التقييم
                </button>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="flex-1 py-3 font-bold text-xs bg-[#232323] text-gray-300 border border-[#333] rounded-md hover:bg-[#2e2e2e] transition-colors"
                >
                  إلغاء
                </button>
              </div>

            </form>
          </div>
        </div>
      )}


    </div>
  )
}