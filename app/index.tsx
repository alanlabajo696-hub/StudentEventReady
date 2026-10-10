
import { router } from "expo-router";

// useEffect runs code when the screen loads.
// useState stores information that can change while the app runs.
import { useEffect, useState } from "react";

import {
  ActivityIndicator, // Shows a loading spinner.
  Pressable, // Makes buttons and cards clickable.
  ScrollView, // Allows the Home page to scroll.
  StatusBar, // Controls the status bar appearance.
  StyleSheet, // Organizes the design styles.
  Text, // Displays words.
  View, // Groups components together.
} from "react-native";

// This describes the information we want to keep from the weather API.
// temperature is the current temperature in Celsius.
// humidity is the relative humidity percentage.
// weatherCode is a number that represents the weather condition.
type WeatherData = {
  temperature: number;
  humidity: number;
  weatherCode: number;
};

// This function converts the weather code from Open-Meteo
// into a description that is easier for the user to understand.
// The API gives us a number, so this function turns it into text.
function getWeatherDescription(code: number) {

  // Code 0 means the sky is clear.
  if (code === 0) return "Clear sky ☀️";

  // Codes 1 and 2 mean mostly clear or partly cloudy conditions.
  if ([1, 2].includes(code)) return "Partly cloudy 🌤️";

  // Code 3 means the sky is overcast.
  if (code === 3) return "Overcast ☁️";

  // Codes 45 and 48 represent fog.
  if ([45, 48].includes(code)) return "Foggy 🌫️";

  // These codes represent drizzle.
  if ([51, 53, 55, 56, 57].includes(code)) return "Drizzle 🌦️";

  // These codes represent rain or rain showers.
  if ([61, 63, 65, 66, 67, 80, 81, 82].includes(code)) {
    return "Rainy 🌧️";
  }

  // These codes represent snow or snow showers.
  if ([71, 73, 75, 77, 85, 86].includes(code)) {
    return "Snowy ❄️";
  }

  // These codes represent thunderstorms.
  if ([95, 96, 99].includes(code)) return "Thunderstorm ⛈️";

  // If the code does not match any condition above,
  // display a general message instead.
  return "Weather unavailable";
}

