// InitialSchedule.js

export const initialScheduleData = [
  // Class
  {
    id: "class_1",
    type: "class",
    name: "Math 101",
    startTime: "10:00 AM",
    endTime: "11:00 AM",
    days: ["Mon", "Wed", "Fri"],
  },
  {
    id: "class_2",
    type: "class",
    name: "Science Lab",
    startTime: "1:00 PM",
    endTime: "3:00 PM",
    days: ["Tue", "Thu"],
  },
  {
    id: "class_3",
    type: "class",
    name: "English Lit",
    startTime: "9:00 AM",
    endTime: "10:30 AM",
    days: ["Tue", "Thu"],
  },
  {
    id: "class_4",
    type: "class",
    name: "History",
    startTime: "1:30 PM",
    endTime: "2:30 PM",
    days: ["Mon", "Wed"],
  },
  {
    id: "class_5",
    type: "class",
    name: "Art Studio",
    startTime: "3:00 PM",
    endTime: "5:00 PM",
    days: ["Fri"],
  },
  // Study
  {
    id: "study_1",
    type: "event",
    name: "Study",
    eventType: "Study",
    startTime: "1:00 PM",
    endTime: "3:00 PM",
    days: ["Mon", "Wed", "Fri"],
  },
  // Workout
  {
    id: "workout_1",
    type: "event",
    name: "Workout",
    eventType: "Workout",
    startTime: "4:00 PM",
    endTime: "5:00 PM",
    days: ["Tue", "Thu"],
  },
  // Sleep
  {
    id: "sleep_1",
    type: "event",
    name: "Sleep",
    eventType: "Sleep",
    startTime: "11:00 PM",
    endTime: "7:00 AM",
    days: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  },
];
