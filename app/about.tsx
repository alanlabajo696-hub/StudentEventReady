
import { router } from "expo-router";

// Import the React Native components used to build this screen.
// Pressable creates a clickable area.
// ScrollView lets the user scroll when the content is taller than the screen.
// StyleSheet stores the design styles.
// Text displays words.
// View groups other components together.
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

// This is the About screen of StudentEventReady.
// The word "export default" allows Expo Router to use this screen
// when the user opens the /about route.
export default function AboutScreen() {
  return (
    // ScrollView makes the whole About page scrollable.
    // style controls the outer screen.
    // contentContainerStyle controls the content inside the screen.
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.container}
    >
      {/* BACK BUTTON */}
      {/* Pressable makes this button clickable. */}
      <Pressable
        style={styles.backButton}
        // When clicked, replace the current screen with the Home screen.
        // "/" is the route for app/index.tsx.
        onPress={() => router.replace("/")}
      >
        <Text style={styles.backButtonText}>
          ← Back to Home
        </Text>
      </Pressable>

      {/* HEADER */}
      {/* This View groups the app title, name, and tagline. */}
      <View style={styles.header}>
        <Text style={styles.emoji}>🎓</Text>

        <Text style={styles.title}>
          About Us
        </Text>

        <Text style={styles.subtitle}>
          StudentEventReady
        </Text>

        <Text style={styles.tagline}>
          Prepare. Check. Be Ready.
        </Text>
      </View>

      {/* ABOUT THE APP CARD */}
      {/* This section explains what the application is for. */}
      <View style={styles.card}>
        <Text style={styles.heading}>
          📱 About the App
        </Text>

        <Text style={styles.description}>
          StudentEventReady is a web application
          designed to help students discover school
          events and prepare for upcoming activities.
        </Text>
      </View>

      {/* OUR PURPOSE CARD */}
      {/* This section explains the main goal of the project. */}
      <View style={styles.card}>
        <Text style={styles.heading}>
          🎯 Our Purpose
        </Text>

        <Text style={styles.description}>
          Our goal is to make school event information
          easier to access. Students can explore events,
          check event details, and prepare ahead of time.
        </Text>
      </View>

      {/* APP FEATURES CARD */}
      {/* Each Text component displays one feature of the app. */}
      <View style={styles.card}>
        <Text style={styles.heading}>
          ✨ App Features
        </Text>

        <Text style={styles.feature}>
          📅 Browse upcoming school events
        </Text>

        <Text style={styles.feature}>
          🔎 Search for events
        </Text>

        <Text style={styles.feature}>
          📋 View event details
        </Text>

        <Text style={styles.feature}>
          📍 Check event locations
        </Text>

        <Text style={styles.feature}>
          🌤️ View weather information
        </Text>
      </View>

      {/* PROJECT INFORMATION CARD */}
      {/* This section shows basic information about the project. */}
      <View style={styles.card}>
        <Text style={styles.heading}>
          ℹ️ Project Information
        </Text>

        <Text style={styles.info}>
          Project Name: StudentEventReady
        </Text>

        <Text style={styles.info}>
          Platform: web Application
        </Text>

        <Text style={styles.info}>
          Framework: React Native with Expo
        </Text>
      </View>

      {/* FOOTER */}
      {/* This message appears at the bottom of the page. */}
      <Text style={styles.footer}>
        Prepare early. Enjoy every event! ✨
      </Text>
    </ScrollView>
  );
}

// StyleSheet.create stores the visual design of the screen.
// Each name below matches a style used by a component above.
const styles = StyleSheet.create({

  // Design of the Back to Home button.
  backButton: {
    alignSelf: "flex-start", // Places the button at the left.
    backgroundColor: "#172033", // Sets the button background color.
    borderWidth: 1, // Adds a border around the button.
    borderColor: "#303B52", // Sets the border color.
    paddingVertical: 10, // Adds space above and below the text.
    paddingHorizontal: 16, // Adds space to the left and right of the text.
    borderRadius: 12, // Rounds the corners.
    marginTop: 10, // Adds space above the button.
    marginBottom: 8, // Adds space below the button.
  },

  // Text style used inside the Back to Home button.
  backButtonText: {
    color: "#E5F410", // Makes the text yellow.
    fontSize: 14, // Sets the text size.
    fontWeight: "700", // Makes the text bold.
  },

  // Style for the entire screen.
  screen: {
    flex: 1, // Allows the screen to fill the available space.
    backgroundColor: "#0a0a0a", // Sets the dark background.
  },

  // Style for the content inside the ScrollView.
  container: {
    padding: 24, // Adds space around the content.
    paddingBottom: 40, // Adds extra space at the bottom.
  },

  // Groups and centers the header content.
  header: {
    alignItems: "center", // Centers the items horizontally.
    marginTop: 30, // Adds space above the header.
    marginBottom: 25, // Adds space below the header.
  },

  // Controls the size and spacing of the graduation icon.
  emoji: {
    fontSize: 55, // Makes the icon large.
    marginBottom: 12, // Adds space below the icon.
  },

  // Main heading style.
  title: {
    fontSize: 30, // Sets a large text size.
    fontWeight: "800", // Makes the heading extra bold.
    color: "#FFFFFF", // Makes the text white.
  },

  // Style for the app name below the main heading.
  subtitle: {
    fontSize: 20, // Sets the text size.
    fontWeight: "700", // Makes the text bold.
    color: "#E5F410", // Makes the text yellow.
    marginTop: 8, // Adds space above the text.
  },

  // Style for the app tagline.
  tagline: {
    fontSize: 14, // Sets the text size.
    color: "#B8C0CC", // Uses a light gray color.
    marginTop: 8, // Adds space above the tagline.
  },

  // Shared design for the information cards.
  // The same style is reused for the About, Purpose,
  // Features, and Project Information sections.
  card: {
    backgroundColor: "#172033", // Sets the card background.
    padding: 20, // Adds space inside the card.
    borderRadius: 20, // Rounds the card corners.
    marginBottom: 18, // Adds space between cards.
    borderWidth: 1, // Adds a thin border.
    borderColor: "#303B52", // Sets the border color.
  },

  // Style for the heading inside each card.
  heading: {
    fontSize: 19, // Sets the heading size.
    fontWeight: "800", // Makes the heading extra bold.
    color: "#E5F410", // Makes the heading yellow.
    marginBottom: 12, // Adds space below the heading.
  },

  // Style for paragraph text inside the cards.
  description: {
    fontSize: 15, // Sets the paragraph text size.
    lineHeight: 24, // Sets the vertical space between lines.
    color: "#E5E7EB", // Makes the text light gray.
  },

  // Style for each item listed under App Features.
  feature: {
    fontSize: 15, // Sets the feature text size.
    lineHeight: 28, // Adds vertical space between feature lines.
    color: "#E5E7EB", // Makes the text light gray.
  },

  // Style for the project information lines.
  info: {
    fontSize: 14, // Sets the information text size.
    lineHeight: 26, // Adds space between information lines.
    color: "#E5E7EB", // Makes the text light gray.
  },

  // Style for the final message at the bottom.
  footer: {
    fontSize: 14, // Sets the footer text size.
    color: "#9CA3AF", // Uses a gray color.
    textAlign: "center", // Centers the message.
    marginTop: 10, // Adds space above the message.
  },
});
