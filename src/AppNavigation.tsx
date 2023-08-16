import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { SignInScreen } from "./screens/SignInScreen";
import { SignUpScreen } from "./screens/SignUpScreen";
import { ProfileScreen } from "./screens/ProfileScreen";

import { useFetchUser } from "./services/user.service";

const Stack = createNativeStackNavigator();

export function AppNavigation() {
  const { data: user } = useFetchUser();

  return (
    <NavigationContainer>
      {user ? (
        <Stack.Navigator>
          <Stack.Screen name="Profile" component={ProfileScreen} />
        </Stack.Navigator>
      ) : (
        <Stack.Navigator>
          <Stack.Screen
            name="SignIn"
            component={SignInScreen}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="SignUp"
            component={SignUpScreen}
            options={{ headerTitle: "" }}
          />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}
