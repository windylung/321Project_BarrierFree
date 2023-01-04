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

import { firebase } from "@react-native-firebase/firestore";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Question from "./Question";
import { SafeArea } from "./StyleComponent";
const Tab = createBottomTabNavigator();

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

  return (
    <SafeArea>
      <View style={{ flex: 1, justifyContent: "flex-end"}}>
        <Image
          source={require("../MainCharacter-removebg-preview.png")}
          style={{ resizeMode: "cover", width: "100%", height: "90%" }}
        ></Image>
      </View>
    </SafeArea>

      // <View
      //   style={{
      //     flexDirection: "row",
      //     justifyContent: "center",
      //     flex: 0.2,
      //     paddingHorizontal: "5%",
      //   }}
      // >
      //   <TouchableOpacity
      //     style={[mainStyle.btn, mainStyle.touchable]}
      //     onPress={() =>
      //       navigation.navigate("QuestionList", { IsAnswer: { answer } })
      //     }
      //   >
      //     <Text style={mainStyle.btnText}>문답</Text>
      //   </TouchableOpacity>
      //   <TouchableOpacity
      //     style={[mainStyle.btn, mainStyle.touchable]}
      //     onPress={() => navigation.navigate("MettingMain")}
      //   >
      //     <Text style={mainStyle.btnText}>가족회의</Text>
      //   </TouchableOpacity>
      //   <TouchableOpacity
      //     style={[mainStyle.btn, mainStyle.touchable]}
      //     onPress={() => navigation.navigate("Question")}
      //   >
      //     <Text style={mainStyle.btnText}>정보제공</Text>
      //   </TouchableOpacity>
      // </View>
      // <Tab.Navigator>
      //   <Tab.Screen name="Home" component={Home} />
      //   <Tab.Screen name="Settings" component={Question} />
      // </Tab.Navigator> 
    
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
