
import { router } from "expo-router";

// useState remembers information while this screen is open.
// We use it to remember which checklist tasks are completed.
import { useState } from "react";

import {
  Pressable, // Makes an item clickable.
  ScrollView, // Allows the page to scroll.
  StyleSheet, // Organizes the styles.
  Text, // Displays text.
  View, // Groups components together.
} from "react-native";

// This array contains all the tasks the student should prepare.
// Each task is a string, which means it is a piece of text.
const tasks = [
  "Bring student ID",
  "Check event date and time",
  "Confirm event location",
  "Prepare required materials",
  "Check the weather",
  "Plan transportation",
];

export default function ChecklistScreen() {

  // Create one true/false value for every task.
  // false means the task is not completed yet.
  // true means the task has been completed.
  // tasks.map(() => false) creates six false values because
  // there are six tasks in the tasks array.
  const [completed, setCompleted] = useState(
    tasks.map(() => false)
  );

  // Count how many tasks are completed.
  // filter() keeps only the values that are true.
  // length tells us how many true values remain.
  const completedCount = completed.filter(
    (item) => item
  ).length;

  // Calculate the percentage of completed tasks.
  // Example: 3 completed tasks out of 6 = 50%.
  // Math.round() rounds the answer to a whole number.
  const progress = Math.round(
    (completedCount / tasks.length) * 100
  );

  // This function runs when a student clicks a task.
  // index tells us which task was clicked.
  function toggleTask(index: number) {

    // Update the completed array using its previous values.
    setCompleted((previous) =>
      previous.map((item, currentIndex) =>
        // If this is the clicked task, change true to false
        // or false to true.
        // Leave every other task's value unchanged.
        currentIndex === index ? !item : item
      )
    );
  }

  return (
    // The whole checklist page can scroll vertically.
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.container}
    >

      {/* BACK BUTTON */}
      <Pressable
        style={styles.backButton}
        // Return to the Home screen when clicked.
        onPress={() => router.replace("/")}
      >
        <Text style={styles.backText}>
          ← Back to Home
        </Text>
      </Pressable>

      {/* PAGE HEADER */}
      <View style={styles.header}>
        <Text style={styles.emoji}>✅</Text>

        <Text style={styles.title}>
          My Checklist
        </Text>

        <Text style={styles.subtitle}>
          Get ready for your next school event!
        </Text>
      </View>

      {/* PROGRESS CARD */}
      {/* This card shows how much of the checklist is finished. */}
      <View style={styles.progressCard}>

        <Text style={styles.progressLabel}>
          YOUR READINESS
        </Text>

        {/* Display the calculated percentage. */}
        <Text style={styles.percentage}>
          {progress}% Ready
        </Text>

        {/* The outer View is the empty progress bar. */}
        <View style={styles.progressBar}>

          {/* The inner View fills a percentage of the bar.
              If progress is 50, its width becomes "50%". */}
          <View
            style={[
              styles.progressFill,
              { width: `${progress}%` },
            ]}
          />
        </View>

        {/* Show the number of finished tasks and total tasks. */}
        <Text style={styles.progressText}>
          {completedCount} of {tasks.length} tasks completed
        </Text>
      </View>

      {/* CHECKLIST SECTION TITLE */}
      <Text style={styles.sectionTitle}>
        Things to Prepare
      </Text>

      {/* Create one clickable card for every task in the array. */}
      {tasks.map((task, index) => (
        <Pressable
          // key gives each task card a stable identifier.
          key={task}
          style={styles.taskCard}

          // Send the clicked task's position to toggleTask().
          onPress={() => toggleTask(index)}
        >

          {/* Show a checked or unchecked box.
              completed[index] tells us the state of this task. */}
          <Text style={styles.checkbox}>
            {completed[index] ? "☑" : "☐"}
          </Text>

          {/* Apply completedText only when the task is complete.
              The completed style changes the color and crosses
              a line through the task text. */}
          <Text
            style={[
              styles.taskText,
              completed[index] && styles.completedText,
            ]}
          >
            {task}
          </Text>
        </Pressable>
      ))}

      {/* Show this message only when every task is completed.
          === checks whether the two numbers are equal. */}
      {completedCount === tasks.length && (
        <Text style={styles.finishedMessage}>
          🎉 You're ready for your event!
        </Text>
      )}

    </ScrollView>
  );
}

