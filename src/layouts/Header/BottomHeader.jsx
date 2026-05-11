import { FaFacebookF, FaInstagram, FaLinkedinIn, FaTiktok } from 'react-icons/fa'
import { FaX, FaXTwitter } from 'react-icons/fa6'
import { FiYoutube } from 'react-icons/fi'

export default function BottomHeader() {
  return (
    <div
      style={{
        direction: "ltr",
      }}
      className='grid z-50  bg-(--dark_gray-4)  fixed bottom-0 left-0 right-0 grid-cols-6 gap-2 items-center justify-center py-4 border-t-2 border-(--main-color)'>
      <a target='_blank' href="https://www.instagram.com/fouadycenter/">
        <FaInstagram className='text-(--main-color) text-center mx-auto w-[26px] h-[26px]' />
      </a>
      <a target='_blank' href="https://www.linkedin.com/company/fouadycenter/">
        <FaLinkedinIn className='text-(--main-color) text-center mx-auto w-[26px] h-[26px]' />
      </a>
      <a target='_blank' href="https://www.facebook.com/share/1E1WJMDGL5/">
        <FaFacebookF className='text-(--main-color) text-center mx-auto w-[26px] h-[26px]' />
      </a>
      <a target='_blank' href="https://www.tiktok.com/@fouady.center?lang=en">
        <FaTiktok className='text-(--main-color) text-center mx-auto w-[26px] h-[26px]' />
      </a>
       <a target='_blank' href="https://x.com/FouadyCenter">
        <FaXTwitter className='text-(--main-color) text-center mx-auto w-[26px] h-[26px]' />
      </a>
      <a target='_blank' href="https://www.youtube.com/@FouadyCenter">
        <FiYoutube className='text-(--main-color) text-center mx-auto w-[26px] h-[26px]' />
      </a>
    </div>
  )
}
