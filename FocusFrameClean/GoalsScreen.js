import React from "react";
import { ScrollView, Text, TextInput, Button, StyleSheet } from "react-native";

export default function GoalsScreen({ goal, setGoal, steps, generateSteps }) {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Goals</Text>
      <TextInput
        placeholder="Enter your goal"
        value={goal}
        onChangeText={setGoal}
        style={styles.input}
      />
      <Button title="Generate Steps" onPress={generateSteps} />
      {steps.map((s, i) => (
        <Text key={i} style={styles.stepText}>
          {s}
        </Text>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  input: { borderWidth: 1, width: "80%", padding: 8, marginVertical: 10 },
  stepText: { fontSize: 16, marginVertical: 5 },
});
