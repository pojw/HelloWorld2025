import React, { createContext, useState } from "react";

export const GoalsContext = createContext();

export const GoalsProvider = ({ children }) => {
  const [goals, setGoals] = useState([]);

  const updateGoal = (updatedGoal) => {
    setGoals((prev) =>
      prev.map((g) => (g.id === updatedGoal.id ? updatedGoal : g))
    );
  };

  return (
    <GoalsContext.Provider value={{ goals, setGoals, updateGoal }}>
      {children}
    </GoalsContext.Provider>
  );
};
