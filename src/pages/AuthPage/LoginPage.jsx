import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Globe, Stethoscope, UserRound } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import * as z from "zod";
import CustomInput from "../../components/Common/CustomInput";
import { useUser } from "../../context/UserContext";

const buildLoginSchema = (t) =>
  z.object({
    identifier: z
      .string()
      .min(1, t("auth.login.errors.identifierRequired"))
      .refine(
        (val) => {
          const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
          const isPhone = /^[0-9+\-\s()]{10,}$/.test(val);
          return isEmail || isPhone;
        },
        { message: t("auth.login.errors.identifierInvalid") },
      ),
    password: z.string().min(6, t("auth.login.errors.passwordMin")),
  });

export default function LoginPage() {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const { login } = useUser();
  const isEn = i18n.language === "en";

  const [selectedRole, setSelectedRole] = useState("patient");
  const [showPassword, setShowPassword] = useState(false);

  const loginSchema = buildLoginSchema(t);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: { identifier: "", password: "" },
  });

  const onSubmit = (data) => {
    login(selectedRole, data);
    navigate("/");
  };

  const toggleLanguage = () => {
    const newLang = isEn ? "ar" : "en";
    i18n.changeLanguage(newLang);
    localStorage.setItem("fouady-lang", newLang);
    document.documentElement.lang = newLang;
    document.documentElement.dir = newLang === "ar" ? "rtl" : "ltr";
  };

  return (
    <div className="w-full max-w-[420px] mx-auto">
      {/* ============== Language Switcher ============== */}
      <div className="flex justify-center mb-3">
        <button
          type="button"
          onClick={toggleLanguage}
          className="group flex items-center gap-2 bg-[#111111] border border-(--main-color)/30 hover:border-(--main-color) rounded-full px-3.5 py-1.5 transition-all"
        >
          <Globe
            size={14}
            className="text-(--main-color) group-hover:rotate-12 transition-transform"
          />
          <span className="text-white text-[12px] font-bold">
            {isEn ? "العربية" : "English"}
          </span>
        </button>
      </div>

      {/* ============== Main Card ============== */}
      <div className="relative overflow-hidden rounded-[22px] border border-(--main-color)/35 bg-[linear-gradient(180deg,#141414_0%,#0d0d0d_100%)] px-4 py-5 sm:px-5 sm:py-6 shadow-[0_20px_60px_rgba(0,0,0,0.45)]">
        {/* Decorative blobs */}
        <div className="pointer-events-none absolute -top-12 -end-12 w-32 h-32 rounded-full bg-(--main-color)/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-10 -start-10 w-28 h-28 rounded-full bg-(--main-color)/5 blur-3xl" />

        <div className="relative z-10">
          {/* Logo */}
          <div className="flex flex-col items-center text-center mb-4">
            <img
              src="https://res.cloudinary.com/dbz6ebekj/image/upload/v1753707646/%D9%81%D8%A4%D8%A7%D8%AF_2_bwfrzk.png"
              alt="Fouady Logo"
              className="w-[64px] sm:w-[72px] mb-2"
            />
            <h1 className="text-white font-bold text-[19px] sm:text-[21px]">
              {t("auth.login.title")}
            </h1>
            <p className="text-white/50 text-[11.5px] mt-0.5">
              {t("auth.login.subtitle")}
            </p>
          </div>

          {/* Role Switch */}
          <div className="grid grid-cols-2 gap-2 mb-4 bg-[#111111] border border-(--main-color)/20 rounded-[14px] p-1.5">
            <button
              type="button"
              onClick={() => setSelectedRole("patient")}
              className={`rounded-[10px] px-3 py-2.5 flex flex-col items-center justify-center gap-1 transition-all ${
                selectedRole === "patient"
                  ? "bg-(--main-color) text-black shadow-lg"
                  : "text-white/75 hover:bg-white/5"
              }`}
            >
              <UserRound size={17} />
              <span className="font-bold text-[12.5px]">
                {t("auth.login.roles.patient")}
              </span>
              <span
                className={`text-[10px] leading-tight ${
                  selectedRole === "patient" ? "text-black/70" : "text-white/35"
                }`}
              >
                {t("auth.login.roles.patientDesc")}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setSelectedRole("doctor")}
              className={`rounded-[10px] px-3 py-2.5 flex flex-col items-center justify-center gap-1 transition-all ${
                selectedRole === "doctor"
                  ? "bg-(--main-color) text-black shadow-lg"
                  : "text-white/75 hover:bg-white/5"
              }`}
            >
              <Stethoscope size={17} />
              <span className="font-bold text-[12.5px]">
                {t("auth.login.roles.doctor")}
              </span>
              <span
                className={`text-[10px] leading-tight ${
                  selectedRole === "doctor" ? "text-black/70" : "text-white/35"
                }`}
              >
                {t("auth.login.roles.doctorDesc")}
              </span>
            </button>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-2.5"
          >
            {/* Email OR Phone */}
            <CustomInput
              placeholder={t("auth.login.identifier")}
              register={register("identifier")}
              error={errors.identifier}
              autoComplete="username"
              type="text"
            />

            {/* Password */}
            <div className="relative">
              <CustomInput
                type={showPassword ? "text" : "password"}
                placeholder={t("auth.login.password")}
                register={register("password")}
                error={errors.password}
                autoComplete="current-password"
                hasEndIcon
              />
              <button
                type="button"
                onClick={() => setShowPassword((p) => !p)}
                className="absolute top-[11px] end-3 text-white/40 hover:text-white/80 transition-colors"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>

            {/* Note */}
            <div className="rounded-[12px] border border-(--main-color)/20 bg-(--main-color)/5 p-2.5 mt-1">
              <p className="text-white/65 text-[11px] leading-relaxed text-center">
                {t("auth.login.firstUseNote")}
              </p>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="auth_btn !w-full !bg-(--main-color) !text-black !border-(--main-color) mt-1"
            >
              {selectedRole === "doctor"
                ? t("auth.login.submitDoctor")
                : t("auth.login.submitPatient")}
            </button>

            {/* Bottom Links */}
            <div className="flex items-center justify-center flex-wrap gap-x-3 gap-y-2 mt-1 text-[11px] sm:text-[12px]">
              <button
                type="button"
                onClick={() => navigate("/change-password")}
                className="text-white/55 hover:text-(--main-color) transition-colors"
              >
                {t("auth.login.changePassword")}
              </button>
              <span className="text-white/20">•</span>
              <button
                type="button"
                onClick={() => navigate("/reset-password")}
                className="text-white/55 hover:text-(--main-color) transition-colors"
              >
                {t("auth.login.forgotPassword")}
              </button>
              <span className="text-white/20">•</span>
              <button
                type="button"
                onClick={() => navigate("/register")}
                className="text-(--main-color) font-bold hover:opacity-80 transition-opacity"
              >
                {t("auth.login.createAccount")}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
