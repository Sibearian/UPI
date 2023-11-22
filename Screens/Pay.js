import React, { useEffect, useState } from "react";
import { Button, Linking, Text, TextInput, View } from "react-native";
import { constructUPILink } from "../Helpers/UPIParser";

export default function Pay({ route, navigation }) {
  const upi = route.params.data;
  const [amount, setAmount] = useState(0);

  useEffect(() => {}, [upi.url]);

  function openUPIApp() {
    Linking.openURL(constructUPILink(upi, amount)).catch((e) =>
      console.error(e)
    );
  }

  return (
    <View>
      <Text>{upi?.q?.pn}</Text>
      <Text>{upi?.q?.pa}</Text>

      <TextInput
        placeholder={upi?.q?.am}
        editable={!upi?.q?.am}
        keyboardType="numeric"
        inputMode="decimal"
        onChangeText={(text) => setAmount(Number(text).toFixed(2))}
        autoFocus
        defaultValue={upi?.q?.am ? upi?.q?.am : null}
      />

      <TextInput
        editable={!upi?.q?.tn}
        inputMode="text"
        onChangeText={(t) => (upi.q.tn = t)}
        placeholder={upi?.q?.tn ? upi?.q?.tn : "Note"}
      />

      <Button title="Pay" onPress={openUPIApp} />

      <Button
        title="Go Back"
        onPress={() => {
          navigation.pop();
        }}
      />
    </View>
  );
}
