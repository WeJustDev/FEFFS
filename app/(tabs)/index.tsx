import React, { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import AsyncStorage from "@react-native-async-storage/async-storage";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import SignUpScreen from "@/components/SignUpForm";
import LogoutButton from "@/components/LogoutButton";
import DownloadProfileButton from "@/components/DownloadProfilButton";

export default function Index() {
  const colorScheme = useColorScheme();

  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [firstname, setFirstname] = useState("");
  const [psw, setPsw] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  useEffect(() => {
    const checkUser = async () => {
      const storedName = await AsyncStorage.getItem("name");
      const storedEmail = await AsyncStorage.getItem("email");
      const storedFirstname = await AsyncStorage.getItem("firstname");
      const storedPsw = await AsyncStorage.getItem("psw");
      if (storedName && storedEmail && storedFirstname && storedPsw) {
        setName(storedName);
        setEmail(storedEmail);
        setFirstname(storedFirstname);
        setPsw(storedPsw);
      }
    };
    checkUser();
  }, [isLoggedIn]);

  const handleLogout = () => {
    setIsLoggedIn(false);
    setName("");
    setEmail("");
    setFirstname("");
    setPsw("");
  };

  if (isLoggedIn) {
    return (
      <>
        <View
          style={{ marginTop: 64, marginBottom: 36, paddingHorizontal: 20 }}
        >
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
                Les actualités du festival
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
          <Text style={{ fontSize: 16, color: "#fff" }}>
            Connecté en tant que {name} !
          </Text>
          <View style={{ display: 'flex', flexDirection: 'row', gap: 10 }}>
            <LogoutButton onLogout={handleLogout} />
            <DownloadProfileButton
              name={name}
              email={email}
              onError={setError}
            />
          </View>
        </View>
      </>
    );
  }

  return <SignUpScreen onLogin={handleLogin} />;
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
