import React, { useState } from 'react'
import { useNavigate } from 'react-router';
import HomeCard from '../../components/Common/HomeCard';

const data = [
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
    name: "تواصل",
    img: "https://res.cloudinary.com/dbz6ebekj/image/upload/v1741685480/18_izofqx.png",
    link: "/contact-us",
  },
  {
    id: 4,
    name: "التثقيف",
    img: "https://res.cloudinary.com/dbz6ebekj/image/upload/v1741685480/19_f6mora.png",
    link: "/education",
  },
  {
    id: 5,
    name: "الأكاديمية",
    img: "https://res.cloudinary.com/dbz6ebekj/image/upload/v1751879311/3_f6senc.png",
    link: "/accounts-management",
  },
  {
    id: 6,
    name: "أخبارنا",
    img: "https://res.cloudinary.com/dbz6ebekj/image/upload/v1751879311/4_skbuzb.png",
    link: "/legal-management",
  },
  {
    id: 7,
    name: "فروعنا",
    img: "https://res.cloudinary.com/dbz6ebekj/image/upload/v1741685480/15_q3boqp.png",
    link: "/branches",
  },

  {
    id: 8,
    name: "خدماتنا",
    img: "https://res.cloudinary.com/dbz6ebekj/image/upload/v1741685480/14_bl3hmg.png",
    link: "/services",
  },
  {
    id: 9,
    name: "فريقنا",
    img: "https://res.cloudinary.com/dbz6ebekj/image/upload/v1741685480/13_qgvubp.png",
    link: "/team",
  },
];

export default function HomePage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(1);
  return (
    <div>
      <img className='h-[250px] mx-auto' src="https://res.cloudinary.com/dbz6ebekj/image/upload/v1753707646/%D9%81%D8%A4%D8%A7%D8%AF_2_bwfrzk.png" alt="fouady logo" />

      <div className="grid max-w-[250px] mx-auto  grid-cols-3 mb-[40px] gap-[11px] items-center justify-center">
        {data?.map((item) => (
          <HomeCard 
            key={item.id}
            item={item}
            activeId={activeTab}
            onClick={() => {
              setActiveTab(item.id);
              navigate(item.link);
            }}
          />
        ))}
      </div>
    </div>
  )
}
