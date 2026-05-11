import React from 'react'
import { useNavigate } from 'react-router'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import CustomInput from '../../components/Common/CustomInput'

const loginSchema = z.object({
  phone: z.string().min(10, "رقم الهاتف يجب أن يكون 10 أرقام على الأقل"),
  password: z.string().min(6, "كلمة المرور يجب أن تكون 6 أحرف على الأقل"),
})

export default function LoginPage() {
  const navigate = useNavigate();
  
  const { 
    register, 
    handleSubmit, 
    formState: { errors } 
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      phone: "",
      password: ""
    }
  });

  const onSubmit = (data) => {
    console.log("Login data:", data);
    navigate("/");
  };

  return (
    <div className='max-w-[500px] mx-auto pb-10'>
      <img 
        src="https://res.cloudinary.com/dbz6ebekj/image/upload/v1753707646/%D9%81%D8%A4%D8%A7%D8%AF_2_bwfrzk.png" 
        alt="fouady logo" 
        className='mx-auto mb-6'
      />

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        {/* Phone Input */}
        <CustomInput
          placeholder="رقم الهاتف"
          register={register("phone")}
          error={errors.phone}
          autoComplete="username"
        />

        {/* Password Input */}
        <CustomInput
          type="password"
          placeholder="كلمة المرور"
          register={register("password")}
          error={errors.password}
          autoComplete="current-password"
        />

        <p className='text-[#a6a6a6] mt-4 text-center text-sm'>
          إذا كنت تستخدم البرنامج للمرة الأولى يرجى العلم أن رقم الهاتف هو الرقم المسجل لدينا وكلمة المرور هي نفس الرقم
        </p>
        <p className='text-[#a6a6a6] mt-2 text-center text-sm'>
          لضمان الخصوصية والآمان بإمكانك تغيير كلمة المرور
        </p>

        <button type='submit' className='auth_btn w-full! my-4'>تسجيل الدخول</button>
       
        <div className="grid grid-cols-3 gap-7">
          <button 
            onClick={() => navigate("/change-password")}
            type='button' className='auth_btn'>تغيير كلمة المرور</button>
          <button 
            onClick={() => navigate("/reset-password")}
            type='button' className='auth_btn'>نسيت كلمة المرور</button>
          <button 
            onClick={() => navigate("/register")}
            type='button' className='auth_btn'>إنشاء حساب</button>
        </div>
      </form>
    </div>
  )
}
