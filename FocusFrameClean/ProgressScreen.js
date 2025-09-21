import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function ProgressScreen({ progressData }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Progress Tracker</Text>
      {progressData && progressData.length > 0 ? (
        progressData.map((item, i) => (
          <Text key={i}>{`${item.goal}: ${item.timeSpent} minutes`}</Text>
        ))
      ) : (
        <Text>No progress yet!</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
});
