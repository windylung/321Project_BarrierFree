import React, { useEffect, useRef, useState } from "react";
import {
  TextInput,
  Text,
  Alert,
  TouchableOpacity,
  View,
  Modal,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import { mainStyle } from "./Home";
import { COLOR_GREEN } from "../Color";

export const Login = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [isFinding, setIsFinding] = useState(false);
  const [findingEmail, setFindingEmail] = useState("");
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
      const userCredential = await auth().signInWithEmailAndPassword(
        email,
        password
      );
    } catch (e) {
      Alert.alert("아이디/비밀번호가 일치하지 않습니다");
    }
  };

  const findingPassword = async (email) => {
    console.log(email);
    if (email === "") {
      return Alert.alert("이메일을 입력해주세요");
    }

    try {
      await auth().sendPasswordResetEmail(email);
    } catch (e) {
      console.log(e.code);
      switch (e.code) {
        case "auth/user-not-found":
          return Alert.alert("user-not-found");
        case "auth/invalid-email":
          return Alert.alert("invalid-email");
        default:
          return Alert.alert("error!");
      }
    }
  };
  // const addCollection = firestore().collection('users');
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

      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity
          style={{ marginHorizontal: 10 }}
          onPress={() => navigation.navigate("SignUp")}
        >
          <Text>회원가입</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setIsFinding(true)}>
          <Text>비밀번호찾기</Text>
        </TouchableOpacity>
      </View>
      {isFinding === true ? (
        <View>
          <Text>비밀번호 재설정 메일을 받을 이메일 주소를 입력해주세요</Text>
          <TextInput
            placeholder="Email"
            returnKeyType="send"
            value={findingEmail}
            onChangeText={(text) => setFindingEmail(text)}
            onSubmitEditing={() => findingPassword(findingEmail)}
          />
        </View>
      ) : null}
    </SafeAreaView>
  );
};
