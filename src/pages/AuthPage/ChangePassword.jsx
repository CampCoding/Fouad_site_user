import React from 'react'
import { useNavigate } from 'react-router'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import CustomInput from '../../components/Common/CustomInput'

const changePasswordSchema = z.object({
  password: z.string().min(6, "كلمة المرور الحالية مطلوبة"),
  newPassword: z.string().min(6, "كلمة المرور الجديدة يجب أن تكون 6 أحرف على الأقل"),
  confirmPassword: z.string().min(6, "تأكيد كلمة المرور مطلوب"),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "كلمات المرور غير متطابقة",
  path: ["confirmPassword"],
});

export default function ChangePassword() {
  const navigate = useNavigate();
  
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      password: "",
      newPassword: "",
      confirmPassword: ""
    }
  });

  const onSubmit = (data) => {
    console.log("Changing password:", data);
    navigate("/login");
  };

  return (
    <div className='max-w-[500px] mx-auto pb-10'>
      <img src="https://res.cloudinary.com/dbz6ebekj/image/upload/v1753707646/%D9%81%D8%A4%D8%A7%D8%AF_2_bwfrzk.png" alt="fouady logo" className='mx-auto mb-6' />

      <div className="border h-[38.4px] mb-5 flex justify-center items-center border-(--main-color) bg-[#171717] rounded-[4px]">
        <p className='text-white text-center font-bold'>لتغيير كلمة المرور</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <CustomInput
          type="password"
          placeholder="كلمة المرور الحالية"
          register={register("password")}
          error={errors.password}
          autoComplete="current-password"
        />

        <CustomInput
          type="password"
          placeholder="اكتب كلمة المرور الجديدة"
          register={register("newPassword")}
          error={errors.newPassword}
          autoComplete="new-password"
        />

        <CustomInput
          type="password"
          placeholder="أعد كتابة كلمة المرور الجديدة للتأكيد"
          register={register("confirmPassword")}
          error={errors.confirmPassword}
          autoComplete="new-password"
        />

        <button type='submit' className='auth_btn my-4 mx-auto'>لتأكيد التغيير</button>
      </form>
    </div>
  )
}
