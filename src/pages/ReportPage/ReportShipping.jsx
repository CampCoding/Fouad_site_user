// src/pages/ReportPage/ReportShipping.jsx
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router";
import * as z from "zod";
import CustomInput from "../../components/Common/CustomInput";
import CustomSelect from "../../components/Common/CustomSelect";

const buildSchema = (t) =>
  z.object({
    recipient_name: z.string().min(3, t("reportShipping.errors.recipientName")),
    main_phone: z.string().min(10, t("reportShipping.errors.mainPhone")),
    secondary_phone: z.string().optional(),
    governorate: z.string().min(1, t("reportShipping.errors.governorate")),
    city: z.string().min(1, t("reportShipping.errors.city")),
    address_details: z.string().min(5, t("reportShipping.errors.address")),
    payment_method: z.string().min(1, t("reportShipping.errors.payment")),
  });

export default function ReportShipping() {
  const { id } = useParams();
  const { t, i18n } = useTranslation();
  const isEn = i18n.language === "en";

  const reportData = {
    child: isEn ? "Child Name" : "اسم الطفل",
    father: isEn ? "Father Name" : "اسم الأب",
    service: isEn ? "Service" : "الخدمة",
    date: isEn ? "Service Date" : "تاريخ الخدمة",
  };

  const shippingSchema = buildSchema(t);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(shippingSchema),
    defaultValues: {
      recipient_name: "",
      main_phone: "",
      secondary_phone: "",
      governorate: "",
      city: "",
      address_details: "",
      payment_method: "",
    },
  });

  const onSubmit = (data) => {
    console.log("Shipping Order:", { reportId: id, ...data });
    toast.success(
      isEn ? "Shipping confirmed successfully!" : "تم تأكيد طلب الشحن بنجاح!",
    );
  };

  const governorates = [
    { id: 1, label: isEn ? "Cairo" : "القاهرة", value: "cairo" },
    { id: 2, label: isEn ? "Giza" : "الجيزة", value: "giza" },
  ];

  const cities = [
    { id: 1, label: isEn ? "Maadi" : "المعادي", value: "maadi" },
    {
      id: 2,
      label: isEn ? "Sheikh Zayed" : "الشيخ زايد",
      value: "sheikh_zayed",
    },
  ];

  const paymentMethods = [
    {
      id: 1,
      label: isEn ? "Cash on Delivery" : "نقداً عند الاستلام",
      value: "cash",
    },
    {
      id: 2,
      label: isEn ? "Electronic Wallet" : "محفظة إلكترونية",
      value: "wallet",
    },
  ];

  return (
    <div className="pb-10 animate-in fade-in duration-300">
      {/* Page Title Card */}
      <div className="card mt-10">
        <img
          src="https://res.cloudinary.com/dbz6ebekj/image/upload/v1741685481/21_pq4p6t.png"
          className="object-contain"
          width={40}
          height={40}
          alt="report icon"
        />
        <p className="font-bold text-[15px] cursor-pointer text-[#eee]">
          {t("reports.title")}
        </p>
      </div>

      {/* Page Header Bar */}
      <div className="border h-[38.4px] mt-8 flex justify-center items-center border-(--main-color) bg-[#171717] rounded-[4px]">
        <p className="text-white text-center font-bold text-[13px] sm:text-[14px] px-3">
          {t("reportShipping.headerTitle")}
        </p>
      </div>

      {/* Top Report Info Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 py-3 border-b-2 border-(--main-color) gap-2 sm:gap-3">
        <InfoBox text={reportData.child} />
        <InfoBox text={reportData.father} />
        <InfoBox text={reportData.service} />
        <InfoBox text={reportData.date} />
      </div>

      <div className="py-3">
        <p className="text-[#a6a6a6] text-[11px] sm:text-[12px] font-semibold mb-4">
          {t("reportShipping.fillDataHint")}
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          {/* Recipient Name */}
          <CustomInput
            placeholder={t("reportShipping.recipientName")}
            register={register("recipient_name")}
            error={errors.recipient_name}
          />

          {/* Phones */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <CustomInput
              placeholder={t("reportShipping.mainPhone")}
              register={register("main_phone")}
              error={errors.main_phone}
            />
            <CustomInput
              placeholder={t("reportShipping.secondaryPhone")}
              register={register("secondary_phone")}
            />
          </div>

          {/* Location */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Controller
              name="governorate"
              control={control}
              render={({ field }) => (
                <CustomSelect
                  placeholder={t("reportShipping.governorate")}
                  options={governorates}
                  value={field.value}
                  onChange={field.onChange}
                  error={errors.governorate}
                />
              )}
            />
            <Controller
              name="city"
              control={control}
              render={({ field }) => (
                <CustomSelect
                  placeholder={t("reportShipping.city")}
                  options={cities}
                  value={field.value}
                  onChange={field.onChange}
                  error={errors.city}
                />
              )}
            />
          </div>

          {/* Address Details */}
          <CustomInput
            placeholder={t("reportShipping.addressDetails")}
            register={register("address_details")}
            error={errors.address_details}
          />

          <div className="py-4 border-t-2 border-(--main-color)">
            <p className="text-[#a6a6a6] text-[11px] sm:text-[12px] font-semibold">
              {t("reportShipping.deliveryNote")}
            </p>
          </div>

          {/* Cost Row */}
          <div className="grid grid-cols-2 gap-3">
            <div className="border h-[38.4px] flex items-center px-2 rounded-[4px] border-(--main-color)/30">
              <p className="text-[#eee] text-[11px] sm:text-[12px]">
                {t("reportShipping.shippingCost")}
              </p>
            </div>
            <div className="border h-[38.4px] flex items-center px-2 rounded-[4px] border-(--main-color)/30">
              <p className="text-white text-[11px] sm:text-[12px]">
                {isEn ? "96 EGP" : "96 جنيه مصري"}
              </p>
            </div>
          </div>

          {/* Payment Method */}
          <Controller
            name="payment_method"
            control={control}
            render={({ field }) => (
              <CustomSelect
                placeholder={t("reportShipping.paymentMethod")}
                options={paymentMethods}
                value={field.value}
                onChange={field.onChange}
                error={errors.payment_method}
              />
            )}
          />

          <button
            type="submit"
            className="auth_btn my-6 mx-auto w-full! max-w-[200px]"
          >
            {t("reportShipping.confirm")}
          </button>
        </form>
      </div>
    </div>
  );
}

function InfoBox({ text }) {
  return (
    <div className="border border-[#545454] rounded-[4px] px-2 py-2 flex items-center justify-center bg-[linear-gradient(90deg,rgb(0,0,0),#73737320)]">
      <p className="text-white text-[10px] sm:text-[11px] text-center font-bold truncate">
        {text}
      </p>
    </div>
  );
}
