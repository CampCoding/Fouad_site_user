import React, { createContext, useContext, useState } from 'react';

const ReportContext = createContext();

export const ReportProvider = ({ children }) => {
  const [selectedRecord, setSelectedRecord] = useState(null);

  return (
    <ReportContext.Provider value={{ selectedRecord, setSelectedRecord }}>
      {children}
    </ReportContext.Provider>
  );
};

export const useReport = () => {
  const context = useContext(ReportContext);
  if (!context) {
    throw new Error('useReport must be used within a ReportProvider');
  }
  return context;
};
