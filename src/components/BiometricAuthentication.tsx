import { Alert, View } from "react-native";
import React, { useEffect, useState } from "react";
import * as LocalAuthentication from "expo-local-authentication";
import { Text, Button } from "native-base";

export const BiometricAuthentication = () => {
  const [isBiometricCanBeSet, setIsBiometricCanBeSet] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      const isCompatible = await LocalAuthentication.hasHardwareAsync();
      const isEnrolled = await LocalAuthentication.isEnrolledAsync();

      setIsBiometricCanBeSet(isCompatible && !isEnrolled);
    })();
  });

  const onFaceId = async () => {
    try {
      // Authenticate user
      const { success } = await LocalAuthentication.authenticateAsync();

      if (success) {
        Alert.alert("All set!");
      }
    } catch (error: any) {
      Alert.alert("An error as occurred", error?.message);
    }
  };

  return (
    <View>
      <Text>Secure the app access. Enable Face ID / Touch ID</Text>
      <Button mt={5} onPress={onFaceId} disabled={isBiometricCanBeSet}>
        Sign in with Face ID
      </Button>
    </View>
  );
};
