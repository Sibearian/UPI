import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { View, TextInput, Image, Pressable } from "react-native";
import ItemsList from "./Item";

export default function List() {
  const [data, setData] = useState([]);
  const [input, setInput] = useState(null);
  const [rerender, setRerender] = useState(false);

  AsyncStorage.getItem("purpose")
    .then((item) => {
      if (item) {
        setData(JSON.parse(item)["purpose"].sort());
        return;
      }
      setData([]);
    })
    .catch(async () => {
      await AsyncStorage.clear();
    });

  useEffect(() => {
    setRerender(true);
  }, [rerender]);

  return (
    <View>
      <View style={{ flexDirection: "row" }}>
        <TextInput
          style={{ flexBasis: "auto", flexGrow: 1 }}
          onChangeText={(text) => setInput(text)}
        />
        <Pressable
          onPress={() => {
            if (data.indexOf(input) === -1) {
              AsyncStorage.setItem(
                "purpose",
                JSON.stringify({ purpose: [...data, input] })
              ).then(() => {
                console.info("added", data, input);
              });
              setRerender(true);
            }
          }}
          style={{ flexBasis: 30 }}
        >
          <Image
            style={{
              width: 20,
              height: 20,
            }}
            source={{
              uri: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADMAAAAzCAYAAAA6oTAqAAAAEXRFWHRTb2Z0d2FyZQBwbmdjcnVzaEB1SfMAAABQSURBVGje7dSxCQBACARB+2/ab8BEeQNhFi6WSYzYLYudDQYGBgYGBgYGBgYGBgYGBgZmcvDqYGBgmhivGQYGBgYGBgYGBgYGBgYGBgbmQw+P/eMrC5UTVAAAAABJRU5ErkJggg==",
            }}
          />
        </Pressable>
      </View>
      <ItemsList data={data} filter={input} />
    </View>
  );
}
