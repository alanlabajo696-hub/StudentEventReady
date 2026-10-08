import { router } from "expo-router";
import {
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";

const events = [
  {
    title: "Intramurals",
    date: "October 15–18, 2026",
    location: "School Gymnasium",
    description:
      "A fun-filled sports event where students compete, build teamwork, and represent their departments.",
    icon: "🏆",
    short: "Sports, teamwork, and friendly competition.",
    color: "#4F46E5",
  },
  {
    title: "Acquaintance Party",
    date: "October 25, 2026",
    location: "University Covered Court",
    description:
      "A special gathering where students can meet new friends, enjoy activities, and create memorable moments together.",
    icon: "🤝",
    short: "Meet new friends, connect, and have fun.",
    color: "#E8F6EC",
  },
  {
    title: "Foundation Week",
    date: "November 10–14, 2026",
    location: "Main Campus",
    description:
      "A week-long celebration featuring competitions, performances, programs, and activities for the whole school community.",
    icon: "🎉",
    short: "Celebrate, participate, and enjoy school activities.",
    color: "#FFF0D9",
  },
];

export default function Events() {
  return (
    <View style={styles.screen}>
      <StatusBar barStyle="light-content" />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <Pressable
            onPress={() => router.back()}
            style={styles.backButton}
          >
            <Text style={styles.back}>← Back</Text>
          </Pressable>

          <Text style={styles.title}>School Events</Text>

          <Text style={styles.subtitle}>
            Discover what's happening on campus.
          </Text>
        </View>

        {/* Event Cards */}
        {events.map((event) => {
          const isBlue = event.color === "#4F46E5";

          return (
            <Pressable
              key={event.title}
              style={({ pressed }) => [
                styles.eventCard,
                {
                  backgroundColor: event.color,
                  opacity: pressed ? 0.85 : 1,
                },
              ]}
            >
              <Text style={styles.eventIcon}>{event.icon}</Text>

              <Text
                style={[
                  styles.eventTitle,
                  isBlue && styles.whiteText,
                ]}
              >
                {event.title}
              </Text>

              <Text
                style={[
                  styles.eventDescription,
                  isBlue && styles.lightText,
                ]}
              >
                {event.short}
              </Text>
            </Pressable>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#0a0a0a",
  },

  scrollContent: {
    padding: 24,
    paddingBottom: 40,
    width: "100%",
    maxWidth: 500,
    alignSelf: "center",
  },

  header: {
    marginBottom: 25,
  },

  backButton: {
    alignSelf: "flex-start",
    marginBottom: 25,
  },

  back: {
    color: "#818CF8",
    fontSize: 16,
    fontWeight: "700",
  },

  title: {
    color: "#FFFFFF",
    fontSize: 30,
    fontWeight: "800",
  },

  subtitle: {
    color: "#e5f410",
    fontSize: 14,
    marginTop: 6,
  },

  eventCard: {
    borderRadius: 24,
    padding: 22,
    marginBottom: 18,
    minHeight: 190,
  },

  eventIcon: {
    fontSize: 38,
    marginBottom: 12,
  },

  eventTitle: {
    color: "#172033",
    fontSize: 24,
    fontWeight: "800",
  },

  eventDescription: {
    color: "#657083",
    fontSize: 14,
    lineHeight: 20,
    marginTop: 7,
  },

  whiteText: {
    color: "#FFFFFF",
  },

  lightText: {
    color: "#E0E7FF",
  },
});