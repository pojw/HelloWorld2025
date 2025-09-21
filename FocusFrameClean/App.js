// App.js
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";

import GoalsScreen from "./GoalsScreen";
import GoalDetailsScreen from "./GoalDetailsScreen";
import PhotosScreen from "./PhotosScreen";
import ProgressScreen from "./ProgressScreen";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function GoalsStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="GoalsMain"
        component={GoalsScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="GoalDetails"
        component={GoalDetailsScreen}
        options={{ headerTitle: "Goal Details" }}
      />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Goals" component={GoalsStack} />
        <Tab.Screen name="Photos" component={PhotosScreen} />
        <Tab.Screen name="Progress" component={ProgressScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
