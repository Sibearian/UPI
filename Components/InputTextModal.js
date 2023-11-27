import React, { useState } from "react";
import { Alert, Button, Modal, Text, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function InputModal({ name, message, show, setShow, verify }) {
  const [input, setInput] = useState(null);

  return (
    <Modal
      visible={show}
      // style={{
      //   margin: 20,
      //   backgroundColor: "white",
      //   borderRadius: 20,
      //   padding: 35,
      //   alignItems: "center",
      //   shadowColor: "#000",
      //   shadowOffset: {
      //     width: 0,
      //     height: 2,
      //   },
      //   shadowOpacity: 0.25,
      //   shadowRadius: 4,
      //   elevation: 5,
      // }}
    >
      <View>
        <Text>{message}</Text>
        <TextInput autoFocus onChangeText={(text) => setInput(text)} />
        <Button
          title="Save"
          onPress={() => {
            if (input === null || !verify(input)) {
              Alert.alert("Error in the input");
              return;
            }
            AsyncStorage.setItem(name, input);
            setShow(input);
          }}
        />
      </View>
    </Modal>
  );
}
