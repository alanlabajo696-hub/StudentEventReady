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
    icon: "🏆",
    date: "October 15–18, 2026",
    location: "School Gymnasium",
    description:
      "A fun-filled sports event where students compete, build teamwork, and represent their departments.",
    color: "#4F46E5",
  },
  {
    title: "Acquaintance Party",
    icon: "🤝",
    date: "October 25, 2026",
    location: "University Covered Court",
    description:
      "A special gathering where students can meet new friends, enjoy activities, and create memorable moments together.",
    color: "#E8F6EC",
  },
  {
    title: "Foundation Week",
    icon: "🎉",
    date: "November 10–14, 2026",
    location: "Main Campus",
    description:
      "A week-long celebration featuring competitions, performances, programs, and activities for the whole school community.",
    color: "#FFF0D9",
  },
];

export default function EventDetails() {
  return (
    <View style={styles.screen}>
      <StatusBar barStyle="light-content" />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Back Button */}
        <Pressable
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <Text style={styles.back}>← Back</Text>
        </Pressable>

        {/* Page Title */}
        <Text style={styles.pageTitle}>Event Details</Text>

        <Text style={styles.pageSubtitle}>
          Learn more about upcoming school events.
        </Text>

        {/* Event Details */}
        {events.map((event) => {
          const isBlue = event.color === "#4F46E5";

          return (
            <View key={event.title}>
              {/* Event Header */}
              <View
                style={[
                  styles.heroCard,
                  { backgroundColor: event.color },
                ]}
              >
                <Text style={styles.icon}>{event.icon}</Text>

                <Text
                  style={[
                    styles.title,
                    !isBlue && styles.darkTitle,
                  ]}
                >
                  {event.title}
                </Text>

                <Text
                  style={[
                    styles.readyText,
                    !isBlue && styles.darkReadyText,
                  ]}
                >
                  Student Event Ready
                </Text>
              </View>

              {/* Date */}
              <View style={styles.infoCard}>
                <Text style={styles.label}>DATE</Text>

                <Text style={styles.infoText}>
                  📅 {event.date}
                </Text>
              </View>

              {/* Location */}
              <View style={styles.infoCard}>
                <Text style={styles.label}>LOCATION</Text>

                <Text style={styles.infoText}>
                  📍 {event.location}
                </Text>
              </View>

              {/* Description */}
              <View style={styles.infoCard}>
                <Text style={styles.label}>ABOUT THE EVENT</Text>

                <Text style={styles.description}>
                  {event.description}
                </Text>
              </View>
            </View>
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
    paddingBottom: 50,
    width: "100%",
    maxWidth: 500,
    alignSelf: "center",
  },

  backButton: {
    alignSelf: "flex-start",
    marginBottom: 20,
  },

  back: {
    color: "#818CF8",
    fontSize: 16,
    fontWeight: "700",
  },

  pageTitle: {
    color: "#FFFFFF",
    fontSize: 30,
    fontWeight: "800",
  },

  pageSubtitle: {
    color: "#e5f410",
    fontSize: 14,
    marginTop: 6,
    marginBottom: 25,
  },

  heroCard: {
    borderRadius: 28,
    padding: 25,
    minHeight: 190,
    justifyContent: "center",
    marginBottom: 14,
  },

  icon: {
    fontSize: 50,
    marginBottom: 15,
  },

  title: {
    color: "#FFFFFF",
    fontSize: 28,
    fontWeight: "800",
  },

  darkTitle: {
    color: "#172033",
  },

  readyText: {
    color: "#E0E7FF",
    fontSize: 15,
    marginTop: 8,
  },

  darkReadyText: {
    color: "#657083",
  },

  infoCard: {
    backgroundColor: "#172033",
    borderRadius: 20,
    padding: 20,
    marginBottom: 14,
  },

  label: {
    color: "#e5f410",
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 1,
    marginBottom: 8,
  },

  infoText: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "700",
  },

  description: {
    color: "#C4CAD5",
    fontSize: 15,
    lineHeight: 23,
  },
});