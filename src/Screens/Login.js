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
import {
  AppleButton,
  appleAuth,
} from "@invertase/react-native-apple-authentication";
import firestore from "@react-native-firebase/firestore";
import { mainStyle } from "./Home";
import { COLOR_GREEN, COLOR_GREY } from "../Color";

export const Login = ({ navigation, route }) => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const passwordInput = useRef();
  const onSubmitEmailEditing = () => {
    passwordInput.current.focus();
  };
  const onSubmitPasswordEditing = async () => {
    console.log("login");
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
        navigation.reset({routes: {name: "DrawerTabs"}})
    } catch (e) {
      console.log(e)
      Alert.alert("아이디/비밀번호가 일치하지 않습니다");
    }
  };

  useEffect(() => {
    if (route.params?.ID !== null) console.log(route.params);
    setEmail(route.params?.ID);
  }, [route.params?.ID]);

  return (
    <SafeAreaView style={mainStyle.background}>
      <View style={{ flex: 1 }}>
        <View style={{ flex: 0.3, justifyContent: "center" }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-start",
              paddingHorizontal: "20%",
              alignItems: "center",
            }}
          >
            <Text style={[Loginstyle.text, { width: "30%" }]}>ID </Text>
            <TextInput
              autoCapitalize="none"
              autoCorrect={false}
              placeholder="Email"
              keyboardType="email-address"
              returnKeyType="next"
              value={email}
              onChangeText={(text) => setEmail(text)}
              onSubmitEditing={onSubmitEmailEditing}
              style={{ width: "70%" }}
            ></TextInput>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-start",
              paddingHorizontal: "20%",
            }}
          >
            <Text style={[Loginstyle.text, { width: "30%" }]}>Password</Text>
            <TextInput
              placeholder="Password"
              secureTextEntry
              returnKeyType="done"
              value={password}
              ref={passwordInput}
              onChangeText={(text) => setPassword(text)}
              onSubmitEditing={() => onSubmitPasswordEditing()}
              style={{ width: "70%" }}
            ></TextInput>
          </View>
        </View>
        <TouchableOpacity
          style={[Loginstyle.okaybutton, { paddingVertical: 10 }]}
          onPress={() => {
            onSubmitPasswordEditing();
          }}
        >
          <Text style={[Loginstyle.btnText, { fontWeight: "600" }]}>완료</Text>
        </TouchableOpacity>

        <View
          style={{
            marginHorizontal: 50,
            marginTop: 20,
            flexDirection: "row",
            justifyContent: "space-evenly",
          }}
        >
          <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
            <Text style={Loginstyle.text}>회원가입</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate("SocialLogin")}>
            <Text style={Loginstyle.text}>소셜연동</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate("FindingIDPW")}>
            <Text style={Loginstyle.text}>비밀번호</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export const Loginstyle = StyleSheet.create({
  text: {
    marginRight: 20,
    marginVertical: 3,
    fontSize: 16,
  },
  rowalign: {
    flex: 0.4,
    paddingVertical: 50,
    flexDirection: "row",
    marginBottom: 20,
  },
  rightalign: {
    flex: 0.75,
    alignItems: "flex-end",
  },
  centeralign: {
    justifyContent: "center",
  },
  okaybutton: {
    paddingVertical: 8,
    backgroundColor: COLOR_GREEN,
    marginHorizontal: 50,
    borderRadius: 20,
    justifyContent: "center",
  },
  btnText: {
    textAlign: "center",
    fontSize: 16,
  },
});
