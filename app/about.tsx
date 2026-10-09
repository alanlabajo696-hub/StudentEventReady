import {
    ScrollView,
    StyleSheet,
    Text,
    View,
} from "react-native";

export default function AboutScreen() {
  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.container}
    >
      {/* Header */}
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

      {/* About the App */}
      <View style={styles.card}>
        <Text style={styles.heading}>
          📱 About the App
        </Text>

        <Text style={styles.description}>
          StudentEventReady is a mobile application
          designed to help students discover school
          events and prepare for upcoming activities.
        </Text>
      </View>

      {/* Our Purpose */}
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

      {/* Features */}
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

      {/* Project Information */}
      <View style={styles.card}>
        <Text style={styles.heading}>
          ℹ️ Project Information
        </Text>

        <Text style={styles.info}>
          Project Name: StudentEventReady
        </Text>

        <Text style={styles.info}>
          Platform: Mobile Application
        </Text>

        <Text style={styles.info}>
          Framework: React Native with Expo
        </Text>
      </View>

      {/* Footer */}
      <Text style={styles.footer}>
        Prepare early. Enjoy every event! ✨
      </Text>
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

  header: {
    alignItems: "center",
    marginTop: 30,
    marginBottom: 25,
  },

  emoji: {
    fontSize: 55,
    marginBottom: 12,
  },

  title: {
    fontSize: 30,
    fontWeight: "800",
    color: "#FFFFFF",
  },

  subtitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#E5F410",
    marginTop: 8,
  },

  tagline: {
    fontSize: 14,
    color: "#B8C0CC",
    marginTop: 8,
  },

  card: {
    backgroundColor: "#172033",
    padding: 20,
    borderRadius: 20,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: "#303B52",
  },

  heading: {
    fontSize: 19,
    fontWeight: "800",
    color: "#E5F410",
    marginBottom: 12,
  },

  description: {
    fontSize: 15,
    lineHeight: 24,
    color: "#E5E7EB",
  },

  feature: {
    fontSize: 15,
    lineHeight: 28,
    color: "#E5E7EB",
  },

  info: {
    fontSize: 14,
    lineHeight: 26,
    color: "#E5E7EB",
  },

  footer: {
    fontSize: 14,
    color: "#9CA3AF",
    textAlign: "center",
    marginTop: 10,
  },
});