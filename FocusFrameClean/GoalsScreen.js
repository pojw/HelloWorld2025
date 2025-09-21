import React, { useState, useContext } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
  Button,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as Progress from "react-native-progress";
import { GoalsContext } from "./GoalsContext";

const priorityColors = {
  1: "#b71c1c",
  2: "#d32f2f",
  3: "#f57c00",
  4: "#fbc02d",
  5: "#388e3c",
};

export default function GoalsScreen({ navigation }) {
  const { goals, setGoals } = useContext(GoalsContext);
  const [input, setInput] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [priority, setPriority] = useState(3);

  const generateSteps = (goalText) => [
    { id: "1", text: `Start small: research about ${goalText}`, done: false },
    { id: "2", text: `Work 10 minutes daily on ${goalText}`, done: false },
    { id: "3", text: `Track your progress on ${goalText}`, done: false },
    { id: "4", text: `Celebrate small wins`, done: false },
  ];

  const addGoal = () => {
    if (!input.trim()) return;

    if (editingId) {
      setGoals(
        goals.map((g) =>
          g.id === editingId ? { ...g, text: input, priority } : g
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

  const deleteGoal = (id) => setGoals(goals.filter((g) => g.id !== id));

  return (
    <View style={styles.container}>
      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          placeholder="Enter a goal..."
          value={input}
          onChangeText={setInput}
          onSubmitEditing={addGoal}
          returnKeyType="done"
        />
        <Button title={editingId ? "Update" : "Add"} onPress={addGoal} />
      </View>

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
                { borderColor: priorityColors[item.priority] },
              ]}
              onPress={() =>
                navigation.navigate("GoalDetails", { goalId: item.id })
              }
            >
              <View style={{ flex: 1 }}>
                <Text style={styles.goalText}>{item.text}</Text>
                <Progress.Bar
                  progress={progress}
                  width={250}
                  color="green"
                  borderRadius={5}
                  height={8}
                />
              </View>
              <View style={styles.actions}>
                <TouchableOpacity onPress={() => editGoal(item)}>
                  <Ionicons name="create-outline" size={22} color="black" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => deleteGoal(item.id)}>
                  <Ionicons name="trash-outline" size={22} color="red" />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  inputRow: { flexDirection: "row", alignItems: "center", marginBottom: 10 },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 8,
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
});
