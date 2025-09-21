import React from "react";
import { Modal, View, Text, StyleSheet, FlatList, Button } from "react-native";

const DataModal = ({ visible, onClose, data }) => {
  const renderItem = ({ item }) => (
    <View style={styles.dataItem}>
      <Text style={styles.dataText}>Week {item.week}</Text>
      <Text style={styles.dataText}>App: {item.appName}</Text>
      <Text style={styles.dataText}>Time: {item.timeInMinutes} min</Text>
      {item.startTime && item.endTime && (
        <Text style={styles.dataText}>
          Time Block: {item.startTime} - {item.endTime}
        </Text>
      )}
    </View>
  );

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Text style={styles.title}>Your Logged Data</Text>
          <FlatList
            data={data}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            ListEmptyComponent={
              <Text style={styles.emptyText}>No data to display.</Text>
            }
          />
          <Button title="Close" onPress={onClose} />
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
  container: {
    width: "90%",
    maxHeight: "80%",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
  },
  dataItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  dataText: {
    fontSize: 14,
  },
  emptyText: {
    textAlign: "center",
    marginTop: 20,
    color: "gray",
  },
});

export default DataModal;
