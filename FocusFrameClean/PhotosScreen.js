import React, { useState } from "react";
import {
  View,
  Text,
  Button,
  Image,
  StyleSheet,
  ScrollView,
} from "react-native";
import * as ImagePicker from "expo-image-picker";

export default function PhotosScreen() {
  const [photos, setPhotos] = useState([]);

  const pickPhoto = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
    });
    if (!result.cancelled) setPhotos([...photos, result.uri]);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Motivational Photos</Text>
      <Button title="Upload Photo" onPress={pickPhoto} />
      {photos.map((uri, i) => (
        <Image key={i} source={{ uri }} style={styles.photo} />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  photo: { width: 200, height: 200, marginTop: 10 },
});