// The styles below control how the checklist looks.
// They do not calculate progress or change task completion.
const styles = StyleSheet.create({

  // Background and size of the full screen.
  screen: {
    flex: 1, // Fill the available screen space.
    backgroundColor: "#0a0a0a", // Dark background.
  },

  // Adds space around the screen content.
  container: {
    padding: 24,
    paddingBottom: 40,
  },

  // Design of the Back to Home button.
  backButton: {
    alignSelf: "flex-start", // Align the button to the left.
    backgroundColor: "#172033",
    paddingVertical: 10, // Space above and below its text.
    paddingHorizontal: 16, // Space on its left and right.
    borderRadius: 12, // Rounded corners.
    marginBottom: 24, // Space below the button.
  },

  // Text inside the Back button.
  backText: {
    color: "#E5F410",
    fontWeight: "700", // Bold text.
    fontSize: 14,
  },

  // Centers the page heading and its contents.
  header: {
    alignItems: "center",
    marginBottom: 28,
  },

  // Size and spacing of the checkmark icon.
  emoji: {
    fontSize: 48,
    marginBottom: 10,
  },

  // Main page title.
  title: {
    color: "#FFFFFF",
    fontSize: 30,
    fontWeight: "800",
  },

  // Short message under the page title.
  subtitle: {
    color: "#B8C0CC",
    fontSize: 14,
    textAlign: "center",
    marginTop: 8,
  },

  // Box that contains the readiness percentage and progress bar.
  progressCard: {
    backgroundColor: "#172033",
    borderRadius: 20,
    padding: 20,
    marginBottom: 28,
    borderWidth: 1,
    borderColor: "#303B52",
  },

  // Small heading above the percentage.
  progressLabel: {
    color: "#AAB3C5",
    fontSize: 12,
    fontWeight: "700",
  },

  // Large readiness percentage.
  percentage: {
    color: "#E5F410",
    fontSize: 28,
    fontWeight: "800",
    marginTop: 8,
  },

  // Background of the progress bar.
  progressBar: {
    height: 8, // Bar thickness.
    backgroundColor: "#303B52", // Color of the unfilled part.
    borderRadius: 4,
    marginTop: 16,
    overflow: "hidden", // Keeps the fill inside the bar.
  },

  // The colored part that grows as tasks are completed.
  progressFill: {
    height: 8,
    backgroundColor: "#E5F410",
    borderRadius: 4,
  },

  // Text showing completed tasks out of the total.
  progressText: {
    color: "#B8C0CC",
    fontSize: 13,
    marginTop: 12,
  },

  // Heading above the list of tasks.
  sectionTitle: {
    color: "#FFFFFF",
    fontSize: 21,
    fontWeight: "800",
    marginBottom: 14,
  },

  // Appearance and layout of each task card.
  taskCard: {
    backgroundColor: "#172033",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#303B52",
    padding: 18,
    marginBottom: 12,
    flexDirection: "row", // Put the checkbox and text side by side.
    alignItems: "center", // Align them vertically in the middle.
  },

  // Appearance of the checkbox symbol.
  checkbox: {
    color: "#E5F410",
    fontSize: 25,
    marginRight: 14, // Space between the box and task text.
  },

  // Normal appearance of a task's text.
  taskText: {
    flex: 1, // Allows the text to use the remaining row space.
    color: "#FFFFFF",
    fontSize: 15,
  },

  // Extra style applied when a task is completed.
  completedText: {
    color: "#9CA3AF", // Make completed text gray.
    textDecorationLine: "line-through", // Draw a line through it.
  },

  // Message shown after all tasks are completed.
  finishedMessage: {
    color: "#E5F410",
    fontSize: 16,
    fontWeight: "700",
    textAlign: "center",
    marginTop: 20,
  },
});
