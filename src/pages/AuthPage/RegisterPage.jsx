import React, { useState } from 'react'
import { useNavigate } from 'react-router'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import CustomSelect from '../../components/Common/CustomSelect'
import CustomInput from '../../components/Common/CustomInput'
import AddWorkplaceModal from '../../components/Common/AddWorkplaceModal'

const registerSchema = z.object({
  name: z.string().min(3, "الاسم يجب أن يكون 3 أحرف على الأقل"),
  phone: z.string().min(10, "رقم الهاتف يجب أن يكون 10 أرقام على الأقل"),
  job: z.string().min(2, "الوظيفة يجب أن تكون حرفين على الأقل"),
  work_place: z.string().min(1, "يرجى اختيار مكان العمل"),
});

export default function RegisterPage() {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [workplaces, setWorkplaces] = useState([
    { id: 1, label: "مركز فؤادي", value: "fouady_center" },
    { id: 2, label: "فرع القويرة", value: "qwaira_branch" },
  ]);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      phone: "",
      job: "",
      work_place: ""
    }
  });

  const handleAddWorkplace = (name) => {
    const newVal = name.toLowerCase().replace(/\s+/g, '_');
    const newWorkplace = {
      id: Date.now(),
      label: name,
      value: newVal
    };
    setWorkplaces([...workplaces, newWorkplace]);
    setValue('work_place', newVal, { shouldValidate: true });
  };

  const onSubmit = (data) => {
    console.log("Registering data:", data);
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
        <p className='text-white text-center font-bold'>لإنشاء حساب</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        {/* Name */}
        <CustomInput
          placeholder="الاسم"
          register={register("name")}
          error={errors.name}
        />

        {/* Phone */}
        <CustomInput
          placeholder="رقم التليفون"
          register={register("phone")}
          error={errors.phone}
        />

        {/* Job */}
        <CustomInput
          placeholder="الوظيفة"
          register={register("job")}
          error={errors.job}
        />

        {/* Workplace Select */}
        <div className="flex flex-col gap-2">
          <Controller
            name="work_place"
            control={control}
            render={({ field }) => (
              <CustomSelect
                options={workplaces}
                value={field.value}
                onChange={field.onChange}
                placeholder="مكان العمل"
                error={errors.work_place}
              />
            )}
          />
          
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="text-white text-sm hover:text-(--main-color) transition-colors w-fit ms-auto mt-1"
          >
            إضافة مكان العمل
          </button>
        </div>

        <button type='submit' className='auth_btn my-6 mx-auto w-full! max-w-[200px]'>لإرسال الطلب</button>
      </form>

      <AddWorkplaceModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={handleAddWorkplace}
      />
    </div>
  )
}
