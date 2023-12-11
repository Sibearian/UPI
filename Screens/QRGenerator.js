import React, { useState } from "react";
import { Alert, Text, View } from "react-native";
import QRCode from "react-native-qrcode-svg";
import { TextInput } from "react-native-gesture-handler";
import { constructUPILink, parseURILink } from "../Helpers/UPIParser";
import { useData } from "../Context/userdata.context";

export default function QRCodeGenerator() {
	const { name, upiId } = useData();
	const [amount, setAmount] = useState(null);

	return (
		<View>
			<Text selectable={false}>Name : {name}</Text>
			<Text selectable={false}>UPI ID : {upiId}</Text>
			<QRCode
				value={constructUPILink(
					parseURILink(`upi://pay?pa=${upiId}&pn=${name}`),
					amount
				)}
				quietZone={30}
				size={300}
			/>
			<Text selectable={false}>Amount</Text>
			<TextInput
				keyboardType="decimal-pad"
				autoFocus
				inputMode="decimal"
				onChangeText={(text) => {
					if (text.search(/[A-Za-z]/) !== -1 || Number(text) < 0) {
						Alert.alert(
							"Invalid amount",
							"It should not contain any alphabet or be a negative number"
						);
						return;
					}
					setAmount(Number(text).toFixed(2));
				}}
			/>
		</View>
	);
}
