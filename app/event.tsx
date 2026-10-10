
import { router } from "expo-router";

// useState remembers what the user types in the search field.
import { useState } from "react";

import {
  Pressable, // Creates clickable event cards and buttons.
  ScrollView, // Allows the event list to scroll.
  StatusBar, // Controls the phone or browser status bar appearance.
  StyleSheet, // Organizes the design styles.
  Text, // Displays text.
  TextInput, // Allows the user to type a search.
  View, // Groups other components.
} from "react-native";

// This array stores the sample events displayed by the app.
// Each object represents one event and its information.
// These are local sample data, not events fetched from a database.
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

  // Start with an empty search because the user has not typed anything.
  const [search, setSearch] = useState("");

  // filter() checks each event and keeps the events that match the search.
  const filteredEvents = events.filter((event) => {

    // Convert the search text to lowercase and remove spaces
    // from the beginning and end.
    // This helps the search work without depending on capitalization.
    const query = search.toLowerCase().trim();

    // Keep an event if the search appears in its title,
    // date, location, or short description.
    // includes() checks whether one string contains another string.
    return (
      event.title.toLowerCase().includes(query) ||
      event.date.toLowerCase().includes(query) ||
      event.location.toLowerCase().includes(query) ||
      event.short.toLowerCase().includes(query)
    );
  });

  return (
    <View style={styles.screen}>

      {/* Use a light status bar style to match the dark screen. */}
      <StatusBar barStyle="light-content" />

      {/* This ScrollView contains the header and event cards. */}
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={true}
      >

        {/* HEADER */}
        <View style={styles.header}>

          {/* Go back to the previous screen. */}
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

          {/* SEARCH INPUT */}
          <TextInput
            style={styles.searchInput}
            placeholder="🔍 Search events, dates, locations..."
            placeholderTextColor="#8B95A7"

            // The text displayed in this field comes from search state.
            value={search}

            // Update search state every time the user types.
            // Updating the state makes filteredEvents recalculate.
            onChangeText={setSearch}

            // Do not automatically capitalize the user's search.
            autoCapitalize="none"

            // Show a clear button while editing when supported.
            clearButtonMode="while-editing"
          />
        </View>

        {/* EVENT CARDS */}
        {/* map() creates a card for each event that matches the search. */}
        {filteredEvents.map((event) => {

          // Check whether this event uses the blue background.
          // The result is used to choose a readable text color.
          const isBlue = event.color === "#4F46E5";

          // Return the visual card for this event.
          return (
            <Pressable
              // When the card is clicked, open the Event Details route.
              onPress={() =>
                router.push({
                  pathname: "/eventdetails",

                  // Send the clicked event's title as a route parameter.
                  // The receiving screen must read this parameter
                  // if it needs to identify which event was selected.
                  params: { title: event.title },
                })
              }

              // React uses this key to identify each card in the list.
              key={event.title}

              // Apply the normal card style, then use this event's color.
              // When the card is pressed, reduce its opacity slightly.
              style={({ pressed }) => [
                styles.eventCard,
                {
                  backgroundColor: event.color,
                  opacity: pressed ? 0.85 : 1,
                },
              ]}
            >

              {/* Show the event's icon. */}
              <Text style={styles.eventIcon}>
                {event.icon}
              </Text>

              {/* Show the event title.
                  If the card is blue, use white text. */}
              <Text
                style={[
                  styles.eventTitle,
                  isBlue && styles.whiteText,
                ]}
              >
                {event.title}
              </Text>

              {/* Show the shorter event description.
                  Use a lighter text color on the blue card. */}
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

        {/* EMPTY SEARCH RESULT */}
        {/* Display this message if no events match the search. */}
        {filteredEvents.length === 0 && (
          <Text style={styles.emptyMessage}>
            No events found. Try another search.
          </Text>
        )}

      </ScrollView>
    </View>
  );
}

// These styles control how the Events screen looks.
const styles = StyleSheet.create({

  // Background and size of the full screen.
  screen: {
    flex: 1,
    backgroundColor: "#0a0a0a",
  },

  // Controls the width, spacing, and alignment of the scrollable content.
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 32,
    paddingTop: 24,
    paddingBottom: 40,
    width: "100%",
    maxWidth: 1200,
    alignSelf: "center",
  },

  // Adds space below the header.
  header: {
    marginBottom: 25,
  },

  // Places the Back button on the left and adds space below it.
  backButton: {
    alignSelf: "flex-start",
    marginBottom: 25,
  },

  // Style for the Back button text.
  back: {
    color: "#818CF8",
    fontSize: 16,
    fontWeight: "700",
  },

  // Style for the main page title.
  title: {
    color: "#FFFFFF",
    fontSize: 30,
    fontWeight: "800",
  },

  // Style for the subtitle under the page title.
  subtitle: {
    color: "#e5f410",
    fontSize: 14,
    marginTop: 6,
  },

  // Shared design for each event card.
  eventCard: {
    borderRadius: 24,
    padding: 22,
    marginBottom: 18,
    minHeight: 190,
  },

  // Controls the event icon size and spacing.
  eventIcon: {
    fontSize: 38,
    marginBottom: 12,
  },

  // Normal event title color is dark.
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

  // Extra style used for the title on the blue card.
  whiteText: {
    color: "#FFFFFF",
  },

  // Extra style used for the description on the blue card.
  lightText: {
    color: "#E0E7FF",
  },

  // Style for the search input box.
  searchInput: {
    backgroundColor: "#172033",
    color: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#343F55",
    borderRadius: 16,
    paddingHorizontal: 18,
    paddingVertical: 15,
    fontSize: 15,
    marginTop: 20,
    marginBottom: 24,
  },

  // Style for the message shown when the search has no matches.
  emptyMessage: {
    color: "#C4CAD5",
    fontSize: 15,
    textAlign: "center",
    paddingVertical: 30,
  },
});
