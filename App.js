import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StyleSheet } from "react-native";
import QRCodeGenerator from "./Screens/qrcode";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

const Stack = createStackNavigator();
const Tabs = createMaterialTopTabNavigator();

function PayFlow() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Scan" component={Scan} />
      <Stack.Screen name="Pay" component={Pay} />
    </Stack.Navigator>
  );
}

function ScanFlow() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="QR Code" component={QRCodeGenerator} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Tabs.Navigator tabBarPosition="bottom" initialRouteName="Payment">
        {/* <Tabs.Screen name="QR" component={ScanFlow} /> */}
        {/* <Tabs.Screen name="Payment" component={PayFlow} /> */}
      </Tabs.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
