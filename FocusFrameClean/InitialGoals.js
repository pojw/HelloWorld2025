// InitialGoals.js

/**
 * A preloaded set of student-focused goals for the app demo.
 * This data is used to populate the Goals screen on first launch.
 */
export const initialGoals = [
  {
    id: "goal_1",
    text: "Complete Math Final Project",
    priority: 1, // Highest Priority
    steps: [
      {
        id: "step_1",
        text: "Research project topic and requirements",
        done: false,
      },
      { id: "step_2", text: "Create a project outline", done: false },
      { id: "step_3", text: "Draft the first section", done: false },
      { id: "step_4", text: "Review with a study partner", done: false },
      { id: "step_5", text: "Finalize and submit the project", done: false },
    ],
  },
  {
    id: "goal_2",
    text: "Apply for Summer Internship",
    priority: 2, // Medium-High Priority
    steps: [
      { id: "step_6", text: "Update resume and cover letter", done: false },
      { id: "step_7", text: "Research 5 target companies", done: false },
      {
        id: "step_8",
        text: "Network with professionals on LinkedIn",
        done: false,
      },
      {
        id: "step_9",
        text: "Submit all applications by the deadline",
        done: false,
      },
      { id: "step_10", text: "Prepare for interviews", done: false },
    ],
  },
  {
    id: "goal_3",
    text: "Establish a Consistent Sleep Schedule",
    priority: 3, // Medium Priority
    steps: [
      {
        id: "step_11",
        text: "Set a consistent bedtime (11:00 PM)",
        done: false,
      },
      {
        id: "step_12",
        text: "Avoid screens 30 minutes before bed",
        done: false,
      },
      { id: "step_13", text: "Read a book for 15 minutes", done: false },
      {
        id: "step_14",
        text: "Wake up at the same time every day",
        done: false,
      },
    ],
  },
];
