import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  Button,
  Alert,
  TouchableOpacity,
  Modal,
  FlatList,
  SafeAreaView, // Import SafeAreaView
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { initialProgressData } from "./ProgressData";
import DataModal from "./DataModal";
import Achievements from "./Achievements";
import { Ionicons } from "@expo/vector-icons";
import ShareAchievementModal from "./ShareAchievementModal";
import LogActivityModal from "./LogActivityModal"; // Assuming a new modal for logging

const allBadges = [
  {
    id: "start",
    name: "Getting Started",
    criteria: 1,
    icon: "star",
    color: "#FFD700",
  },
  {
    id: "two_weeks",
    name: "Two-Week Trend",
    criteria: 2,
    icon: "rocket",
    color: "#FFA500",
  },
  {
    id: "four_weeks",
    name: "Four-Week Streak",
    criteria: 4,
    icon: "trophy",
    color: "#4CAF50",
  },
  {
    id: "eight_weeks",
    name: "Productivity Guru",
    criteria: 8,
    icon: "sparkles",
    color: "#00BFFF",
  },
];

export default function ProgressScreen() {
  const [weeklyData, setWeeklyData] = useState([]);
  const [dataModalVisible, setDataModalVisible] = useState(false);
  const [achievementsModalVisible, setAchievementsModalVisible] =
    useState(false);
  const [earnedBadges, setEarnedBadges] = useState([]);
  const [shareModalVisible, setShareModalVisible] = useState(false);
  const [badgeToShare, setBadgeToShare] = useState(null);
  const [logModalVisible, setLogModalVisible] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  // New useEffect to check for achievements when data changes
  useEffect(() => {
    if (weeklyData.length > 0) {
      const weeksLogged = weeklyData.filter(
        (item) => item.appName && item.appName.toLowerCase() === "instagram"
      ).length;
      checkAndAwardBadges(weeksLogged);
    }
  }, [weeklyData]);

  const loadData = async () => {
    try {
      const savedData = await AsyncStorage.getItem("weeklyData");
      let data = savedData ? JSON.parse(savedData) : [];

      if (data.length === 0) {
        data = initialProgressData;
        await saveWeeklyData(data);
      }
      setWeeklyData(data);

      const savedBadges = await AsyncStorage.getItem("earnedBadges");
      if (savedBadges) {
        setEarnedBadges(JSON.parse(savedBadges));
      }
    } catch (e) {
      console.error("Failed to load data", e);
    }
  };

  const saveWeeklyData = async (data) => {
    try {
      await AsyncStorage.setItem("weeklyData", JSON.stringify(data));
    } catch (e) {
      console.error("Failed to save weekly data", e);
    }
  };

  const saveBadges = async (badges) => {
    try {
      await AsyncStorage.setItem("earnedBadges", JSON.stringify(badges));
    } catch (e) {
      console.error("Failed to save badges", e);
    }
  };

  const logActivity = (newEntry) => {
    const newData = [...weeklyData, newEntry];
    setWeeklyData(newData);
    saveWeeklyData(newData);
    Alert.alert(
      "Success",
      `Data has been logged for Week ${newEntry.week} for ${newEntry.appName}!`
    );
  };

  const checkAndAwardBadges = (weeksLogged) => {
    const newBadges = allBadges.filter(
      (badge) =>
        weeksLogged >= badge.criteria &&
        !earnedBadges.some((b) => b.id === badge.id)
    );

    if (newBadges.length > 0) {
      const updatedBadges = [...earnedBadges, ...newBadges];
      setEarnedBadges(updatedBadges);
      saveBadges(updatedBadges);
      setBadgeToShare(newBadges[0]);
      setShareModalVisible(true);
    }
  };

  const showFutureFeatureAlert = () => {
    Alert.alert(
      "Future Feature 🤖",
      "Eventually, you'll be able to upload a screenshot of your screen time report, and our AI will automatically read the data for you!"
    );
  };

  const calculateReduction = () => {
    const instaData = weeklyData
      .filter(
        (item) => item.appName && item.appName.toLowerCase() === "instagram"
      )
      .sort((a, b) => a.week - b.week);
    if (instaData.length < 2) return null;

    const lastWeek = instaData[instaData.length - 1];
    const secondToLastWeek = instaData[instaData.length - 2];
    const reduction = secondToLastWeek.timeInMinutes - lastWeek.timeInMinutes;

    if (reduction > 0) {
      return `Reduced time by ${reduction} minutes! 🎉`;
    } else if (reduction < 0) {
      return `Increased time by ${Math.abs(reduction)} minutes. 😔`;
    } else {
      return "No change this week. 🤔";
    }
  };

  const getLastWeekData = () => {
    const instaData = weeklyData
      .filter(
        (item) => item.appName && item.appName.toLowerCase() === "instagram"
      )
      .sort((a, b) => a.week - b.week);
    if (instaData.length === 0) return null;
    return instaData[instaData.length - 1];
  };

  const lastWeekData = getLastWeekData();
  const nextWeekNumber =
    weeklyData.length > 0 ? weeklyData[weeklyData.length - 1].week + 1 : 1;

  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <ScrollView style={styles.container}>
        <Text style={styles.title}>Your Progress</Text>

        <View style={styles.graphSection}>
          <Text style={styles.subtitle}>Your Time In Each Subject</Text>
          <View style={styles.graphPlaceholder}>
            <Text style={styles.graphPlaceholderText}>
              📊 A graph showing your screen time trends will appear here!
            </Text>
          </View>
        </View>

        <View style={styles.inputSection}>
          <Text style={styles.subtitle}>Log Weekly App Use</Text>
          <Button
            title="Log New Activity"
            onPress={() => setLogModalVisible(true)}
          />
        </View>

        <View style={styles.progressSection}>
          <Text style={styles.subtitle}>Screen Time Trends</Text>
          {lastWeekData === null ? (
            <Text style={styles.emptyText}>
              No Instagram data yet. Add some to get started!
            </Text>
          ) : (
            <View>
              <Text style={styles.trendText}>
                Last Week's Instagram Use (Week {lastWeekData.week}):{" "}
                {lastWeekData.timeInMinutes} minutes
              </Text>
              {lastWeekData.startTime && lastWeekData.endTime && (
                <Text style={styles.trendText}>
                  Typical Time: {lastWeekData.startTime} to{" "}
                  {lastWeekData.endTime}
                </Text>
              )}
              {calculateReduction() && (
                <Text style={styles.trendText}>{calculateReduction()}</Text>
              )}
              <Text style={styles.trendText}>
                Your data will be used to predict your habits and send timely
                notifications.
              </Text>
            </View>
          )}
        </View>
        <DataModal
          visible={dataModalVisible}
          onClose={() => setDataModalVisible(false)}
          data={weeklyData}
        />
        <Modal
          visible={achievementsModalVisible}
          animationType="slide"
          transparent
        >
          <View style={modalStyles.overlay}>
            <View style={modalStyles.modalContainer}>
              <Achievements badges={earnedBadges} />
              <Button
                title="Close"
                onPress={() => setAchievementsModalVisible(false)}
              />
            </View>
          </View>
        </Modal>
        <ShareAchievementModal
          visible={shareModalVisible}
          onClose={() => setShareModalVisible(false)}
          badge={badgeToShare}
        />
        <LogActivityModal
          visible={logModalVisible}
          onClose={() => setLogModalVisible(false)}
          onLog={logActivity}
          nextWeekNumber={nextWeekNumber}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  graphPlaceholder: {
    backgroundColor: "#eee",
    height: 250,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#ccc",
    borderStyle: "dashed",
  },
  graphPlaceholderText: {
    color: "#888",
    fontStyle: "italic",
    textAlign: "center",
    paddingHorizontal: 20,
  },
  inputSection: {
    marginBottom: 30,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  timeInputRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  timeInput: {
    flex: 1,
  },
  actionButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
    marginTop: 10,
  },
  progressSection: {
    backgroundColor: "#f9f9f9",
    padding: 15,
    borderRadius: 10,
  },
  trendText: {
    fontSize: 16,
    marginBottom: 8,
    lineHeight: 24,
  },
  emptyText: {
    textAlign: "center",
    color: "gray",
    fontStyle: "italic",
  },
});

const modalStyles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContainer: {
    width: "90%",
    maxHeight: "80%",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
  },
});
