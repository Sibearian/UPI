import React, { useEffect, useState } from "react";
import { Alert, Button, View } from "react-native";
import Scanner from "../Components/Scanner";
import { parseURILink } from "../Helpers/UPIParser";
import { useIsFocused } from "@react-navigation/native";

const upiRegex = new RegExp(/upi:\/\/pay?.*/);

export default function Home({ navigation }) {
	const [scanned, setScanned] = useState(null);
	const isFocused = useIsFocused();

	useEffect(() => {
		setScanned(false);
	}, [isFocused]);

	const handleQRScan = ({ data }) => {
		const parsedData = parseURILink(data);
		if (!data || !upiRegex.test(data) || parsedData === false) {
			Alert.alert("Invalid QR Code");
			return;
		}
		setScanned(true);
		navigation.navigate("Pay", {
			data: parsedData,
			title: parsedData.q?.pa,
		});
	};

	return (
		<View>
			{isFocused ? (
				<Scanner handleQRScan={scanned ? undefined : handleQRScan} />
			) : null}
			<Button
				title="Create QR Code"
				onPress={() => navigation.navigate("QR Code")}
			/>
		</View>
	);
}
