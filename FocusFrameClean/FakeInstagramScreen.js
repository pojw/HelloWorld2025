import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import FakeNotification from "./FakeNotification";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Import local images from the same directory
import DoomScrolling1 from "./DoomScrolling1.webp";
import DoomScrolling2 from "./DoomScrolling2.webp";
import DoomScrolling3 from "./DoomScrolling3.jpeg";

// Reusable Post Component
const InstaPost = ({ profilePic, username, postImage, likes }) => (
  <View style={instaStyles.postContainer}>
    <View style={instaStyles.postHeader}>
      <Image source={{ uri: profilePic }} style={instaStyles.profilePic} />
      <Text style={instaStyles.username}>{username}</Text>
    </View>
    <Image source={postImage} style={instaStyles.postImage} />
    <View style={instaStyles.postActions}>
      <TouchableOpacity>
        <Ionicons
          name="heart-outline"
          size={24}
          color="black"
          style={instaStyles.actionIcon}
        />
      </TouchableOpacity>
      <TouchableOpacity>
        <Ionicons
          name="chatbubble-outline"
          size={24}
          color="black"
          style={instaStyles.actionIcon}
        />
      </TouchableOpacity>
      <TouchableOpacity>
        <Ionicons
          name="send-outline"
          size={24}
          color="black"
          style={instaStyles.actionIcon}
        />
      </TouchableOpacity>
      <TouchableOpacity style={instaStyles.bookmarkIcon}>
        <Ionicons name="bookmark-outline" size={24} color="black" />
      </TouchableOpacity>
    </View>
    <Text style={instaStyles.likes}>{likes} likes</Text>
    <Text style={instaStyles.caption}>
      <Text style={{ fontWeight: "bold" }}>{username}</Text> A caption goes
      here...
    </Text>
  </View>
);

export default function FakeInstagramScreen() {
  const route = useRoute();
  const { photo, activity } = route.params || {};

  const [showNotification, setShowNotification] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [userPhotos, setUserPhotos] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load photos from AsyncStorage on component mount
  useEffect(() => {
    const loadUserPhotos = async () => {
      try {
        const saved = await AsyncStorage.getItem("photos");
        if (saved) {
          setUserPhotos(JSON.parse(saved));
        }
      } catch (e) {
        console.error("Failed to load user photos", e);
      } finally {
        setLoading(false);
      }
    };
    loadUserPhotos();
  }, []);

  useEffect(() => {
    if (!loading) {
      const timer = setInterval(() => {
        setElapsedTime((prevTime) => {
          const newTime = prevTime + 1;

          if (newTime === 5) {
            if (userPhotos.length > 0) {
              setShowNotification(true);
              setTimeout(() => {
                setShowNotification(false);
              }, 4000);
            }
            return 0;
          }
          return newTime;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [loading, userPhotos]);

  if (loading) {
    return (
      <View style={instaStyles.loadingContainer}>
        <ActivityIndicator size="large" color="#2196F3" />
        <Text style={{ marginTop: 10 }}>Loading feed...</Text>
      </View>
    );
  }

  // The photo for the notification is now the first one in the userPhotos array
  const notifPhotoMessage = userPhotos.length > 0 ? userPhotos[0] : null;

  return (
    <View style={instaStyles.container}>
      <FakeNotification
        visible={showNotification}
        photoMessage={notifPhotoMessage}
      />

      <View style={instaStyles.topNav}>
        <Ionicons name="camera-outline" size={28} color="black" />
        <Text style={instaStyles.logoText}>Instagram</Text>
        <Ionicons name="send-outline" size={28} color="black" />
      </View>

      <ScrollView>
        <InstaPost
          profilePic="https://images.unsplash.com/photo-1549048375-f982a20b22f2?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          username="traveler_adventures"
          postImage={DoomScrolling1}
          likes="1,234"
        />
        <InstaPost
          profilePic="https://images.unsplash.com/photo-1533261204642-c2e8a1d13781?auto=format&fit=crop&q=80&w=1964&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          username="foodie_finds"
          postImage={DoomScrolling2}
          likes="987"
        />
        <InstaPost
          profilePic="https://images.unsplash.com/photo-1506794834888-c7d918361093?auto=format&fit=crop&q=80&w=1974&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          username="daily_inspiration"
          postImage={DoomScrolling3}
          likes="567"
        />
      </ScrollView>
    </View>
  );
}

const instaStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  topNav: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#dbdbdb",
  },
  logoText: {
    fontSize: 24,
    fontWeight: "bold",
  },
  postContainer: {
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#dbdbdb",
  },
  postHeader: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  profilePic: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 10,
  },
  username: {
    fontWeight: "bold",
  },
  postImage: {
    width: "100%",
    height: 400,
  },
  postActions: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  actionIcon: {
    marginRight: 15,
  },
  bookmarkIcon: {
    marginLeft: "auto",
  },
  likes: {
    fontWeight: "bold",
    paddingHorizontal: 10,
  },
  caption: {
    paddingHorizontal: 10,
    marginBottom: 10,
  },
});
