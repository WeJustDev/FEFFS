import { Pressable, Text, View, Image, StyleSheet, ScrollView } from "react-native";
import { useEffect, useState } from "react";

import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";

let days = [
  "20 Septembre",
  "21 Septembre",
  "22 Septembre",
  "23 Septembre",
  "24 Septembre",
  "25 Septembre",
  "26 Septembre",
  "27 Septembre",
  "28 Septembre",
  "29 Septembre",
];

type Event = {
  hour: string;
  event: string;
  duration: number;
};

type Program = {
  [key: string]: Event[];
};

let currentDay = new Date().getDate();

export default function Day() {
  const colorScheme = useColorScheme();

  const [prog, setProg] = useState<Program>({
    "23 Septembre": [
      { hour: "19h04", event: "Le film de fou là", duration: 142 },
      { hour: "10h00", event: "Ouverture du festival", duration: 120 },
      { hour: "10h00", event: "Conférence sur la vie", duration: 30 },
      { hour: "10h30", event: "Conférence sur la programmation", duration: 60 },
    ],
    "20 Septembre": [
        { hour: "19h04", event: "Le film de fou là", duration: 142 },
        { hour: "10h00", event: "Ouverture du festival", duration: 120 },
        { hour: "10h00", event: "Conférence sur la vie", duration: 30 },
        { hour: "10h30", event: "Conférence sur la programmation", duration: 60 },
        { hour: "19h04", event: "Le film de fou là", duration: 142 },
        { hour: "10h00", event: "Ouverture du festival", duration: 120 },
        { hour: "10h00", event: "Conférence sur la vie", duration: 30 },
        { hour: "10h30", event: "Conférence sur la programmation", duration: 60 },
        { hour: "19h04", event: "Le film de fou là", duration: 142 },
        { hour: "10h00", event: "Ouverture du festival", duration: 120 },
        { hour: "10h00", event: "Conférence sur la vie", duration: 30 },
        { hour: "10h30", event: "Conférence sur la programmation", duration: 60 },
        { hour: "19h04", event: "Le film de fou là", duration: 142 },
        { hour: "10h00", event: "Ouverture du festival", duration: 120 },
        { hour: "10h00", event: "Conférence sur la vie", duration: 30 },
        { hour: "10h30", event: "Conférence sur la programmation", duration: 60 },
        { hour: "19h04", event: "Le film de fou là", duration: 142 },
        { hour: "10h00", event: "Ouverture du festival", duration: 120 },
        { hour: "10h00", event: "Conférence sur la vie", duration: 30 },
        { hour: "10h30", event: "Conférence sur la programmation", duration: 60 },
      ],
  });

  const [selectedDay, setSelectedDay] = useState(
    days.find((day) => day.startsWith(currentDay.toString())) || days[0]
  );

  const colors = [
    "red",
    "blue",
    "green",
    "yellow",
    "purple",
    "orange",
    "pink",
    "brown",
  ];

  return (
    <>
      <View style={{ marginTop: 64, marginBottom: 36, paddingHorizontal: 20 }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "center",
          }}
        >
          <View style={styles.logoContainer}>
            <Image
              style={styles.logo}
              source={require("@/assets/images/logo.png")}
            />
          </View>
          <View style={{ justifyContent: "center" }}>
            <Text
              style={[
                styles.welcomeText,
                { color: Colors[colorScheme ?? "light"].headerText },
              ]}
            >
              Consultez
            </Text>
            <Text
              style={[
                styles.titleText,
                { color: Colors[colorScheme ?? "light"].headerText },
              ]}
            >
              Votre programme
            </Text>
          </View>
        </View>
      </View>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          gap: 10,
          flexWrap: "wrap",
          maxWidth: "100%",
          padding: 20,
          paddingTop: 0,
        }}
      >
        {days.map((day) => (
          <Pressable
            key={day}
            onPress={() => setSelectedDay(day)}
            style={{
              backgroundColor:
                selectedDay === day
                  ? Colors[colorScheme ?? "light"].icon
                  : Colors[colorScheme ?? "light"].background,
              padding: 10,
              borderRadius: 100,
              width: 40,
              height: 40,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={{ color: Colors[colorScheme ?? "light"].text }}>
              {day.split(" ")[0]}
            </Text>
        {prog[day] && (
          <View
            style={{
              position: "absolute",
              top: 0,
              right: 0,
              width: 10,
              height: 10,
              borderRadius: 5,
              backgroundColor: Colors[colorScheme ?? "light"].dateTagText,
            }}
          />
        )}
          </Pressable>
        ))}
      </View>
      <ScrollView>
        {prog[selectedDay] ? (
          sortEventsByStartAndEndTime(prog[selectedDay]).map((event) => (
            <View
              key={event.event}
              style={{
                display: "flex",
                flexDirection: "row",
                padding: 10,
                alignItems: "center",
                gap: 20,
              }}
            >
              <View style={{ display: "flex", gap: 5 }}>
                <Text style={{ color: Colors[colorScheme ?? "light"].text }}>
                  {event.hour}
                </Text>
                <Text style={{ color: Colors[colorScheme ?? "light"].text }}>
                  {calculateEndTime(event.hour, event.duration)}
                </Text>
              </View>
              <View
                style={{
                  backgroundColor:
                    colors[Math.floor(Math.random() * colors.length)],
                  width: 4,
                  borderRadius: 4,
                  height: "100%",
                }}
              ></View>

              <Text style={{ color: Colors[colorScheme ?? "light"].text }}>
                {event.event}
              </Text>
            </View>
          ))
        ) : (
          <Text style={{ color: Colors[colorScheme ?? "light"].text }}>
            Aucun événement pour ce jour.
          </Text>
        )}
      </ScrollView>
    </>
  );

  function calculateEndTime(startTime: string, duration: number): string {
    const [hours, minutes] = startTime.split("h").map(Number);
    const startDate = new Date();
    startDate.setHours(hours, minutes);

    const endDate = new Date(startDate.getTime() + duration * 60000);
    const endHours = endDate.getHours().toString().padStart(2, "0");
    const endMinutes = endDate.getMinutes().toString().padStart(2, "0");

    return `${endHours}h${endMinutes}`;
  }

  function sortEventsByStartAndEndTime(events: Event[]): Event[] {
    return events.sort((a, b) => {
      const startA = a.hour;
      const startB = b.hour;
      if (startA === startB) {
        const endA = calculateEndTime(a.hour, a.duration);
        const endB = calculateEndTime(b.hour, b.duration);
        return endA.localeCompare(endB);
      }
      return startA.localeCompare(startB);
    });
  }
}

const styles = StyleSheet.create({
  logoContainer: {
    height: 40,
    width: 40,
    borderRadius: 20,
    marginRight: 12,
    boxShadow: "0px 0px 80px rgba(255, 255, 255, 1)",
  },
  logo: {
    width: "100%",
    height: "100%",
    borderRadius: 20,
  },
  welcomeText: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "bold",
  },
  titleText: {
    fontSize: 18,
    lineHeight: 20,
    fontWeight: "bold",
  },
  passContainer: {
    borderRadius: 40,
    minHeight: 600,
    paddingTop: 24,
    overflow: "hidden",
  },
  passHeader: {
    paddingHorizontal: 16,
    paddingBottom: 28,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  passTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  dateTag: {
    borderRadius: 15,
    paddingVertical: 8,
    paddingHorizontal: 15,
    boxShadow: "80px 0px 200px rgba(208,78,50, 0.8)",
  },
  dateTagText: {
    fontWeight: "bold",
  },
  carouselContainer: {
    height: 225,
  },
  footer: {
    marginTop: 16,
    backgroundColor: "rgb(52,50,51)",
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    padding: 24,
    height: "100%",
  },
});
