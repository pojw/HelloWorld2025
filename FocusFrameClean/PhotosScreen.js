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
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";
import FakeNotification from "./FakeNotification";
import { generateMiniMessage } from "./aiHelper";
import { initialPhotosData } from "./InitialPhotos"; // New Import

export default function PhotosScreen() {
  const [photos, setPhotos] = useState([]);
  const [description, setDescription] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [loadingAI, setLoadingAI] = useState(false);

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

    // If no photos exist, load the initial data
    if (!saved || JSON.parse(saved).length === 0) {
      setPhotos(initialPhotosData);
      await AsyncStorage.setItem("photos", JSON.stringify(initialPhotosData));
    } else {
      setPhotos(JSON.parse(saved));
    }
  };

  const addPhoto = async () => {
    if (!selectedImage || !description.trim()) return;
    setLoadingAI(true);

    let updatedPhotos;
    const aiMessage = await generateMiniMessage(description);

    if (editingId) {
      updatedPhotos = photos.map((p) =>
        p.id === editingId ? { ...p, description, aiMessage } : p
      );
      setEditingId(null);
    } else {
      const newPhoto = {
        id: Date.now().toString(),
        uri: selectedImage,
        description,
        aiMessage,
      };
      updatedPhotos = [...photos, newPhoto];
    }

    setPhotos(updatedPhotos);
    await AsyncStorage.setItem("photos", JSON.stringify(updatedPhotos));

    setSelectedImage(null);
    setDescription("");
    setLoadingAI(false);
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
    <SafeAreaView style={styles.safeAreaContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>Your Photos</Text>
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
          disabled={loadingAI}
        />

        {loadingAI && (
          <ActivityIndicator
            style={{ marginTop: 10 }}
            size="small"
            color="#2196F3"
          />
        )}

        <View style={{ marginVertical: 10 }}>
          <Button title="Test Notification" onPress={triggerNotification} />
        </View>

        <FlatList
          data={photos}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.photoItem}>
              <Image source={{ uri: item.uri }} style={styles.largeImage} />
              <View style={styles.textAndIcons}>
                <Text style={styles.aiMessage}>{item.aiMessage}</Text>
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
            </View>
          )}
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
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 8,
    marginVertical: 8,
    borderRadius: 8,
  },
  image: { width: "100%", height: 200, marginVertical: 8, borderRadius: 8 },
  largeImage: { width: "100%", height: 300, borderRadius: 8 },
  photoItem: { marginBottom: 20 },
  textAndIcons: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
  },
  description: { fontWeight: "bold" },
  aiMessage: { fontStyle: "italic", color: "gray", flex: 1 },
  icons: { flexDirection: "row", alignItems: "center" },
});
