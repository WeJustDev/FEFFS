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
import QRCode from 'react-native-qrcode-svg';

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
  const base64logo = 'data:image/png;base64,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'

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
            <QRCode
              logo={{ uri: base64logo }}
              value={`Pass valide pour ${pass.lastname} ${pass.firstname}`}
              logoBackgroundColor='transparent'
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
