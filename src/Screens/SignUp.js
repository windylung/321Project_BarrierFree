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
import { mainStyle } from "./Home";
import { Platform } from "react-native";
import styled from "styled-components";

export const SignUp = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [seePassword, setSeePassword] = useState(false);
  const [checkPassword, setCheckPassword] = useState("");
  const passwordInput = useRef();
  const checkPasswordInput = useRef();
  const onSubmitEmailEditing = () => {
    passwordInput.current.focus();
  };
  const onSubmitPasswordEditing = () => {
    checkPasswordInput.current.focus();
  }

  const onSubmitCheckPasswordEditing = async () => {
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
      navigation.navigate("InformationInput");
    } catch (e) {
      console.log(e.code);
      switch (e.code) {
        case "auth/email-already-in-use":
          return Alert.alert("사용 중인 이메일입니다");
        case "auth/weak-password":
          Alert.alert("write a stronger password");
          setPassword("")
      }
    }
  };

  return (
    <SafeAreaView style={mainStyle.background}>
      <Text style={{ fontSize: 22, textAlign: "center" }}>회원가입</Text>
      <View style={{ flexDirection: "row" }}>
        <Text>아이디 </Text>
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
      </View>
      <View style={{flexDirection: "row"}}>
        <Text>비밀번호</Text>
        <TextInput
          secureTextEntry = {seePassword === false ? true : false}
          placeholder="Password"
          returnKeyType="next"
          value={password}
          ref={passwordInput}
          onChangeText={(text) => setPassword(text)}
          onSubmitEditing={onSubmitPasswordEditing}
        ></TextInput>
        <TouchableOpacity onPress={() => setSeePassword(!seePassword)}>
          <Text>보기</Text>
        </TouchableOpacity>
      </View>
      <View style={{flexDirection: "row"}}>
        <Text>비밀번호 확인</Text>
        <TextInput
          placeholder="Password"
          secureTextEntry
          returnKeyType="done"
          value={checkPassword}
          ref={checkPasswordInput}
          onChangeText={(text) => setCheckPassword(text)}
          onSubmitEditing={onSubmitCheckPasswordEditing}
        ></TextInput>
      </View>
      <TouchableOpacity onPress={onSubmitCheckPasswordEditing}>
        <Text>확인</Text>
      </TouchableOpacity>
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
