import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AddClassModal from "./AddClassModal";
import AddEventModal from "./AddEventModal";
import {
  saveSchedule,
  loadSchedule,
  findCurrentActivity,
} from "./ScheduleUtils";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { initialScheduleData } from "./InitialSchedule";

// Helper function to get a color based on event type
const getEventTypeColor = (eventType) => {
  switch (eventType) {
    case "Study":
      return "#e6b0a9"; // Light Red
    case "Workout":
      return "#a9d0a6"; // Light Green
    case "Sleep":
      return "#b0c4de"; // Light Purple
    case "Class":
      return "#f5e6b1"; // Light Yellow
    default:
      return "#f0f0f0"; // Light Gray
  }
};

export default function ScheduleScreen() {
  const navigation = useNavigation();
  const [schedule, setSchedule] = useState([]);
  const [classModalVisible, setClassModalVisible] = useState(false);
  const [eventModalVisible, setEventModalVisible] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [currentActivity, setCurrentActivity] = useState(null);
  const [storedPhotos, setStoredPhotos] = useState([]);

  useEffect(() => {
    const fetchPhotos = async () => {
      const saved = await AsyncStorage.getItem("photos");
      if (saved) {
        setStoredPhotos(JSON.parse(saved));
      }
    };
    fetchPhotos();
  }, []);

  useEffect(() => {
    const fetchSchedule = async () => {
      const storedSchedule = await loadSchedule();

      if (storedSchedule.length === 0) {
        await saveSchedule(initialScheduleData);
        setSchedule(initialScheduleData);
      } else {
        setSchedule(storedSchedule);
      }
    };
    fetchSchedule();
  }, []);

  useEffect(() => {
    saveSchedule(schedule);
  }, [schedule]);

  useEffect(() => {
    const checkSchedule = async () => {
      const activity = await findCurrentActivity();
      setCurrentActivity(activity);

      if (activity) {
        console.log(
          "Currently scheduled for:",
          activity.name || activity.eventType
        );

        if (storedPhotos.length > 0) {
          const randomIndex = Math.floor(Math.random() * storedPhotos.length);
          const randomPhoto = storedPhotos[randomIndex];
          // Example of how you could navigate with data:
          // navigation.navigate('FakeInstagram', { activity, photo: randomPhoto });
        }
      } else {
        console.log("No activity currently scheduled.");
      }
    };

    const intervalId = setInterval(checkSchedule, 60000);
    checkSchedule();

    return () => clearInterval(intervalId);
  }, [storedPhotos, schedule]);

  const addClass = (newClass) => {
    setSchedule((prevSchedule) => [
      ...prevSchedule,
      { ...newClass, type: "class" },
    ]);
  };

  const addEvent = (newEvent) => {
    setSchedule((prevSchedule) => [
      ...prevSchedule,
      { ...newEvent, type: "event" },
    ]);
  };

  const deleteItem = (id) => {
    setSchedule((prevSchedule) =>
      prevSchedule.filter((item) => item.id !== id)
    );
  };

  const startEditItem = (item) => {
    setEditingItem(item);
    if (item.type === "class") {
      setClassModalVisible(true);
    } else {
      setEventModalVisible(true);
    }
  };

  const updateItem = (updatedItem) => {
    setSchedule((prevSchedule) =>
      prevSchedule.map((item) =>
        item.id === updatedItem.id ? updatedItem : item
      )
    );
    handleCloseModals();
  };

  const handleCloseModals = () => {
    setEditingItem(null);
    setClassModalVisible(false);
    setEventModalVisible(false);
  };

  const renderItem = ({ item }) => (
    <View
      style={[
        styles.item,
        {
          backgroundColor: getEventTypeColor(
            item.type === "class" ? "Class" : item.eventType
          ),
        },
      ]}
    >
      <View style={{ flex: 1 }}>
        <Text style={styles.itemTitle}>{item.name}</Text>
        <Text>
          {item.startTime} - {item.endTime}
        </Text>
        <Text>Days: {item.days.join(", ")}</Text>
      </View>
      <View style={styles.itemButtonsContainer}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => startEditItem(item)}
        >
          <Ionicons name="create-outline" size={24} color="#2196F3" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => deleteItem(item.id)}
        >
          <Ionicons name="trash-outline" size={24} color="#F44336" />
        </TouchableOpacity>
      </View>
    </View>
  );

  const classes = schedule.filter((item) => item.type === "class");
  const sleepEvents = schedule.filter((item) => item.eventType === "Sleep");
  const studyEvents = schedule.filter((item) => item.eventType === "Study");
  const workoutEvents = schedule.filter((item) => item.eventType === "Workout");
  const otherEvents = schedule.filter(
    (item) =>
      item.type === "event" &&
      !["Sleep", "Study", "Workout"].includes(item.eventType)
  );

  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <ScrollView style={styles.container}>
        <Text style={styles.title}>Weekly Schedule</Text>

        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Classes</Text>
          {classes.length === 0 ? (
            <Text style={styles.emptyText}>No classes scheduled.</Text>
          ) : (
            <FlatList
              data={classes}
              keyExtractor={(item) => item.id}
              renderItem={renderItem}
              scrollEnabled={false}
            />
          )}
        </View>

        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Sleep</Text>
          {sleepEvents.length === 0 ? (
            <Text style={styles.emptyText}>No sleep schedules.</Text>
          ) : (
            <FlatList
              data={sleepEvents}
              keyExtractor={(item) => item.id}
              renderItem={renderItem}
              scrollEnabled={false}
            />
          )}
        </View>

        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Study</Text>
          {studyEvents.length === 0 ? (
            <Text style={styles.emptyText}>No study sessions.</Text>
          ) : (
            <FlatList
              data={studyEvents}
              keyExtractor={(item) => item.id}
              renderItem={renderItem}
              scrollEnabled={false}
            />
          )}
        </View>

        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Workout</Text>
          {workoutEvents.length === 0 ? (
            <Text style={styles.emptyText}>No workouts scheduled.</Text>
          ) : (
            <FlatList
              data={workoutEvents}
              keyExtractor={(item) => item.id}
              renderItem={renderItem}
              scrollEnabled={false}
            />
          )}
        </View>

        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Other Events</Text>
          {otherEvents.length === 0 ? (
            <Text style={styles.emptyText}>No other events.</Text>
          ) : (
            <FlatList
              data={otherEvents}
              keyExtractor={(item) => item.id}
              renderItem={renderItem}
              scrollEnabled={false}
            />
          )}
        </View>

        <View style={styles.buttonsRow}>
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => setClassModalVisible(true)}
          >
            <Text style={styles.addButtonText}>Add Class</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => setEventModalVisible(true)}
          >
            <Text style={styles.addButtonText}>Add Event</Text>
          </TouchableOpacity>
        </View>

        <AddClassModal
          visible={classModalVisible}
          onClose={handleCloseModals}
          onAdd={addClass}
          onUpdate={updateItem}
          itemToEdit={editingItem}
        />
        <AddEventModal
          visible={eventModalVisible}
          onClose={handleCloseModals}
          onAdd={addEvent}
          onUpdate={updateItem}
          eventToEdit={editingItem}
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
    padding: 16,
  },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  sectionContainer: { marginBottom: 20 },
  sectionTitle: { fontSize: 20, fontWeight: "bold", marginBottom: 10 },
  item: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  classItem: { backgroundColor: "#f2f2f2" },
  eventItem: { backgroundColor: "#e6f7ff" },
  itemTitle: { fontSize: 16, fontWeight: "bold" },
  buttonsRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
    marginBottom: 40,
  },
  addButton: { backgroundColor: "#2196F3", padding: 12, borderRadius: 10 },
  addButtonText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
  itemButtonsContainer: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },
  actionButton: { padding: 5 },
  emptyText: {
    color: "gray",
    fontStyle: "italic",
    textAlign: "center",
    marginTop: 5,
  },
});
