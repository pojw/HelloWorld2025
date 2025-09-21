import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Button,
  StyleSheet,
  Modal,
  TextInput, // <-- add this
  ScrollView,
} from "react-native";

const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const hours = Array.from({ length: 12 }, (_, i) => i + 1);
const minutes = Array.from({ length: 12 }, (_, i) => i * 5); // 0, 5, 10, ... 55
const ampm = ["AM", "PM"];

export default function AddClassModal({ visible, onClose, onAdd }) {
  const [name, setName] = useState("");
  const [startHour, setStartHour] = useState(8);
  const [startMinute, setStartMinute] = useState("00");
  const [startAMPM, setStartAMPM] = useState("AM");
  const [endHour, setEndHour] = useState(9);
  const [endMinute, setEndMinute] = useState("00");
  const [endAMPM, setEndAMPM] = useState("AM");
  const [selectedDays, setSelectedDays] = useState(
    daysOfWeek.reduce((acc, day) => ({ ...acc, [day]: false }), {})
  );

  const toggleDay = (day) =>
    setSelectedDays({ ...selectedDays, [day]: !selectedDays[day] });

  const formatTime = (h, m, a) => `${h}:${m} ${a}`;

  const handleAdd = () => {
    if (!name) return;
    const newClass = {
      id: Date.now().toString(),
      name,
      startTime: formatTime(startHour, startMinute, startAMPM),
      endTime: formatTime(endHour, endMinute, endAMPM),
      days: Object.keys(selectedDays).filter((d) => selectedDays[d]),
    };
    onAdd(newClass);

    // Reset
    setName("");
    setStartHour(8);
    setStartMinute("00");
    setStartAMPM("AM");
    setEndHour(9);
    setEndMinute("00");
    setEndAMPM("AM");
    setSelectedDays(
      daysOfWeek.reduce((acc, day) => ({ ...acc, [day]: false }), {})
    );
    onClose();
  };

  const renderPicker = (values, selected, setSelected) => (
    <ScrollView
      style={styles.picker}
      contentContainerStyle={{ alignItems: "center" }}
    >
      {values.map((v) => (
        <TouchableOpacity
          key={v}
          onPress={() => setSelected(v)}
          style={[
            styles.pickerItem,
            selected === v && styles.pickerItemSelected,
          ]}
        >
          <Text style={{ color: selected === v ? "#fff" : "#000" }}>{v}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.overlay}>
        <View style={styles.content}>
          <Text style={styles.title}>Add Class</Text>

          <Text style={styles.subtitle}>Class Name</Text>
          <View style={{ marginBottom: 10 }}>
            <TextInput
              style={styles.input}
              placeholder="Enter class name"
              value={name}
              onChangeText={setName}
            />
          </View>

          <Text style={styles.subtitle}>Start Time</Text>
          <View style={styles.timeRow}>
            {renderPicker(hours, startHour, setStartHour)}
            {renderPicker(minutes, startMinute, setStartMinute)}
            {renderPicker(ampm, startAMPM, setStartAMPM)}
          </View>

          <Text style={styles.subtitle}>End Time</Text>
          <View style={styles.timeRow}>
            {renderPicker(hours, endHour, setEndHour)}
            {renderPicker(minutes, endMinute, setEndMinute)}
            {renderPicker(ampm, endAMPM, setEndAMPM)}
          </View>

          <Text style={styles.subtitle}>Select Days</Text>
          <View style={styles.daysRow}>
            {daysOfWeek.map((day) => (
              <TouchableOpacity
                key={day}
                style={[
                  styles.dayButton,
                  selectedDays[day] && styles.daySelected,
                ]}
                onPress={() => toggleDay(day)}
              >
                <Text style={{ color: selectedDays[day] ? "#fff" : "#000" }}>
                  {day}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <Button title="Add Class" onPress={handleAdd} />
          <Button title="Cancel" color="red" onPress={onClose} />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.3)",
  },
  content: {
    margin: 20,
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
  },
  title: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
  subtitle: { fontSize: 16, fontWeight: "bold", marginVertical: 10 },
  daysRow: { flexDirection: "row", flexWrap: "wrap", marginBottom: 10 },
  dayButton: {
    padding: 8,
    borderWidth: 1,
    borderColor: "#2196F3",
    borderRadius: 5,
    marginRight: 5,
    marginBottom: 5,
  },
  daySelected: { backgroundColor: "#2196F3" },
  timeRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  picker: {
    flex: 1,
    maxHeight: 120,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginHorizontal: 5,
  },
  pickerItem: { padding: 10, alignItems: "center" },
  pickerItemSelected: { backgroundColor: "#2196F3", borderRadius: 5 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 8,
    marginBottom: 10,
  },
});
