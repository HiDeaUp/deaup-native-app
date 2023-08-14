import React from "react";
import { View, Text, Button } from "react-native";

// TODO Rename this component to SignIn
export default function LoginScreen({ navigation }) {
    return (
        <View>
           <Text>Login Screen</Text> 
            <Button 
                onPress={() => navigation.push("SignUp")} 
                title="Go to Registration" 
            />
        </View>
    )
}
