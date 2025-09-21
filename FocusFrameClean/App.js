import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import PhotosScreen from "./PhotosScreen";
import ScheduleScreen from "./ScheduleScreen";
import ProgressScreen from "./ProgressScreen";

import GoalsStack from "./GoalsStack"; // default export
import { GoalsProvider } from "./GoalsContext"; // named export

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <GoalsProvider>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ color, size }) => {
              let iconName;
              if (route.name === "Photos") iconName = "images";
              else if (route.name === "Schedule") iconName = "calendar";
              else if (route.name === "Goals") iconName = "flag";
              else if (route.name === "Progress") iconName = "stats-chart";
              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: "blue",
            tabBarInactiveTintColor: "gray",
          })}
        >
          <Tab.Screen name="Photos" component={PhotosScreen} />
          <Tab.Screen name="Schedule" component={ScheduleScreen} />
          <Tab.Screen
            name="Goals"
            component={GoalsStack} // Use stack navigator here
            options={{ headerShown: false }} // Hide tab header, stack handles headers
          />
          <Tab.Screen name="Progress" component={ProgressScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </GoalsProvider>
  );
}
