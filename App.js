import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Scan from "./Screens/Scan";
import Pay from "./Screens/Pay";
import QRCodeGenerator from "./Screens/QRGenerator";

const Stack = createStackNavigator();

const HelloWorldApp = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Scan QR" component={Scan} />
        <Stack.Screen name="Pay" component={Pay} options={({route}) => ({title : route.params.title})}/>
        <Stack.Screen name="QR Code" component={QRCodeGenerator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default HelloWorldApp;
