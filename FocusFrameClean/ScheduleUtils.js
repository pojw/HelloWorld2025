import AsyncStorage from "@react-native-async-storage/async-storage";

// Helper function to convert 12-hour time to 24-hour time in minutes
const convertTo24Hour = (time) => {
  const [h, m, period] = time.split(/:| /);
  let hour = parseInt(h, 10);
  if (period === "PM" && hour !== 12) {
    hour += 12;
  }
  if (period === "AM" && hour === 12) {
    hour = 0;
  }
  return hour * 60 + parseInt(m, 10);
};

// Function to save the entire schedule array to AsyncStorage
export const saveSchedule = async (schedule) => {
  try {
    const jsonValue = JSON.stringify(schedule);
    await AsyncStorage.setItem("schedule", jsonValue);
  } catch (e) {
    console.error("Failed to save schedule", e);
  }
};

// Function to load the schedule from AsyncStorage
export const loadSchedule = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem("schedule");
    return jsonValue != null ? JSON.parse(jsonValue) : [];
  } catch (e) {
    console.error("Failed to load schedule from storage", e);
    return [];
  }
};

// Function to find the current scheduled activity based on system time
export const findCurrentActivity = async () => {
  const now = new Date();
  const currentDay = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][
    now.getDay()
  ];
  const currentTimeInMinutes = now.getHours() * 60 + now.getMinutes();

  try {
    const schedule = await loadSchedule();

    // Find the first activity that matches the current day and time
    const currentActivity = schedule.find((item) => {
      const startInMinutes = convertTo24Hour(item.startTime);
      const endInMinutes = convertTo24Hour(item.endTime);

      return (
        item.days.includes(currentDay) &&
        currentTimeInMinutes >= startInMinutes &&
        currentTimeInMinutes <= endInMinutes
      );
    });

    return currentActivity || null;
  } catch (e) {
    console.error("Failed to find current activity", e);
    return null;
  }
};
