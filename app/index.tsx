
import { router } from "expo-router";
import {
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function HomeScreen() {
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

          <View
            style={[
              styles.featureCard,
              styles.orangeCard,
            ]}
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

          </View>

        </View>


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

});
