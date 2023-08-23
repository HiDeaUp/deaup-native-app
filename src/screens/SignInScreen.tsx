import React, { useState } from "react";
import { Box, VStack, HStack, Heading, Text, Button, Pressable, Input } from "native-base";

import { AppLogo } from "../components/AppLogo";
import { useSignIn } from "../services/user.service";
import { ScreenName } from "../types/navigation.constant";

export const SignInScreen = ({ navigation }: any) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signInMutation = useSignIn();

  const onSignIn = () => {
    const formData = { email, password };
    signInMutation.mutate(formData);
  };

  return (
    <Box h="100%" p={5} justifyContent="center">
      <AppLogo name="SecretState" />

      <VStack space={2} mb={10}>
        <Heading size="xl">Sign In</Heading>
        <Text fontSize="lg" mt={5} bold>
          Email
        </Text>

        <Input type="text" p={4} autoCapitalize="none" value={email} onChangeText={setEmail} />

        <Text fontSize="lg" mt={5} bold>
          Password
        </Text>

        <Input type="password" p={4} value={password} onChangeText={setPassword} autoCapitalize="none" />
      </VStack>

      <Button
        mt={5}
        _text={{ textTransform: "uppercase" }}
        onPress={onSignIn}
        isDisabled={!email || !password}
        isLoading={signInMutation.isLoading}
      >
        Sign In
      </Button>

      <HStack justifyContent="center" mt={5}>
        <Text fontSize="lg">Don't have an account?</Text>

        <Pressable ml={3} onPress={() => navigation.navigate(ScreenName.SIGN_UP)}>
          <Text color="rose.600" fontSize="lg" bold underline>
            Sign Up Today
          </Text>
        </Pressable>
      </HStack>
    </Box>
  );
};
