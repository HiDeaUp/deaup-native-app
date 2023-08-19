import React, { useState } from "react";
import { Box, VStack, Heading, Text, Button, Input } from "native-base";

import { AppLogo } from "../components/AppLogo";
import { useSignUp } from "../services/user.service";

export const SignUpScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signUpMutation = useSignUp();

  const onSignUp = () => {
    const formData = { email, password };
    signUpMutation.mutate(formData);
  };

  return (
    <Box h="100%" p={5} justifyContent="center">
      <AppLogo name="SecretState" />

      <VStack space={2} mb={10}>
        <Heading size="xl">Sign Up</Heading>
        <Text fontSize="lg" mt={5} bold>
          Email
        </Text>

        <Input
          type="text"
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
          p={4}
          value={password}
          onChangeText={setPassword}
          autoCapitalize="none"
        />
      </VStack>

      <Button
        mt={5}
        _text={{ fontWeight: "bold", textTransform: "uppercase" }}
        onPress={onSignUp}
        isDisabled={!email || !password}
        isLoading={signUpMutation.isLoading}
      >
        Sign Up
      </Button>
    </Box>
  );
};
