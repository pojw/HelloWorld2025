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
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { initialProgressData } from "./ProgressData";
import DataModal from "./DataModal";

export default function ProgressScreen() {
  const [weeklyData, setWeeklyData] = useState([]);
  const [appName, setAppName] = useState("");
  const [timeInMinutes, setTimeInMinutes] = useState("");
  const [week, setWeek] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [dataModalVisible, setDataModalVisible] = useState(false);

  useEffect(() => {
    loadWeeklyData();
  }, []);

  const loadWeeklyData = async () => {
    try {
      const savedData = await AsyncStorage.getItem("weeklyData");
      let data = savedData ? JSON.parse(savedData) : [];

      if (data.length === 0) {
        data = initialProgressData;
        await saveWeeklyData(data);
      }
      setWeeklyData(data);
    } catch (e) {
      console.error("Failed to load weekly data", e);
    }
  };

  const saveWeeklyData = async (data) => {
    try {
      await AsyncStorage.setItem("weeklyData", JSON.stringify(data));
    } catch (e) {
      console.error("Failed to save weekly data", e);
    }
  };

  const addData = () => {
    if (!appName || !timeInMinutes || !week || !startTime || !endTime) {
      Alert.alert("Error", "Please fill in all fields.");
      return;
    }

    const minutes = parseInt(timeInMinutes, 10);
    if (isNaN(minutes)) {
      Alert.alert("Error", "Time must be a number.");
      return;
    }
    const weekNumber = parseInt(week, 10);
    if (isNaN(weekNumber)) {
      Alert.alert("Error", "Week must be a number.");
      return;
    }

    const newData = [
      ...weeklyData,
      {
        id: Date.now().toString(),
        week: weekNumber,
        appName,
        timeInMinutes: minutes,
        startTime,
        endTime,
      },
    ];

    setWeeklyData(newData);
    saveWeeklyData(newData);
    setAppName("");
    setTimeInMinutes("");
    setWeek("");
    setStartTime("");
    setEndTime("");
    Alert.alert(
      "Success",
      `Data for Week ${weekNumber} has been added for ${appName}!`
    );
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
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Your Progress</Text>

      {/* Placeholder for the Graph */}
      <View style={styles.graphPlaceholder}>
        <Text style={styles.graphPlaceholderText}>
          📊 A graph showing your screen time trends will appear here!
        </Text>
      </View>

      <View style={styles.inputSection}>
        <Text style={styles.subtitle}>Log Weekly App Use</Text>
        <TextInput
          style={styles.input}
          placeholder={`Current Week (e.g., ${nextWeekNumber})`}
          keyboardType="numeric"
          value={week}
          onChangeText={setWeek}
        />
        <TextInput
          style={styles.input}
          placeholder="App Name (e.g., Instagram)"
          value={appName}
          onChangeText={setAppName}
        />

        <View style={styles.timeInputRow}>
          <TextInput
            style={[styles.input, styles.timeInput]}
            placeholder="Start Time (e.g., 5:00 PM)"
            value={startTime}
            onChangeText={setStartTime}
          />
          <TextInput
            style={[styles.input, styles.timeInput]}
            placeholder="End Time (e.g., 8:00 PM)"
            value={endTime}
            onChangeText={setEndTime}
          />
        </View>

        <TextInput
          style={styles.input}
          placeholder="Time in minutes (e.g., 120)"
          keyboardType="numeric"
          value={timeInMinutes}
          onChangeText={setTimeInMinutes}
        />
        <View style={styles.actionButtons}>
          <Button title="Add Data" onPress={addData} />
          <Button title="Upload Screenshot" onPress={showFutureFeatureAlert} />
        </View>
        <Button
          title="View All Logged Data"
          onPress={() => setDataModalVisible(true)}
          color="#333"
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
                Typical Time: {lastWeekData.startTime} to {lastWeekData.endTime}
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
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
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
