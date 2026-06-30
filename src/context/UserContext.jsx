import { createContext, useContext, useState } from "react";

const UserContext = createContext(null);

const STORAGE_KEY = "fouady-user";

const MOCK_USERS = {
  patient: {
    id: 1,
    role: "patient",
    name: "أحمد محمد أحمد",
    nameEn: "Ahmed Mohamed Ahmed",
    phone: "01234567890",
    job: "مهندس",
  },
  doctor: {
    id: 2,
    role: "doctor",
    name: "د. أحمد شبانة",
    nameEn: "Dr. Ahmed Shabana",
    phone: "01098765432",
    job: "استشاري قلب أطفال",
  },
};

function getStoredUser() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
}

export function UserProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(getStoredUser);

  const login = (role, formData = {}) => {
    const baseUser = MOCK_USERS[role] || MOCK_USERS.patient;

    const user = {
      ...baseUser,
      phone: formData.phone || baseUser.phone,
    };

    setCurrentUser(user);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem(STORAGE_KEY);
  };

  const isLoggedIn = !!currentUser;
  const isDoctor = currentUser?.role === "doctor";
  const isPatient = currentUser?.role === "patient";

  return (
    <UserContext.Provider
      value={{
        currentUser,
        login,
        logout,
        isLoggedIn,
        isDoctor,
        isPatient,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}
