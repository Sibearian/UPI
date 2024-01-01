import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useContext, useEffect, useState } from "react";
import { Alert } from "react-native";

const tagsContext = createContext();

function setDeafultTags(cb) {
	AsyncStorage.setItem(
		"tags",
		JSON.stringify({
			tags:{
				"transport": 1,
				"food": 0,
				"shoping": 0,
				"vehical": 0,
				"misc": 0,
			},
		})
	).then(cb);
}

export function TagProvider({ children }) {
	const [tags, setTags] = useState([]);
	const [reload, setReload] = useState(false);

	useEffect(() => {
		AsyncStorage.getItem("tags")
			.then((val) => {
				if (val == null) {
					setDeafultTags(() => setReload(true));
					return;
				}

				let temp = JSON.parse(val).tags;
				setTags(temp);
			})
			.catch((err) =>
				Alert.alert(
					"Database Error",
					"Clear the all the memory of the app.\nError:" + err
				)
			);
		setReload(false);
	}, [reload]);

	return (
		<tagsContext.Provider value={tags}>
			{children}
		</tagsContext.Provider>
	);
}

export const useTags = () => useContext(tagsContext);
