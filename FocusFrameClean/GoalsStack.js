import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import GoalsScreen from "./GoalsScreen";
import GoalDetailsScreen from "./GoalDetailsScreen";
import { GoalsProvider } from "./GoalsContext";

const Stack = createNativeStackNavigator();

export default function GoalsStack() {
  return (
    <GoalsProvider>
      <Stack.Navigator>
        <Stack.Screen
          name="GoalsScreen"
          component={GoalsScreen}
          options={{ title: "Goals", headerShown: false }}
        />
        <Stack.Screen
          name="GoalDetails"
          component={GoalDetailsScreen}
          options={{ title: "Goal Details" }}
        />
      </Stack.Navigator>
    </GoalsProvider>
  );
}
