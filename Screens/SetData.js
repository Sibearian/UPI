import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState } from "react";
import { Alert, Button, View, Text, TextInput } from "react-native";

const upiRegex = new RegExp("^[0-9A-Za-z.-]{2,256}@[A-Za-z]{2,64}$");

function verifyName(name) {
	if (!name || name.length < 3) {
		return false;
	}
	return true;
}

function verifyUpiId(name) {
	if (!name || !upiRegex.test(name)) {
		return false;
	}
	return true;
}

export function SetData({ data, refetch }) {
	const [URL, setURL] = useState(null);
	const [token, setToken] = useState(null);
	const [name, setName] = useState(null);
	const [upiId, setUpiId] = useState(null);

	async function save() {
		if (!verifyName(name)) {
			Alert.alert(
				"Invalid name",
				"Name should be more than 3 characters"
			);
			return;
		}
		if (!verifyUpiId(upiId)) {
			Alert.alert("Invalid UPI ID");
			return;
		}

		try {
			await AsyncStorage.setItem("db-url", URL);
			await AsyncStorage.setItem("db-token", token);
			await AsyncStorage.setItem("user-name", name);
			await AsyncStorage.setItem("user-upiId", upiId);
			refetch();
		} catch (err) {
			Alert.alert("Error in database", "Clear all memory");
		}
	}

	return (
		<View style={{ marginTop: 50 }}>
			<View>
				<Text>Your name:</Text>
				<TextInput
					style={{
						borderColor: "#000",
						borderWidth: 0.5,
						borderRadius: 5,
					}}
					onChangeText={(val) => setName(val)}
					placeholder={data.name}
					textContentType="name"
				/>
			</View>
			<View>
				<Text>Your UPI ID:</Text>
				<TextInput
					style={{
						borderColor: "#000",
						borderWidth: 0.5,
						borderRadius: 5,
					}}
					onChangeText={(val) => setUpiId(val)}
					placeholder={data.upiId}
				/>
			</View>
			<View>
				<Text>Turso database url:</Text>
				<TextInput
					style={{
						borderColor: "#000",
						borderWidth: 0.5,
						borderRadius: 5,
					}}
					onChangeText={(val) => setURL(val)}
					placeholder={data.URL}
					textContentType="URL"
				/>
			</View>

			<View>
				<Text>Database Token:</Text>
				<TextInput
					style={{
						borderColor: "#000",
						borderWidth: 0.5,
						borderRadius: 5,
					}}
					onChangeText={(val) => setToken(val)}
					placeholder={data.token}
					textContentType="password"
				/>
			</View>
			<View style={{marginTop: 20}}>
				<Button title="Save" onPress={() => save()} />
			</View>
		</View>
	);
}
