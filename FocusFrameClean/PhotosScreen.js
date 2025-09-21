import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  Image,
  StyleSheet,
  FlatList,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import FakeNotification from "./FakeNotification";

export default function PhotoScreen() {
  const [photos, setPhotos] = useState([]);
  const [description, setDescription] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);

  // Notification state
  const [notifVisible, setNotifVisible] = useState(false);
  const [notifData, setNotifData] = useState(null);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.7,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    }
  };

  const addPhoto = async () => {
    if (!selectedImage || !description.trim()) return;

    const newPhoto = {
      id: Date.now().toString(),
      uri: selectedImage,
      description, // this will act as the quote/message for notification
    };

    const updatedPhotos = [...photos, newPhoto];
    setPhotos(updatedPhotos);
    setSelectedImage(null);
    setDescription("");

    await AsyncStorage.setItem("photos", JSON.stringify(updatedPhotos));
  };

  const loadPhotos = async () => {
    const saved = await AsyncStorage.getItem("photos");
    if (saved) setPhotos(JSON.parse(saved));
  };

  useEffect(() => {
    loadPhotos();
  }, []);

  // Trigger a notification with a random photo+quote pair
  const triggerNotification = () => {
    if (photos.length === 0) return;

    const randomIndex = Math.floor(Math.random() * photos.length);
    const randomPhoto = photos[randomIndex];

    setNotifData({
      imageUri: randomPhoto.uri,
      message: randomPhoto.description,
    });
    setNotifVisible(true);
  };

  return (
    <View style={styles.container}>
      <Button title="Pick a photo" onPress={pickImage} />
      {selectedImage && (
        <Image source={{ uri: selectedImage }} style={styles.image} />
      )}
      <TextInput
        style={styles.input}
        placeholder="Add a description..."
        value={description}
        onChangeText={setDescription}
        onSubmitEditing={addPhoto}
      />
      <Button title="Add Photo" onPress={addPhoto} />

      {/* Test notification button */}
      <Button
        title="Test Notification"
        onPress={triggerNotification}
        color="#6200EE"
      />

      <FlatList
        data={photos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.photoItem}>
            <Image source={{ uri: item.uri }} style={styles.imageSmall} />
            <View style={{ flex: 1, marginLeft: 10 }}>
              <Text style={styles.description}>{item.description}</Text>
            </View>
          </View>
        )}
      />

      {/* Fake notification */}
      <FakeNotification
        visible={notifVisible}
        data={notifData}
        onHide={() => setNotifVisible(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 8,
    marginVertical: 8,
    borderRadius: 8,
  },
  image: { width: "100%", height: 200, marginVertical: 8, borderRadius: 8 },
  imageSmall: { width: 60, height: 60, borderRadius: 8 },
  photoItem: { flexDirection: "row", alignItems: "center", marginBottom: 12 },
  description: { fontWeight: "bold" },
});
