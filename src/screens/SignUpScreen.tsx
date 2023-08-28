import React, { useState } from "react";
import { Box, VStack, Heading, Text, Button, Pressable, Input, Icon } from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import { APP_NAME } from "@env";

import { AppLogo } from "../components/AppLogo";
import { useSignUp } from "../services/user.service";
import { SignUpUserPayload } from "../types/user.type";

export const SignUpScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);

  const signUpMutation = useSignUp();

  const onSignUp = () => {
    const formData: SignUpUserPayload = { email, password };
    signUpMutation.mutate(formData);
  };

  return (
    <Box h="100%" p={5} justifyContent="center">
      <AppLogo name={`${APP_NAME}`} />

      <VStack space={2} mb={10}>
        <Heading size="xl">Sign Up</Heading>
        <Text fontSize="lg" mt={5} bold>
          Email
        </Text>

        <Input type="text" p={4} autoCapitalize="none" value={email} onChangeText={setEmail} />

        <Text fontSize="lg" mt={5} bold>
          Password
        </Text>

        <Input
          w={{
            base: "100%",
            md: "25%",
          }}
          p={4}
          type={show ? "text" : "password"}
          InputRightElement={
            <Pressable onPress={() => setShow(!show)}>
              <Icon
                as={<MaterialIcons name={show ? "visibility" : "visibility-off"} />}
                size={5}
                mr={2}
                color="muted.400"
              />
            </Pressable>
          }
          onChangeText={setPassword}
          autoCapitalize="none"
        />
      </VStack>

      <Button
        mt={5}
        _text={{ textTransform: "uppercase" }}
        onPress={onSignUp}
        isDisabled={!email || !password}
        isLoading={signUpMutation.isLoading}
      >
        Sign Up
      </Button>
    </Box>
  );
};
