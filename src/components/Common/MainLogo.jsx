
export default function MainLogo() {
  return (
    <div className="mx-auto mt-[45px] mb-5 flex h-[120px] w-[90vw] items-center justify-between rounded-[10px]">
      <div className="-mt-[10px] flex w-[70%] flex-col md:items-start items-center justify-center">
        <h1
          className="m-0 text-white font-bold text-center text-[28px]  tracking-[0.4px]"
          
        >
          فؤادي
        </h1>

        <h2
          className="my-1 text-center  text-(--main-color) text-[20px] font-bold tracking-[0.4px]"
          
        >
       لقلب الاطفال
        </h2>

        <div
          className="mt-1 border-b-2 border-(--main-color) h-[2px] w-[96%]"
          
        />
      </div>

      <div className="flex w-[29%] items-center justify-center">
        <img
          src={'/images/logo.png'}
          alt="Fouady Academy Logo"
          className="h-[135px] w-[135px] object-contain"
        />
      </div>

      
    </div>
  );
}