import "react-native-gesture-handler";
import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./src/Screens/Home";
import Question from "./src/Screens/Question";
import AnswerQuestion from "./src/Screens/AnswerQuestion";
import QuestionList from "./src/Screens/QuestionList";
import AnswerList from "./src/Screens/AnswerList";
import MettingMain from "./src/Screens/MettingMain";
import { Login } from "./src/Screens/Login";
import InformationInput from "./src/Screens/InformationInput";
import { SignUp } from "./src/Screens/SignUp";
import auth from "@react-native-firebase/auth";
import InformationModify from "./src/Screens/InformationModify";
import { AddFamily } from "./src/Screens/AddFamily";
import { COLOR_DEEPGREEN, COLOR_GREEN } from "./src/Color";

import { FindingIDPW } from "./src/Screens/FindingIDPW";
import { SocialLogin } from "./src/Screens/SocialLogin";
import { StyleSheet } from "react-native";
import DrawerTabs from "./src/Screens/DrawerTabs";

const Stack = createNativeStackNavigator();


export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    console.log(auth().currentUser);
    auth().onAuthStateChanged((user) => {
      if (user) {
        console.log(user);
        console.log("here");
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
      console.log(isLoggedIn);
    });
  }, []);
  return (
    <NavigationContainer>
      {
        <Stack.Navigator screenOptions={{ headerShown: true }}>
          {isLoggedIn === false ? (
            <Stack.Screen
              name="Login"
              component={Login}
              options={AppStyle.Login}
            />
          ) : (
            <Stack.Screen
              name="DrawerTabs"
              component={DrawerTabs}
              options={{ headerShown: false }}
            />
          )}
          <Stack.Screen name="SignUp" component={SignUp} />
          <Stack.Screen name="Question" component={Question} />
          <Stack.Screen name="AnswerQuestion" component={AnswerQuestion} />
          <Stack.Screen name="QuestionList" component={QuestionList} />
          <Stack.Screen name="AnswerList" component={AnswerList} />
          <Stack.Screen name="MettingMain" component={MettingMain} />
          <Stack.Screen
            name="InformationInput"
            component={InformationInput}
            options={AppStyle.InformationInput}
          />
          <Stack.Screen
            name="InformationModify"
            component={InformationModify}
            options={AppStyle.InformationModify}
          />
          <Stack.Screen
            name="AddFamily"
            component={AddFamily}
            options={{
              title: "가족 구성원 연결",
            }}
          />
          <Stack.Screen
            name="FindingIDPW"
            component={FindingIDPW}
            options={AppStyle.FindingIDPW}
          />
          <Stack.Screen
            name="SocialLogin"
            component={SocialLogin}
            options={AppStyle.SocialLogin}
          />
        </Stack.Navigator>
      }
    </NavigationContainer>
  );
}

const header = {
  headerStyle: {
    backgroundColor: COLOR_DEEPGREEN,
  },
  headerTintColor: "#fff",
  headerTitleStyle: {
    fontWeight: "bold",
  },
};
const AppStyle = StyleSheet.create({
  Login: {
    title: "로그인",
    ...header,
  },
  FindingIDPW: {
    title: "비밀번호 찾기",
    ...header,
  },
  SocialLogin: {
    title: "소셜 연동",
    ...header,
  },
  InformationModify: {
    title: "정보 수정",
    ...header,
  },
  InformationInput: {
    title: "정보 입력",
    ...header,
  },
});
