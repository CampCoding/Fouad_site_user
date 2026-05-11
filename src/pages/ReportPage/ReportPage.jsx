import React from 'react'
import { useReport } from '../../context/ReportContext';
import ReportSearch from '../../components/pages/ReportPage/ReportSearch'
import ReportFiles from '../../components/pages/ReportPage/ReportFiles'

export default function ReportPage() {
  const { selectedRecord, setSelectedRecord } = useReport();

  // Dummy data for the grid
  const records = [
    { id: 1, child: "اسم الطفل", father: "اسم الأب", service: "الخدمة", date: "تاريخ الخدمة" },
    { id: 2, child: "اسم الطفل", father: "اسم الأب", service: "الخدمة", date: "تاريخ الخدمة" },
    { id: 3, child: "اسم الطفل", father: "اسم الأب", service: "الخدمة", date: "تاريخ الخدمة" },
  ];

  const handleOpen = () => {
    if (!selectedRecord) {
      alert("يرجى اختيار ملف أولاً");
      return;
    }
    window.open(`https://example.com/report/${selectedRecord.id}`, '_blank');
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className='pb-10'>
      {/* Page Title Card */}
      <div className={`card`}>
        <img 
          src="https://res.cloudinary.com/dbz6ebekj/image/upload/v1741685481/21_pq4p6t.png" 
          className='object-contain' 
          width={40} 
          height={40} 
          alt="report icon" 
        />
        <p className="font-bold text-[17px] cursor-pointer text-[#eee]">
          التقارير
        </p>
      </div>

      {/* Filter Section */}
      <ReportSearch />

      {/* Files Section */}
      <ReportFiles 
        records={records}
        selectedRecord={selectedRecord}
        onSelect={setSelectedRecord}
        onOpen={handleOpen}
        onPrint={handlePrint}
      />
    </div>
  );
}
