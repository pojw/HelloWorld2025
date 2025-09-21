import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ProgressBar,
  Alert,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { achievementData, calculateBadgeProgress } from "./AchievementsUtils";
import { GoalsContext } from "./GoalsContext"; // Import the GoalsContext

const BadgeCategoryScreen = () => {
  const route = useRoute();
  const { category } = route.params;
  const { goals } = useContext(GoalsContext); // Use goals from the context
  const [weeklyData, setWeeklyData] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const savedData = await AsyncStorage.getItem("weeklyData");
        if (savedData) {
          setWeeklyData(JSON.parse(savedData));
        }
      } catch (e) {
        console.error("Failed to load weekly data", e);
      }
    };
    loadData();
  }, []);

  const getBadgesForCategory = (categoryId) => {
    return achievementData.badges.filter(
      (badge) => badge.categoryId === categoryId
    );
  };

  const renderBadge = ({ item }) => {
    // Pass the goals data to the calculation function
    const progressValue = calculateBadgeProgress(item, weeklyData, goals);
    const progressPercentage = progressValue / item.target || 0;
    const isEarned = progressValue >= item.target;

    return (
      <View style={styles.badgeCard}>
        <View style={styles.badgeHeader}>
          <Ionicons
            name={item.criteria.icon || category.icon}
            size={30}
            color={isEarned ? "green" : "gray"}
          />
          <View style={styles.badgeTextContent}>
            <Text style={[styles.badgeName, isEarned && styles.earnedText]}>
              {item.name}
            </Text>
            <Text style={styles.badgeDescription}>{item.description}</Text>
          </View>
        </View>

        {/* Progress Bar */}
        <View style={styles.progressBarContainer}>
          <View style={styles.progressBarBackground} />
          <View
            style={[
              styles.progressBarFill,
              { width: `${Math.min(progressPercentage, 1) * 100}%` },
            ]}
          />
        </View>
        <Text style={styles.progressText}>
          {isEarned
            ? "Earned!"
            : `${Math.round(progressPercentage * 100)}% Complete`}
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{category.name} Badges</Text>
      <FlatList
        data={getBadgesForCategory(category.id)}
        keyExtractor={(item) => item.id}
        renderItem={renderBadge}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  badgeCard: {
    backgroundColor: "#f9f9f9",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  badgeHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  badgeTextContent: {
    marginLeft: 10,
  },
  badgeName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  earnedText: {
    color: "green",
  },
  badgeDescription: {
    fontSize: 14,
    color: "gray",
    marginTop: 2,
  },
  progressBarContainer: {
    height: 10,
    borderRadius: 5,
    backgroundColor: "#e0e0e0",
    marginTop: 5,
  },
  progressBarBackground: {
    position: "absolute",
    height: "100%",
    width: "100%",
    borderRadius: 5,
    backgroundColor: "#e0e0e0",
  },
  progressBarFill: {
    height: "100%",
    borderRadius: 5,
    backgroundColor: "green",
  },
  progressText: {
    fontSize: 12,
    color: "#555",
    textAlign: "right",
    marginTop: 5,
  },
});

export default BadgeCategoryScreen;
