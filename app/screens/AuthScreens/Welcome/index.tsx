import { StyleSheet, Text, View, Image, TouchableOpacity, Alert, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import Screen from "../../../components/Shared/Screen";
import { theme, typographyStyles } from "../../../constants";
import { RootStackParamList } from "../..";
import { StackScreenProps } from "@react-navigation/stack";
import Button from "../../../components/Auth/Button";
import * as LocalAuthentication from "expo-local-authentication";

export default function Welcome({
  navigation,
}: StackScreenProps<RootStackParamList, "Welcome">) {
  const [isBiometricSupported, setIsBiometricSupported] = useState(false);

  useEffect(() => {
    const getBiometricStatus = async () => {
      const biometricAvailable = await LocalAuthentication.hasHardwareAsync();
      setIsBiometricSupported(biometricAvailable);
    };
    getBiometricStatus();
  }, []);

  const handleBiometricAuth = async () => {
    const biometricAuth = await LocalAuthentication.authenticateAsync({
      promptMessage: "Login with biometric authentication",
      cancelLabel: "Cancel",
      disableDeviceFallback: true,
    });
  
    if (biometricAuth.success) {
      navigation.navigate("Login");
    } else {
      Alert.alert("Biometric authentication failed");
    }
  };
  

  return (
    <Screen>
      <View style={styles.container}>
        <Image
          style={styles.image}
          source={require("../../../../assets/insta-logo.png")}
        />
        <Text style={[{ color: "white", fontSize: 14 }, typographyStyles.md]}>
          Sign up to see awesome photos from family or friends.
        </Text>
        <View style={styles.actionContainer}>
          <Button onPress={() => navigation.navigate("Register")}>
            Sign Up
          </Button>
          <View style={styles.lineTextContainer}>
            <View style={styles.line} />
            <Text
              style={[
                { color: "#bbb", fontSize: 14, marginHorizontal: 10 },
                typographyStyles.md,
              ]}
            >
              OR
            </Text>
            <View style={styles.line} />
          </View>
          {isBiometricSupported && ( <TouchableOpacity onPress={handleBiometricAuth}>
            <Text
              style={[
                {
                  color: theme.colors.primaryBlue,
                  fontSize: 16,
                  fontWeight: "600",
                },
                typographyStyles.bold,
              ]}
            >
              Sign in
            </Text>
          </TouchableOpacity>
                    )}
{/* 
          {isBiometricSupported && (
            <Pressable onPress={handleBiometricAuth} style={styles.biometricButton}>
              <Text style={styles.buttonText}>Login</Text>
            </Pressable>
          )} */}
        </View>
      </View>
      {/* Footer */}
      <View style={styles.footerContainer}>
        <Text
          style={[
            { color: "white", fontSize: 15, textAlign: "center" },
            typographyStyles.sm,
          ]}
        >
          Note:{" "}
          <Text
            style={[typographyStyles.bold, { fontWeight: "600", fontSize: 17 }]}
          >
            This is not the real Instagram
          </Text>
        </Text>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 300,
    resizeMode: "contain",
  },
  lineTextContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 50,
    width: 400,
  },
  line: {
    height: 1,
    flex: 1,
    backgroundColor: "#333",
  },
  actionContainer: {
    marginTop: 50,
    alignItems: "center",
    gap: 20,
  },
  footerContainer: {
    position: "absolute",
    bottom: 0,
    backgroundColor: "#121212",
    width: "100%",
    height: 30,
    justifyContent: "center",
  },
  biometricButton: {
    width: 200,
    backgroundColor: "#FE7654",
    padding: 15,
    borderRadius: 7,
    marginTop: 50,
    marginLeft:50,
  },
  buttonText: {
    textAlign: "center",
    color: "white",
    fontSize: 17,
    fontWeight: "bold",
  },
});
