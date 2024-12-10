import { Text, View, Image, Pressable, ScrollView, StyleSheet } from 'react-native';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useState } from 'react';
import { IconSymbol } from '@/components/ui/IconSymbol';

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
    place: string;
  };
  
  type Program = {
    [key: string]: Event[];
  };
  
  let currentDay = new Date().getDate();

export default function Planning() {
    const colorScheme = useColorScheme();

    const [prog, setProg] = useState<Program>({
      "23 Septembre": [
        { hour: "19h04", event: "Le film de fou là", duration: 142, place: "Cinéma Star, Salle 1" },
        { hour: "10h00", event: "Ouverture du festival", duration: 120, place: "Salle de conférence" },
        { hour: "10h00", event: "Conférence sur la vie", duration: 30, place: "Salle de conférence" },
        { hour: "10h30", event: "Conférence sur la programmation", duration: 60, place: "Salle de conférence" },
      ],
      "22 Septembre": [
        { hour: "19h04", event: "Le film de fou là", duration: 142, place: "Cinéma Star, Salle 1" },
        { hour: "10h00", event: "Conférence sur la vie", duration: 30, place: "Salle de conférence" },
        { hour: "17h30", event: "Conférence sur la programmation", duration: 60, place: "Salle de conférence" },
      ],
      "20 Septembre": [
        { hour: "19h04", event: "Le film de fou là", duration: 142, place: "Cinéma Star, Salle 1" },
        { hour: "10h00", event: "Ouverture du festival", duration: 120, place: "Salle de conférence" },
        { hour: "10h00", event: "Conférence sur la vie", duration: 30, place: "Salle de conférence" },
        { hour: "10h30", event: "Conférence sur la programmation", duration: 60, place: "Salle de conférence" },
        { hour: "19h04", event: "Le film de fou là", duration: 142, place: "Cinéma Star, Salle 1" },
        { hour: "10h00", event: "Ouverture du festival", duration: 120, place: "Salle de conférence" },
        { hour: "10h00", event: "Conférence sur la vie", duration: 30, place: "Salle de conférence" },
        { hour: "10h30", event: "Conférence sur la iuçugh_ hfvytèt jh i ouhçài programmation", duration: 60, place: "Salle de conférence" },
        { hour: "19h04", event: "Le film de fou là", duration: 142, place: "Cinéma Star, Salle 1" },
        { hour: "10h00", event: "Ouverture du festival", duration: 120, place: "Salle de conférence" },
        { hour: "10h00", event: "Conférence sur la vie", duration: 30, place: "Salle de conférence" },
        { hour: "10h30", event: "Conférence sur la programmation", duration: 60, place: "Salle de conférence" },
        { hour: "19h04", event: "Le film de fou là", duration: 142, place: "Cinéma Star, Salle 1" },
        { hour: "10h00", event: "Ouverture du festival", duration: 120, place: "Salle de conférence" },
        { hour: "10h00", event: "Conférence sur la vie", duration: 30, place: "Salle de conférence" },
        { hour: "10h30", event: "Conférence sur la programmation", duration: 60, place: "Salle de conférence" },
        { hour: "19h04", event: "Le film de fou là", duration: 142, place: "Cinéma Star, Salle 1" },
        { hour: "10h00", event: "Ouverture du festival", duration: 120, place: "Salle de conférence" },
        { hour: "10h00", event: "Conférence sur la vie", duration: 30, place: "Salle de conférence" },
        { hour: "10h30", event: "Conférence sur la programmation", duration: 60, place: "Salle de conférence" },
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
        <ScrollView style={{paddingHorizontal: 10}}>
          {prog[selectedDay] ? (
            sortEventsByStartAndEndTime(prog[selectedDay]).map(
              (event, index, array) => {
                const nextEvent = array[index + 1];
                const endTime = calculateEndTime(event.hour, event.duration);
                const overlap = array.some((e, i) => i !== index && e.hour < endTime && calculateEndTime(e.hour, e.duration) > event.hour);
  
                return (
                  <View
                    key={`${event.hour}-${event.event}-${Math.random()
                      .toString(36)
                      .substr(2, 9)}`}
                    style={{
                      display: "flex",
                      marginVertical: 10,
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 20,
                    }}
                  >
                    <View style={{ display: "flex", gap: 5 }}>
                      <Text
                        style={{ color: Colors[colorScheme ?? "light"].text }}
                      >
                        {event.hour}
                      </Text>
                      <Text
                        style={{ color: Colors[colorScheme ?? "light"].text }}
                      >
                        {endTime}
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
                    <View style={{ display: 'flex', justifyContent: 'space-between', height: 'auto', gap: 3, alignItems: 'flex-start', flex: 1 }}>
                      <Text style={{ color: Colors[colorScheme ?? "light"].text}}>
                        {event.event}
                      </Text>
                      <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                        <IconSymbol
                          name="location.fill"
                          size={15}
                          color={Colors[colorScheme ?? "light"].textsecondary}
                        />
                        <Text style={{ color: Colors[colorScheme ?? "light"].textsecondary }}>
                          {event.place}
                        </Text>
                      </View>
                      {overlap && (
                        <View style={{ backgroundColor: Colors[colorScheme ?? 'light'].dateTagBg, padding: 2, borderRadius: 4, display: 'flex', flexDirection: 'row', gap: 4}}>
                          <IconSymbol
                            name="warning.fill"
                            size={20}
                            color={Colors[colorScheme ?? "light"].dateTagText}
                          />
                          <Text style={{ color: Colors[colorScheme ?? "light"].dateTagText }}>
                            Certains évènements se superposent !
                          </Text>
                        </View>
                      )}
                    </View>
                  </View>
                );
              }
            )
          ) : (
            <Text style={{ color: Colors[colorScheme ?? "light"].text }}>
              Aucun événement programmé pour ce jour.
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
  });
  