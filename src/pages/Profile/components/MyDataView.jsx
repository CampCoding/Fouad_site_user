// src/pages/Profile/components/MyDataView.jsx
import { useState } from "react";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import CustomInput from "../../../components/Common/CustomInput";
import { useUser } from "../../../context/UserContext";

export default function MyDataView() {
  const { t } = useTranslation();
  const { currentUser } = useUser();
  const { i18n } = useTranslation();
  const isEn = i18n.language === "en";

  const [profileData, setProfileData] = useState({
    name: currentUser?.name || "أحمد محمد أحمد",
    tel: currentUser?.phone || "01234567890",
    job: currentUser?.job || "مهندس",
  });

  const handleSaveChanges = () => {
    toast.success(isEn ? "Changes saved" : "تم حفظ التعديلات بنجاح");
  };

  return (
    <div className="flex text-white flex-col gap-2 animate-in fade-in duration-300 lg:max-w-[600px] lg:mx-auto">
      <div className="flex flex-col gap-2">
        <CustomInput
          value={profileData.name}
          onChange={(e) =>
            setProfileData({ ...profileData, name: e.target.value })
          }
          type="text"
          placeholder={t("profile.data.name")}
        />
        <CustomInput
          value={profileData.tel}
          onChange={(e) =>
            setProfileData({ ...profileData, tel: e.target.value })
          }
          type="tel"
          placeholder={t("profile.data.phone")}
        />
        <CustomInput
          value={profileData.job}
          onChange={(e) =>
            setProfileData({ ...profileData, job: e.target.value })
          }
          type="text"
          placeholder={t("profile.data.job")}
        />

        <div className="flex justify-between items-center mt-4">
          <button
            type="button"
            onClick={handleSaveChanges}
            className="auth_btn cursor-pointer !w-full !bg-(--main-color) !text-black !border-(--main-color)"
          >
            {t("profile.data.saveChanges")}
          </button>
        </div>
      </div>
    </div>
  );
}
