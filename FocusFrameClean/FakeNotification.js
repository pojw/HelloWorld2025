// FakeNotification.js
import React from "react";
import { View, Text, Image, StyleSheet, Animated } from "react-native";

export default function FakeNotification({ visible, photoMessage }) {
  if (!visible || !photoMessage) return null;

  return (
    <View style={styles.container}>
      {photoMessage.uri && (
        <Image source={{ uri: photoMessage.uri }} style={styles.image} />
      )}
      <Text style={styles.text}>
        {photoMessage.aiMessage || photoMessage.description}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 50, // This value moves the banner down from the top of the screen
    left: 10,
    right: 10,
    backgroundColor: "rgba(0,0,0,0.9)",
    padding: 12,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    zIndex: 999,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  image: {
    width: 50,
    height: 60,
    borderRadius: 8,
    marginRight: 12,
  },
  text: {
    color: "white",
    fontWeight: "bold",
    flex: 1,
    fontSize: 16,
  },
});
