import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, Phone, Star, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useTranslation } from "react-i18next";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaTelegram,
  FaTiktok,
  FaWhatsapp,
  FaYoutube,
} from "react-icons/fa";
import * as z from "zod";
import CustomInput from "../../Common/CustomInput";

const FACEBOOK_REVIEW_URL = "https://www.facebook.com/fouady.center/reviews";

const contactMethods = [
  {
    id: 1,
    labelKey: "contactUsPage.methods.telephone",
    icon: Phone,
    value: "tel:01012312000",
    newTab: false,
  },
  {
    id: 2,
    labelKey: "contactUsPage.methods.telegram",
    icon: FaTelegram,
    value: "https://t.me/201017194475",
    newTab: true,
  },
  {
    id: 3,
    labelKey: "contactUsPage.methods.whatsapp",
    icon: FaWhatsapp,
    value: "https://wa.me/201012312000",
    newTab: true,
  },
  {
    id: 4,
    labelKey: "contactUsPage.methods.linkedin",
    icon: FaLinkedin,
    value: "https://www.linkedin.com/in/fouadycenter/",
    newTab: true,
  },
  {
    id: 5,
    labelKey: "contactUsPage.methods.facebook",
    icon: FaFacebook,
    value: FACEBOOK_REVIEW_URL,
    newTab: true,
  },
  {
    id: 6,
    labelKey: "contactUsPage.methods.email",
    icon: Mail,
    value: "mailto:info@fouady.center",
    newTab: false,
  },
  {
    id: 7,
    labelKey: "contactUsPage.methods.instagram",
    icon: FaInstagram,
    value: "https://www.instagram.com/fouady.center/",
    newTab: true,
  },
  {
    id: 8,
    labelKey: "contactUsPage.methods.youtube",
    icon: FaYoutube,
    value: "https://www.youtube.com/@FouadyCenter",
    newTab: true,
  },
  {
    id: 9,
    labelKey: "contactUsPage.methods.tiktok",
    icon: FaTiktok,
    value: "https://www.tiktok.com/@fouady.center?lang=en",
    newTab: true,
  },
];

export default function ContactUsPage() {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [rating, setRating] = useState(5);

  const reviewSchema = useMemo(
    () =>
      z.object({
        comment: z
          .string()
          .trim()
          .min(5, t("contactUsPage.review.validation.comment")),
      }),
    [t],
  );

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      comment: "",
    },
  });

  const handleCloseModal = () => {
    reset();
    setRating(5);
    setIsOpen(false);
  };

  useEffect(() => {
    if (!isOpen) return;

    const handleEsc = (e) => {
      if (e.key === "Escape") {
        handleCloseModal();
      }
    };

    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [isOpen]);

  const onSubmitReview = (data) => {
    const finalData = { ...data, stars: rating };
    console.log("Review Data Submitted:", finalData);

    toast.success(t("contactUsPage.review.success"));

    const openedWindow = window.open(
      FACEBOOK_REVIEW_URL,
      "_blank",
      "noopener,noreferrer",
    );

    if (!openedWindow) {
      toast.error(t("contactUsPage.review.openError"));
    }

    handleCloseModal();
  };

  return (
    <div className="w-full max-w-[400px] sm:max-w-[640px] lg:max-w-[960px] mx-auto px-4 sm:px-5 lg:px-0 pb-20 animate-in fade-in slide-in-from-bottom-4 duration-500 relative">
      <div className="card mb-4 mt-10">
        <div className="p-1 rounded-lg border border-[#232323]">
          <Phone size={30} className="text-(--main-color)" />
        </div>
        <p className="font-bold text-[15px] cursor-pointer text-[#eee]">
          {t("contactUsPage.title")}
        </p>
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 gap-3">
        {contactMethods.map((method) => (
          <a
            key={method.id}
            href={method.value}
            target={method.newTab ? "_blank" : undefined}
            rel={method.newTab ? "noopener noreferrer" : undefined}
            className="flex flex-col items-center justify-center gap-3 bg-[#171717] border border-[#232323] rounded-[15px] p-3 sm:p-4 hover:bg-[#232323] hover:border-(--main-color)/30 transition-all duration-300 shadow-xl"
          >
            <method.icon size={28} className="text-(--main-color)" />
            <p className="text-white text-[10px] font-medium opacity-80 text-center leading-4">
              {t(method.labelKey)}
            </p>
          </a>
        ))}
      </div>

      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="auth_btn block w-full! sm:max-w-[320px]! lg:max-w-[360px]! !mx-auto rounded-md! mt-10 py-3.5 font-bold text-sm shadow-[0_0_20px_rgba(212,154,62,0.15)]"
      >
        {t("contactUsPage.review.openButton")}
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 z-[2000] flex items-center justify-center bg-black/70 backdrop-blur-sm px-4"
          onClick={handleCloseModal}
        >
          <div
            className="w-full max-w-[360px] sm:max-w-[400px] lg:max-w-[440px] bg-[#171717] border border-[#232323] rounded-2xl p-5 sm:p-6 shadow-2xl animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-[#232323] pb-3 mb-4">
              <h3 className="text-white font-bold text-base">
                {t("contactUsPage.review.title")}
              </h3>
              <button
                type="button"
                onClick={handleCloseModal}
                className="text-gray-400 hover:text-white p-1 rounded-lg transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <form
              onSubmit={handleSubmit(onSubmitReview)}
              className="flex flex-col gap-4"
            >
              <div className="flex flex-col items-center justify-center gap-2 my-2">
                <p className="text-xs text-gray-400">
                  {t("contactUsPage.review.starsQuestion")}
                </p>

                <div dir="ltr" className="flex gap-1.5">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      className="transition-transform active:scale-95"
                    >
                      <Star
                        size={26}
                        className={
                          star <= rating
                            ? "text-[#d49a3e] fill-[#d49a3e]"
                            : "text-gray-600"
                        }
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div className="text-right">
                <CustomInput
                  istextarea
                  placeholder={t("contactUsPage.review.placeholder")}
                  register={register("comment")}
                  error={errors.comment}
                />
              </div>

              <div className="flex gap-3 mt-2">
                <button
                  type="submit"
                  className="auth_btn flex-1 py-3 font-bold text-xs rounded-md!"
                >
                  {t("contactUsPage.review.submit")}
                </button>
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="flex-1 py-3 font-bold text-xs bg-[#232323] text-gray-300 border border-[#333] rounded-md hover:bg-[#2e2e2e] transition-colors"
                >
                  {t("contactUsPage.review.cancel")}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
