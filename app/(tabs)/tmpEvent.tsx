import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { View, Text, Image, StyleSheet, Pressable } from "react-native";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function TmpEvent() {
  const colorScheme = useColorScheme();

  const [userProgramId, setUserProgramId] = useState<string | null>(null);
  const [event, setEvent] = useState<any>(null);

  useEffect(() => {
    const fetchEvent = async () => {
      const response = await fetch("https://feffs.elioooooo.fr/event/get/");
      const data = await response.json();
      setEvent(data);
    };
    fetchEvent();
  });

  const handleAdd = async (eventId: string) => {
    console.log("Add event to personnal calendar");
    const userEmail = await AsyncStorage.getItem("email");

    const userId = await fetch("https://feffs.elioooooo.fr/user/get/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: userEmail,
      }),
    }).then((response) => response.json());

    const userProgram = await fetch("https://feffs.elioooooo.fr/program/get/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: userId,
      }),
    });

    if (userProgram.status === 200) {
      const data = await userProgram.json();
      setUserProgramId(data._id);
    } else {
      const newProgram = await fetch(
        "https://feffs.elioooooo.fr/program/create/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: userId,
          }),
        }
      );

      if (newProgram.status === 200) {
        const data = await newProgram.json();
        setUserProgramId(data._id);
      }
    }

    const event = await fetch(
      `https://feffs.elioooooo.fr/event/get/${eventId}`
    );
    const eventData = await event.json();

    const addEvent = await fetch(
      `https://feffs.elioooooo.fr/program/update/${userProgramId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          event: eventData,
        }),
      }
    );
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
              Les évènements disponibles
            </Text>
          </View>
        </View>
      </View>
      <View
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "center",
          padding: 20,
        }}
      >
        {event ? (
          event.map((event: any) => (
            <View
              key={event._id}
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                alignItems: "center",
                padding: 20,
                backgroundColor: Colors[colorScheme ?? "light"].background,
                borderRadius: 10,
                marginBottom: 10,
              }}
            >
              <Text style={{ color: Colors[colorScheme ?? "light"].text }}>
                {event.title}
              </Text>
              <Text style={{ color: Colors[colorScheme ?? "light"].text }}>
                {event.description}
              </Text>
              <Text style={{ color: Colors[colorScheme ?? "light"].text }}>
                {event.duration}
              </Text>
              <Pressable onPress={() => handleAdd(event._id)}>
                <Text style={{ color: Colors[colorScheme ?? "light"].button }}>
                  En savoir plus
                </Text>
              </Pressable>
            </View>
          ))
        ) : (
          <Text style={{ color: Colors[colorScheme ?? "light"].text }}>
            Aucun évènement disponible
          </Text>
        )}
      </View>
    </>
  );
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
