import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Modal,
} from "react-native";
import AddClassModal from "./AddClassModal";
import AddEventModal from "./AddEventModal";

export default function ScheduleScreen() {
  const [schedule, setSchedule] = useState([]);
  const [classModalVisible, setClassModalVisible] = useState(false);
  const [eventModalVisible, setEventModalVisible] = useState(false);

  const addClass = (newClass) =>
    setSchedule([...schedule, { ...newClass, type: "class" }]);
  const addEvent = (newEvent) =>
    setSchedule([...schedule, { ...newEvent, type: "event" }]);

  const renderItem = ({ item }) => (
    <View
      style={[
        styles.item,
        item.type === "class" ? styles.classItem : styles.eventItem,
      ]}
    >
      <Text style={styles.itemTitle}>{item.name}</Text>
      <Text>
        {item.startTime} - {item.endTime}
      </Text>
      <Text>Days: {item.days.join(", ")}</Text>
      {item.type === "event" && <Text>Event Type: {item.eventType}</Text>}
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Weekly Schedule</Text>
      <FlatList
        data={schedule}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ListEmptyComponent={<Text>No items yet.</Text>}
      />

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

      {/* Modals */}
      <AddClassModal
        visible={classModalVisible}
        onClose={() => setClassModalVisible(false)}
        onAdd={addClass}
      />
      <AddEventModal
        visible={eventModalVisible}
        onClose={() => setEventModalVisible(false)}
        onAdd={addEvent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 20, fontWeight: "bold", marginBottom: 10 },
  item: { padding: 12, borderRadius: 8, marginBottom: 8 },
  classItem: { backgroundColor: "#f2f2f2" },
  eventItem: { backgroundColor: "#e6f7ff" },
  itemTitle: { fontSize: 16, fontWeight: "bold" },
  buttonsRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 10,
  },
  addButton: { backgroundColor: "#2196F3", padding: 12, borderRadius: 10 },
  addButtonText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
});
