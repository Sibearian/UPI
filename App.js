import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "./Screens/Home";
import QRCodeGenerator from "./Screens/QRGenerator";
import { UserDataProvider } from "./Context/userdata.context";

const Stack = createStackNavigator();

const HelloWorldApp = () => {
	return (
		<NavigationContainer>
			<UserDataProvider>
				<Stack.Navigator>
					<Stack.Screen name="Scan QR" component={Home} />
					<Stack.Screen name="QR Code" component={QRCodeGenerator} />
				</Stack.Navigator>
			</UserDataProvider>
		</NavigationContainer>
	);
};
export default HelloWorldApp;
