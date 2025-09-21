// AchievementsUtils.js

export const achievementData = {
  categories: [
    { id: "social", name: "Social Media Reduction", icon: "logo-instagram" },
    { id: "study", name: "Study Focus", icon: "book" },
    { id: "workout", name: "Workout Goals", icon: "fitness" },
    { id: "sleep", name: "Sleep Habits", icon: "moon" },
    { id: "classes", name: "Class Attendance", icon: "school" },
    { id: "goals", name: "Goals & Planning", icon: "flag" },
    { id: "wellbeing", name: "Well-being & Mindfulness", icon: "leaf" },
  ],
  badges: [
    // Social Media Reduction Badges (targets based on reduction)
    {
      id: "social_reduce_1",
      categoryId: "social",
      name: "First Small Win",
      description: "Reduce weekly screen time by 30 minutes.",
      criteria: { app: "Instagram", reduction: 30 },
      target: 30,
    },
    {
      id: "social_reduce_2",
      categoryId: "social",
      name: "Big Cutback",
      description: "Reduce weekly screen time by 60 minutes.",
      criteria: { app: "Instagram", reduction: 60 },
      target: 60,
    },
    {
      id: "social_reduce_3",
      categoryId: "social",
      name: "Under Control",
      description: "Reduce weekly screen time by 90 minutes.",
      criteria: { app: "Instagram", reduction: 90 },
      target: 90,
    },
    // Social Media Consistency Badges
    {
      id: "social_consecutive_1",
      categoryId: "social",
      name: "Consistent Reduction",
      description: "Reduce screen time for 2 weeks in a row.",
      criteria: { app: "Instagram", consecutiveWeeks: 2 },
      target: 2,
    },
    {
      id: "social_consecutive_2",
      categoryId: "social",
      name: "True Dedication",
      description: "Reduce screen time for 3 weeks in a row.",
      criteria: { app: "Instagram", consecutiveWeeks: 3 },
      target: 3,
    },
    // Study Focus Badges (targets based on total minutes)
    {
      id: "study_1",
      categoryId: "study",
      name: "First Study Log",
      description: "Log your first study session.",
      criteria: { app: "Study", weeksLogged: 1 },
      target: 1,
    },
    {
      id: "study_2",
      categoryId: "study",
      name: "30-Minute Focus",
      description: "Log a study session of 30 minutes or more.",
      criteria: { app: "Study", minTime: 30 },
      target: 30,
    },
    {
      id: "study_3",
      categoryId: "study",
      name: "Focused Student",
      description: "Log a study session of 1 hour or more.",
      criteria: { app: "Study", minTime: 60 },
      target: 60,
    },
    {
      id: "study_4",
      categoryId: "study",
      name: "Deep Work Master",
      description: "Log a study session of 2 hours or more.",
      criteria: { app: "Study", minTime: 120 },
      target: 120,
    },
    {
      id: "study_5",
      categoryId: "study",
      name: "Exam Ready",
      description: "Log a study session of 4 hours or more.",
      criteria: { app: "Study", minTime: 240 },
      target: 240,
    },
    // Study Consistency Badges
    {
      id: "study_consecutive_1",
      categoryId: "study",
      name: "Study Habit",
      description: "Log study time for 2 weeks in a row.",
      criteria: { app: "Study", consecutiveWeeks: 2 },
      target: 2,
    },
    {
      id: "study_consecutive_2",
      categoryId: "study",
      name: "Study Streak",
      description: "Log study time for 3 weeks in a row.",
      criteria: { app: "Study", consecutiveWeeks: 3 },
      target: 3,
    },
    // Workout Goals Badges
    {
      id: "workout_1",
      categoryId: "workout",
      name: "First Sweat",
      description: "Log your first workout session.",
      criteria: { app: "Workout", weeksLogged: 1 },
      target: 1,
    },
    {
      id: "workout_2",
      categoryId: "workout",
      name: "Quick Burn",
      description: "Log a workout of 30 minutes or more.",
      criteria: { app: "Workout", minTime: 30 },
      target: 30,
    },
    {
      id: "workout_3",
      categoryId: "workout",
      name: "Power Hour",
      description: "Log a workout of 60 minutes or more.",
      criteria: { app: "Workout", minTime: 60 },
      target: 60,
    },
    {
      id: "workout_4",
      categoryId: "workout",
      name: "Marathon Ready",
      description: "Log a workout of 2 hours or more.",
      criteria: { app: "Workout", minTime: 120 },
      target: 120,
    },
    // Workout Consistency Badges
    {
      id: "workout_consecutive_1",
      categoryId: "workout",
      name: "Workout Habit",
      description: "Log a workout for 2 weeks in a row.",
      criteria: { app: "Workout", consecutiveWeeks: 2 },
      target: 2,
    },
    {
      id: "workout_consecutive_2",
      categoryId: "workout",
      name: "Workout Warrior",
      description: "Log a workout for 3 weeks in a row.",
      criteria: { app: "Workout", consecutiveWeeks: 3 },
      target: 3,
    },
    // Sleep Habits Badges
    {
      id: "sleep_1",
      categoryId: "sleep",
      name: "First Night In",
      description: "Log your first sleep session.",
      criteria: { app: "Sleep", weeksLogged: 1 },
      target: 1,
    },
    {
      id: "sleep_2",
      categoryId: "sleep",
      name: "Consistent Sleeper",
      description: "Log at least 7 hours of sleep for 3 days in a row.",
      criteria: { app: "Sleep", minTime: 420, consecutiveDays: 3 },
      target: 3,
    },
    {
      id: "sleep_3",
      categoryId: "sleep",
      name: "Perfect Week",
      description: "Log at least 7 hours of sleep for 7 days in a row.",
      criteria: { app: "Sleep", minTime: 420, consecutiveDays: 7 },
      target: 7,
    },
    // Class Attendance Badges
    {
      id: "class_1",
      categoryId: "classes",
      name: "First Class Logged",
      description: "Log your first class session.",
      criteria: { app: "Class", weeksLogged: 1 },
      target: 1,
    },
    {
      id: "class_2",
      categoryId: "classes",
      name: "Perfect Attendance",
      description: "Attend all your scheduled classes for the week.",
      criteria: { app: "Class", attendedAll: true },
      target: 1, // Target is 1 for a yes/no achievement
    },
    // Goals & Planning Badges
    {
      id: "goal_1",
      categoryId: "goals",
      name: "First Goal Smashed",
      description: "Complete your first goal in the app.",
      criteria: { goalsCompleted: 1 },
      target: 1,
    },
    {
      id: "goal_2",
      categoryId: "goals",
      name: "Ambitious Achiever",
      description: "Complete 5 goals.",
      criteria: { goalsCompleted: 5 },
      target: 5,
    },
    {
      id: "planning_1",
      categoryId: "goals",
      name: "Master Planner",
      description: "Schedule your week for 2 weeks in a row.",
      criteria: { plannedWeeks: 2 },
      target: 2,
    },
    // Well-being & Mindfulness Badges
    {
      id: "wellbeing_1",
      categoryId: "wellbeing",
      name: "Mindful Minute",
      description: "Log a relax event of at least 15 minutes.",
      criteria: { app: "Relax", minTime: 15 },
      target: 15,
    },
    {
      id: "wellbeing_2",
      categoryId: "wellbeing",
      name: "Unplugged",
      description: "Log a relax event of at least 60 minutes.",
      criteria: { app: "Relax", minTime: 60 },
      target: 60,
    },
    {
      id: "wellbeing_3",
      categoryId: "wellbeing",
      name: "Healthy Habit",
      description: "Log a relax event for 3 consecutive weeks.",
      criteria: { app: "Relax", consecutiveWeeks: 3 },
      target: 3,
    },
    // Social Health Badges
    {
      id: "social_health_1",
      categoryId: "social_health",
      name: "One Kind Word",
      description: "Compliment one person.",
      criteria: { complimentsGiven: 1 },
      target: 1,
    },
    {
      id: "social_health_2",
      categoryId: "social_health",
      name: "Social Butterfly",
      description: "Compliment 5 people.",
      criteria: { complimentsGiven: 5 },
      target: 5,
    },
    {
      id: "social_health_3",
      categoryId: "social_health",
      name: "Community Builder",
      description: "Compliment 10 people.",
      criteria: { complimentsGiven: 10 },
      target: 10,
    },
    // Family Connection Badges
    {
      id: "family_1",
      categoryId: "family",
      name: "A Simple Call",
      description: "Call your parents.",
      criteria: { familyCalls: 1 },
      target: 1,
    },
    {
      id: "family_2",
      categoryId: "family",
      name: "I Care",
      description: "Tell a family member you care.",
      criteria: { familyCalls: 2 }, // Milestone based on the counter
      target: 2,
    },
    {
      id: "family_3",
      categoryId: "family",
      name: "Family First",
      description: "Call your siblings.",
      criteria: { familyCalls: 3 },
      target: 3,
    },
  ],
};

