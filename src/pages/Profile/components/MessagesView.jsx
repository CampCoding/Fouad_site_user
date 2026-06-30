// src/pages/Profile/components/MessagesView.jsx
import { Mail, MessageCirclePlus } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { MESSAGES_DATA } from "./data";
import NewMessageModal from "./NewMessageModal";

export default function MessagesView() {
  const { t } = useTranslation();
  const [isNewMessageModalOpen, setIsNewMessageModalOpen] = useState(false);

  const handleSendMessage = (form) => {
    console.log("Send message:", form);
    setIsNewMessageModalOpen(false);
  };

  return (
    <div className="text-white flex flex-col gap-3 animate-in fade-in duration-300">
      <button
        onClick={() => setIsNewMessageModalOpen(true)}
        className="border border-(--main-color)/40 bg-gradient-to-br from-(--main-color)/10 to-(--main-color)/5 rounded-lg p-3 lg:p-4 flex items-center gap-3 hover:border-(--main-color) hover:from-(--main-color)/15 transition-all"
      >
        <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-(--main-color) flex items-center justify-center flex-shrink-0">
          <MessageCirclePlus size={20} className="text-black" />
        </div>
        <div className="flex-1 text-start">
          <p className="text-white font-bold text-[13px] lg:text-[15px]">
            {t("profile.messages.newMessage")}
          </p>
          <p className="text-white/60 text-[11px] lg:text-[12px]">
            {t("profile.messages.newMessageDesc")}
          </p>
        </div>
      </button>

      <div className="flex items-center justify-between px-1 mt-1">
        <p className="text-(--main-color) text-[12px] lg:text-[14px] font-bold">
          {t("profile.messages.previous")}
        </p>
        <p className="text-white/40 text-[11px] lg:text-[12px]">
          {MESSAGES_DATA.length} {t("profile.messages.count")}
        </p>
      </div>

      {MESSAGES_DATA.length === 0 ? (
        <div className="border border-[#292929] bg-[#171717] rounded-lg py-10 flex flex-col items-center gap-2">
          <Mail size={32} className="text-white/20" />
          <p className="text-white/50 text-[12px]">
            {t("profile.messages.noMessages")}
          </p>
        </div>
      ) : (
        MESSAGES_DATA.map((msg) => (
          <div
            key={msg.id}
            className="border border-[#292929] bg-[#171717] rounded-lg p-3 lg:p-4 flex gap-2.5 hover:border-(--main-color)/40 transition-colors cursor-pointer"
          >
            <div
              className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center relative ${
                msg.from === "incoming"
                  ? "bg-(--main-color)/10 border border-(--main-color)/30"
                  : "bg-(--green-color)/10 border border-(--green-color)/30"
              }`}
            >
              <Mail
                size={16}
                className={
                  msg.from === "incoming"
                    ? "text-(--main-color)"
                    : "text-(--green-color)"
                }
              />
              {msg.unread > 0 && (
                <span className="absolute -top-1 -end-1 w-4 h-4 bg-red-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center border border-[#171717]">
                  {msg.unread}
                </span>
              )}
            </div>
            <div className="flex-1 flex flex-col gap-1 min-w-0">
              <div className="flex items-center justify-between gap-2">
                <p className="text-white font-bold text-[12px] lg:text-[14px] truncate flex-1">
                  {msg.subject}
                </p>
                <p className="text-white/40 text-[10px] lg:text-[11px] flex-shrink-0">
                  {msg.date}
                </p>
              </div>
              <p className="text-white/60 text-[11px] lg:text-[12px] truncate">
                {msg.lastMessage}
              </p>
              <div className="flex items-center gap-2">
                <span
                  className={`text-[9px] lg:text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
                    msg.from === "incoming"
                      ? "bg-(--main-color)/15 text-(--main-color) border border-(--main-color)/30"
                      : "bg-(--green-color)/15 text-(--green-color) border border-(--green-color)/30"
                  }`}
                >
                  {msg.from === "incoming"
                    ? t("profile.messages.incoming")
                    : t("profile.messages.outgoing")}
                </span>
                <span className="text-white/30 text-[10px]">{msg.time}</span>
              </div>
            </div>
          </div>
        ))
      )}

      {isNewMessageModalOpen && (
        <NewMessageModal
          onClose={() => setIsNewMessageModalOpen(false)}
          onSend={handleSendMessage}
        />
      )}
    </div>
  );
}
