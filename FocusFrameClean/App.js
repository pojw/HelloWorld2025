import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import GoalsScreen from "./GoalsScreen";
import PhotosScreen from "./PhotosScreen";
import ProgressScreen from "./ProgressScreen";

const Tab = createBottomTabNavigator();

export default function App() {
  const [goal, setGoal] = useState("");
  const [steps, setSteps] = useState([]);
  const [progressData, setProgressData] = useState([]);

  const generateSteps = () => {
    const predefinedSteps = {
      "Learn Web Development": [
        "Step 1: Learn HTML basics",
        "Step 2: Practice paragraphs and headings",
        "Step 3: Learn CSS layout",
        "Step 4: Small projects",
        "Step 5: Learn JavaScript basics",
      ],
    };
    setSteps(predefinedSteps[goal] || ["Start with small steps!"]);
  };

  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Goals">
          {() => (
            <GoalsScreen
              goal={goal}
              setGoal={setGoal}
              steps={steps}
              generateSteps={generateSteps}
            />
          )}
        </Tab.Screen>
        <Tab.Screen name="Photos" component={PhotosScreen} />
        <Tab.Screen name="Progress">
          {() => <ProgressScreen progressData={progressData} />}
        </Tab.Screen>
      </Tab.Navigator>
    </NavigationContainer>
  );
}
