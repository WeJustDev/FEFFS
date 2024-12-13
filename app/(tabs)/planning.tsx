import {
  Text,
  View,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
} from "react-native";
import { useEffect, useState } from "react";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { IconSymbol } from "@/components/ui/IconSymbol";
import AsyncStorage from "@react-native-async-storage/async-storage";

let days = [
  "20-09",
  "21-09",
  "22-09",
  "23-09",
  "24-09",
  "25-09",
  "26-09",
  "27-09",
  "28-09",
  "29-09",
];

type Showtime = {
  title: string;
  date: Date;
  localisation: string;
  event: string;
};

type Program = {
  userId: number;
  events: Showtime[];
};

let currentDay = new Date().getDate();

export default function Planning() {
  const colorScheme = useColorScheme();

  const [prog, setProg] = useState<Program | null>(null);
  const [showtimes, setShowtimes] = useState<string[]>([]);
  const [updatedShowtimes, setUpdatedShowtimes] = useState<any[]>([]);

  const [refresh, setRefresh] = useState(0);

  useEffect(() => {
    const fetchProg = async () => {
      const storedProg = await AsyncStorage.getItem("program");
      if (storedProg) {
        setProg(JSON.parse(storedProg));
        setShowtimes(JSON.parse(storedProg).events);
      }
    };
    fetchProg();
  }, []);

  useEffect(() => {
    const fetchShowtimes = async () => {
      if (prog) {
        try {
          const response = await fetch(
            `https://feffs.elioooooo.fr/program/get/${prog.userId}`
          );
          const data = await response.json();
          const programData = data[0];

          if (programData && programData.events && Array.isArray(programData.events)) {
            const newShowtimes = [];
            for (let index = 0; index < programData.events.length; index++) {
              let showtimeId = programData.events[index];
              let showtime = await fetch(
                `https://feffs.elioooooo.fr/showtime/get/${showtimeId}`
              ).then((response) => response.json());

              let event = await fetch(
                `https://feffs.elioooooo.fr/event/get/${showtime.event}`
              ).then((response) => response.json());

              showtime.eventDetails = event;
              newShowtimes.push(showtime);
            }
            setUpdatedShowtimes(sortShowtimes(newShowtimes));
          } else {
            console.error("Invalid data format: events is not an array or is undefined");
          }
        } catch (error) {
          console.error("Error fetching showtimes:", error);
        }
      }
    };

    fetchShowtimes();
  }, [prog, refresh]);

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

  const filteredShowtimes = filterShowtimesByDay(updatedShowtimes, selectedDay);

  const hasEventsForDay = (day: string): boolean => {
    return updatedShowtimes.some((showtime: Showtime) => {
      const showtimeDate = new Date(showtime.date);
      const showtimeDay = `${showtimeDate.getDate()}-${(
        showtimeDate.getMonth() + 1
      )
        .toString()
        .padStart(2, "0")}`;
      return showtimeDay === day;
    });
  };

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
              borderRadius: 100,
              width: 40,
              height: 40,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              position: "relative",
            }}
          >
            <Text style={{ color: Colors[colorScheme ?? "light"].text }}>
              {day.split("-")[0]}
            </Text>
            {hasEventsForDay(day) && (
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
      <ScrollView style={{ paddingHorizontal: 10 }}>
        {filteredShowtimes.length > 0 ? (
          filteredShowtimes.map((showtime, index) => (
            <View
              key={`${showtime.date}-${showtime.title}-${index}`}
              style={{
                display: "flex",
                marginVertical: 10,
                flexDirection: "row",
                alignItems: "center",
                gap: 20,
              }}
            >
              <View style={{ display: "flex", gap: 5 }}>
                <Text style={{ color: Colors[colorScheme ?? "light"].text }}>
                  {new Date(showtime.date).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </Text>
                <Text style={{ color: Colors[colorScheme ?? "light"].text }}>
                  {calculateEndTime(
                    new Date(showtime.date).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    }),
                    showtime.eventDetails.duration
                  )}
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
              <View
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  height: "auto",
                  gap: 3,
                  alignItems: "flex-start",
                  flex: 1,
                }}
              >
                <Text style={{ color: Colors[colorScheme ?? "light"].text }}>
                  {showtime.eventDetails.title}
                </Text>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <IconSymbol
                    name="location.fill"
                    size={15}
                    color={Colors[colorScheme ?? "light"].textsecondary}
                  />
                  <Text
                    style={{ color: Colors[colorScheme ?? "light"].textsecondary }}
                  >
                    {showtime.localisation}
                  </Text>
                </View>
                {showtime.overlap && (
                  <View
                    style={{
                      backgroundColor:
                        Colors[colorScheme ?? "light"].dateTagBg,
                      padding: 2,
                      borderRadius: 4,
                      display: "flex",
                      flexDirection: "row",
                      gap: 4,
                    }}
                  >
                    <IconSymbol
                      name="warning.fill"
                      size={20}
                      color={Colors[colorScheme ?? "light"].dateTagText}
                    />
                    <Text
                      style={{
                        color: Colors[colorScheme ?? "light"].dateTagText,
                      }}
                    >
                      Certains évènements se superposent !
                    </Text>
                  </View>
                )}
              </View>
            </View>
          ))
        ) : (
          <View>
            <Text style={{ color: Colors[colorScheme ?? "light"].text }}>
              Aucun événement programmé pour ce jour.
            </Text>
            <Text style={{ color: Colors[colorScheme ?? "light"].text }}>
              La programmation des évènements se fait depuis l'onglet Evènements.
            </Text>
          </View>
        )}
      </ScrollView>
      <Pressable
        style={styles.floatingButton}
        onPress={() => setRefresh((oldKey) => oldKey + 1)}
      >
        <IconSymbol
          name="arrow.clockwise"
          size={24}
          color={Colors[colorScheme ?? "light"].text}
        />
      </Pressable>
    </>
  );

  function calculateEndTime(startTime: string, duration: number): string {
    const [hours, minutes] = startTime.split(":").map(Number);
    const startDate = new Date();
    startDate.setHours(hours, minutes);

    const endDate = new Date(startDate.getTime() + duration * 60000);
    const endHours = endDate.getHours().toString().padStart(2, "0");
    const endMinutes = endDate.getMinutes().toString().padStart(2, "0");

    return `${endHours}:${endMinutes}`;
  }

  function filterShowtimesByDay(showtimes: ShowtimeWithDetails[], selectedDay: string): ShowtimeWithDetails[] {
    return showtimes.filter((showtime) => {
      const showtimeDate = new Date(showtime.date);
      const showtimeDay = `${showtimeDate.getDate()}-${(
        showtimeDate.getMonth() + 1
      )
        .toString()
        .padStart(2, "0")}`;
      return showtimeDay === selectedDay;
    });
  }

  interface ShowtimeWithDetails extends Showtime {
    eventDetails: {
      title: string;
      duration: number;
    };
  }

  function sortShowtimes(showtimes: ShowtimeWithDetails[]): ShowtimeWithDetails[] {
    return showtimes.sort((a, b) => {
      const startA = new Date(a.date).getTime();
      const startB = new Date(b.date).getTime();
      const endA = new Date(startA + a.eventDetails.duration * 60000).getTime();
      const endB = new Date(startB + b.eventDetails.duration * 60000).getTime();

      if (startA === startB) {
        return endA - endB;
      }
      return startA - startB;
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
  floatingButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: Colors.light.icon,
    borderRadius: 50,
    width: 60,
    height: 60,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
  },
});