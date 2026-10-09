
import { router } from "expo-router";
import { useState } from "react";
import {
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from "react-native";

const tasks = [
  "Bring student ID",
  "Check event date and time",
  "Confirm event location",
  "Prepare required materials",
  "Check the weather",
  "Plan transportation",
];

export default function ChecklistScreen() {
  const [completed, setCompleted] = useState(
    tasks.map(() => false)
  );

  const completedCount = completed.filter(
    (item) => item
  ).length;

  const progress = Math.round(
    (completedCount / tasks.length) * 100
  );

  function toggleTask(index: number) {
    setCompleted((previous) =>
      previous.map((item, currentIndex) =>
        currentIndex === index ? !item : item
      )
    );
  }

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.container}
    >
      <Pressable
        style={styles.backButton}
        onPress={() => router.replace("/")}
      >
        <Text style={styles.backText}>
          ← Back to Home
        </Text>
      </Pressable>

      <View style={styles.header}>
        <Text style={styles.emoji}>✅</Text>

        <Text style={styles.title}>
          My Checklist
        </Text>

        <Text style={styles.subtitle}>
          Get ready for your next school event!
        </Text>
      </View>

      <View style={styles.progressCard}>
        <Text style={styles.progressLabel}>
          YOUR READINESS
        </Text>

        <Text style={styles.percentage}>
          {progress}% Ready
        </Text>

        <View style={styles.progressBar}>
          <View
            style={[
              styles.progressFill,
              { width: `${progress}%` },
            ]}
          />
        </View>

        <Text style={styles.progressText}>
          {completedCount} of {tasks.length} tasks completed
        </Text>
      </View>

      <Text style={styles.sectionTitle}>
        Things to Prepare
      </Text>

      {tasks.map((task, index) => (
        <Pressable
          key={task}
          style={styles.taskCard}
          onPress={() => toggleTask(index)}
        >
          <Text style={styles.checkbox}>
            {completed[index] ? "☑" : "☐"}
          </Text>

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

      {completedCount === tasks.length && (
        <Text style={styles.finishedMessage}>
          🎉 You're ready for your event!
        </Text>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#0a0a0a",
  },

  container: {
    padding: 24,
    paddingBottom: 40,
  },

  backButton: {
    alignSelf: "flex-start",
    backgroundColor: "#172033",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 12,
    marginBottom: 24,
  },

  backText: {
    color: "#E5F410",
    fontWeight: "700",
    fontSize: 14,
  },

  header: {
    alignItems: "center",
    marginBottom: 28,
  },

  emoji: {
    fontSize: 48,
    marginBottom: 10,
  },

  title: {
    color: "#FFFFFF",
    fontSize: 30,
    fontWeight: "800",
  },

  subtitle: {
    color: "#B8C0CC",
    fontSize: 14,
    textAlign: "center",
    marginTop: 8,
  },

  progressCard: {
    backgroundColor: "#172033",
    borderRadius: 20,
    padding: 20,
    marginBottom: 28,
    borderWidth: 1,
    borderColor: "#303B52",
  },

  progressLabel: {
    color: "#AAB3C5",
    fontSize: 12,
    fontWeight: "700",
  },

  percentage: {
    color: "#E5F410",
    fontSize: 28,
    fontWeight: "800",
    marginTop: 8,
  },

  progressBar: {
    height: 8,
    backgroundColor: "#303B52",
    borderRadius: 4,
    marginTop: 16,
    overflow: "hidden",
  },

  progressFill: {
    height: 8,
    backgroundColor: "#E5F410",
    borderRadius: 4,
  },

  progressText: {
    color: "#B8C0CC",
    fontSize: 13,
    marginTop: 12,
  },

  sectionTitle: {
    color: "#FFFFFF",
    fontSize: 21,
    fontWeight: "800",
    marginBottom: 14,
  },

  taskCard: {
    backgroundColor: "#172033",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#303B52",
    padding: 18,
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
  },

  checkbox: {
    color: "#E5F410",
    fontSize: 25,
    marginRight: 14,
  },

  taskText: {
    flex: 1,
    color: "#FFFFFF",
    fontSize: 15,
  },

  completedText: {
    color: "#9CA3AF",
    textDecorationLine: "line-through",
  },

  finishedMessage: {
    color: "#E5F410",
    fontSize: 16,
    fontWeight: "700",
    textAlign: "center",
    marginTop: 20,
  },
});