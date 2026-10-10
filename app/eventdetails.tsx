
import { router } from "expo-router";

import {
  Pressable, // Makes the Back button clickable.
  ScrollView, // Allows the page to scroll.
  StatusBar, // Controls the status bar appearance.
  StyleSheet, // Organizes the styles.
  Text, // Displays words.
  View, // Groups components together.
} from "react-native";

// This array contains the sample event details.
// Each object stores information about one school event.
// This data is written directly in the code, not loaded from a database.
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

      {/* Use a light status bar style for the dark background. */}
      <StatusBar barStyle="light-content" />

      {/* Allow the event information to scroll vertically. */}
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={true}
      >

        {/* BACK BUTTON */}
        <Pressable
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <Text style={styles.back}>← Back</Text>
        </Pressable>

        {/* PAGE TITLE */}
        <Text style={styles.pageTitle}>Event Details</Text>

        <Text style={styles.pageSubtitle}>
          Learn more about upcoming school events.
        </Text>

        {/* EVENT DETAILS */}
        {/* map() goes through the events array and creates
            a complete group of details for every event.
            This means the current code displays all three events. */}
        {events.map((event) => {

          // Check whether the current event uses the blue background.
          // This determines which text colors should be used.
          const isBlue = event.color === "#4F46E5";

          // Return the complete set of information for this event.
          return (
            // key identifies this event's group in the list.
            <View key={event.title}>

              {/* EVENT HEADER CARD */}
              <View
                style={[
                  styles.heroCard,

                  // Use the background color stored in this event.
                  { backgroundColor: event.color },
                ]}
              >

                {/* Display the event icon. */}
                <Text style={styles.icon}>
                  {event.icon}
                </Text>

                {/* Display the event name.
                    Use dark text if the background is not blue. */}
                <Text
                  style={[
                    styles.title,
                    !isBlue && styles.darkTitle,
                  ]}
                >
                  {event.title}
                </Text>

                {/* Short label shown under the event name. */}
                <Text
                  style={[
                    styles.readyText,
                    !isBlue && styles.darkReadyText,
                  ]}
                >
                  Student Event Ready
                </Text>
              </View>

              {/* DATE CARD */}
              <View style={styles.infoCard}>
                <Text style={styles.label}>DATE</Text>

                {/* Display the date saved in this event object. */}
                <Text style={styles.infoText}>
                  📅 {event.date}
                </Text>
              </View>

              {/* LOCATION CARD */}
              <View style={styles.infoCard}>
                <Text style={styles.label}>LOCATION</Text>

                {/* Display the location saved in this event object. */}
                <Text style={styles.infoText}>
                  📍 {event.location}
                </Text>
              </View>

              {/* EVENT DESCRIPTION CARD */}
              <View style={styles.infoCard}>
                <Text style={styles.label}>ABOUT THE EVENT</Text>

                {/* Display the full description of this event. */}
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

// The following styles control the appearance of this screen.
const styles = StyleSheet.create({

  // Background and size of the full screen.
  screen: {
    flex: 1,
    backgroundColor: "#0a0a0a",
  },

  // Controls spacing and width of the scrollable content.
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 32,
    paddingTop: 24,
    paddingBottom: 50,
    width: "100%",
    maxWidth: 1200,
    alignSelf: "center",
  },

  // Places the Back button on the left.
  backButton: {
    alignSelf: "flex-start",
    marginBottom: 20,
  },

  // Appearance of the Back button text.
  back: {
    color: "#818CF8",
    fontSize: 16,
    fontWeight: "700",
  },

  // Main page title.
  pageTitle: {
    color: "#FFFFFF",
    fontSize: 30,
    fontWeight: "800",
  },

  // Subtitle shown under the main title.
  pageSubtitle: {
    color: "#e5f410",
    fontSize: 14,
    marginTop: 6,
    marginBottom: 25,
  },

  // Large card at the top of each event's details.
  heroCard: {
    borderRadius: 28,
    padding: 25,
    minHeight: 190,
    justifyContent: "center",
    marginBottom: 14,
  },

  // Size and spacing of the event icon.
  icon: {
    fontSize: 50,
    marginBottom: 15,
  },

  // Default event title style, used on the blue background.
  title: {
    color: "#FFFFFF",
    fontSize: 28,
    fontWeight: "800",
  },

  // Extra title style used when the card has a light background.
  darkTitle: {
    color: "#172033",
  },

  // Default style for the label under the event title.
  readyText: {
    color: "#E0E7FF",
    fontSize: 15,
    marginTop: 8,
  },

  // Extra label style for light-colored event cards.
  darkReadyText: {
    color: "#657083",
  },

  // Shared appearance for the date, location, and description cards.
  infoCard: {
    backgroundColor: "#172033",
    borderRadius: 20,
    padding: 20,
    marginBottom: 14,
  },

  // Small headings such as DATE and LOCATION.
  label: {
    color: "#e5f410",
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 1, // Adds space between the letters.
    marginBottom: 8,
  },

  // Style for date and location information.
  infoText: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "700",
  },

  // Style for the longer event description.
  description: {
    color: "#C4CAD5",
    fontSize: 15,
    lineHeight: 23, // Makes long text easier to read.
  },
});
