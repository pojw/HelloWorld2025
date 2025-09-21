import React, { useState, useEffect } from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
  StyleSheet,
  Button,
} from "react-native";

const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const hours = Array.from({ length: 12 }, (_, i) => i + 1);
const minutes = ["00", "15", "30", "45"];
const ampm = ["AM", "PM"];
const eventTypes = ["Sleep", "Study", "Workout", "Relax", "Other"];

export default function AddEventModal({
  visible,
  onClose,
  onAdd,
  onUpdate,
  eventToEdit,
}) {
  const [selectedType, setSelectedType] = useState("Sleep");
  const [customType, setCustomType] = useState("");
  const [startHour, setStartHour] = useState(8);
  const [startMinute, setStartMinute] = useState("00");
  const [startAMPM, setStartAMPM] = useState("AM");
  const [endHour, setEndHour] = useState(9);
  const [endMinute, setEndMinute] = useState("00");
  const [endAMPM, setEndAMPM] = useState("AM");
  const [selectedDays, setSelectedDays] = useState(
    daysOfWeek.reduce((acc, day) => ({ ...acc, [day]: false }), {})
  );

  useEffect(() => {
    if (eventToEdit) {
      setSelectedType(eventToEdit.eventType);
      setCustomType(eventToEdit.eventType === "Other" ? eventToEdit.name : "");

      const [sTime, sAmPm] = eventToEdit.startTime.split(" ");
      const [sHour, sMin] = sTime.split(":");
      setStartHour(parseInt(sHour));
      setStartMinute(sMin);
      setStartAMPM(sAmPm);

      const [eTime, eAmPm] = eventToEdit.endTime.split(" ");
      const [eHour, eMin] = eTime.split(":");
      setEndHour(parseInt(eHour));
      setEndMinute(eMin);
      setEndAMPM(eAmPm);

      const initialSelectedDays = daysOfWeek.reduce(
        (acc, day) => ({ ...acc, [day]: eventToEdit.days.includes(day) }),
        {}
      );
      setSelectedDays(initialSelectedDays);
    } else {
      setSelectedType("Sleep");
      setCustomType("");
      setStartHour(8);
      setStartMinute("00");
      setStartAMPM("AM");
      setEndHour(9);
      setEndMinute("00");
      setEndAMPM("AM");
      setSelectedDays(
        daysOfWeek.reduce((acc, day) => ({ ...acc, [day]: false }), {})
      );
    }
  }, [eventToEdit, visible]);

  const toggleDay = (day) =>
    setSelectedDays({ ...selectedDays, [day]: !selectedDays[day] });

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

  const handleSave = () => {
    if (selectedType === "Other" && !customType) {
      alert("Please enter a custom event name.");
      return;
    }

    const eventData = {
      id: eventToEdit ? eventToEdit.id : Date.now().toString(),
      name: selectedType === "Other" ? customType : selectedType,
      eventType: selectedType,
      type: "event",
      startTime: `${startHour}:${startMinute} ${startAMPM}`,
      endTime: `${endHour}:${endMinute} ${endAMPM}`,
      days: Object.keys(selectedDays).filter((d) => selectedDays[d]),
    };

    if (eventToEdit) {
      onUpdate(eventData);
    } else {
      onAdd(eventData);
    }
    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.overlay}>
        <View style={styles.content}>
          <Text style={styles.title}>
            {eventToEdit ? "Edit Event" : "Add Event"}
          </Text>
          <Text style={styles.subtitle}>Event Type</Text>
          <View style={styles.typeRow}>
            {eventTypes.map((type) => (
              <TouchableOpacity
                key={type}
                style={[
                  styles.typeButton,
                  selectedType === type && styles.typeSelected,
                ]}
                onPress={() => setSelectedType(type)}
              >
                <Text
                  style={{ color: selectedType === type ? "#fff" : "#000" }}
                >
                  {type}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          {selectedType === "Other" && (
            <TextInput
              style={styles.input}
              placeholder="Enter custom type"
              value={customType}
              onChangeText={setCustomType}
            />
          )}
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
          <View style={styles.buttonContainer}>
            <Button
              title={eventToEdit ? "Update Event" : "Add Event"}
              onPress={handleSave}
            />
            <Button title="Cancel" color="red" onPress={onClose} />
          </View>
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
  typeRow: { flexDirection: "row", flexWrap: "wrap", marginBottom: 10 },
  typeButton: {
    padding: 8,
    borderWidth: 1,
    borderColor: "#2196F3",
    borderRadius: 5,
    marginRight: 5,
    marginBottom: 5,
  },
  typeSelected: { backgroundColor: "#2196F3" },
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
  buttonContainer: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
