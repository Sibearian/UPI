import React, { useEffect, useState } from "react";
import { Button, Linking, Pressable, Text, TextInput, View } from "react-native";
import { useTags } from "../Context/tags.context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { constructUPILink } from "../Helpers/UPIParser";

export default function PayScreen({ route, navigation }) {
	const data = { ...route.params.data };
	const tags = useTags();
	const [amount, setAmount] = useState(data.q?.am);
	const [selectedTags, setSelectedTags] = useState({});
	const [tag, setTag] = useState("");

	function onAddSelected(val) {
		if (val.at(-1) !== ",") return false;
		if (selectedTags[tag] !== undefined) return true;

		const temp = selectedTags;
		if (tags[tag]) {
			temp[tag] = tags[tag];
		} else {
			temp[tag] = 0;
		}

		setSelectedTags(temp);
		return true;
	}

	useEffect(() => {}, [Object.keys(selectedTags)]);

	return (
		<View>
			<View>
				<Text>{data.q.pn}</Text>
			</View>
			<View>
				<Text>Amount:</Text>
				<TextInput
					placeholder={data.q.am || "0.00"}
					editable={
						!(route.params.data.q?.am !== undefined && route.params.data.q?.am !== "0.00")
					}
					onChangeText={(val) => setAmount(Number(val).toFixed(2))}
					keyboardType="number-pad"
				/>
			</View>
			<View style={{ flexDirection: "row" }}>
				<TextInput
					placeholder="Add tags"
					onChangeText={(val) => {
						if (onAddSelected(val)) {
							setTag("");
							return;
						}
						setTag(val.toLocaleLowerCase());
					}}
					value={tag}
				/>
			</View>
			<View style={{ marginTop: 10, marginBottom: 10 }}>
				<View
					style={{
						display: "flex",
						flexDirection: "row",
						flexWrap: "wrap",
					}}
				>
					{Object.keys(selectedTags).map((val) => {
						return (
							<Pressable
								style={{ marginRight: 5 }}
								onPress={() => {
									const temp = { ...selectedTags };
									delete temp[val];
									setSelectedTags(temp);
								}}
								key={val}
							>
								<Text>{val}</Text>
							</Pressable>
						);
					})}
				</View>
			</View>
			<View>
				<Button
					title="Pay"
					onPress={() => {
						Linking.openURL(constructUPILink(data, amount));
						navigation.popToTop();
					}}
				/>
				<Button
					title="reset tags"
					onPress={() => AsyncStorage.removeItem("tags")}
				/>
			</View>
		</View>
	);
}

// ----------------------------------
//				Helpers
// ----------------------------------

function indexOf(tags, tag) {
	for (let i = 0; i < tags.length; i++) {
		if (tags.tag === tag) return i;
	}
	return -1;
}
