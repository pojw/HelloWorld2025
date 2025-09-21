import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  Image,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";
import FakeNotification from "./FakeNotification";
import { generateMiniMessage } from "./aiHelper";

export default function PhotoScreen() {
  const [photos, setPhotos] = useState([]);
  const [description, setDescription] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [editingId, setEditingId] = useState(null);

  const [notifVisible, setNotifVisible] = useState(false);
  const [notifPhotoMessage, setNotifPhotoMessage] = useState(null);

  useEffect(() => {
    loadPhotos();
  }, []);

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

  const loadPhotos = async () => {
    const saved = await AsyncStorage.getItem("photos");
    if (saved) setPhotos(JSON.parse(saved));
  };

  const addPhoto = async () => {
    if (!selectedImage || !description.trim()) return;

    if (editingId) {
      const updatedPhotos = photos.map((p) =>
        p.id === editingId
          ? { ...p, description, aiMessage: generateMiniMessage(description) }
          : p
      );
      setPhotos(updatedPhotos);
      setEditingId(null);
    } else {
      const newPhoto = {
        id: Date.now().toString(),
        uri: selectedImage,
        description,
        aiMessage: generateMiniMessage(description),
      };
      setPhotos([...photos, newPhoto]);
    }

    setSelectedImage(null);
    setDescription("");
    await AsyncStorage.setItem("photos", JSON.stringify(photos));
  };

  const editPhoto = (photo) => {
    setEditingId(photo.id);
    setSelectedImage(photo.uri);
    setDescription(photo.description);
  };

  const deletePhoto = async (id) => {
    const filtered = photos.filter((p) => p.id !== id);
    setPhotos(filtered);
    await AsyncStorage.setItem("photos", JSON.stringify(filtered));
  };

  const triggerNotification = () => {
    if (photos.length === 0) return;
    const randomIndex = Math.floor(Math.random() * photos.length);
    setNotifPhotoMessage(photos[randomIndex]);
    setNotifVisible(true);
    setTimeout(() => setNotifVisible(false), 4000);
  };

  return (
    <View style={styles.container}>
      {/* Fake notification banner */}
      <FakeNotification
        photoMessage={notifPhotoMessage}
        visible={notifVisible}
      />

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
      <Button
        title={editingId ? "Update Photo" : "Add Photo"}
        onPress={addPhoto}
      />

      {/* Test Notification Button */}
      <View style={{ marginVertical: 10 }}>
        <Button title="Test Notification" onPress={triggerNotification} />
      </View>

      <FlatList
        data={photos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.photoItem}>
            <Image source={{ uri: item.uri }} style={styles.imageSmall} />
            <View style={{ flex: 1, marginLeft: 10 }}>
              <Text style={styles.description}>{item.description}</Text>
              <Text style={styles.aiMessage}>{item.aiMessage}</Text>
            </View>
            <View style={styles.icons}>
              <TouchableOpacity
                onPress={() => editPhoto(item)}
                style={{ marginRight: 10 }}
              >
                <Ionicons name="create-outline" size={24} color="#555" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => deletePhoto(item.id)}>
                <Ionicons name="trash-outline" size={24} color="red" />
              </TouchableOpacity>
            </View>
          </View>
        )}
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
  aiMessage: { fontStyle: "italic", color: "gray" },
  icons: { flexDirection: "row", alignItems: "center" },
});
