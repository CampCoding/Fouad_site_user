import React from 'react'
import { useNavigate } from 'react-router'
import { useForm } from 'react-hook-form'

export default function ResetPassword() {
  const navigate = useNavigate();
  const { handleSubmit } = useForm();

  const onSubmit = () => {
    console.log("Password reset confirmed");
    navigate("/login");
  };

  return (
    <div className="max-w-[500px] mx-auto pb-10">
      <img
        src="https://res.cloudinary.com/dbz6ebekj/image/upload/v1753707646/%D9%81%D8%A4%D8%A7%D8%AF_2_bwfrzk.png"
        alt="fouady logo"
        className="mx-auto mb-6 w-48"
      />

      <div className="border h-[38.4px] mb-8 flex justify-center items-center border-(--main-color) bg-[#171717] rounded-[4px]">
        <p className='text-white text-center font-bold'>استعادة كلمة المرور</p>
      </div>

      <p className='text-[#a6a6a6] text-center text-sm mb-6'>
        سوف يتم الرجوع لكلمة المرور الأصلية (رقم الهاتف الأساسي)
      </p>

      <form onSubmit={handleSubmit(onSubmit)}>
        <button type='submit' className='auth_btn flex justify-center items-center mx-auto'>
          لتأكيد الرجوع
        </button>
      </form>
    </div>
  )
}
