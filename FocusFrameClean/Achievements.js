import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { achievementData } from "./AchievementsUtils";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Fake data for the friends leaderboard
const fakeFriendsData = [
  { id: "friend1", name: "Alex", badgesEarned: 12 },
  { id: "friend2", name: "Jamie", badgesEarned: 8 },
  { id: "friend3", name: "Casey", badgesEarned: 4 },
];

const Achievements = () => {
  const navigation = useNavigation();
  const [earnedBadges, setEarnedBadges] = useState([]);

  useEffect(() => {
    const loadBadges = async () => {
      try {
        const savedBadges = await AsyncStorage.getItem("earnedBadges");
        if (savedBadges) {
          setEarnedBadges(JSON.parse(savedBadges));
        }
      } catch (e) {
        console.error("Failed to load badges", e);
      }
    };
    loadBadges();
  }, []);

  const renderCategory = ({ item }) => (
    <TouchableOpacity
      style={styles.categoryCard}
      onPress={() => navigation.navigate("BadgeCategory", { category: item })}
    >
      <Ionicons name={item.icon} size={30} color="#2196F3" />
      <Text style={styles.categoryName}>{item.name}</Text>
    </TouchableOpacity>
  );

  const renderLeaderboardItem = ({ item }) => (
    <View style={styles.leaderboardItem}>
      <Text style={styles.leaderboardName}>{item.name}</Text>
      <Text style={styles.leaderboardCount}>{item.badgesEarned} Badges</Text>
    </View>
  );

  const allLeaderboardData = [
    { id: "me", name: "You", badgesEarned: earnedBadges.length },
    ...fakeFriendsData,
  ].sort((a, b) => b.badgesEarned - a.badgesEarned);

  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>Your Achievements</Text>
        <FlatList
          data={achievementData.categories}
          keyExtractor={(item) => item.id}
          renderItem={renderCategory}
          numColumns={2}
          contentContainerStyle={styles.listContainer}
        />

        {/* Friends Leaderboard Section */}
        <View style={styles.leaderboardSection}>
          <Text style={styles.leaderboardTitle}>Friends Leaderboard 👑</Text>
          <FlatList
            data={allLeaderboardData}
            keyExtractor={(item) => item.id}
            renderItem={renderLeaderboardItem}
            scrollEnabled={false}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

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
    marginBottom: 20,
    textAlign: "center",
  },
  listContainer: {
    justifyContent: "space-between",
  },
  categoryCard: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    margin: 8,
    padding: 20,
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    height: 120,
  },
  categoryName: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: "bold",
  },
  leaderboardSection: {
    marginTop: 30,
    padding: 15,
    backgroundColor: "#f9f9f9",
    borderRadius: 10,
  },
  leaderboardTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
  },
  leaderboardItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  leaderboardName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  leaderboardCount: {
    fontSize: 16,
    color: "gray",
  },
});

export default Achievements;
