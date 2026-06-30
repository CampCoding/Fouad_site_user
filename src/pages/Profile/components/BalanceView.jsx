// src/pages/Profile/components/BalanceView.jsx
import { Coins, Wallet } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import { BALANCE_HISTORY } from "./data";

export default function BalanceView() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div className="text-white flex flex-col gap-3 animate-in fade-in duration-300">
      <div className="relative overflow-hidden border border-(--main-color)/40 bg-gradient-to-br from-[#171717] to-[#1f1f1f] p-4 lg:p-6 rounded-lg">
        <div className="absolute -left-6 -top-6 w-24 h-24 bg-(--main-color)/5 rounded-full blur-2xl" />
        <div className="relative flex items-center gap-3">
          <div className="w-12 h-12 lg:w-16 lg:h-16 rounded-full bg-(--main-color)/10 border border-(--main-color)/30 flex items-center justify-center flex-shrink-0">
            <Wallet size={24} className="text-(--main-color) lg:hidden" />
            <Wallet size={30} className="text-(--main-color) hidden lg:block" />
          </div>
          <div className="flex flex-col">
            <p className="text-white/60 text-[12px] lg:text-[14px]">
              {t("profile.balance.current")}
            </p>
            <p className="text-(--main-color) font-bold text-[20px] lg:text-[28px] leading-tight mt-0.5">
              70{" "}
              <span className="text-[13px] lg:text-[16px] font-normal">
                {t("profile.balance.currency")}
              </span>
            </p>
          </div>
        </div>
      </div>

      <div className="border border-[#292929] bg-[#171717]/60 p-3 rounded-md flex gap-2">
        <div className="flex-shrink-0 w-5 h-5 rounded-full bg-(--main-color)/20 border border-(--main-color)/40 flex items-center justify-center mt-0.5">
          <span className="text-(--main-color) text-[11px] font-bold">!</span>
        </div>
        <div className="flex flex-col gap-1.5 flex-1">
          <p className="text-white text-[12px] font-bold">
            {t("profile.balance.useInfo")}
          </p>
          <ul className="text-white/70 text-[11px] leading-relaxed flex flex-col gap-1 list-disc ps-4">
            <li>{t("profile.balance.useInfoLine1")}</li>
            <li>{t("profile.balance.useInfoLine2")}</li>
          </ul>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <button
          onClick={() => navigate(`/reservations?v=balance`)}
          className="auth_btn !w-full !bg-(--main-color) !text-black !border-(--main-color) flex items-center justify-center gap-1.5"
        >
          <Wallet size={16} />
          {t("profile.balance.use")}
        </button>
        <button className="auth_btn !w-full flex items-center justify-center gap-1.5">
          <Coins size={16} className="text-(--main-color)" />
          {t("profile.balance.recharge")}
        </button>
      </div>

      <div className="flex flex-col gap-2 mt-2">
        <div className="flex items-center justify-between border-b border-[#292929] pb-2">
          <p className="text-(--main-color) text-[13px] font-bold">
            {t("profile.balance.history")}
          </p>
          <p className="text-white/40 text-[10px]">
            {t("profile.balance.lastTransactions")}
          </p>
        </div>
        {BALANCE_HISTORY.map((item, i) => (
          <div
            key={i}
            className="border border-[#292929] bg-[#171717] p-2.5 rounded-md flex items-center gap-2.5"
          >
            <div
              className={`flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center ${
                item.type === "add"
                  ? "bg-(--green-color)/15 border border-(--green-color)/40"
                  : "bg-red-500/15 border border-red-500/40"
              }`}
            >
              <span
                className={`font-bold text-[16px] ${
                  item.type === "add" ? "text-(--green-color)" : "text-red-500"
                }`}
              >
                {item.type === "add" ? "+" : "−"}
              </span>
            </div>
            <div className="flex-1 flex flex-col gap-0.5">
              <div className="flex items-center justify-between">
                <p className="text-white text-[12px] font-bold">
                  {item.type === "add"
                    ? t("profile.balance.addCredit")
                    : t("profile.balance.useCredit")}
                </p>
                <p
                  className={`text-[12px] font-bold ${
                    item.type === "add"
                      ? "text-(--green-color)"
                      : "text-red-500"
                  }`}
                >
                  {item.type === "add" ? "+" : "-"}
                  {item.amount} {t("profile.balance.currency")}
                </p>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-white/50 text-[10px]">
                  {item.type === "add"
                    ? `${t("profile.balance.addedOn")} ${item.date}`
                    : `${item.service} • ${item.date}`}
                </p>
                {item.type === "add" && (
                  <p className="text-(--main-color)/80 text-[10px]">
                    {t("profile.balance.expiresOn")} {item.expiry}
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
