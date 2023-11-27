import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState } from "react";
import { Pressable, View, Text, FlatList, Button } from "react-native";

export function Item({ purpose, search, handlePress }) {
  const canShow = purpose?.toLowerCase()?.search(search?.toLowerCase()) !== -1;
  return canShow ? (
    <Pressable onPress={() => handlePress(purpose)}>
      <View>
        <Text>{purpose}</Text>
      </View>
    </Pressable>
  ) : null;
}

export default function ItemsList({ data, filter, setTags }) {
  const [selected, setSelected] = useState([]);

  function onPressAdd(purpose) {
    if (selected?.indexOf(purpose) !== -1) return;
    setSelected(selected.concat(purpose));
    // setTags(selected);
  }

  return (
    data && (
      <View style={{ marginBottom: 400 }}>
        {selected.length > 0 && (
          <View>
            <Text>Selected</Text>
            <FlatList
              horizontal
              ItemSeparatorComponent={<Text> | </Text>}
              data={selected}
              keyExtractor={(_, idx) => idx}
              renderItem={({ item }) => (
                <Pressable
                  onPress={() => {
                    let idx = selected.indexOf(item);
                    if (idx === -1) return;
                    let temp = selected.filter((val) => val !== item);
                    setSelected(temp);
                  }}
                >
                  <Text>{item}</Text>
                </Pressable>
              )}
            />
          </View>
        )}
        {filter !== "" && (
          <View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <View style={{ flex: 1, height: 1, backgroundColor: "black" }} />
              <View>
                <Text style={{ width: 50, textAlign: "center" }}>Tags</Text>
              </View>
              <View style={{ flex: 1, height: 1, backgroundColor: "black" }} />
            </View>

            {data.length > 0 ? (
              <FlatList
                data={data}
                keyExtractor={(_, idx) => idx}
                ItemSeparatorComponent={
                  <View
                    style={{ flex: 1, width: 1, backgroundColor: "grey" }}
                  />
                }
                renderItem={({ item }) => (
                  <Item
                    key={item}
                    purpose={item}
                    search={filter}
                    handlePress={onPressAdd}
                  />
                )}
              />
            ) : null}
          </View>
        )}
        <Button
          title="clear"
          onPress={() => {
            AsyncStorage.removeItem("purpose");
          }}
        />
      </View>
    )
  );
}