/**
 * Calculates the progress for a specific badge.
 * This function will be used to drive the progress bars.
 */
export const calculateBadgeProgress = (
  badge,
  weeklyData,
  goalsData,
  scheduleData
) => {
  const {
    app,
    reduction,
    maxTime,
    minTime,
    weeksLogged,
    consecutiveWeeks,
    consecutiveDays,
    attendedAll,
    goalsCompleted,
    plannedWeeks,
    complimentsGiven,
    familyCalls,
  } = badge.criteria;

  // Logic for goals-related badges
  if (goalsCompleted) {
    const completedCount = goalsData.filter((g) => g.completed).length;
    return Math.min(completedCount, goalsCompleted);
  }

  // Logic for planning-related badges
  if (plannedWeeks) {
    // For this hackathon demo, we'll check if the user has added data for consecutive weeks.
    // In a real app, you would check if the user has filled out their schedule for a given week.
    const appData = weeklyData.filter((item) => item.appName === "Study");
    const sortedAppData = appData.sort((a, b) => a.week - b.week);
    if (sortedAppData.length < plannedWeeks) return sortedAppData.length;
    let consecutiveCount = 0;
    for (let i = sortedAppData.length - 1; i > 0; i--) {
      if (sortedAppData[i].week === sortedAppData[i - 1].week + 1) {
        consecutiveCount++;
      } else {
        break;
      }
    }
    return Math.min(consecutiveCount + 1, plannedWeeks);
  }

  // General logic for other badges
  const appData = weeklyData.filter(
    (item) => item.appName && item.appName.toLowerCase() === app.toLowerCase()
  );
  const sortedAppData = appData.sort((a, b) => a.week - b.week);

  if (reduction) {
    if (sortedAppData.length < 2) return 0;
    const lastReduction =
      sortedAppData[sortedAppData.length - 2].timeInMinutes -
      sortedAppData[sortedAppData.length - 1].timeInMinutes;
    return Math.min(Math.max(0, lastReduction), reduction);
  } else if (maxTime) {
    if (sortedAppData.length === 0) return 0;
    const lastTime = sortedAppData[sortedAppData.length - 1].timeInMinutes;
    return Math.max(0, maxTime - lastTime);
  } else if (minTime && consecutiveDays) {
    // This is a placeholder for your manual data entry and would be more complex with real data.
    const consecutiveCount = sortedAppData.filter(
      (item) => item.timeInMinutes >= minTime
    ).length;
    return Math.min(consecutiveCount, consecutiveDays);
  } else if (minTime) {
    const lastLoggedTime =
      sortedAppData.length > 0
        ? sortedAppData[sortedAppData.length - 1].timeInMinutes
        : 0;
    return Math.min(lastLoggedTime, minTime);
  } else if (weeksLogged) {
    return sortedAppData.length;
  } else if (consecutiveWeeks) {
    if (sortedAppData.length < consecutiveWeeks) return sortedAppData.length;
    let consecutiveCount = 0;
    for (let i = sortedAppData.length - 1; i > 0; i--) {
      if (sortedAppData[i].week === sortedAppData[i - 1].week + 1) {
        consecutiveCount++;
      } else {
        break;
      }
    }
    return Math.min(consecutiveCount + 1, consecutiveWeeks);
  } else if (attendedAll) {
    // This is a placeholder for your attendance logic.
    // For the demo, you can assume this is a yes/no criteria.
    const allClassesLogged = sortedAppData.some(
      (item) => item.appName === "Classes"
    );
    return allClassesLogged ? 1 : 0;
  } else if (complimentsGiven) {
    // This is a placeholder for a new counter you need to create
    // on your ProgressScreen or a dedicated screen.
    // Let's assume you'll have a counter stored in AsyncStorage.
    const compliments = weeklyData.filter(
      (item) => item.appName === "Compliment"
    ).length;
    return Math.min(compliments, complimentsGiven);
  } else if (familyCalls) {
    // This is a placeholder for a new counter you need to create.
    const calls = weeklyData.filter((item) => item.appName === "Family").length;
    return Math.min(calls, familyCalls);
  }

  return 0;
};
