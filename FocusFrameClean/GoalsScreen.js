import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Modal,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";
import * as Progress from "react-native-progress";

const generateSteps = (goalText) => [
  { id: "1", text: `Start small: research about ${goalText}`, done: false },
  { id: "2", text: `Work 10 minutes daily on ${goalText}`, done: false },
  { id: "3", text: `Track your progress on ${goalText}`, done: false },
  { id: "4", text: `Celebrate small wins`, done: false },
];

const priorityColors = {
  1: "#b71c1c", // dark red
  2: "#d32f2f", // red
  3: "#f57c00", // orange
  4: "#fbc02d", // yellow
  5: "#388e3c", // green
};

export default function GoalsScreen({ navigation }) {
  const [goals, setGoals] = useState([]);
  const [input, setInput] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [priority, setPriority] = useState(3); // default priority
  const [priorityModal, setPriorityModal] = useState(false);

  useEffect(() => {
    const loadGoals = async () => {
      const saved = await AsyncStorage.getItem("goals");
      if (saved) setGoals(JSON.parse(saved));
    };
    loadGoals();
  }, []);

  useEffect(() => {
    AsyncStorage.setItem("goals", JSON.stringify(goals));
  }, [goals]);

  const addGoal = () => {
    if (!input.trim()) return;
    if (editingId) {
      setGoals(
        goals.map((goal) =>
          goal.id === editingId ? { ...goal, text: input, priority } : goal
        )
      );
      setEditingId(null);
    } else {
      setGoals([
        ...goals,
        {
          id: Date.now().toString(),
          text: input,
          priority,
          steps: generateSteps(input),
        },
      ]);
    }
    setInput("");
    setPriority(3);
  };

  const editGoal = (goal) => {
    setInput(goal.text);
    setPriority(goal.priority || 3);
    setEditingId(goal.id);
  };

  const deleteGoal = (id) => {
    setGoals(goals.filter((goal) => goal.id !== id));
  };

  const openPriorityModal = () => setPriorityModal(true);
  const closePriorityModal = () => setPriorityModal(false);

  const selectPriority = (value) => {
    setPriority(value);
    closePriorityModal();
  };

  return (
    <View style={styles.container}>
      {/* Input row */}
      {/* Input row */}
      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          placeholder="Enter a goal..."
          value={input}
          onChangeText={setInput}
          onSubmitEditing={addGoal} // ✅ Press Enter to add goal
          returnKeyType="done" // Shows “Done” on keyboard
        />
        <TouchableOpacity
          style={styles.priorityButton}
          onPress={openPriorityModal}
        >
          <Text style={{ color: priorityColors[priority], fontWeight: "bold" }}>
            Priority: {priority}
          </Text>
        </TouchableOpacity>
        <Button title={editingId ? "Update" : "Add"} onPress={addGoal} />
      </View>

      {/* Priority Modal */}
      <Modal visible={priorityModal} transparent animationType="fade">
        <TouchableOpacity
          style={styles.modalOverlay}
          onPress={closePriorityModal}
        >
          <View style={styles.modalContent}>
            {[1, 2, 3, 4, 5].map((p) => (
              <TouchableOpacity
                key={p}
                style={styles.modalItem}
                onPress={() => selectPriority(p)}
              >
                <Text style={{ color: priorityColors[p], fontWeight: "bold" }}>
                  {p}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </TouchableOpacity>
      </Modal>

      {/* Goals list */}
      <FlatList
        data={[...goals].sort((a, b) => a.priority - b.priority)}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          const completedSteps = item.steps?.filter((s) => s.done).length || 0;
          const totalSteps = item.steps?.length || 0;
          const progress = totalSteps === 0 ? 0 : completedSteps / totalSteps;

          return (
            <TouchableOpacity
              style={[
                styles.goalItem,
                { borderColor: priorityColors[item.priority] }, // only goal border
              ]}
              onPress={() =>
                navigation.navigate("GoalDetails", {
                  goal: item,
                  updateGoal: (updatedGoal) => {
                    setGoals((prevGoals) =>
                      prevGoals.map((g) =>
                        g.id === updatedGoal.id ? updatedGoal : g
                      )
                    );
                  },
                })
              }
            >
              <View style={{ flex: 1 }}>
                <Text style={styles.goalText}>{item.text}</Text>
                <Progress.Bar progress={progress} width={null} color="green" />
              </View>
              <View style={styles.actions}>
                <Button title="Edit" onPress={() => editGoal(item)} />
                <Button title="Delete" onPress={() => deleteGoal(item.id)} />
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#fff" },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 8,
    borderRadius: 8,
    marginRight: 8,
  },
  priorityButton: {
    padding: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginRight: 8,
  },
  goalItem: {
    backgroundColor: "#f2f2f2",
    padding: 12,
    marginBottom: 8,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 2,
  },
  goalText: { fontSize: 16, marginBottom: 5 },
  actions: { flexDirection: "row", gap: 10 },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.2)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
  },
  modalItem: {
    padding: 10,
  },
});
