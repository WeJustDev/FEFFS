import {
  Pressable,
  Text,
  View,
  Image,
  StyleSheet,
  TextInput,
} from "react-native";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {Picker} from '@react-native-picker/picker';

type Pass = {
  number: number;
  email: string;
  birthdate: Date;
  image: string;
  lastname: string;
  firstname: string;
  _id?: string;
  __v?: number; 
};

export default function Pass() {
  const colorScheme = useColorScheme();

  const [lastname, setLastname] = useState<string>("");
  const [firstname, setFirstname] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [birthdate, setBirthdate] = useState<string>("");
  const [image, setImage] = useState<string>("");

  const [pass, setPass] = useState<Pass | null>(null);

  const [infosNeeded, setInfosNeeded] = useState<Array<string>>([
    "lastname",
    "firstname",
    "email",
    "birthdate",
    "image",
  ]);

  useEffect(() => {
    AsyncStorage.getItem("name").then((storedLastname) => {
      if (storedLastname !== null) {
        setLastname(storedLastname);
        setInfosNeeded((prevInfos) =>
          prevInfos.filter((info) => info !== "lastname")
        );
      } 
    });

    AsyncStorage.getItem("firstname").then((storedFirstname) => {
      if (storedFirstname !== null) {
        setFirstname(storedFirstname);
        setInfosNeeded((prevInfos) =>
          prevInfos.filter((info) => info !== "firstname")
        );
      }
    });

    AsyncStorage.getItem("email").then((storedEmail) => {
      if (storedEmail !== null) {
        setEmail(storedEmail);
        setInfosNeeded((prevInfos) =>
          prevInfos.filter((info) => info !== "email")
        );
      }
    });

    AsyncStorage.getItem("birthdate").then((storedBirthdate) => {
      if (storedBirthdate !== null) {
        setBirthdate(storedBirthdate);
        setInfosNeeded((prevInfos) =>
          prevInfos.filter((info) => info !== "birthdate")
        );
      }
    });

    AsyncStorage.getItem("image").then((storedImage) => {
      if (storedImage !== null) {
        setImage(storedImage);
        setInfosNeeded((prevInfos) =>
          prevInfos.filter((info) => info !== "image")
        );
      }
    });

    AsyncStorage.getItem("pass").then((storedPass) => {
      if (storedPass !== null) {
        const parsedPass = JSON.parse(storedPass);
        console.log('parsed Pass 1: ', parsedPass);
        setPass(parsedPass);
      }
    });
  }, []);

  useEffect(() => {
    if (infosNeeded.length === 0) {
      console.log("All infos are stored");
    } else {
      console.log("Infos missing: " + infosNeeded.join(", "));
    }
  }, [infosNeeded]); 

  useEffect(() => {
    if (pass) {
      console.log(pass.number);
    }
  }, [pass]);

  const handleGeneration = () => { 
    console.log("QR Code generated");
    console.log("Lastname: " + lastname);
    console.log("Firstname: " + firstname);
    console.log("Email: " + email);
    console.log("Birthdate: " + birthdate);
    console.log("Image: " + image);

    AsyncStorage.setItem("name", lastname);
    AsyncStorage.setItem("firstname", firstname);
    AsyncStorage.setItem("email", email);
    AsyncStorage.setItem("birthdate", birthdate);
    AsyncStorage.setItem("image", image);
    setInfosNeeded([]);

    const pass = fetch("https://feffs.elioooooo.fr/pass/add", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            lastname: lastname,
            firstname: firstname,
            email: email,
            birthdate: birthdate,
            image: image,
        }),
        })
        .then((response) => response.json())
        .then((data) => {
            console.log("Success:", data);
            AsyncStorage.setItem("pass", JSON.stringify(data));
            setPass(data);
        })
        .catch((error) => {
            console.error("Error:", error);
    })
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
          gap: 10,
          flexWrap: "wrap",
          maxWidth: "100%",
          padding: 20,
          paddingTop: 0,
        }}
      >
        { pass ? (
          <View style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <Text style={{ color: Colors[colorScheme ?? "light"].text }}>
              Pass n° : {pass.number}
            </Text>
            <Text style={{ color: Colors[colorScheme ?? "light"].text }}>
              Nom : {pass.lastname}
            </Text>
            <Text style={{ color: Colors[colorScheme ?? "light"].text }}>
              Prénom : {pass.firstname}
            </Text>
            <Text style={{ color: Colors[colorScheme ?? "light"].text }}>
              Email : {pass.email}
            </Text>
            <Text style={{ color: Colors[colorScheme ?? "light"].text }}>
              Date de naissance : {new Date(pass.birthdate).toDateString()}
            </Text>
            <Image
              style={{ width: 100, height: 100 }}
              source={{ uri: pass.image }}
            />
          </View>
        ) : (
          <>
            <Text style={{ color: Colors[colorScheme ?? "light"].text }}>
              Vous êtes sur le point de générer votre Pass pour le festival :
            </Text>
            {infosNeeded.includes("lastname") && (
              <>
                <TextInput
                  placeholder="Nom"
                  style={styles.input}
                  placeholderTextColor="#aaa"
                  value={lastname}
                  onChangeText={setLastname}
                />
              </>
            )}
            {infosNeeded.includes("firstname") && (
              <>
                <TextInput
                  placeholder="Prénom"
                  style={styles.input}
                  placeholderTextColor="#aaa"
                  value={firstname}
                  onChangeText={setFirstname}
                />
              </>
            )}
            {infosNeeded.includes("email") && (
              <>
                <TextInput
                  placeholder="Email"
                  style={styles.input}
                  placeholderTextColor="#aaa"
                  value={email}
                  onChangeText={setEmail}
                />
              </>
            )}
            {infosNeeded.includes("birthdate") && (
              <>
                <Text style={{ color: Colors[colorScheme ?? "light"].text }}>
                  Date de naissance
                </Text>
                <View style={{ display: "flex", flexDirection: "row", gap: 10 }}>
                  <Picker
                    selectedValue={birthdate.split("-")[2] || ""}
                    style={styles.input}
                    onValueChange={(day) => setBirthdate(`${birthdate.split("-")[0] || ""}-${birthdate.split("-")[1] || ""}-${day}`)}
                  >
                    {[...Array(31).keys()].map((day) => (
                      <Picker.Item key={day + 1} label={`${day + 1}`} value={`${day + 1}`} />
                    ))}
                  </Picker>
                  <Picker
                    selectedValue={birthdate.split("-")[1] || ""}
                    style={styles.input}
                    onValueChange={(month) => setBirthdate(`${birthdate.split("-")[0] || ""}-${month}-${birthdate.split("-")[2] || ""}`)}
                  >
                    {[...Array(12).keys()].map((month) => (
                      <Picker.Item key={month + 1} label={`${month + 1}`} value={`${month + 1}`} />
                    ))}
                  </Picker>
                  <Picker
                    selectedValue={birthdate.split("-")[0] || ""}
                    style={styles.input}
                    onValueChange={(year) => setBirthdate(`${year}-${birthdate.split("-")[1] || ""}-${birthdate.split("-")[2] || ""}`)}
                  >
                    {[...Array(100).keys()].map((year) => (
                      <Picker.Item key={year + 1920} label={`${year + 1920}`} value={`${year + 1920}`} />
                    ))}
                  </Picker>
                </View>
              </>
            )}
            {infosNeeded.includes("image") && (
              <>
                <TextInput
                  placeholder="Image de l'utilisateur"
                  style={styles.input}
                  placeholderTextColor="#aaa"
                  value={image}
                  onChangeText={setImage}
                />
              </>
            )}
            <Pressable
              style={{ backgroundColor: "red", padding: 10 }}
              onPress={handleGeneration}
            >
              <Text>Générer mon Pass</Text>
            </Pressable>
          </>
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
  input: {
    borderStyle: "solid",
    borderColor: "rgba(206, 90, 75, 0.8)",
    backgroundColor: "rgba(206, 90, 75, 0.05)",
    borderWidth: 1,
    borderRadius: 10,
    padding: 15,
    height: 70,
    fontSize: 16,
    marginBottom: 15,
    color: "#fff",
  },
});
