import React, { useEffect, useRef, useState } from "react";
import {
  TextInput,
  Text,
  Alert,
  TouchableOpacity,
  View,
  Modal,
  StyleSheet
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import { mainStyle } from "./Home";
import { COLOR_GREEN } from "../Color";
import { Loginstyle } from "./Login";

export const FindingIDPW = ({ navigation }) => {
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

        <View style={{flex : 0.4}}>
          <Text style={{ fontSize: 24, textAlign: "center",   marginTop: 100}}>비밀번호 찾기</Text>
        </View>

          <View style={{ flexDirection: "row" , justifyContent: "center", flex : 0.5 }}>
              <Text style={{marginRight : 16,
    marginVertical : 3, 
    fontSize : 16,}}>아이디(이메일) 인증 : </Text>

              <View>
                <TextInput
                  placeholder="Email"
                  returnKeyType="send"
                  value={findingEmail}
                  onChangeText={(text) => setFindingEmail(text)}
                  onSubmitEditing={() => findingPassword(findingEmail)}
                />

                <TouchableOpacity style={{alignItems: 'flex-end', marginTop : 5}}>
                  <Text style={{fontSize : 10 }}>이메일 인증하기</Text>
                </TouchableOpacity>
              </View>

          </View>

        
      <View style={{flex : 0.2, }}>
        <TouchableOpacity
            style={Loginstyle.okaybutton}>
            <Text style={Loginstyle.btnText}>다음</Text>
        </TouchableOpacity>
      </View>
      

    </SafeAreaView>
  );
};