// This is the main Home screen of StudentEventReady.
export default function HomeScreen() {

  // Store the weather information received from the API.
  // null means that weather information has not been received yet.
  const [weather, setWeather] = useState<WeatherData | null>(null);

  // true means the app is still waiting for the weather response.
  const [loading, setLoading] = useState(true);

  // Store an error message if the weather request fails.
  // An empty string means there is currently no error message.
  const [error, setError] = useState("");

  // useEffect runs this code after the Home screen loads.
  // The empty dependency array [] means it runs when this
  // component first mounts, rather than after every render.
  useEffect(() => {

    // This asynchronous function requests weather information.
    // async allows us to use await while waiting for the response.
    async function fetchWeather() {
      try {

        // Ask the Open-Meteo API for current weather information.
        // The coordinates are fixed for the Danao City area.
        // The URL requests temperature, relative humidity,
        // and a weather code, using the Asia/Manila time zone.
        const response = await fetch(
          "https://api.open-meteo.com/v1/forecast?latitude=10.52&longitude=124.03&current=temperature_2m,relative_humidity_2m,weather_code&timezone=Asia%2FManila"
        );

        // Check whether the server returned a successful response.
        // If not, throw an error so the catch block can handle it.
        if (!response.ok) {
          throw new Error("Unable to get weather data.");
        }

        // Convert the response body from JSON into JavaScript data.
        const data = await response.json();

        // Save only the three weather values that this screen needs.
        // Updating weather state makes React display the new values.
        setWeather({
          temperature: data.current.temperature_2m,
          humidity: data.current.relative_humidity_2m,
          weatherCode: data.current.weather_code,
        });

      } catch (err) {

        // This runs if the request fails or an error occurs
        // while getting or processing the response.
        // The screen displays this message instead of the weather.
        setError("Weather is currently unavailable.");

      } finally {

        // finally runs whether the request succeeds or fails.
        // Stop showing the loading spinner in either situation.
        setLoading(false);
      }
    }

    // Run the function that requests the weather information.
    fetchWeather();

  }, []);

  // Everything below return() describes what the user sees.
  return (
    // Main container for the Home screen.
    <View style={styles.screen}>

      {/* Use a light status bar style for the dark background. */}
      <StatusBar barStyle="light-content" />

      {/* Make the Home page scrollable if the content is too tall. */}
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >

        {/* HEADER */}
        <View style={styles.header}>

          <View>
            {/* Welcome message at the top of the screen. */}
            <Text style={styles.smallText}>
              WELCOME, STUDENT 👋
            </Text>

            {/* App name. The nested Text highlights the word Ready. */}
            <Text style={styles.title}>
              Student Event
              <Text style={styles.titleHighlight}>
                {" "}Ready
              </Text>
            </Text>

            {/* App tagline. */}
            <Text style={styles.subtitle}>
              Prepare. Check. Be Ready.
            </Text>
          </View>

          {/* Decorative graduation icon inside a circle. */}
          <View style={styles.profileCircle}>
            <Text style={styles.profileEmoji}>
              🎓
            </Text>
          </View>
        </View>

        {/* MAIN HERO CARD */}
        {/* This card introduces the app's main purpose. */}
        <View style={styles.heroCard}>

          <View style={styles.heroContent}>

            <Text style={styles.heroEmoji}>
              📅
            </Text>

            {/* {"\n"} adds a line break between the two lines. */}
            <Text style={styles.heroTitle}>
              What's happening
              {"\n"}
              on campus?
            </Text>

            <Text style={styles.heroDescription}>
              Discover upcoming school events and prepare everything you need
              before the big day.
            </Text>

            {/* EXPLORE EVENTS BUTTON */}
            <Pressable
              // Use a slightly transparent appearance while pressed.
              style={({ pressed }) => [
                styles.primaryButton,
                {
                  opacity: pressed ? 0.7 : 1,
                },
              ]}

              // Open the Events screen when the button is clicked.
              onPress={() => {
                router.push("/event");
              }}
            >
              <Text style={styles.primaryButtonText}>
                Explore Events →
              </Text>
            </Pressable>
          </View>

          {/* Decorative icon positioned inside the hero card. */}
          <Text style={styles.decorativeEmoji}>
            🎉
          </Text>
        </View>

        {/* WEATHER CARD */}
        {/* This section displays the weather received from the API. */}
        <View style={styles.weatherCard}>
          <View style={styles.weatherHeader}>

            <View>
              <Text style={styles.weatherLabel}>
                DANAO CITY WEATHER
              </Text>

              {/* Show a different result depending on the current state:
                  1. loading: show a spinner.
                  2. error: show an error message.
                  3. weather exists: show the weather values.
                  4. otherwise: show nothing in this part. */}

              {loading ? (
                <ActivityIndicator
                  color="#E5F410"
                  style={{ marginTop: 12 }}
                />
              ) : error ? (
                <Text style={styles.weatherCondition}>
                  {error}
                </Text>
              ) : weather ? (
                <>
                  {/* Display the temperature received from the API. */}
                  <Text style={styles.temperature}>
                    {weather.temperature}°C
                  </Text>

                  {/* Convert the numeric weather code into readable text. */}
                  <Text style={styles.weatherCondition}>
                    {getWeatherDescription(weather.weatherCode)}
                  </Text>

                  {/* Display the relative humidity percentage. */}
                  <Text style={styles.humidity}>
                    Humidity: {weather.humidity}%
                  </Text>
                </>
              ) : null}
            </View>

            {/* Decorative weather icon. */}
            <Text style={styles.weatherEmoji}>🌦️</Text>
          </View>

          <Text style={styles.weatherFooter}>
            Check the weather before your school event.
          </Text>
        </View>

        {/* SECTION TITLE */}
        <View style={styles.sectionHeader}>

          <Text style={styles.sectionTitle}>
            Stay Ready
          </Text>

          <Text style={styles.sectionSubtitle}>
            Everything you need in one place
          </Text>
        </View>

        {/* FEATURE CARDS */}
        <View style={styles.cardRow}>

          {/* EVENT DETAILS CARD */}
          <Pressable
            // Combine the shared feature-card style with the blue style.
            // Change opacity slightly while the card is pressed.
            style={({ pressed }) => [
              styles.featureCard,
              styles.blueCard,
              {
                opacity: pressed ? 0.7 : 1,
              },
            ]}

            // Open the Event Details screen.
            onPress={() => {
              router.push("/eventdetails");
            }}
          >
            <Text style={styles.featureEmoji}>
              📋
            </Text>

            <Text style={styles.featureTitle}>
              Event Details
            </Text>

            <Text style={styles.featureText}>
              Check dates, locations, and event information.
            </Text>
          </Pressable>

          {/* MY CHECKLIST CARD */}
          <Pressable
            style={({ pressed }) => [
              styles.featureCard,
              styles.orangeCard,
              {
                opacity: pressed ? 0.7 : 1,
              },
            ]}

            // Open the Checklist screen.
            onPress={() => {
              router.push("/checklist");
            }}
          >
            <Text style={styles.featureEmoji}>
              ✅
            </Text>

            <Text style={styles.featureTitle}>
              My Checklist
            </Text>

            <Text style={styles.featureText}>
              Track the things you need to bring or prepare.
            </Text>
          </Pressable>
        </View>

        {/* ABOUT US CARD */}
        <Pressable
          style={({ pressed }) => [
            styles.aboutCard,
            {
              opacity: pressed ? 0.7 : 1,
            },
          ]}

          // Open the About screen.
          onPress={() => {
            router.push("/about");
          }}
        >
          <Text style={styles.aboutEmoji}>🎓</Text>

          {/* This View groups the About title and description. */}
          <View style={styles.aboutContent}>
            <Text style={styles.aboutTitle}>
              About Us
            </Text>

            <Text style={styles.aboutText}>
              Learn about StudentEventReady, our purpose, and the features we offer.
            </Text>
          </View>

          {/* Arrow indicating that the card can be opened. */}
          <Text style={styles.aboutArrow}>→</Text>
        </Pressable>

        {/* READINESS CARD */}
        <View style={styles.readyCard}>
          <View>

            <Text style={styles.readyLabel}>
              YOUR READINESS
            </Text>

            <Text style={styles.readyTitle}>
              Ready for your next event?
            </Text>

            <Text style={styles.readyText}>
              Complete your checklist and stay prepared.
            </Text>
          </View>

          <View style={styles.readyCircle}>

            {/* IMPORTANT:
                This is currently a fixed value, not a calculated result.
                It does not automatically read the Checklist screen's progress. */}
            <Text style={styles.readyNumber}>
              0%
            </Text>
          </View>
        </View>

        {/* BOTTOM MESSAGE */}
        <View style={styles.bottomMessage}>

          <Text style={styles.bottomEmoji}>
            ✨
          </Text>

          <Text style={styles.bottomText}>
            Prepare early. Enjoy the event.
          </Text>
        </View>

      </ScrollView>
    </View>
  );
}

