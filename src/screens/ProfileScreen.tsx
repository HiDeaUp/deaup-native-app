import React from "react";
import { Box, Heading, Button, Avatar } from "native-base";

import { useFetchUser, useSignOut } from "../services/user.service";

export const ProfileScreen = () => {
  const { data } = useFetchUser();
  const signOutMutation = useSignOut();

  const onSignOut = async () => {
    signOutMutation.mutate();
  };

  const { email } = data;

  return (
    <Box h="100%" p={5}>
      <Avatar bg="black" alignSelf="center" color="amber.500" size="xl" mb={5}>
        {email.slice(0, 2).toUpperCase()}
      </Avatar>

      <Heading size="xl" mb={5} alignSelf="center">
        {email}
      </Heading>

      <Box position="absolute" bottom={10} left={0} right={0}>
        <Button
          m={5}
          rounded="3xl"
          _text={{ fontWeight: "bold" }}
          onPress={onSignOut}
        >
          Sign Out
        </Button>
      </Box>
    </Box>
  );
};
