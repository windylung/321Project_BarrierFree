import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  S,
  TouchableOpacitytyleSheet,
  StyleSheet,
  Image,
} from "react-native";
import { COLOR_BG, COLOR_GREEN } from "../Color";
import "@react-native-firebase/auth";
import { firebase } from "@react-native-firebase/firestore";
import InformationInput from "./InformationInput";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";


function Home({ navigation }) {
  //오늘 답변 작성 여부 (여기서 따질 필요는 없어보임)
  const [answer, setAnswer] = useState(true);
  const getUser = async () => {
    const dbuser = firebase.firestore().collection("User_Client").get();
    (await dbuser).forEach((user) => console.log(user.data()));
  };
  useEffect(() => {
    getUser();
  }, []);

  const logout = () => {
    firebase.auth().signOut();
  };
  return (
    <View style={mainStyle.background}>
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

<<<<<<< HEAD
      <View style={{ flex: 0.7 }}>
        <Image
          source={require("../MainCharacter-removebg-preview.png")}
          style={{ resizeMode: "cover", width: "100%", height: "100%" }}
        ></Image>
      </View>
=======




        <View style = {{flex : 0.8,}}>
          <Image
              source={require("../MainCharacter.png")}
              style={{ flex : 1.3 }}
            ></Image>
            
        </View>
>>>>>>> 0bf174ef0383b58a5f339531cf2ba451164807a7

      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          flex: 0.2,
          paddingHorizontal: "5%",
        }}
      >
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
      
    </View>
  );
}

export const mainStyle = StyleSheet.create({
  background: {
    padding: 0,
    backgroundColor: COLOR_BG,
    flex: 1,
  },
  btn: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: COLOR_GREEN,
    width: "30%",
    height: "60%",
    borderRadius: 10,
    marginHorizontal: 10,
    marginVertical: 20,
  },
  btnText: {
    textAlign: "center",
    fontSize: 15,
  },
  touchable: {
    justifyContent: "center",
  },
  background_img1: {
    backgroundColor: COLOR_GREEN,
    borderTopLeftRadius: 200,
    borderTopRightRadius: 200,
    flex: 1,
  },
});

export default Home;
