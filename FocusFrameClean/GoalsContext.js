import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { initialGoals } from "./InitialGoals";

export const GoalsContext = createContext();

export const GoalsProvider = ({ children }) => {
  const [goals, setGoals] = useState([]);

  useEffect(() => {
    loadGoals();
  }, []);

  const loadGoals = async () => {
    try {
      const storedGoals = await AsyncStorage.getItem("goals");
      if (storedGoals !== null) {
        setGoals(JSON.parse(storedGoals));
      } else {
        setGoals(initialGoals);
        await AsyncStorage.setItem("goals", JSON.stringify(initialGoals));
      }
    } catch (e) {
      console.error("Failed to load goals", e);
    }
  };

  const saveGoals = async (goalsToSave) => {
    try {
      await AsyncStorage.setItem("goals", JSON.stringify(goalsToSave));
      setGoals(goalsToSave);
    } catch (e) {
      console.error("Failed to save goals", e);
    }
  };

  const addGoal = async (newGoal) => {
    await saveGoals([...goals, newGoal]);
  };

  const updateGoal = async (updatedGoal) => {
    const updatedGoals = goals.map((g) =>
      g.id === updatedGoal.id ? updatedGoal : g
    );
    await saveGoals(updatedGoals);
  };

  const deleteGoal = async (id) => {
    const updatedGoals = goals.filter((g) => g.id !== id);
    await saveGoals(updatedGoals);
  };

  return (
    <GoalsContext.Provider value={{ goals, addGoal, deleteGoal, updateGoal }}>
      {children}
    </GoalsContext.Provider>
  );
};
