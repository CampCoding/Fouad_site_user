import React, { useState } from 'react'
import CustomSelect from '../../Common/CustomSelect'
import CustomInput from '../../Common/CustomInput'
import { MdOutlineKeyboardDoubleArrowLeft } from 'react-icons/md';
import { X, CheckCircle2, Copy, ArrowLeftRight, Info, UploadCloud } from 'lucide-react';

const USER_BALANCE = 500;

export default function ReservationPayment({ goToNextStep, selectedServiceId, paymentData, setPaymentData }) {

  // الـ states المؤقتة (Modals والـ file)
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [isTransferOpen, setIsTransferOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const { selectedMethod, price, hasCoupon, confirmCoupon, couponCode } = paymentData;

  const paymentOptions = [
    { value: 'balance', label: 'الدفع من خلال رصيدك في البرنامج', img: "/images/159.png" },
    { value: 'cash', label: 'الدفع نقدا من خلال الفرع يوم الفحص', img: "/images/152.png" },
    { value: 'cards', label: 'الدفع من بطاقة الالكترونية', img: "/images/158.png" },
    { value: 'instapay', label: 'الدفع من إنستاباي', img: "/images/156.png" },
    { value: 'vodafone', label: 'الدفع من فودافون كاش', img: "/images/157.png" },
    { value: 'insurance', label: 'على نفقة التأمين الصحي', img: "/images/153.png" },
    { value: 'doctors', label: 'تعاقد نقابة الأطباء', img: "/images/154.png" },
    { value: 'engineers', label: 'تعاقد نقابة المهندسين', img: "/images/155.png" },
  ];

  // ✨ المسح يبقى بس لو الطريقة اتغيرت فعلًا
  const handleMethodChange = (method) => {
    // لو نفس الطريقة، متعملش حاجة
    if (method === selectedMethod) return;

    setPaymentData({
      ...paymentData,
      selectedMethod: method,
      hasCoupon: false,
      confirmCoupon: false,
      couponCode: '',
      price: '',
    });
  };

  const isSufficient = Number(price) <= USER_BALANCE;

  return (
    <div className="flex flex-col gap-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="border h-[40px] mb-4 flex justify-center items-center border-(--main-color) bg-[#171717] rounded-[4px]">
        <p className='text-white text-center font-bold'>إملأ بيانات الدفع </p>
      </div>

      <div className='flex flex-col gap-4'>
        {/* ✨ السيليكت يفضل ظاهر دايمًا - مفيش استبدال بـ div */}
        <div className="flex flex-col gap-1">
          <CustomSelect
            placeholder={"اختر طريقة الدفع"}
            options={paymentOptions}
            value={selectedMethod}
            onChange={handleMethodChange}
            selectClassName='h-[50px]!'
          />
        </div>

        {selectedMethod !== 'insurance' && selectedMethod !== 'doctors' && selectedMethod !== 'engineers' && (
          <div className="grid grid-cols-[1fr_0.5fr_0.7fr] gap-2 items-center">
            <div className="flex flex-col gap-1">
              <div className="text-white rounded-[4px] text-[12px] px-3 h-[38.4px] border border-[#232323] bg-[#171717] flex items-center justify-start">
                سعر الخدمة
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <CustomInput
                value={price}
                onChange={(e) => setPaymentData({ ...paymentData, price: e.target.value })}
                className="border-[#232323]! rounded-[4px]!"
                inputClassName="placeholder:text-white text-white text-center"
                placeholder={"السعر"}
              />
            </div>

            <div className="flex flex-col gap-1">
              <button
                onClick={() => setPaymentData({ ...paymentData, hasCoupon: !hasCoupon })}
                className={`bg-[#171717] rounded-[4px] text-[11px] h-[38.4px] text-white transition-all 
                  ${hasCoupon ? 'border border-(--main-bg-color) shadow-[0_0_10px_rgba(var(--main-bg-rgb),0.3)]' : 'border border-[#232323]'}`}>
                لديك كود خصم؟
              </button>
            </div>
          </div>
        )}
      </div>

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

      {(selectedMethod === 'instapay' || selectedMethod === 'vodafone') && (
        <div className="flex flex-col gap-2 mt-2 animate-in fade-in slide-in-from-top-2 duration-300">
          <div className='grid grid-cols-[10fr_2fr_6fr] gap-2'>
            <div className='bg-[#171717] flex justify-center items-center rounded-[4px] h-[38px] border border-[#232323]'>
              <p className='text-[#a6a6a6] text-center text-[13px]'>اضغط هنا لتحويل مبلغ الحجز</p>
            </div>
            <MdOutlineKeyboardDoubleArrowLeft className='text-[#545454] mx-auto w-[50px] h-[50px]' />
            <button onClick={() => setIsTransferOpen(true)} className="auth_btn">للتحويل</button>
          </div>

          <div className='grid grid-cols-[10fr_2fr_6fr] gap-2'>
            <div className='bg-[#171717] flex justify-center items-center rounded-[4px] h-[38px] border border-[#232323]'>
              <p className='text-[#a6a6a6] text-center text-[13px]'>اضغط هنا لتحميل إيصال التحويل</p>
            </div>
            <MdOutlineKeyboardDoubleArrowLeft className='text-[#545454] mx-auto w-[50px] h-[50px]' />
            <button onClick={() => setIsUploadOpen(true)} className="auth_btn">للتحميل</button>
          </div>
        </div>
      )}

      {selectedMethod === 'insurance' && (
        <div className="flex flex-col gap-4 mt-2 animate-in fade-in slide-in-from-top-2 duration-300">
          <div className="flex items-center justify-start gap-2 text-white/70 text-[13px]">
            <Info className="w-4 h-4 text-(--main-color)" />
            <span>يرجى تحميل هذه الاوراق بصورة واضحة</span>
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

      {(selectedMethod === 'doctors' || selectedMethod === 'engineers') && (
        <div className="flex flex-col gap-4 mt-2 animate-in fade-in slide-in-from-top-2 duration-300">
          <div className="flex items-center justify-start gap-2 text-white/70 text-[13px]">
            <Info className="w-4 h-4 text-(--main-color)" />
            <span>يرجى تحميل هذه الاوراق بصورة واضحة</span>
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

      {hasCoupon && (
        <div className="grid grid-cols-[1fr_0.3fr] gap-2 items-end mt-2 animate-in fade-in zoom-in-95 duration-300">
          <div className="flex flex-col gap-1">
            <CustomInput
              value={couponCode}
              onChange={(e) => setPaymentData({ ...paymentData, couponCode: e.target.value })}
              placeholder="كود الخصم"
              inputClassName="text-white bg-transparent"
            />
          </div>
          <button
            onClick={() => setPaymentData({ ...paymentData, confirmCoupon: true })}
            className="bg-[#171717] border border-[#232323] rounded-[4px] text-[12px] h-[38.4px] text-white hover:border-(--main-color) transition-all">
            للتأكيد
          </button>
        </div>
      )}

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

      <button onClick={goToNextStep} className="auth_btn mt-6 ms-auto! w-min px-10">للإستمرار</button>

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
                <input id="file-upload" type="file" hidden onChange={(e) => setSelectedFile(e.target.files[0])} />
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
                <button onClick={() => setIsUploadOpen(false)} className="px-5 py-2 text-sm font-medium text-(--main-color) hover:bg-(--main-color)/10 rounded-[4px] transition-colors">
                  إلغاء
                </button>
                <button
                  disabled={!selectedFile}
                  onClick={() => setIsUploadOpen(false)}
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

              <button onClick={() => setIsTransferOpen(false)} className="auth_btn w-full py-3 text-md font-bold">
                فهمت، شكراً
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}