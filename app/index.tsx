
import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";

type WeatherData = {
  temperature: number;
  humidity: number;
  weatherCode: number;
};

function getWeatherDescription(code: number) {
  if (code === 0) return "Clear sky ☀️";
  if ([1, 2].includes(code)) return "Partly cloudy 🌤️";
  if (code === 3) return "Overcast ☁️";
  if ([45, 48].includes(code)) return "Foggy 🌫️";
  if ([51, 53, 55, 56, 57].includes(code)) return "Drizzle 🌦️";
  if ([61, 63, 65, 66, 67, 80, 81, 82].includes(code)) {
    return "Rainy 🌧️";
  }
  if ([71, 73, 75, 77, 85, 86].includes(code)) {
    return "Snowy ❄️";
  }
  if ([95, 96, 99].includes(code)) return "Thunderstorm ⛈️";

  return "Weather unavailable";
}

export default function HomeScreen() {

  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchWeather() {
      try {
        const response = await fetch(
          "https://api.open-meteo.com/v1/forecast?latitude=10.52&longitude=124.03&current=temperature_2m,relative_humidity_2m,weather_code&timezone=Asia%2FManila"
        );

        if (!response.ok) {
          throw new Error("Unable to get weather data.");
        }

        const data = await response.json();

        setWeather({
          temperature: data.current.temperature_2m,
          humidity: data.current.relative_humidity_2m,
          weatherCode: data.current.weather_code,
        });
      } catch (err) {
        setError("Weather is currently unavailable.");
      } finally {
        setLoading(false);
      }
    }

    fetchWeather();
  }, []);


  return (
    <View style={styles.screen}>
      <StatusBar barStyle="light-content" />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >

        {/* Header */}

        <View style={styles.header}>

          <View>

            <Text style={styles.smallText}>
              WELCOME, STUDENT 👋
            </Text>

            <Text style={styles.title}>
              Student Event
              <Text style={styles.titleHighlight}>
                {" "}Ready
              </Text>
            </Text>

            <Text style={styles.subtitle}>
              Prepare. Check. Be Ready.
            </Text>

          </View>

          <View style={styles.profileCircle}>
            <Text style={styles.profileEmoji}>
              🎓
            </Text>
          </View>

        </View>


        {/* Main Hero Card */}

        <View style={styles.heroCard}>

          <View style={styles.heroContent}>

            <Text style={styles.heroEmoji}>
              📅
            </Text>

            <Text style={styles.heroTitle}>
              What's happening
              {"\n"}
              on campus?
            </Text>

            <Text style={styles.heroDescription}>
              Discover upcoming school events and prepare everything you need
              before the big day.
            </Text>


            {/* Explore Events Button */}

            <Pressable
              style={({ pressed }) => [
                styles.primaryButton,
                {
                  opacity: pressed ? 0.7 : 1,
                },
              ]}
              onPress={() => {
                router.push("/event");
              }}
            >

              <Text style={styles.primaryButtonText}>
                Explore Events →
              </Text>

            </Pressable>

          </View>

          <Text style={styles.decorativeEmoji}>
            🎉
          </Text>

        </View>
       
       
        {/* WEATHER CARD */}
        <View style={styles.weatherCard}>
          <View style={styles.weatherHeader}>
            <View>
              <Text style={styles.weatherLabel}>
                DANAO CITY WEATHER
              </Text>

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
                  <Text style={styles.temperature}>
                    {weather.temperature}°C
                  </Text>

                  <Text style={styles.weatherCondition}>
                    {getWeatherDescription(weather.weatherCode)}
                  </Text>

                  <Text style={styles.humidity}>
                    Humidity: {weather.humidity}%
                  </Text>
                </>
              ) : null}
            </View>

            <Text style={styles.weatherEmoji}>🌦️</Text>
          </View>

          <Text style={styles.weatherFooter}>
            Check the weather before your school event.
          </Text>
        </View>

        {/* Section Title */}

        <View style={styles.sectionHeader}>

          <Text style={styles.sectionTitle}>
            Stay Ready
          </Text>

          <Text style={styles.sectionSubtitle}>
            Everything you need in one place
          </Text>

        </View>


        {/* Feature Cards */}

        <View style={styles.cardRow}>

          {/* EVENT DETAILS */}

          <Pressable
            style={({ pressed }) => [
              styles.featureCard,
              styles.blueCard,
              {
                opacity: pressed ? 0.7 : 1,
              },
            ]}
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


          {/* MY CHECKLIST */}
          

          <Pressable
            style={({ pressed }) => [
              styles.featureCard,
              styles.orangeCard,
              {
                opacity: pressed ? 0.7 : 1,
              },
            ]}
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
    {/* ABOUT US */}

    <Pressable
      style={({ pressed }) => [
        styles.aboutCard,
        {
          opacity: pressed ? 0.7 : 1,
        },
      ]}
      onPress={() => {
        router.push("/about");
      }}
    >
      <Text style={styles.aboutEmoji}>🎓</Text>

      <View style={styles.aboutContent}>
        <Text style={styles.aboutTitle}>
          About Us
        </Text>

        <Text style={styles.aboutText}>
          Learn about StudentEventReady, our purpose, and the features we offer.
        </Text>
      </View>

      <Text style={styles.aboutArrow}>→</Text>
    </Pressable>


        {/* Readiness Card */}

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

            <Text style={styles.readyNumber}>
              0%
            </Text>

          </View>

        </View>


        {/* Bottom Message */}

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


