import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  StyleSheet,
  Button,
  TextInput,
  Alert,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const activities = [
  { name: "Study", icon: "book", color: "#4CAF50" },
  { name: "Workout", icon: "fitness", color: "#FF5733" },
  { name: "Sleep", icon: "moon", color: "#3F51B5" },
  { name: "Relax", icon: "leaf", color: "#009688" },
  { name: "Instagram", icon: "logo-instagram", color: "#E1306C" },
  { name: "TikTok", icon: "logo-tiktok", color: "#000000" },
  { name: "YouTube", icon: "logo-youtube", color: "#FF0000" },
];

const LogActivityModal = ({ visible, onClose, onLog, nextWeekNumber }) => {
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [timeInMinutes, setTimeInMinutes] = useState("");
  const [week, setWeek] = useState(nextWeekNumber.toString());
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  // Set a current week number for the placeholder
  const currentWeekNumber = 39;

  const handleLog = () => {
    if (
      !selectedActivity ||
      !timeInMinutes ||
      !week ||
      !startTime ||
      !endTime
    ) {
      Alert.alert("Error", "Please fill in all fields.");
      return;
    }

    const minutes = parseInt(timeInMinutes, 10);
    const weekNumber = parseInt(week, 10);
    if (isNaN(minutes) || isNaN(weekNumber)) {
      Alert.alert("Error", "Week and Time must be numbers.");
      return;
    }

    const newEntry = {
      id: Date.now().toString(),
      week: weekNumber,
      appName: selectedActivity,
      timeInMinutes: minutes,
      startTime,
      endTime,
    };

    onLog(newEntry);
    onClose();
    resetForm();
  };

  const resetForm = () => {
    setSelectedActivity(null);
    setTimeInMinutes("");
    setWeek(currentWeekNumber.toString()); // Reset to the current week number
    setStartTime("");
    setEndTime("");
  };

  const renderActivityButton = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.activityButton,
        selectedActivity === item.name && {
          borderColor: item.color,
          borderWidth: 2,
        },
      ]}
      onPress={() => setSelectedActivity(item.name)}
    >
      <Ionicons name={item.icon} size={30} color={item.color} />
      <Text style={styles.activityButtonText}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onShow={resetForm}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.title}>Log New Activity</Text>

          <Text style={styles.subtitle}>1. Select Activity</Text>
          <FlatList
            data={activities}
            renderItem={renderActivityButton}
            keyExtractor={(item) => item.name}
            numColumns={3}
            contentContainerStyle={styles.activityList}
          />

          <Text style={styles.subtitle}>2. Enter Details</Text>
          <TextInput
            style={styles.input}
            placeholder={`Week ${currentWeekNumber}`}
            placeholderTextColor="#666" // Added for visibility
            keyboardType="numeric"
            value={`Week ${currentWeekNumber}`}
            onChangeText={setWeek}
          />
          <View style={styles.timeInputRow}>
            <TextInput
              style={[styles.input, styles.timeInput]}
              placeholder="Start Time (e.g., 5:00 PM)"
              placeholderTextColor="#666" // Added for visibility
              value={startTime}
              onChangeText={setStartTime}
            />
            <TextInput
              style={[styles.input, styles.timeInput]}
              placeholder="End Time (e.g., 8:00 PM)"
              placeholderTextColor="#666" // Added for visibility
              value={endTime}
              onChangeText={setEndTime}
            />
          </View>
          <TextInput
            style={styles.input}
            placeholder="Time in minutes (e.g., 120)"
            placeholderTextColor="#666" // Added for visibility
            keyboardType="numeric"
            value={timeInMinutes}
            onChangeText={setTimeInMinutes}
          />

          <Button title="Log Activity" onPress={handleLog} />
          <Button title="Cancel" color="gray" onPress={onClose} />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContainer: {
    width: "90%",
    maxHeight: "90%",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 15,
    marginBottom: 10,
  },
  activityList: {
    justifyContent: "space-between",
  },
  activityButton: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    margin: 5,
    borderRadius: 10,
    backgroundColor: "#f0f0f0",
    height: 80,
  },
  activityButtonText: {
    marginTop: 5,
    textAlign: "center",
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
    gap: 10,
  },
  timeInput: {
    flex: 1,
  },
});

export default LogActivityModal;
