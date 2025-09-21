import React from "react";
import {
  Modal,
  View,
  Text,
  StyleSheet,
  Button,
  FlatList,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const friendsList = [
  { id: "1", name: "Alex" },
  { id: "2", name: "Jamie" },
  { id: "3", name: "Casey" },
];

const ShareAchievementModal = ({ visible, onClose, badge }) => {
  if (!badge) return null;

  const handleShare = (friend) => {
    // This is the simulated message.
    const message = `I just earned the "${badge.name}" badge in FocusFrame! I'm on a roll!`;
    Alert.alert("Message Sent!", `Sent to ${friend.name}: "${message}"`);
    onClose();
  };

  const renderFriend = ({ item }) => (
    <View style={styles.friendItem}>
      <Ionicons name="person-circle-outline" size={30} color="#000" />
      <Text style={styles.friendName}>{item.name}</Text>
      <TouchableOpacity
        style={styles.shareButton}
        onPress={() => handleShare(item)}
      >
        <Text style={styles.shareButtonText}>Share</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <Modal visible={visible} animationType="fade" transparent>
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.title}>Badge Unlocked! 🎉</Text>
          <Text style={styles.subtitle}>
            You earned the **"{badge.name}"** badge.
          </Text>
          <Text style={styles.prompt}>
            Tell your friends about your achievement!
          </Text>
          <FlatList
            data={friendsList}
            keyExtractor={(item) => item.id}
            renderItem={renderFriend}
            contentContainerStyle={styles.list}
          />
          <Button title="Close" onPress={onClose} color="gray" />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContainer: {
    width: "90%",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    fontStyle: "italic",
    marginBottom: 15,
  },
  prompt: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  list: {
    marginBottom: 15,
  },
  friendItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  friendName: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
  },
  shareButton: {
    backgroundColor: "#2196F3",
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 20,
  },
  shareButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default ShareAchievementModal;
