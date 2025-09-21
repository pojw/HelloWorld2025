import React, { useState, useContext, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
  Button,
  StyleSheet,
  SafeAreaView,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as Progress from "react-native-progress";
import { GoalsContext } from "./GoalsContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

const priorityColors = {
  1: "#b71c1c", // Highest Priority
  2: "#d32f2f",
  3: "#f57c00",
  4: "#fbc02d",
  5: "#388e3c", // Lowest Priority
};

export default function GoalsScreen({ navigation }) {
  const { goals, addGoal, deleteGoal, updateGoal } = useContext(GoalsContext);
  const [input, setInput] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [priority, setPriority] = useState(3);

  const generateSteps = (goalText) => [
    { id: "1", text: `Start small: research about ${goalText}`, done: false },
    { id: "2", text: `Work 10 minutes daily on ${goalText}`, done: false },
    { id: "3", text: `Track your progress on ${goalText}`, done: false },
    { id: "4", text: `Celebrate small wins`, done: false },
  ];

  const handleAddGoal = () => {
    if (!input.trim()) return;

    if (editingId) {
      const goalToUpdate = goals.find((g) => g.id === editingId);
      updateGoal({ ...goalToUpdate, text: input, priority });
      setEditingId(null);
    } else {
      const newGoal = {
        id: Date.now().toString(),
        text: input,
        priority,
        steps: generateSteps(input),
      };
      addGoal(newGoal);
    }

    setInput("");
    setPriority(3);
  };

  const editGoal = (goal) => {
    setInput(goal.text);
    setPriority(goal.priority || 3);
    setEditingId(goal.id);
  };

  const handleDeleteGoal = (id) => {
    deleteGoal(id);
  };

  const clearGoals = async () => {
    try {
      await AsyncStorage.removeItem("goals");
      Alert.alert(
        "Goals Cleared!",
        "Please restart the app to load the default goals."
      );
    } catch (e) {
      console.error("Failed to clear goals", e);
    }
  };

  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>Your Goals</Text>
        <View style={styles.inputSection}>
          <View style={styles.inputRow}>
            <TextInput
              style={styles.input}
              placeholder="Enter a goal..."
              value={input}
              onChangeText={setInput}
              onSubmitEditing={handleAddGoal}
              returnKeyType="done"
            />
            <Button
              title={editingId ? "Update" : "Add"}
              onPress={handleAddGoal}
            />
          </View>
          <View style={styles.prioritySelector}>
            <Text>Priority:</Text>
            {[1, 2, 3, 4, 5].map((p) => (
              <TouchableOpacity
                key={p}
                style={[
                  styles.priorityButton,
                  { backgroundColor: priorityColors[p] },
                  priority === p && styles.priorityButtonSelected,
                ]}
                onPress={() => setPriority(p)}
              >
                <Text style={styles.priorityButtonText}>{p}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <FlatList
          data={[...goals].sort((a, b) => a.priority - b.priority)}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => {
            if (typeof item.text !== "string" || item.text.length === 0)
              return null;

            const completedSteps =
              item.steps?.filter((s) => s.done).length || 0;
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
                  <TouchableOpacity onPress={() => handleDeleteGoal(item.id)}>
                    <Ionicons name="trash-outline" size={22} color="red" />
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            );
          }}
        />
        <Button
          title="Clear All Goals (for demo)"
          onPress={clearGoals}
          color="gray"
        />
      </View>
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
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  inputSection: {
    marginBottom: 20,
  },
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
  prioritySelector: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },
  priorityButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  priorityButtonSelected: {
    borderWidth: 2,
    borderColor: "#000",
  },
  priorityButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  goalItem: {
    backgroundColor: "#f2f2f2",
    padding: 12,
    marginBottom: 8,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 2,
  },
  goalText: { fontSize: 16, marginBottom: 5 },
  actions: { flexDirection: "row", gap: 10 },
});
