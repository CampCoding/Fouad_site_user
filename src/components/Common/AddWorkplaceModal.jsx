import React from 'react';
import { X } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

const workplaceSchema = z.object({
  name: z.string().min(2, "اسم مكان العمل يجب أن يكون حرفين على الأقل"),
});

export default function AddWorkplaceModal({ isOpen, onClose, onAdd }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(workplaceSchema),
    defaultValues: {
      name: ""
    }
  });

  if (!isOpen) return null;

  const onSubmit = (data) => {
    onAdd(data.name.trim());
    reset();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity">
      <div className="bg-[#171717] border border-(--main-color) rounded-[8px] w-full max-w-[400px] overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-(--main-color)/20">
          <h3 className="text-white font-bold text-lg">إضافة مكان عمل جديد</h3>
          <button 
            onClick={() => {
              reset();
              onClose();
            }}
            className="p-1 hover:bg-(--main-color)/10 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-(--main-color)" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit(onSubmit)} className="p-6 flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <label className="text-(--main-color) text-sm font-medium">اسم مكان العمل</label>
            <div className={`border h-[42px] bg-[#090909] rounded-[4px] px-3 flex items-center transition-all ${
              errors.name ? 'border-red-500' : 'border-(--main-color)/30'
            }`}>
              <input
                autoFocus
                {...register("name")}
                placeholder="أدخل اسم مكان العمل هنا..."
                className="bg-transparent text-white w-full h-full focus:outline-none placeholder:text-(--main-color)/40 text-sm"
              />
            </div>
            {errors.name && <p className="text-red-500 text-xs text-start">{errors.name.message}</p>}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 justify-end mt-2">
            <button
              type="button"
              onClick={() => {
                reset();
                onClose();
              }}
              className="px-5 py-2 text-sm font-medium text-(--main-color) hover:bg-(--main-color)/10 rounded-[4px] transition-colors"
            >
              إلغاء
            </button>
            <button
              type="submit"
              className="auth_btn px-6 py-2 flex items-center justify-center min-w-[100px]"
            >
              إضافة
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
