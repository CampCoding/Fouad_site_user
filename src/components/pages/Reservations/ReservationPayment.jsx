import React, { useState } from 'react'
import CustomSelect from '../../Common/CustomSelect'
import CustomInput from '../../Common/CustomInput'
import { MdOutlineKeyboardDoubleArrowLeft } from 'react-icons/md';
import { X, Upload, CheckCircle2, Copy, Wallet, ArrowLeftRight, Info, UploadCloud } from 'lucide-react';



const USER_BALANCE = 500;

export default function ReservationPayment({ setCurrentStep }) {
  const [hasCoupon, setHasCoupon] = useState(false);
  const [confirmCoupon, setConfirmCoupon] = useState(false);
  const [couponCode, setCouponCode] = useState('');
  const [price, setPrice] = useState('');
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [isTransferOpen, setIsTransferOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);


  const paymentOptions = [
    { value: 'balance', label: 'الدفع من خلال رصيدك في البرنامج', img: "https://res.cloudinary.com/dbz6ebekj/image/upload/v1756889968/134_jj9les.png" },
    { value: 'cash', label: 'الدفع نقدا من خلال الفرع يوم الفحص', img: "https://res.cloudinary.com/dbz6ebekj/image/upload/v1756889965/3_jc68er.png" },
    { value: 'cards', label: 'الدفع من بطاقة الالكترونية', img: "https://res.cloudinary.com/dbz6ebekj/image/upload/v1756889967/133_kg8ipo.png" },
    { value: 'instapay', label: 'الدفع من إنستاباي', img: "https://res.cloudinary.com/dbz6ebekj/image/upload/v1756889967/131_hdrunk.png" },
    { value: 'vodafone', label: 'الدفع من فودافون كاش', img: "https://res.cloudinary.com/dbz6ebekj/image/upload/v1756889967/132_gavuhf.png" },
    { value: 'insurance', label: 'على نفقة التأمين الصحي', img: "https://res.cloudinary.com/dbz6ebekj/image/upload/v1756889965/4_i15hno.png" },
    { value: 'doctors', label: 'تعاقد نقابة الأطباء', img: "https://res.cloudinary.com/dbz6ebekj/image/upload/v1756889966/5_tjg6ij.png" },
    { value: 'engineers', label: 'تعاقد نقابة المهندسين', img: "https://res.cloudinary.com/dbz6ebekj/image/upload/v1756889966/6_qerhux.png" },
  ];

  const handleMethodChange = (method) => {
    setSelectedMethod(method);
    // Reset data when method changes
    setHasCoupon(false);
    setConfirmCoupon(false);
    setCouponCode('');
    setPrice('');
  };

  const selectedOption = paymentOptions.find(opt => opt.value === selectedMethod);
  const isSufficient = Number(price) <= USER_BALANCE;

  return (
    <div className="flex flex-col gap-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Step Header */}
      <div className="border h-[40px] mb-4 flex justify-center items-center border-(--main-color) bg-[#171717] rounded-[4px]">
        <p className='text-white text-center font-bold'>إملأ بيانات الدفع </p>
      </div>

      <div className='flex flex-col gap-4'>
        {/* Payment Method */}
        <div className="flex flex-col gap-1">
          {!selectedMethod ? (
            <CustomSelect
              placeholder={"اختر طريقة الدفع"}
              options={paymentOptions}
              value={selectedMethod}
              onChange={handleMethodChange}
            />
          ) : (
            <div 
              onClick={() => handleMethodChange(null)}
              className="flex items-center gap-4 p-2 bg-[#171717] border border-[#232323] rounded-[4px] cursor-pointer hover:border-(--main-color) transition-all group"
            >
              <div className="h-[28px] w-[35px] flex items-center justify-center bg-[#232323] rounded-[2px]">
                <img 
                  src={selectedOption?.img} 
                  alt={selectedOption?.label} 
                  className="h-[18px] object-contain"
                />
              </div>
              <p className="text-white text-[13px] font-medium flex-1 text-right">
                {selectedOption?.label}
              </p>
            </div>
          )}
        </div>

        {/* Service Price Row */}
        <div className="grid grid-cols-[1fr_0.5fr_0.7fr] gap-2 items-center">
          <div className="flex flex-col gap-1">
            <div className="text-white rounded-[4px] text-[12px] px-3 h-[38.4px] border border-[#232323] bg-[#171717] flex items-center justify-start">
              سعر الخدمة
            </div>
          </div>
          
          <div className="flex flex-col gap-1">
            <CustomInput 
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="border-[#232323]! rounded-[4px]!" 
              inputClassName="placeholder:text-white text-white text-center" 
              placeholder={"السعر"} 
            />
          </div>

          <div className="flex flex-col gap-1">
            <button
              onClick={() => setHasCoupon(prev => !prev)}
              className={`bg-[#171717] rounded-[4px] text-[11px] h-[38.4px] text-white transition-all 
                ${hasCoupon ? 'border border-(--main-bg-color) shadow-[0_0_10px_rgba(var(--main-bg-rgb),0.3)]' : 'border border-[#232323]'}`}>
                لديك كود خصم؟
            </button>
          </div>
        </div>
      </div>

      {/* Balance Specific UI */}
      {selectedMethod === 'balance' && price && (
        <div className="mt-2 animate-in fade-in zoom-in-95 duration-300">
          {isSufficient ? (
            <div className="grid grid-cols-[1fr_1fr] gap-2 items-center p-px bg-[#1d1d1d] border border-[#232323] rounded-[4px]">
              <div className="text-white text-[12px] h-[38.4px] flex items-center justify-center">
                {USER_BALANCE} ج.م
              </div>
              <div className="text-white text-[12px] h-[38.4px] flex items-center justify-center">
                رصيدك الحالي
              </div>
            </div>
          ) : (
            <div className="bg-[#2a1313] border border-[#442222] py-3 px-4 rounded-[4px] flex justify-center items-center">
              <p className="text-white text-[11px] text-center font-bold">
                عفوا.. رصيدك الحالي لا يكفي لإتمام المعاملة
              </p>
            </div>
          )}
        </div>
      )}

      {/* Transfer & Upload UI (InstaPay & Vodafone Cash) */}
      {(selectedMethod === 'instapay' || selectedMethod === 'vodafone') && (
        <div className="flex flex-col gap-2 mt-2 animate-in fade-in slide-in-from-top-2 duration-300">
          <div className='grid grid-cols-[10fr_2fr_6fr] gap-2'>
            <div className='bg-[#171717] flex justify-center items-center rounded-[4px] h-[38px] border border-[#232323]'>
              <p className='text-[#a6a6a6] text-center text-[13px]'>اضغط هنا لتحويل مبلغ الحجز</p>
            </div>

            <MdOutlineKeyboardDoubleArrowLeft className='text-[#545454] mx-auto w-[50px] h-[50px]'/>
            <button onClick={() => setIsTransferOpen(true)} className="auth_btn">للتحويل</button>

          </div>


          <div className='grid grid-cols-[10fr_2fr_6fr] gap-2'>
            <div className='bg-[#171717] flex justify-center items-center rounded-[4px] h-[38px] border border-[#232323]'>
              <p className='text-[#a6a6a6] text-center text-[13px]'>اضغط هنا لتحميل إيصال التحويل</p>
            </div>

            <MdOutlineKeyboardDoubleArrowLeft className='text-[#545454] mx-auto w-[50px] h-[50px]'/>
            <button onClick={() => setIsUploadOpen(true)} className="auth_btn">للتحميل</button>

          </div>
        
        </div>
      )}

      {/* Insurance Documents */}
      {selectedMethod === 'insurance' && (
        <div className="flex flex-col gap-4 mt-2 animate-in fade-in slide-in-from-top-2 duration-300">
           <div className="flex items-center justify-end gap-2 text-white/70 text-[13px]">
             <span>يرجى تحميل هذه الاوراق بصورة واضحة</span>
             <Info className="w-4 h-4 text-(--main-color)" />
           </div>
           
           <div className="grid grid-cols-2 gap-3">
             {[
               "أصل خطاب التأمين للمركز مختوم وساري",
               "صورة الصفحة الأولى للشهادة الصحية بالكارنيه",
               "صورة شهادة ميلاد الطفل",
               "صورة بطاقة الأب أو الأم"
             ].map((doc, idx) => (
               <div key={idx} className="flex items-center justify-between gap-2 bg-[#171717] border border-[#232323] p-3 rounded-[8px] hover:border-(--main-color)/30 transition-all cursor-pointer group" onClick={() => setIsUploadOpen(true)}>
                 <p className="text-white text-[10px] flex-1 text-right leading-tight">{doc}</p>
                 <div className="p-2 bg-[#232323] rounded-full group-hover:bg-(--main-color)/10 transition-colors">
                   <UploadCloud className="w-4 h-4 text-(--main-color)" />
                 </div>
               </div>
             ))}
           </div>

           <p className="text-white/40 text-[11px] text-center mt-2 leading-relaxed">
             يتم تسليم هذه الأوراق بنفس الترتيب <br /> من خلال فروعنا يوم الفحص
           </p>
        </div>
      )}

      {/* Syndicate Documents */}
      {(selectedMethod === 'doctors' || selectedMethod === 'engineers') && (
        <div className="flex flex-col gap-4 mt-2 animate-in fade-in slide-in-from-top-2 duration-300">
           <div className="flex items-center justify-end gap-2 text-white/70 text-[13px]">
             <span>يرجى تحميل هذه الاوراق بصورة واضحة</span>
             <Info className="w-4 h-4 text-(--main-color)" />
           </div>
           
           <div className="flex flex-col gap-3">
             {[
               "أصل خطاب النقابة للمركز مختوم وساري",
               "صورة شهادة ميلاد الطفل",
               "صورة بطاقة الأب أو الأم"
             ].map((doc, idx) => (
               <div key={idx} className="flex items-center justify-between gap-3 bg-[#171717] border border-[#232323] p-3 rounded-[8px] hover:border-(--main-color)/30 transition-all cursor-pointer group" onClick={() => setIsUploadOpen(true)}>
                 <p className="text-white text-[12px] flex-1 text-right">{doc}</p>
                 <div className="p-2 bg-[#232323] rounded-full group-hover:bg-(--main-color)/10 transition-colors">
                   <UploadCloud className="w-4 h-4 text-(--main-color)" />
                 </div>
               </div>
             ))}
           </div>

           <p className="text-white/40 text-[11px] text-center mt-2 leading-relaxed">
             يتم تسليم هذه الأوراق بنفس الترتيب <br /> من خلال فروعنا يوم الفحص
           </p>
        </div>
      )}

      {/* Coupon Input Row */}
      {hasCoupon && (
        <div className="grid grid-cols-[1fr_0.3fr] gap-2 items-end mt-2 animate-in fade-in zoom-in-95 duration-300">
          <div className="flex flex-col gap-1">
            <CustomInput
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
              placeholder="كود الخصم"
              inputClassName="text-white bg-transparent"
            />
          </div>
          <button
            onClick={() => setConfirmCoupon(true)}
            className="bg-[#171717] border border-[#232323] rounded-[4px] text-[12px] h-[38.4px] text-white hover:border-(--main-color) transition-all">
            للتأكيد
          </button>
        </div>
      )}

      {/* Coupon Success Message */}
      {confirmCoupon && (
        <div className="flex flex-col gap-4 mt-4 animate-in slide-in-from-top-2 duration-300">
          <div className="border border-white/80 py-2 rounded-[4px] flex justify-center items-center text-white bg-white/5">
            <p className="text-sm font-bold">تم عمل خصم بقيمة 20 %</p>
          </div>

          <div className="grid grid-cols-[1fr_0.5fr] gap-2 items-center">
            <div className="text-white rounded-[4px] text-[12px] px-3 h-[38.4px] border border-[#232323] bg-[#171717] flex items-center justify-start">
              سعر الخدمة
            </div>
            <div className="text-white rounded-[4px] text-[12px] px-3 h-[38.4px] border border-[#232323] bg-[#171717] flex items-center justify-center font-bold">
              {price ? (price * 0.8).toFixed(2) : "السعر"}
            </div>
          </div>
        </div>
      )}

      <button onClick={() => setCurrentStep(4)} className="auth_btn mt-6 ms-auto! w-min px-10">للإستمرار</button>

      {/* Upload Modal */}
      {isUploadOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-[#171717] border border-(--main-color) rounded-[8px] w-full max-w-[400px] overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between p-4 border-b border-(--main-color)/20">
              <h3 className="text-white font-bold text-lg">تحميل إيصال التحويل</h3>
              <button onClick={() => setIsUploadOpen(false)} className="p-1 hover:bg-(--main-color)/10 rounded-full transition-colors">
                <X className="w-5 h-5 text-(--main-color)" />
              </button>
            </div>
            <div className="p-6 flex flex-col gap-5">
              <div 
                onClick={() => document.getElementById('file-upload').click()}
                className="border-2 border-dashed border-(--main-color)/30 rounded-[8px] p-8 flex flex-col items-center justify-center gap-3 cursor-pointer hover:bg-(--main-color)/5 transition-all group"
              >
                <input 
                  id="file-upload" 
                  type="file" 
                  hidden 
                  onChange={(e) => setSelectedFile(e.target.files[0])}
                />
                <div className="w-12 h-12 bg-(--main-color)/10 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                  <UploadCloud className="w-6 h-6 text-(--main-color)" />
                </div>
                <div className="text-center">
                  <p className="text-white text-sm font-medium">
                    {selectedFile ? selectedFile.name : "اضغط هنا لاختيار ملف الإيصال"}
                  </p>
                  <p className="text-white/40 text-[11px] mt-1">PDF, JPG, PNG (Max 5MB)</p>
                </div>
              </div>

              <div className="flex gap-3 justify-end mt-2">
                <button
                  onClick={() => setIsUploadOpen(false)}
                  className="px-5 py-2 text-sm font-medium text-(--main-color) hover:bg-(--main-color)/10 rounded-[4px] transition-colors"
                >
                  إلغاء
                </button>
                <button
                  disabled={!selectedFile}
                  onClick={() => {
                    // Logic to handle upload
                    setIsUploadOpen(false);
                  }}
                  className={`auth_btn px-6 py-2 flex items-center justify-center min-w-[100px] ${!selectedFile ? 'opacity-50 grayscale' : ''}`}
                >
                  تحميل الآن
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Transfer Popup */}
      {isTransferOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-[#171717] border border-(--main-color) rounded-[8px] w-full max-w-[400px] overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between p-4 border-b border-(--main-color)/20 bg-(--main-color)/5">
              <div className="flex items-center gap-2">
                <ArrowLeftRight className="w-5 h-5 text-(--main-color)" />
                <h3 className="text-white font-bold text-lg">بيانات التحويل</h3>
              </div>
              <button onClick={() => setIsTransferOpen(false)} className="p-1 hover:bg-(--main-color)/10 rounded-full transition-colors">
                <X className="w-5 h-5 text-(--main-color)" />
              </button>
            </div>
            
            <div className="p-6 flex flex-col gap-6">
              <div className="flex flex-col gap-4">
                <div className="bg-[#232323] p-4 rounded-[6px] border border-white/5">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-white/40 text-[11px]">رقم الموبايل / الحساب</span>
                    <button className="text-(--main-color) hover:text-white transition-colors">
                      <Copy className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="text-white font-mono text-xl tracking-wider text-center">01234567890</p>
                </div>

                <div className="bg-[#232323] p-4 rounded-[6px] border border-white/5">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-white/40 text-[11px]">اسم المستلم</span>
                  </div>
                  <p className="text-white text-md font-medium text-center">شركة فؤادي للأنظمة</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 bg-blue-500/10 border border-blue-500/20 rounded-[6px]">
                <CheckCircle2 className="w-5 h-5 text-blue-400 shrink-0" />
                <p className="text-[12px] text-blue-100/80 leading-relaxed">
                  برجاء التأكد من رقم الحساب قبل التحويل، ورفع صورة الإيصال بعد إتمام العملية لضمان سرعة تفعيل الحجز.
                </p>
              </div>

              <button
                onClick={() => setIsTransferOpen(false)}
                className="auth_btn w-full py-3 text-md font-bold"
              >
                فهمت، شكراً
              </button>
            </div>
          </div>
        </div>
      )}
    </div>

  )
}
