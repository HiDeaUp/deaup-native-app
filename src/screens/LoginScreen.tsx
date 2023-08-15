import React, { useState } from "react";
import {
  Box,
  VStack,
  HStack,
  Heading,
  Text,
  Button,
  Pressable,
  Input,
  Icon,
} from "native-base";
import { AntDesign } from "@expo/vector-icons";

import { useLogin } from "../services/user.service";

// TODO Rename this component to SignIn
export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const loginMutation = useLogin();

  const onLogin = () => {
    const formData = { email, password };
    loginMutation.mutate(formData);
  };

  return (
    <Box h="100%" p={5} justifyContent="center">
      {/* NativeBase's Vertical Stacks */}
      <VStack space={2} mb={20} alignSelf="center">
        <Icon
          as={AntDesign}
          name="home"
          size={12}
          color="rose.600"
          alignSelf="center"
        />
        <Heading size="3xl" mr={2} color="rose.600">
          Real Estate
        </Heading>
      </VStack>

      <VStack space={2} mb={10}>
        <Heading size="xl">Sign In</Heading>
        <Text fontSize="lg" mt={5} bold>
          Email
        </Text>

        <Input
          type="text"
          rounded="xl"
          fontSize="lg"
          p={4}
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />

        <Text fontSize="lg" mt={5} bold>
          Password
        </Text>

        <Input
          type="password"
          rounded="xl"
          fontSize="lg"
          p={4}
          value={password}
          onChangeText={setPassword}
          autoCapitalize="none"
        />
      </VStack>

      <Button
        mt={5}
        rounded="3xl"
        _text={{ fontWeight: "bold", textTransform: "capitalize" }}
        onPress={onLogin}
        isDisabled={!email || !password}
        isLoading={loginMutation.isLoading}
      >
        Login
      </Button>

      <HStack justifyContent="center" mt={5}>
        <Text fontSize="lg">Don't have an account?</Text>

        <Pressable ml={3} onPress={() => navigation.navigate("SignUp")}>
          <Text color="rose.600" fontSize="lg" bold underline>
            Sign In
          </Text>
        </Pressable>
      </HStack>
    </Box>
  );
}
