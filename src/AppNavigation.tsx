import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AntDesign } from "@expo/vector-icons";

import { SignInScreen } from "./screens/SignInScreen";
import { SignUpScreen } from "./screens/SignUpScreen";
import { ProfileScreen } from "./screens/ProfileScreen";
import { ListingScreen } from "./screens/ListingScreen";
import { ExploreScreen } from "./screens/ExploreScreen";

import { useFetchUser } from "./services/user.service";
import { Icon } from "native-base";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const HomeTabs = () => {
  return (
    <Tab.Navigator screenOptions={{ tabBarActiveTintColor: "tomato" }}>
      <Tab.Screen
        name="Explore"
        component={ExploreScreen}
        options={{
          tabBarIcon: (props) => (
            <Icon as={AntDesign} name="search1" {...props} />
          ),
        }}
      />
      <Tab.Screen
        name="Listing"
        component={ListingScreen}
        options={{
          tabBarIcon: (props) => <Icon as={AntDesign} name="home" {...props} />,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerTitle: "My Profile",
          tabBarIcon: (props) => <Icon as={AntDesign} name="user" {...props} />,
        }}
      />
    </Tab.Navigator>
  );
};

export function AppNavigation() {
  const { data: user } = useFetchUser();

  return (
    <NavigationContainer>
      {user ? (
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={HomeTabs}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      ) : (
        <Stack.Navigator>
          <Stack.Screen
            name="SignIn"
            component={SignInScreen}
            options={{ headerTitle: "Sign In" }}
          />

          <Stack.Screen
            name="SignUp"
            component={SignUpScreen}
            options={{ headerTitle: "Sign Up Today" }}
          />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}
