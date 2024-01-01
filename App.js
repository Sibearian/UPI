import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "./Screens/Home";
import QRCodeGenerator from "./Screens/QRGenerator";
import { UserDataProvider } from "./Context/userdata.context";
import PayScreen from "./Screens/Pay";
import { TagProvider } from "./Context/tags.context";

const Stack = createStackNavigator();

const App = () => {
	return (
		<NavigationContainer>
			<UserDataProvider>
				<TagProvider>
					<Stack.Navigator>
						<Stack.Screen name="Scan QR" component={Home} />
						<Stack.Screen
							name="QR Code"
							component={QRCodeGenerator}
						/>
						<Stack.Screen
							name="Pay"
							component={PayScreen}
							options={({ route }) => ({
								title: route.params.title,
							})}
						/>
					</Stack.Navigator>
				</TagProvider>
			</UserDataProvider>
		</NavigationContainer>
	);
};
export default App;
