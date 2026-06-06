import React from 'react';
import { useParams } from 'react-router';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import CustomSelect from '../../components/Common/CustomSelect';
import CustomInput from '../../components/Common/CustomInput';

const shippingSchema = z.object({
  recipient_name: z.string().min(3, "اسم المرسل له يجب أن يكون 3 أحرف على الأقل"),
  main_phone: z.string().min(10, "رقم الهاتف الأساسي يجب أن يكون 10 أرقام على الأقل"),
  secondary_phone: z.string().optional(),
  governorate: z.string().min(1, "يرجى اختيار المحافظة"),
  city: z.string().min(1, "يرجى اختيار المدينة"),
  address_details: z.string().min(5, "يرجى إدخال تفاصيل العنوان (5 أحرف على الأقل)"),
  payment_method: z.string().min(1, "يرجى اختيار طريقة الدفع"),
});

export default function ReportShipping() {
  const { id } = useParams();

  // Dummy report data (in a real app, you'd fetch this using the ID)
  const reportData = {
    child: "اسم الطفل",
    father: "اسم الأب",
    service: "الخدمة",
    date: "تاريخ الخدمة"
  };

  const {
    register,
    handleSubmit,
    control,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(shippingSchema),
    defaultValues: {
      recipient_name: "",
      main_phone: "",
      secondary_phone: "",
      governorate: "",
      city: "",
      address_details: "",
      payment_method: ""
    }
  });

  const onSubmit = (data) => {
    console.log("Shipping Order Submitted:", { reportId: id, ...data });
    alert("تم تأكيد طلب الشحن بنجاح!");
  };

  const governorates = [
    { id: 1, label: "القاهرة", value: "cairo" },
    { id: 2, label: "الجيزة", value: "giza" },
  ];

  const cities = [
    { id: 1, label: "المعادي", value: "maadi" },
    { id: 2, label: "الشيخ زايد", value: "sheikh_zayed" },
  ];

  const paymentMethods = [
    { id: 1, label: "نقداً عند الاستلام", value: "cash" },
    { id: 2, label: "محفظة إلكترونية", value: "wallet" },
  ];

  return (
    <div className='pb-10 animate-in fade-in duration-300'>
      {/* Page Title Card */}
      <div className={`card mt-10`}>
        <img src={"https://res.cloudinary.com/dbz6ebekj/image/upload/v1741685481/21_pq4p6t.png"} className='object-contain' width={40} height={40} alt="report icon" />
        <p className="font-bold text-[17px] cursor-pointer text-[#eee]">
          التقارير
        </p>
      </div>

      {/* Page Header Bar */}
      <div className="border h-[38.4px] mt-8 flex justify-center items-center border-(--main-color) bg-[#171717] rounded-[4px]">
        <p className='text-white text-center font-bold'>لطلب شحن التقرير مطبوع</p>
      </div>

      {/* Top Report Info Grid */}
      <div className='grid grid-cols-4 py-3 border-b-2 border-(--main-color) gap-3'>
        <div className='col-span-1 border border-[#545454] rounded-[4px] px-2 py-2 flex items-center justify-center bg-[linear-gradient(90deg,rgb(0,0,0),#73737320)]'>
          <p className='text-white text-[10px] text-center font-bold'>{reportData.child}</p>
        </div>
        <div className='col-span-1 border border-[#545454] rounded-[4px] px-2 py-2 flex items-center justify-center bg-[linear-gradient(90deg,rgb(0,0,0),#73737320)]'>
          <p className='text-white text-[10px] text-center font-bold'>{reportData.father}</p>
        </div>
        <div className='col-span-1 border border-[#545454] rounded-[4px] px-2 py-2 flex items-center justify-center bg-[linear-gradient(90deg,rgb(0,0,0),#73737320)]'>
          <p className='text-white text-[10px] text-center font-bold'>{reportData.service}</p>
        </div>
        <div className='col-span-1 border border-[#545454] rounded-[4px] px-2 py-2 flex items-center justify-center bg-[linear-gradient(90deg,rgb(0,0,0),#73737320)]'>
          <p className='text-white text-[10px] text-center font-bold'>{reportData.date}</p>
        </div>
      </div>

      <div className="py-3">
        <p className='text-[#a6a6a6] text-[11px]  font-semibold mb-4'>يرجى ملأ جميع البيانات الخاصة بالمرسل إليه </p>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          {/* Recipient Name */}
          <CustomInput
            placeholder="اسم المرسل له"
            register={register("recipient_name")}
            error={errors.recipient_name}
          />

          {/* Phones Grid */}
          <div className="grid grid-cols-2 gap-3">
            <CustomInput
              placeholder="تليفون المرسل له الاساسي"
              register={register("main_phone")}
              error={errors.main_phone}
            />
            <CustomInput
              placeholder="تليفون المرسل له الاحتياطي"
              register={register("secondary_phone")}
            />
          </div>

          {/* Location Grid */}
          <div className="grid grid-cols-2 gap-3">
            <Controller
              name="governorate"
              control={control}
              render={({ field }) => (
                <CustomSelect
                  placeholder="المحافظة"
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
                  placeholder="المدينة"
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
            placeholder="تفاصيل العنوان"
            register={register("address_details")}
            error={errors.address_details}
          />

          <div className='py-4 border-t-2 border-(--main-color)'>
             <p className='text-[#a6a6a6] text-[11px] font-semibold'>سيتم إرسال التقرير من خلال شركة الشحن في خلال 24-48 ساعة</p>
          </div>

          {/* Cost Row */}
          <div className="grid grid-cols-2 gap-3">
             <div className="border h-[38.4px] flex items-center px-2  rounded-[4px] border-(--main-color)/30">
              <p className="text-[#eee] text-[11px]">تكلفة الشحن</p>
            </div>

            <div className="border h-[38.4px] flex items-center px-2 rounded-[4px] border-(--main-color)/30">
              <p className="text-white text-[11px]">96 جنيه مصري</p>
            </div>
           
          </div>

          {/* Payment Method */}
          <Controller
            name="payment_method"
            control={control}
            render={({ field }) => (
              <CustomSelect
                placeholder="طريقة الدفع"
                options={paymentMethods}
                value={field.value}
                onChange={field.onChange}
                error={errors.payment_method}
              />
            )}
          />

          <button type='submit' className='auth_btn my-6 mx-auto w-full! max-w-[200px]'>للتأكيد</button>
        </form>
      </div>
    </div>
  );
}
