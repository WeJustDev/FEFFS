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
    console.log("Add event to personnal calendar...");
    const userEmail = await AsyncStorage.getItem("email");
    if (userEmail != null) {
      // With userEmail, return userId
      console.log("User email:", userEmail);
      const userId = await fetch("https://feffs.elioooooo.fr/user/get/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: userEmail,
        }),
      }).then(async (data) => {
        const response = await data.json();
        return response.userId;
      });

      // With userId, return userProgramId
      const userProgram = await fetch(
        "https://feffs.elioooooo.fr/program/get/",
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
      console.log("User program status:", userProgram.status);

      if (userProgram.status === 200) {
        console.log("Program existant");
        const data = await userProgram.json();
        console.log("Program n°", data._id);
        setUserProgramId(data._id);
      } else {
        console.log("Program inexistant");
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
          console.log("Création du program n°", data._id);
          setUserProgramId(data._id);
        }
      }

      console.log("Add event to program n°", userProgramId);
      const addEvent = await fetch(
        `https://feffs.elioooooo.fr/program/add-event/${userProgramId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            event: eventId,
          }),
        }
      ).then((data) => {
        console.log("Add event status:", data.status);
        return data;
      });

      if (addEvent.status === 200) {
        alert("Évènement ajouté au programme avec succès");
      } else {
        alert("Erreur lors de l'ajout de l'évènement au programme");
      }
    } else {
      alert(
        "Vous devez être connecté pour ajouter un évènement à votre programme"
      );
      return;
    }
  };

  const handleRemove = async (eventId: string) => {
    console.log("eventId:", eventId);
    console.log("Remove event from personal calendar...");
    const userEmail = await AsyncStorage.getItem("email");
  
    if (userEmail !== null) {
      // With userEmail, return userId
      console.log("User email:", userEmail);
      const userIdResponse = await fetch("https://feffs.elioooooo.fr/user/get/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: userEmail,
        }),
      });
  
      const userIdData = await userIdResponse.json();
      const userId = userIdData.userId;
  
      // With userId, return userProgramId
      const userProgramResponse = await fetch(
        "https://feffs.elioooooo.fr/program/get/",
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
  
      console.log("User program status:", userProgramResponse.status);
  
      let userProgramId = null;
      if (userProgramResponse.status === 200) {
        console.log("Program existant");
        const userProgramData = await userProgramResponse.json();
        console.log("Program n°", userProgramData._id);
        userProgramId = userProgramData._id;
      } else {
        console.log("Program inexistant");
      }
  
      if (userProgramId) {
        console.log("Remove event from program n°", userProgramId);
        const removeEventResponse = await fetch(
          `https://feffs.elioooooo.fr/program/remove-event/${userProgramId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              event: eventId,
            }),
          }
        );
  
        console.log("Remove event status:", removeEventResponse.status);
  
        if (removeEventResponse.status === 200) {
          alert("Évènement retiré du programme avec succès");
        } else {
          alert("Erreur lors de l'enlèvement de l'évènement du programme");
        }
      } else {
        alert("Erreur : Programme utilisateur introuvable");
      }
    } else {
      alert("Vous devez être connecté pour retirer un évènement de votre programme");
    }
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
                  ajouter au program
                </Text>
              </Pressable>
              <Pressable onPress={() => handleRemove(event._id)}>
                <Text style={{ color: Colors[colorScheme ?? "light"].button }}>
                  retirer du program
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