// StyleSheet.create organizes all the visual styles used above.
// These styles control appearance and layout, not the app's logic.
const styles = StyleSheet.create({

  // Main background and screen size.
  screen: {
    flex: 1,
    backgroundColor: "#0a0a0a",
  },

  // Spacing inside the scrollable Home screen.
  scrollContent: {
    padding: 24,
    paddingBottom: 40,
  },

  // Places the welcome text and graduation icon in one row.
  header: {
    flexDirection: "row", // Arrange children horizontally.
    justifyContent: "space-between", // Push items apart.
    alignItems: "center", // Align items vertically.
    marginBottom: 24,
  },

  // Small welcome text above the app name.
  smallText: {
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 1,
    color: "#f3f5f9",
    marginBottom: 6,
  },

  // Main app name.
  title: {
    fontSize: 30,
    fontWeight: "800",
    color: "#f8f9fc",
  },

  // Yellow highlight for the word Ready.
  titleHighlight: {
    color: "hsl(60, 86%, 50%)",
  },

  // Style for the app tagline.
  subtitle: {
    fontSize: 15,
    color: "hsl(60, 86%, 50%)",
    marginTop: 5,
  },

  // Circle behind the graduation icon.
  profileCircle: {
    width: 52,
    height: 52,
    borderRadius: 26, // Half the width makes the box circular.
    backgroundColor: "#E0E7FF",
    justifyContent: "center", // Center the icon vertically.
    alignItems: "center", // Center the icon horizontally.
  },

  // Size of the graduation icon.
  profileEmoji: {
    fontSize: 25,
  },

  // Main introductory card.
  heroCard: {
    backgroundColor: "#4F46E5",
    borderRadius: 28,
    padding: 24,
    minHeight: 280,
    overflow: "hidden", // Keep overflowing content inside the card.
    marginBottom: 30,
  },

  // Width of the text and button area inside the hero card.
  heroContent: {
    width: "85%",
  },

  // Size and spacing of the calendar icon.
  heroEmoji: {
    fontSize: 32,
    marginBottom: 14,
  },

  // Main heading inside the hero card.
  heroTitle: {
    fontSize: 30,
    lineHeight: 35,
    fontWeight: "800",
    color: "#ffffff",
  },

  // Description below the hero heading.
  heroDescription: {
    fontSize: 15,
    lineHeight: 22,
    color: "#E0E7FF",
    marginTop: 12,
  },

  // Design of the Explore Events button.
  primaryButton: {
    alignSelf: "flex-start",
    backgroundColor: "#FFFFFF",
    paddingVertical: 13,
    paddingHorizontal: 20,
    borderRadius: 14,
    marginTop: 20,
  },

  // Text inside the Explore Events button.
  primaryButtonText: {
    color: "#4F46E5",
    fontSize: 15,
    fontWeight: "800",
  },

  // Decorative celebration icon inside the hero card.
  decorativeEmoji: {
    position: "absolute", // Position it relative to the card.
    right: 15, // Space from the right edge.
    bottom: 10, // Space from the bottom edge.
    fontSize: 90,
    opacity: 0.18, // Make the icon faint.
  },

  // Spacing below the Stay Ready heading section.
  sectionHeader: {
    marginBottom: 16,
  },

  // Main heading for the feature cards.
  sectionTitle: {
    fontSize: 22,
    fontWeight: "800",
    color: "#f2f4f7",
  },

  // Subtitle below the feature section heading.
  sectionSubtitle: {
    fontSize: 14,
    color: "#e5f410",
    marginTop: 4,
  },

  // Places the Event Details and Checklist cards side by side.
  cardRow: {
    flexDirection: "row",
    gap: 14, // Space between the two cards.
    marginBottom: 18,
  },

  // Shared style for both feature cards.
  featureCard: {
    flex: 1, // Let each card share the available row width.
    borderRadius: 20,
    padding: 18,
    minHeight: 190,
  },

  // Background color for the Event Details card.
  blueCard: {
    backgroundColor: "#E8EDFF",
  },

  // Background color for the Checklist card.
  orangeCard: {
    backgroundColor: "#FFF0DC",
  },

  // Size and spacing of the feature icons.
  featureEmoji: {
    fontSize: 30,
    marginBottom: 14,
  },

  // Titles inside the feature cards.
  featureTitle: {
    fontSize: 17,
    fontWeight: "800",
    color: "#172033",
  },

  // Descriptions inside the feature cards.
  featureText: {
    fontSize: 13,
    lineHeight: 19,
    color: "#657083",
    marginTop: 8,
  },

  // Design of the readiness card.
  readyCard: {
    backgroundColor: "#172033",
    borderRadius: 22,
    padding: 20,
    flexDirection: "row", // Place the text and circle side by side.
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 6,
  },

  // Small label above the readiness heading.
  readyLabel: {
    color: "#AAB3C5",
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 1,
  },

  // Main message inside the readiness card.
  readyTitle: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "800",
    marginTop: 7,
    maxWidth: 230,
  },

  // Supporting text inside the readiness card.
  readyText: {
    color: "#AAB3C5",
    fontSize: 13,
    marginTop: 6,
    maxWidth: 230,
  },

  // Circular border surrounding the readiness percentage.
  readyCircle: {
    width: 70,
    height: 70,
    borderRadius: 35, // Half the width makes the shape circular.
    borderWidth: 5,
    borderColor: "#818CF8",
    justifyContent: "center",
    alignItems: "center",
  },

  // Style for the fixed readiness percentage.
  readyNumber: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "800",
  },

  // Centers the message at the bottom of the screen.
  bottomMessage: {
    alignItems: "center",
    marginTop: 28,
  },

  // Size of the decorative icon above the bottom message.
  bottomEmoji: {
    fontSize: 22,
  },

  // Text style for the bottom message.
  bottomText: {
    color: "#7B8494",
    fontSize: 13,
    marginTop: 5,
  },

  // Main design of the About Us clickable card.
  aboutCard: {
    backgroundColor: "#172033",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#303B52",
    padding: 18,
    marginTop: 18,
    flexDirection: "row", // Place the icon, text, and arrow in a row.
    alignItems: "center",
    gap: 14,
  },

  // Size of the icon on the About Us card.
  aboutEmoji: {
    fontSize: 32,
  },

  // Lets the About text use the available horizontal space.
  aboutContent: {
    flex: 1,
  },

  // Title style for the About Us card.
  aboutTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#E5F410",
  },

  // Description style for the About Us card.
  aboutText: {
    fontSize: 13,
    lineHeight: 20,
    color: "#E5E7EB",
    marginTop: 6,
  },

  // Style for the arrow on the About Us card.
  aboutArrow: {
    fontSize: 25,
    fontWeight: "800",
    color: "#E5F410",
  },

  // Main box containing the weather information.
  weatherCard: {
    backgroundColor: "#172033",
    borderRadius: 22,
    padding: 22,
    marginBottom: 30,
    borderWidth: 1,
    borderColor: "#303B52",
  },

  // Places weather information and its icon in a row.
  weatherHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  // Small heading identifying the weather location.
  weatherLabel: {
    color: "#AAB3C5",
    fontSize: 12,
    fontWeight: "800",
    letterSpacing: 1,
  },

  // Large text displaying the temperature.
  temperature: {
    color: "#E5F410",
    fontSize: 36,
    fontWeight: "800",
    marginTop: 10,
  },

  // Text showing the weather description or an error message.
  weatherCondition: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
    marginTop: 4,
  },

  // Text showing the relative humidity.
  humidity: {
    color: "#AAB3C5",
    fontSize: 13,
    marginTop: 8,
  },

  // Size of the decorative weather icon.
  weatherEmoji: {
    fontSize: 48,
  },

  // Message at the bottom of the weather card.
  weatherFooter: {
    color: "#AAB3C5",
    fontSize: 13,
    marginTop: 18,
  },

});
