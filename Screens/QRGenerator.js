import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert, Text, View } from "react-native";
import InputModal from "../Components/InputTextModal";
import QRCode from "react-native-qrcode-svg";
import { TextInput } from "react-native-gesture-handler";
import { constructUPILink, parseURILink } from "../Helpers/UPIParser";

const upiRegex = new RegExp("^[0-9A-Za-z.-]{2,256}@[A-Za-z]{2,64}$");

/**
 *
 * @param {string} name
 * @returns {boolean}
 */
function verifyName(name) {
  if (!name || name.length < 3) {
    return false;
  }
  return true;
}

/**
 *
 * @param {string} name
 * @returns {boolean}
 */
function verifyUpiId(name) {
  if (!name || !upiRegex.test(name)) {
    return false;
  }
  return true;
}

export default function QRCodeGenerator() {
  const [name, setName] = useState(null);
  const [upiId, setUpiId] = useState(null);
  const [amount, setAmount] = useState(null);
  const [error, setError] = useState(0);

  useEffect(() => {
    // Remove after debugging
    // AsyncStorage.clear();

    AsyncStorage.getItem("name")
      .then((data) => {
        setName(data);
      })
      .catch(() => {
        Alert.alert("database has been corrupted");
        setError(1);
      });

    AsyncStorage.getItem("upiId")
      .then((data) => {
        setUpiId(data);
      })
      .catch(() => {
        Alert.alert("database has been corrupted");
        setError(1);
      });
  }, []);

  if (error === 1) {
    return null;
  }

  return (
    <View>
      {name === null && (
        <InputModal
          name={"name"}
          message={"Please enter your name :"}
          show={!name}
          setShow={setName}
          verify={verifyName}
        />
      )}
      {upiId === null && (
        <InputModal
          name={"upiId"}
          message={"Please enter your UPI ID :"}
          show={!upiId}
          setShow={setUpiId}
          verify={verifyUpiId}
        />
      )}
      <QRCode
        value={constructUPILink(
          parseURILink(`upi://pay?pa=${upiId}&pn=${name}`),
          amount
        )}
        quietZone={30}
        size={300}
      />
      <Text>Amount</Text>
      <TextInput
        keyboardType="decimal-pad"
        autoFocus
        inputMode="decimal"
        onChangeText={(text) => {
          if (text.search(/[A-Za-z]/) !== -1 || Number(text) < 0) {
            Alert.alert("Invalid amount");
            return;
          }
          setAmount(Number(text).toFixed(2));
        }}
      />
      <Text>Name : {name}</Text>
      <Text>UPI ID : {upiId}</Text>
    </View>
  );
}
