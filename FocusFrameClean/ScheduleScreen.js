import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Modal,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";

export default function ScheduleScreen() {
  const [schedule, setSchedule] = useState([]);
  const [inputName, setInputName] = useState("");
  const [inputTime, setInputTime] = useState("");
  const [repeat, setRepeat] = useState("Once");
  const [editingId, setEditingId] = useState(null);

  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const loadSchedule = async () => {
      const saved = await AsyncStorage.getItem("schedule");
      if (saved) setSchedule(JSON.parse(saved));
    };
    loadSchedule();
  }, []);

  useEffect(() => {
    AsyncStorage.setItem("schedule", JSON.stringify(schedule));
  }, [schedule]);

  const addOrUpdateEvent = () => {
    if (!inputName.trim() || !inputTime.trim()) return;

    if (editingId) {
      setSchedule(
        schedule.map((item) =>
          item.id === editingId
            ? { ...item, name: inputName, time: inputTime, repeat }
            : item
        )
      );
      setEditingId(null);
    } else {
      const newEvent = {
        id: Date.now().toString(),
        name: inputName,
        time: inputTime,
        repeat,
      };
      setSchedule([...schedule, newEvent]);
    }

    setInputName("");
    setInputTime("");
    setRepeat("Once");
    setModalVisible(false);
  };

  const editEvent = (event) => {
    setInputName(event.name);
    setInputTime(event.time);
    setRepeat(event.repeat);
    setEditingId(event.id);
    setModalVisible(true);
  };

  const deleteEvent = (id) => {
    setSchedule(schedule.filter((item) => item.id !== id));
  };

  return (
    <View style={styles.container}>
      <Button title="Add Event" onPress={() => setModalVisible(true)} />

      <FlatList
        data={schedule}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.eventItem}>
            <View style={{ flex: 1 }}>
              <Text style={styles.eventText}>
                {item.name} - {item.time} ({item.repeat})
              </Text>
            </View>
            <TouchableOpacity onPress={() => editEvent(item)}>
              <Ionicons name="pencil" size={24} color="black" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => deleteEvent(item.id)}>
              <Ionicons name="trash" size={24} color="red" />
            </TouchableOpacity>
          </View>
        )}
      />

      {/* Modal for adding/editing */}
      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={{ fontWeight: "bold", fontSize: 16 }}>
              {editingId ? "Edit Event" : "Add Event"}
            </Text>
            <TextInput
              style={styles.input}
              placeholder="Event/Class Name"
              value={inputName}
              onChangeText={setInputName}
            />
            <TextInput
              style={styles.input}
              placeholder="Time (e.g., 2:00 PM - 3:00 PM)"
              value={inputTime}
              onChangeText={setInputTime}
            />
            <TextInput
              style={styles.input}
              placeholder="Repeat (e.g., Once, Daily, Weekly)"
              value={repeat}
              onChangeText={setRepeat}
            />
            <Button
              title={editingId ? "Update" : "Add"}
              onPress={addOrUpdateEvent}
            />
            <Button
              title="Cancel"
              onPress={() => setModalVisible(false)}
              color="gray"
            />
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  eventItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    marginVertical: 6,
    backgroundColor: "#f2f2f2",
    borderRadius: 8,
  },
  eventText: { fontSize: 16 },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "85%",
    backgroundColor: "white",
    padding: 16,
    borderRadius: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 8,
    marginVertical: 8,
    borderRadius: 8,
  },
});
