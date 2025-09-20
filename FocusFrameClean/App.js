import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Button,
  TextInput,
  Image,
  ScrollView,
  Modal,
  StyleSheet,
} from "react-native";
import * as ImagePicker from "expo-image-picker";

export default function App() {
  const [photo, setPhoto] = useState(null);
  const [goal, setGoal] = useState("");
  const [steps, setSteps] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [timer, setTimer] = useState(0);

  // Timer for 2-min popup
  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev + 1 >= 120) {
          setShowModal(true);
          clearInterval(interval); // stop timer after popup
        }
        return prev + 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Pick a photo
  const pickPhoto = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
    });
    if (!result.cancelled) setPhoto(result.uri);
  };

  // Generate steps for a goal
  const generateSteps = () => {
    const predefinedSteps = {
      "Learn Web Development": [
        "Step 1: Learn HTML basics",
        "Step 2: Practice paragraphs and headings",
        "Step 3: Learn CSS layout",
        "Step 4: Small projects",
        "Step 5: Learn JavaScript basics",
      ],
      "Get Fit": [
        "Step 1: Walk 30 minutes",
        "Step 2: Do bodyweight exercises",
        "Step 3: Track calories",
        "Step 4: Build routine",
      ],
    };
    setSteps(predefinedSteps[goal] || ["Start with small steps!"]);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>FocusFrame (Hackathon Demo)</Text>

      <Button title="Upload Motivational Photo" onPress={pickPhoto} />
      {photo && (
        <Image
          source={{ uri: photo }}
          style={{ width: 200, height: 200, marginTop: 10 }}
        />
      )}

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

      <Modal visible={showModal} transparent={true} animationType="fade">
        <View style={styles.modal}>
          <Text style={styles.modalText}>Time’s up! Remember your goal!</Text>
          {photo && (
            <Image
              source={{ uri: photo }}
              style={{ width: 150, height: 150, marginTop: 10 }}
            />
          )}
          <Button title="Close" onPress={() => setShowModal(false)} />
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff", //
  },
  title: { fontSize: 26, fontWeight: "bold", marginBottom: 20 },
  input: {
    borderWidth: 1,
    width: "80%",
    padding: 10,
    marginVertical: 15,
    borderRadius: 5,
  },
  stepText: { marginVertical: 5, fontSize: 16 },
  modal: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000000aa",
    padding: 20,
  },
  modalText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    marginBottom: 15,
  },
});
