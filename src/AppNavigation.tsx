import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AntDesign, FontAwesome5 } from "@expo/vector-icons";
import { Icon } from "native-base";

import { SignInScreen } from "./screens/SignInScreen";
import { SignUpScreen } from "./screens/SignUpScreen";
import { ProfileScreen } from "./screens/ProfileScreen";
import { ListingScreen } from "./screens/ListingScreen";
import { ExploreScreen } from "./screens/ExploreScreen";
import { ListingDetailsScreen } from "./screens/ListingDetailsScreen";
import { ListingFormScreen } from "./screens/ListingFormScreen";

import { useFetchUser } from "./services/user.service";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const HomeTabs = () => {
  return (
    <Tab.Navigator screenOptions={{ tabBarActiveTintColor: "tomato" }}>
      <Tab.Screen
        name="Explore"
        component={ExploreScreen}
        options={{
          headerTitle: "Explore the World 🌎",
          tabBarIcon: (props) => <Icon as={FontAwesome5} name="wpexplorer" {...props} />,
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

export const AppNavigation = (): React.ReactElement => {
  const { user } = useFetchUser();

  return (
    <NavigationContainer>
      {user ? (
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeTabs} options={{ headerShown: false }} />
          <Stack.Screen name="Details" component={ListingDetailsScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Listing Form" component={ListingFormScreen} />
        </Stack.Navigator>
      ) : (
        <Stack.Navigator>
          <Stack.Screen name="SignIn" component={SignInScreen} options={{ headerTitle: "Sign In" }} />
          <Stack.Screen name="SignUp" component={SignUpScreen} options={{ headerTitle: "Sign Up Today" }} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};
