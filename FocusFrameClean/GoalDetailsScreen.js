import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
  Button,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function GoalDetailsScreen({ route, navigation }) {
  const { goal, updateGoal } = route.params;

  const [steps, setSteps] = useState(goal.steps || []);
  const [editingId, setEditingId] = useState(null);
  const [input, setInput] = useState("");
  const [newStepText, setNewStepText] = useState("");

  // Update progress and persist to main GoalsScreen
  const persistSteps = (updatedSteps) => {
    setSteps(updatedSteps);
    updateGoal({ ...goal, steps: updatedSteps });
  };

  const toggleStep = (id) => {
    const updated = steps.map((s) =>
      s.id === id ? { ...s, done: !s.done } : s
    );
    persistSteps(updated);
  };

  const editStep = (id, text) => {
    setInput(text);
    setEditingId(id);
  };

  const saveStep = () => {
    const updated = steps.map((s) =>
      s.id === editingId ? { ...s, text: input } : s
    );
    setEditingId(null);
    setInput("");
    persistSteps(updated);
  };

  const deleteStep = (id) => {
    const updated = steps.filter((s) => s.id !== id);
    persistSteps(updated);
  };

  const addStep = () => {
    if (!newStepText.trim()) return;
    const newStep = {
      id: Date.now().toString(),
      text: newStepText,
      done: false,
    };
    const updated = [...steps, newStep];
    setNewStepText("");
    persistSteps(updated);
  };

  // Progress calculation
  const progress =
    steps.length === 0 ? 0 : steps.filter((s) => s.done).length / steps.length;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{goal.text}</Text>

      <Text style={styles.progressText}>
        Progress: {Math.round(progress * 100)}%
      </Text>
      <View style={styles.progressBar}>
        <View style={[styles.progressFill, { width: `${progress * 100}%` }]} />
      </View>

      {/* Add new step */}
      {/* Add new step */}
      <View style={styles.addStepRow}>
        <TextInput
          style={styles.input}
          placeholder="New step..."
          value={newStepText}
          onChangeText={setNewStepText}
          onSubmitEditing={addStep} // ✅ Press Enter to add
          returnKeyType="done" // Shows “Done” on keyboard
        />
        <Button title="Add" onPress={addStep} />
      </View>

      {/* Steps list */}
      <FlatList
        data={steps}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={[styles.stepItem, item.done && styles.stepDone]}>
            <TouchableOpacity onPress={() => toggleStep(item.id)}>
              <Ionicons
                name={item.done ? "checkmark-circle" : "ellipse-outline"}
                size={24}
                color={item.done ? "green" : "gray"}
              />
            </TouchableOpacity>

            {editingId === item.id ? (
              <View style={{ flex: 1, marginLeft: 10 }}>
                <TextInput
                  value={input}
                  onChangeText={setInput}
                  style={styles.input}
                />
                <Button title="Save" onPress={saveStep} />
              </View>
            ) : (
              <Text style={[styles.stepText, item.done && styles.doneText]}>
                {item.text}
              </Text>
            )}

            {editingId !== item.id && (
              <View style={styles.actions}>
                <TouchableOpacity onPress={() => editStep(item.id, item.text)}>
                  <Ionicons name="create-outline" size={24} color="blue" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => deleteStep(item.id)}>
                  <Ionicons name="trash-outline" size={24} color="red" />
                </TouchableOpacity>
              </View>
            )}
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 15 },
  progressText: { fontSize: 16, marginBottom: 5 },
  progressBar: {
    height: 10,
    width: "100%",
    backgroundColor: "#eee",
    borderRadius: 5,
    marginBottom: 15,
  },
  progressFill: {
    height: "100%",
    backgroundColor: "green",
    borderRadius: 5,
  },
  addStepRow: {
    flexDirection: "row",
    marginBottom: 10,
    alignItems: "center",
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 8,
    borderRadius: 8,
    marginRight: 8,
  },
  stepItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
    marginVertical: 5,
  },
  stepDone: { backgroundColor: "#d1ffd1" },
  stepText: { flex: 1, marginLeft: 10 },
  doneText: { textDecorationLine: "line-through", color: "gray" },
  actions: { flexDirection: "row", gap: 10, marginLeft: 10 },
});
