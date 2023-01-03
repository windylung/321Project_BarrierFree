import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  S,
  TouchableOpacitytyleSheet,
  StyleSheet,
} from "react-native";
import { COLOR_BG, COLOR_GREEN } from "../Color";
import '@react-native-firebase/auth';
import { firebase } from "@react-native-firebase/firestore";

import InformationInput from "./InformationInput";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Question from "./Question";
const Tab = createBottomTabNavigator();

function Home({ navigation }) {
  //오늘 답변 작성 여부 (여기서 따질 필요는 없어보임)
  const [answer, setAnswer] = useState(true);
  const getUser = async () => {
    const dbuser = firebase.firestore().collection('User_Client').get();
    (await dbuser).forEach((user) => console.log(user.data()));
  }
  useEffect(() => {
    getUser();}, [])
  
  const logout = () => {
    firebase.auth().signOut();
  }
  return (
    <View style={mainStyle.background}>
<<<<<<< HEAD
      <View style={{ flexDirection: "row", justifyContent: "center" }}>
=======
      <TouchableOpacity onPress={logout}>
        <Text>로그아웃</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate("InformationModify")}
      >
        <Text>회원정보수정</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("AddFamily")}>
        <Text>가족 추가/연결</Text>
      </TouchableOpacity>

      <View style={{ flex: 0.7 }}>
        <Image
          source={require("../MainCharacter-removebg-preview.png")}
          style={{ resizeMode: "cover", width: "100%", height: "100%" }}
        ></Image>
      </View>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          flex: 0.2,
          paddingHorizontal: "5%",
        }}
      >
>>>>>>> fc063f1 (fix. home)
        <TouchableOpacity
          style={[mainStyle.btn, mainStyle.touchable]}
          onPress={() =>
            navigation.navigate("QuestionList", { IsAnswer: { answer } })
          }
        >
          <Text style={mainStyle.btnText}>문답</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[mainStyle.btn, mainStyle.touchable]}
          onPress={() => navigation.navigate("MettingMain")}
        >
          <Text style={mainStyle.btnText}>가족회의</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[mainStyle.btn, mainStyle.touchable]}
          onPress={() => navigation.navigate("Question")}
        >
          <Text style={mainStyle.btnText}>정보제공</Text>
        </TouchableOpacity>
      </View>
<<<<<<< HEAD
        <TouchableOpacity
          style={[mainStyle.btn, mainStyle.touchable]}
          onPress={() => navigation.navigate("Login")}
        >
          <Text style={mainStyle.btnText}>로그인</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={logout}>
          <Text>로그아웃</Text>
        </TouchableOpacity>
=======
      {/* <Tab.Navigator>
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Settings" component={Question} />
      </Tab.Navigator> */}
>>>>>>> fc063f1 (fix. home)
    </View>
  );
}

export const mainStyle = StyleSheet.create({
  background: {
    padding: 30,
    backgroundColor: COLOR_BG,
    flex: 1,
  },
  btn: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: COLOR_GREEN,
    width: 100,
    borderRadius: 10,
    marginHorizontal: 10,
    marginVertical: 20,
  },
  btnText: {
    textAlign: "center",
    fontSize: 15,
  },
  touchable: {
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Home;
