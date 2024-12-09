import { Text, StyleSheet, Pressable, View, SafeAreaView, Vibration, Linking } from "react-native";
import { useState } from "react";
import Overlay from "../../components/ui/Overlay";

// import camera permissions
import { useCameraPermissions } from "expo-camera";

import { CameraView, CameraType } from "expo-camera";

export default function QrCode() {
  const [facing, setFacing] = useState<CameraType>("back");
  const [permission, requestPermission] = useCameraPermissions();
  const isPermissionGranted = permission?.granted;

  const [targetLink, setTargetLink] = useState<string | null>(null); 

  function toggleCameraFacing() {
    setFacing((current) => (current === "back" ? "front" : "back"));
  }

  function handleScan(data: any) {
    if (!targetLink){
      setTargetLink(data.data);
      Vibration.vibrate();
      console.log(data.data);
    }
  }

  return (
    <>
      {targetLink && (
        <View style={{width: "100%", padding: 10, backgroundColor: 'red', position: "absolute",}}>
          <View style={[styles.notification, { zIndex: 20 }]}>
            <View style={{display: "flex", flexDirection: "row", alignItems: "flex-start", justifyContent: "space-between", width: "100%", gap: 20}}>
              <View style={{display: "flex", alignItems: "flex-start"}}>
                <Text style={styles.message}>Scanned QR code:</Text>
                {targetLink && (
                  <Pressable onPress={() => {
                  if (targetLink.startsWith('http://') || targetLink.startsWith('https://')) {
                    Linking.openURL(targetLink);
                  }
                  }}>
                  <Text style={[styles.message, { color: targetLink.startsWith('http://') || targetLink.startsWith('https://') ? 'blue' : 'black', textDecorationLine: targetLink.startsWith('http://') || targetLink.startsWith('https://') ? 'underline' : 'none' }]}>
                    {targetLink}
                  </Text>
                  </Pressable>
                )}
              </View>
              <Pressable onPress={() => setTargetLink(null)} android_ripple={{ color: 'gray' }}>
                <Text style={styles.message}>✖</Text>
              </Pressable>
            </View>
            <Pressable onPress={() => setTargetLink(null)} android_ripple={{ color: 'gray' }}>
              <Text style={[styles.message, styles.button]}>Scan another QR Code</Text>
            </Pressable>
          </View>
        </View>
      )}
      {isPermissionGranted && (
        <SafeAreaView style={StyleSheet.absoluteFillObject}>
          <CameraView style={StyleSheet.absoluteFillObject} facing={facing}
            onBarcodeScanned={handleScan}
          />
          <Overlay />
        </SafeAreaView>
      )}
      {!isPermissionGranted && (
        <View style={styles.container}>
          <Text style={styles.message}>
            Camera permission is required to scan QR codes.
          </Text>
          <Pressable onPress={requestPermission}>
            <Text style={[styles.message, styles.button]}>Request permission</Text>
          </Pressable>
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  notification: {
    color: "gray",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "flex-end",
    padding: 10,
    backgroundColor: "white",
    width: "95%",
    borderRadius: 5,
    left: 0,
    marginTop: 50,
    marginLeft: "auto",
    marginRight: "auto",
  },
  container: {
    flex: 1,
    justifyContent: "center",
  },
  message: {
    textAlign: "center",
    paddingBottom: 10,
    color: "gray",
  },
  button: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#A1CEDC",
    borderRadius: 5,
    alignSelf: "center",
    width: "auto",
  }
});
