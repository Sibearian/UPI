import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useContext, useEffect, useState } from "react";
import { View, Text } from "react-native";
import { SetData } from "../Screens/SetData";

const userContext = createContext();

export function UserDataProvider({ children }) {
	const [URL, setURL] = useState(null);
	const [token, setToken] = useState(null);
	const [name, setName] = useState(null);
	const [upiId, setUpiId] = useState(null);
	const [refetch, setRefetch] = useState(false);
	const [isLoding, setIsLoading] = useState(true);

	useEffect(() => {
		(async function () {
			try {
				setIsLoading(true);
				setURL(await AsyncStorage.getItem("db-url"));
				setToken(await AsyncStorage.getItem("db-token"));
				setName(await AsyncStorage.getItem("user-name"));
				setUpiId(await AsyncStorage.getItem("user-upiId"));
				setIsLoading(false);
			} catch (err) {
				console.error(err);
			}
		})();
		setRefetch(false);
	}, [refetch]);

	if (isLoding) {
		return (
			<View>
				<Text>Is Loading</Text>
			</View>
		);
	}

	if (URL && token && name && upiId) {
		return (
			<userContext.Provider value={{ URL, token, name, upiId }}>
				{children}
			</userContext.Provider>
		);
	} else {
		return (
			<SetData
				data={{ URL, token, name, upiId }}
				refetch={() => setRefetch(true)}
			/>
		);
	}
}

export const useData = () => useContext(userContext);
