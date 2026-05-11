import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import CustomSelect from '../../Common/CustomSelect';
import CustomDate from '../../Common/CustomDate';

const reportFilterSchema = z.object({
  child_name: z.string().optional(),
  father_name: z.string().optional(),
  service: z.string().optional(),
  service_date: z.string().optional(),
  branch: z.string().optional(),
  hospital_nurserry: z.string().optional(),
  phone: z.string().optional(),
});

export default function ReportSearch() {
  const [isOpen, setIsOpen] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(reportFilterSchema),
    defaultValues: {
      child_name: "",
      father_name: "",
      service: "",
      service_date: "",
      branch: "",
      hospital_nurserry: "",
      phone: ""
    }
  });

  const onSubmit = (data) => {
    console.log("Searching with filters:", data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Search Toggle Header */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between h-[38.4px] mt-6 bg-[#171717] border-2 border-(--main-color) rounded-[4px] cursor-pointer group focus-within:border-(--main-color) transition-all"
      >
        <div className="flex-1 px-3 text-center truncate">
          <span className={`text-sm text-center text-white`}>
            البحث
          </span>
        </div>

        <div className="h-full aspect-square flex items-center justify-center">
          <img
            src="https://res.cloudinary.com/dbz6ebekj/image/upload/v1742382414/icons_fouady_6_kyj440.png"
            alt="chevron down"
            className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          />
        </div>
      </div>

      {/* Filter Grid */}
      {isOpen && (
        <div className="grid grid-cols-2 mt-4 gap-[7px] items-center animate-in fade-in duration-300">
          <Controller
            name="child_name"
            control={control}
            render={({ field }) => (
              <CustomSelect placeholder={"اسم الطفل"} value={field.value} onChange={field.onChange} error={errors.child_name} options={[]} />
            )}
          />
          <Controller
            name="father_name"
            control={control}
            render={({ field }) => (
              <CustomSelect placeholder={"اسم الأب"} value={field.value} onChange={field.onChange} error={errors.father_name} options={[]} />
            )}
          />
          <Controller
            name="service"
            control={control}
            render={({ field }) => (
              <CustomSelect placeholder={"الخدمة"} value={field.value} onChange={field.onChange} error={errors.service} options={[]} />
            )}
          />
          <Controller
            name="service_date"
            control={control}
            render={({ field }) => (
              <CustomDate placeholder={"تاريخ الخدمة"} value={field.value} onChange={field.onChange} error={errors.service_date} />
            )}
          />
          <Controller
            name="branch"
            control={control}
            render={({ field }) => (
              <CustomSelect placeholder={"الفرع"} value={field.value} onChange={field.onChange} error={errors.branch} options={[]} />
            )}
          />
          <Controller
            name="hospital_nurserry"
            control={control}
            render={({ field }) => (
              <CustomSelect placeholder={"المستشفي / الحضانة"} value={field.value} onChange={field.onChange} error={errors.hospital_nurserry} options={[]} />
            )}
          />
          <Controller
            name="phone"
            control={control}
            render={({ field }) => (
              <CustomSelect placeholder={"التليفون"} value={field.value} onChange={field.onChange} error={errors.phone} options={[]} />
            )}
          />
        </div>
      )}
    </form>
  );
}
