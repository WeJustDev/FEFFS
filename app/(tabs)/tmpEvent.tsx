import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { View, Text, Image, StyleSheet, Pressable } from "react-native";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { IconSymbol } from "@/components/ui/IconSymbol";

export default function TmpEvent() {
  const colorScheme = useColorScheme();

  const [userProgramId, setUserProgramId] = useState<string | null>(null);
  const [event, setEvent] = useState<any>(null);

  const [error, setError] = useState<string | null>(null);
  const [notification, setNotification] = useState<boolean>(false);

  useEffect(() => {
    const fetchEvent = async () => {
      const response = await fetch("https://feffs.elioooooo.fr/showtime/get/");
      const data = await response.json();
      setEvent(data);
    };
    fetchEvent();
  });

  useEffect(() => {
    setNotification(true);
    setTimeout(() => {
      setNotification(false);
    }, 3000);
  }, [error]);

  const handleAdd = async (eventId: string) => {
    console.log("Add event to personal calendar...");
    const userEmail = await AsyncStorage.getItem("email");

    if (userEmail !== null) {
      // With userEmail, return userId
      console.log("User email:", userEmail);
      const userIdResponse = await fetch(
        "https://feffs.elioooooo.fr/user/get/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: userEmail,
          }),
        }
      );

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
        const newProgramResponse = await fetch(
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

        if (newProgramResponse.status === 200) {
          const newProgramData = await newProgramResponse.json();
          console.log("Création du program n°", newProgramData._id);
          userProgramId = newProgramData._id;
        }
      }

      if (userProgramId) {
        console.log("Add event to program n°", userProgramId);
        const addEventResponse = await fetch(
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
        );

        console.log("Add event status:", addEventResponse.status);

        if (addEventResponse.status === 200) {
          setError("Évènement ajouté au programme avec succès");
        } else {
          setError("Erreur : Lors de l'ajout de l'évènement au programme");
        }
      } else {
        setError("Erreur : Programme personnel introuvable");
      }
    } else {
      setError(
        "Erreur : Vous devez être connecté pour ajouter un évènement à votre programme"
      );
    }
  };

  const handleRemove = async (eventId: string) => {
    console.log("eventId:", eventId);
    console.log("Remove event from personal calendar...");
    const userEmail = await AsyncStorage.getItem("email");

    if (userEmail !== null) {
      // With userEmail, return userId
      console.log("User email:", userEmail);
      const userIdResponse = await fetch(
        "https://feffs.elioooooo.fr/user/get/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: userEmail,
          }),
        }
      );

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
          setError("Évènement retiré du programme avec succès");
        } else {
          setError("Erreur : Lors de l'enlèvement de l'évènement du programme");
        }
      } else {
        setError("Erreur : Programme utilisateur introuvable");
      }
    } else {
      setError(
        "Erreur : Vous devez être connecté pour retirer un évènement de votre programme"
      );
    }
  };

  return (
    <>
      {notification && (
        <View style={{ width: "100%", padding: 10, position: "absolute" }}>
          <View
            style={[
              styles.notification,
              {
                zIndex: 20,
                backgroundColor: Colors[colorScheme ?? "light"].background,
              },
            ]}
          >
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "flex-start",
                justifyContent: "space-between",
                width: "100%",
                gap: 20,
                flex: 1,
              }}
            >
              <View style={{ display: "flex", alignItems: "flex-start", flex: 1 }}>
                {error && error.startsWith("Erreur") ? (
                  <Text
                    style={[
                      styles.message,
                      { color: Colors[colorScheme ?? "light"].texterror, flex: 1 },
                    ]}
                  >
                    Erreur...
                  </Text>
                ) : (
                  <Text
                    style={[
                      styles.message,
                      { color: Colors[colorScheme ?? "light"].textsuccess, flex: 1 },
                    ]}
                  >
                    Succès !
                  </Text>
                )}
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "flex-start",
                    gap: 5,
                    flex: 1,
                  }}
                >
                  {error && error.startsWith("Erreur") ? (
                    <IconSymbol
                      name="error.fill"
                      size={16}
                      color={Colors[colorScheme ?? "light"].texterror}
                    />
                  ) : (
                    <IconSymbol
                      name="checkmark"
                      size={16}
                      color={Colors[colorScheme ?? "light"].textsuccess}
                    />
                  )}
                  <Text
                    style={[
                      styles.message,
                      { color: Colors[colorScheme ?? "light"].text, flex: 1, textAlign: "left" },
                    ]}
                  >
                    {error}
                  </Text>
                </View>
              </View>
              <Pressable onPress={() => setNotification(false)}>
                <Text
                  style={[ 
                    styles.message,
                    { color: Colors[colorScheme ?? "light"].text },
                  ]}
                >
                  ✖
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      )}
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
  notification: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "flex-end",
    padding: 10,
    width: "95%",
    borderRadius: 5,
    left: 0,
    marginTop: 50,
    marginLeft: "auto",
    marginRight: "auto",
    zIndex: 20,
  },
  message: {
    textAlign: "center",
    paddingBottom: 10,
  },
  button: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    borderRadius: 5,
    alignSelf: "center",
    width: "auto",
  },
});
