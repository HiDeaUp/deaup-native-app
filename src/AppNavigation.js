import React from "react";
import { NavigationContainer } from "@react-navigation/nativ";
import { createNativeStackNavigator } from "@react-navigation/stack";

import LoginScreen from "../screens/LoginScreen";
import RegistrationScreen from "./RegistrationScreen";

const Stack = createNativeStackNavigator();

export default function AppNavigation() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="SignUp" component={RegistrationScreen} />
        </Stack.Navigator>
        </NavigationContainer>
    )
}