const styles = StyleSheet.create({

  screen: {
    flex: 1,
    backgroundColor: "#0a0a0a",
  },

  scrollContent: {
    padding: 24,
    paddingBottom: 40,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },

  smallText: {
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 1,
    color: "#f3f5f9",
    marginBottom: 6,
  },

  title: {
    fontSize: 30,
    fontWeight: "800",
    color: "#f8f9fc",
  },

  titleHighlight: {
    color: "hsl(60, 86%, 50%)",
  },

  subtitle: {
    fontSize: 15,
    color: "hsl(60, 86%, 50%)",
    marginTop: 5,
  },

  profileCircle: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: "#E0E7FF",
    justifyContent: "center",
    alignItems: "center",
  },

  profileEmoji: {
    fontSize: 25,
  },

  heroCard: {
    backgroundColor: "#4F46E5",
    borderRadius: 28,
    padding: 24,
    minHeight: 280,
    overflow: "hidden",
    marginBottom: 30,
  },

  heroContent: {
    width: "85%",
  },

  heroEmoji: {
    fontSize: 32,
    marginBottom: 14,
  },

  heroTitle: {
    fontSize: 30,
    lineHeight: 35,
    fontWeight: "800",
    color: "#ffffff",
  },

  heroDescription: {
    fontSize: 15,
    lineHeight: 22,
    color: "#E0E7FF",
    marginTop: 12,
  },

  primaryButton: {
    alignSelf: "flex-start",
    backgroundColor: "#FFFFFF",
    paddingVertical: 13,
    paddingHorizontal: 20,
    borderRadius: 14,
    marginTop: 20,
  },

  primaryButtonText: {
    color: "#4F46E5",
    fontSize: 15,
    fontWeight: "800",
  },

  decorativeEmoji: {
    position: "absolute",
    right: 15,
    bottom: 10,
    fontSize: 90,
    opacity: 0.18,
  },

  sectionHeader: {
    marginBottom: 16,
  },

  sectionTitle: {
    fontSize: 22,
    fontWeight: "800",
    color: "#f2f4f7",
  },

  sectionSubtitle: {
    fontSize: 14,
    color: "#e5f410",
    marginTop: 4,
  },

  cardRow: {
    flexDirection: "row",
    gap: 14,
    marginBottom: 18,
  },

  featureCard: {
    flex: 1,
    borderRadius: 20,
    padding: 18,
    minHeight: 190,
  },

  blueCard: {
    backgroundColor: "#E8EDFF",
  },

  orangeCard: {
    backgroundColor: "#FFF0DC",
  },

  featureEmoji: {
    fontSize: 30,
    marginBottom: 14,
  },

  featureTitle: {
    fontSize: 17,
    fontWeight: "800",
    color: "#172033",
  },

  featureText: {
    fontSize: 13,
    lineHeight: 19,
    color: "#657083",
    marginTop: 8,
  },

  readyCard: {
    backgroundColor: "#172033",
    borderRadius: 22,
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 6,
  },

  readyLabel: {
    color: "#AAB3C5",
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 1,
  },

  readyTitle: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "800",
    marginTop: 7,
    maxWidth: 230,
  },

  readyText: {
    color: "#AAB3C5",
    fontSize: 13,
    marginTop: 6,
    maxWidth: 230,
  },

  readyCircle: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 5,
    borderColor: "#818CF8",
    justifyContent: "center",
    alignItems: "center",
  },

  readyNumber: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "800",
  },

  bottomMessage: {
    alignItems: "center",
    marginTop: 28,
  },

  bottomEmoji: {
    fontSize: 22,
  },

  bottomText: {
    color: "#7B8494",
    fontSize: 13,
    marginTop: 5,
  },
    aboutCard: {
     backgroundColor: "#172033",
     borderRadius: 20,
     borderWidth: 1,
     borderColor: "#303B52",
     padding: 18,
     marginTop: 18,
     flexDirection: "row",
     alignItems: "center",
     gap: 14,
     },
     
     aboutEmoji: {
     fontSize: 32,
     },
     
     aboutContent: {
     flex: 1,
     },
     
     aboutTitle: {
     fontSize: 18,
     fontWeight: "800",
     color: "#E5F410",
     },
     
     aboutText: {
     fontSize: 13,
     lineHeight: 20,
     color: "#E5E7EB",
     marginTop: 6,
     },
     
     aboutArrow: {
     fontSize: 25,
     fontWeight: "800",
     color: "#E5F410",
},


  weatherCard: {
    backgroundColor: "#172033",
    borderRadius: 22,
    padding: 22,
    marginBottom: 30,
    borderWidth: 1,
    borderColor: "#303B52",
  },

  weatherHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  weatherLabel: {
    color: "#AAB3C5",
    fontSize: 12,
    fontWeight: "800",
    letterSpacing: 1,
  },

  temperature: {
    color: "#E5F410",
    fontSize: 36,
    fontWeight: "800",
    marginTop: 10,
  },

  weatherCondition: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
    marginTop: 4,
  },

  humidity: {
    color: "#AAB3C5",
    fontSize: 13,
    marginTop: 8,
  },

  weatherEmoji: {
    fontSize: 48,
  },

  weatherFooter: {
    color: "#AAB3C5",
    fontSize: 13,
    marginTop: 18,
  },

});
