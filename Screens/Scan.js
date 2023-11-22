import React, { useEffect, useState } from "react";
import { Button, View } from "react-native";
import Scanner from "../Components/Scanner";
import { parseURILink } from "../Helpers/UPIParser";
import { useIsFocused } from "@react-navigation/native";

export default function Scan({ navigation }) {
  const [scanned, setScanned] = useState(null);
  const isFocused = useIsFocused();

  useEffect(() => {
    setScanned(false);
  }, [isFocused]);

  const handleQRScan = ({ data }) => {
    setScanned(true);
    navigation.push("Pay", { title: "Pay", data: parseURILink(data) });
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
