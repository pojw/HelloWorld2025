import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, Image } from "react-native";
import { useRoute } from "@react-navigation/native";
import FakeNotification from "./FakeNotification";

// This is the array of meaningful photos and messages for your demo.
// Replace these with your own photos and messages.
const demoPhotos = [
  {
    id: "1",
    uri: "https://images.unsplash.com/photo-1543269826-b816a4e32d67",
    aiMessage: "Your dad is proud of you. Don't lose focus.",
    description: "A photo of a dad working diligently.",
  },
  {
    id: "2",
    uri: "https://images.unsplash.com/photo-1546410531-bb448658d55a",
    aiMessage: "Your dog misses you. Take a break and go for a walk.",
    description: "A photo of a happy dog waiting by the door.",
  },
  {
    id: "3",
    uri: "https://images.unsplash.com/photo-1520692744837-775c742c0f68",
    aiMessage: "Your future is bright. Stay focused on your goals.",
    description: "A photo of a student studying at night with a lamp.",
  },
  {
    id: "4",
    uri: "https://images.unsplash.com/photo-1560790100-c9a175f56470",
    aiMessage:
      "You've been studying hard. A short break can improve your focus.",
    description: "A photo of someone relaxing with a book.",
  },
];

export default function FakeInstagramScreen() {
  const route = useRoute();
  const { photo, activity } = route.params || {}; // Get passed parameters

  const [showNotification, setShowNotification] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    // This timer will trigger the notification logic
    const timer = setInterval(() => {
      setElapsedTime((prevTime) => prevTime + 1);
    }, 1000); // Update every second

    // This is the trigger for your fake notification.
    if (elapsedTime === 5) {
      // Trigger the notification after 5 seconds of scrolling
      const randomIndex = Math.floor(Math.random() * demoPhotos.length);
      const randomPhoto = demoPhotos[randomIndex];

      setShowNotification(true);

      // Hide the notification after a few seconds
      setTimeout(() => {
        setShowNotification(false);
      }, 4000);

      // Reset the timer after the notification
      setElapsedTime(0);
    }

    // Cleanup the timer when the component unmounts.
    return () => clearInterval(timer);
  }, [elapsedTime, photo]);

  return (
    <View style={styles.container}>
      {/* The fake notification banner is rendered here */}
      {/* Use the passed photo if it exists, otherwise use a random one */}
      <FakeNotification
        visible={showNotification}
        photoMessage={
          photo || demoPhotos[Math.floor(Math.random() * demoPhotos.length)]
        }
      />
      <Text style={styles.headerText}>Instagram Feed</Text>
      <ScrollView>
        <View style={styles.post}>
          <Image
            source={{
              uri: "https://images.unsplash.com/photo-1517457210719-7561f36b69a3",
            }}
            style={styles.postImage}
          />
          <Text style={styles.postText}>Liked by you and 1,234 others</Text>
        </View>
        <View style={styles.post}>
          <Image
            source={{
              uri: "https://images.unsplash.com/photo-1518173544-245452296704",
            }}
            style={styles.postImage}
          />
          <Text style={styles.postText}>Liked by you and 987 others</Text>
        </View>
        <View style={styles.post}>
          <Image
            source={{
              uri: "https://images.unsplash.com/photo-1502081199342-99042b993358",
            }}
            style={styles.postImage}
          />
          <Text style={styles.postText}>Liked by you and 567 others</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  post: {
    marginBottom: 20,
  },
  postImage: {
    width: "100%",
    height: 400,
  },
  postText: {
    padding: 10,
  },
});
