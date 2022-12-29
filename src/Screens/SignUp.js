import React, { useEffect, useRef, useState } from "react";
import {
  TextInput,
  Text,
  Alert,
  Pressable,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import { mainStyle } from "./Home";
import { Platform } from "react-native";

export const SignUp = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const passwordInput = useRef();
  const onSubmitEmailEditing = () => {
    passwordInput.current.focus();
  };
  const onSubmitPasswordEditing = async () => {
    if (email === "" || password === "") {
      return Alert.alert("아이디와 비밀번호를 입력해주세요");
    }
    if (loading) {
      return;
    }
    try {
      const userCredential = await auth().createUserWithEmailAndPassword(
        email,
        password
      );
      console.log("Im here");
      console.log(userCredential);
      {
        navigation.navigate("InformationInput");
      }
    } catch (e) {
      console.log(e.code);
      switch (e.code) {
        case "auth/weak-password":
          Alert.alert("write a stronger password");
      }
    }
  };

  return (
    <SafeAreaView style={mainStyle.background}>
      <TextInput
        autoCapitalize="none"
        autoCorrect={false}
        placeholder="Email"
        keyboardType="email-address"
        returnKeyType="next"
        value={email}
        onChangeText={(text) => setEmail(text)}
        onSubmitEditing={onSubmitEmailEditing}
      ></TextInput>
      <TextInput
        placeholder="Password"
        secureTextEntry
        returnKeyType="done"
        value={password}
        ref={passwordInput}
        onChangeText={(text) => setPassword(text)}
        onSubmitEditing={onSubmitPasswordEditing}
      ></TextInput>
      {/* <Pressable onPress={navigation.navigate("Login")}>
        <Text></Text>
      </Pressable> */}

      {/* 소셜 로그인  */}
      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity>
          <Image
            source={
              Platform.OS === "ios"
                ? require("../Image/btn_google_light_normal_ios.png")
                : require("../Image/btn_google_light_normal_hdpi.9.png")
            }
          ></Image>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
