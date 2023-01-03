import React, { useEffect, useRef, useState } from "react";
import {
  TextInput,
  Text,
  Alert,
  TouchableOpacity,
  View,
  Modal,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import { mainStyle } from "./Home";
import { COLOR_BG, COLOR_DEEPGREEN, COLOR_GREEN, COLOR_GREY } from "../Color";
import { Loginstyle } from "./Login";

export const FindingIDPW = ({ navigation, route }) => {
  const [isFinding, setIsFinding] = useState(false);
  const [findingEmail, setFindingEmail] = useState("");
  

  const findingPassword = async (email) => {
    console.log(email);
    if (email === "") {
      return Alert.alert("이메일을 입력해주세요");
    }

    try {
      await auth().sendPasswordResetEmail(email);
      {
        setIsFinding(true);
        return Alert.alert("비밀번호 재설정 메일이 전송되었습니다");
      }
    } catch (e) {
      console.log(e.code);
      switch (e.code) {
        case "auth/user-not-found":
          return Alert.alert("사용자를 찾을 수 없습니다");
        case "auth/invalid-email":
          return Alert.alert("유효하지 않은 이메일입니다");
        default:
          return Alert.alert("error!");
      }
    }
  };
  // const addCollection = firestore().collection('users');
  return (
    <SafeAreaView style={mainStyle.background}>
      <View style={{ flex: 1 }}>
        <View
          style={{
            flex: 0.3,
            paddingHorizontal: "20%",
            justifyContent: "center",
          }}
        >
          <Text style={{ fontSize: 15 }}>
            가입한 이메일 주소를 입력해주세요
          </Text>
          <View
            style={{
              marginVertical: 10,
              flexDirection: "row",
              justifyContent: "flex-start",
              alignItems: "center",
            }}
          >
            <Text style={[Loginstyle.text, { width: "10%" }]}>ID</Text>
            <TextInput
              autoCapitalize="none"
              autoCorrect={false}
              placeholder="Email"
              keyboardType="email-address"
              returnKeyType="next"
              value={findingEmail}
              onChangeText={(text) => setFindingEmail(text)}
              // onSubmitEditing={() => findingPassword(findingEmail)}
              style={{
                width: "90%",
                borderRadius: 100,
                paddingHorizontal: "5%",
                paddingVertical: "2%",
              }}
            ></TextInput>
          </View>
        </View>
        <TouchableOpacity
          style={[Loginstyle.okaybutton, { paddingVertical: 10 }]}
          onPress={() => findingPassword(findingEmail)}
        >
          <Text style={[Loginstyle.btnText, { fontWeight: "600" }]}>전송</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            Loginstyle.okaybutton,
            {
              paddingVertical: 10,
              marginVertical: 20,
              backgroundColor:
                isFinding === true ? COLOR_DEEPGREEN : COLOR_GREY,
            },
          ]}
          onPress={() =>
            navigation.navigate({
              name: "Login",
              params: { ID: findingEmail },
            })
          }
        >
          <Text
            style={[
              Loginstyle.btnText,
              {
                fontWeight: "600",
                color: isFinding === true ? "black" : "white",
              },
            ]}
          >
            로그인
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
