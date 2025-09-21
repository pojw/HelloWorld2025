import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import ScheduleScreen from "./ScheduleScreen";
import FakeInstagramScreen from "./FakeInstagramScreen";
import ProgressScreen from "./ProgressScreen";
import Achievements from "./Achievements";
import BadgeCategoryScreen from "./BadgeCategoryScreen";
import { GoalsProvider } from "./GoalsContext";
import PhotosScreen from "./PhotosScreen";

import GoalsStack from "./GoalsStack";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Stack for the Schedule screen
function ScheduleStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ScheduleScreen"
        component={ScheduleScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

// Stack for Achievements screens
function AchievementsStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="AchievementsScreen"
        component={Achievements}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="BadgeCategory"
        component={BadgeCategoryScreen}
        options={({ route }) => ({ title: route.params.category.name })}
      />
    </Stack.Navigator>
  );
}

// The main Tab Navigator with all 6 tabs
export default function App() {
  return (
    <GoalsProvider>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            headerShown: false,
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;
              if (route.name === "Schedule") {
                iconName = focused ? "calendar" : "calendar-outline";
              } else if (route.name === "Goals") {
                iconName = focused ? "flag" : "flag-outline";
              } else if (route.name === "Instagram") {
                iconName = focused ? "logo-instagram" : "logo-instagram";
              } else if (route.name === "Photos") {
                iconName = focused ? "images" : "images-outline";
              } else if (route.name === "Progress") {
                iconName = focused ? "stats-chart" : "stats-chart-outline";
              } else if (route.name === "Achievements") {
                iconName = focused ? "ribbon" : "ribbon-outline";
              }
              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: "blue",
            tabBarInactiveTintColor: "gray",
          })}
        >
          <Tab.Screen name="Schedule" component={ScheduleStack} />
          <Tab.Screen name="Photos" component={PhotosScreen} />
          <Tab.Screen name="Goals" component={GoalsStack} />
          <Tab.Screen name="Progress" component={ProgressScreen} />
          <Tab.Screen name="Achievements" component={AchievementsStack} />
          <Tab.Screen name="Instagram" component={FakeInstagramScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </GoalsProvider>
  );
}
