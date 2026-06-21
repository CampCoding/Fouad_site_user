import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import HomeCard from '../../components/Common/HomeCard';
import MainLogo from '../../components/Common/MainLogo';
import {
  BookOpen,
  ListChecks,
  Star,
  Newspaper,
  Tag,
  MessageCircleQuestion,
} from 'lucide-react';

const data = [
  // الصف الأول
  {
    id: 1,
    name: "التقارير",
    img: "https://res.cloudinary.com/dbz6ebekj/image/upload/v1741685481/21_pq4p6t.png",
    link: "/reports",
  },
  {
    id: 2,
    name: "الحجز",
    img: "https://res.cloudinary.com/dbz6ebekj/image/upload/v1741685480/20_gatefn.png",
    link: "/reservations",
  },
  {
    id: 3,
    name: "التواصل",
    img: "https://res.cloudinary.com/dbz6ebekj/image/upload/v1741685480/18_izofqx.png",
    link: "/contact-us",
  },

  // الصف الثاني
  {
    id: 4,
    name: "فروعنا",
    img: "https://res.cloudinary.com/dbz6ebekj/image/upload/v1741685480/15_q3boqp.png",
    link: "/branches",
  },
  {
    id: 5,
    name: "خدماتنا",
    img: "https://res.cloudinary.com/dbz6ebekj/image/upload/v1741685480/14_bl3hmg.png",
    link: "/services",
  },
  {
    id: 6,
    name: "فريقنا",
    img: "https://res.cloudinary.com/dbz6ebekj/image/upload/v1741685480/13_qgvubp.png",
    link: "/team",
  },

  // الصف الثالث
  {
    id: 7,
    name: "التثقيف",
    img: "https://res.cloudinary.com/dbz6ebekj/image/upload/v1741685480/19_f6mora.png",
    link: "/education",
  },
  {
    id: 8,
    name: "التعليمات",
    icon: ListChecks,
    link: "/instructions",
  },
  {
    id: 9,
    name: "التقييم",
    icon: Star,
    link: "/rating",
  },

  // الصف الرابع
  {
    id: 10,
    name: "أخبارنا",
    icon: Newspaper,
    link: "/news",
  },
  {
    id: 11,
    name: "عروضنا",
    icon: Tag,
    link: "/offers",
  },
  {
    id: 12,
    name: "استشارات",
    icon: MessageCircleQuestion,
    link: "/consultations",
  },
];

export default function HomePage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(null);

  return (
    <div className=''>
      <MainLogo />

      <div className="grid max-w-[350px] gap-[15px] sm:max-w-[600px] mx-auto grid-cols-3 mb-[40px] items-center justify-center">
        {data?.map((item) => (
          <HomeCard
            key={item.id}
            item={item}
            activeId={activeTab}
            onClick={() => {
              setActiveTab(item.id);
              navigate(item.link);
            }}
            textClass="text-[15px]"
            imgClass='w-[40px] h-[40px]'
          />
        ))}
      </div>
    </div>
  );
}