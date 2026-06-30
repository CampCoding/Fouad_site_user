// src/pages/Profile/components/InfoRow.jsx
export default function InfoRow({ icon, label, value }) {
  return (
    <div className="flex items-start gap-2 bg-[#0d0d0d] border border-[#222] rounded-[10px] p-2.5">
      <div className="flex-shrink-0 mt-0.5">{icon}</div>
      <div className="min-w-0">
        <p className="text-white/40 text-[10px]">{label}</p>
        <p className="text-white text-[12px] font-bold mt-0.5 break-words">
          {value}
        </p>
      </div>
    </div>
  );
}
