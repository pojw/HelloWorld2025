import React, { useEffect } from "react";
import { View, Text, Image, StyleSheet, Animated } from "react-native";

export default function FakeNotification({ visible, data, onHide }) {
  const slideAnim = new Animated.Value(-100); // start above the screen

  useEffect(() => {
    if (visible && data) {
      // Slide down
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();

      // Hide after 3 seconds
      const timer = setTimeout(() => {
        Animated.timing(slideAnim, {
          toValue: -100,
          duration: 300,
          useNativeDriver: true,
        }).start(() => onHide());
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [visible, data]);

  if (!visible || !data) return null;

  return (
    <Animated.View
      style={[styles.container, { transform: [{ translateY: slideAnim }] }]}
    >
      {data.imageUri && (
        <Image source={{ uri: data.imageUri }} style={styles.image} />
      )}
      <Text style={styles.text}>{data.message}</Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: "#333",
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    zIndex: 1000,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    marginHorizontal: 8,
  },
  image: { width: 50, height: 50, borderRadius: 8, marginRight: 10 },
  text: { color: "#fff", flex: 1 },
});
