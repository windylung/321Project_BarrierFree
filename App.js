import "react-native-gesture-handler";
import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./src/Screens/Home";
import Question from "./src/Screens/Question";
import QuestionList from "./src/Screens/QuestionList";

import MettingMain from "./src/Screens/MeetingMain";
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
import { AnswerList2 } from "./src/Screens/AnswerList2";
import { AnswerQuestion } from "./src/Screens/AnswerQuestion";
import AnswerQuestionToday from "./src/Screens/AnswerQuestionToday";
import AnswerListToday from "./src/Screens/AnswerListToday";
import { MeetingAgenda } from "./src/Screens/MeetingAgenda";
import AccountWithdrawal from "./src/Screens/AccountWithdrawal";
import { MeetingFamilyConnect } from "./src/Screens/MeetingFamilyConnect";
import { MettingDuring } from "./src/Screens/MettingDuring";
import MeetingHistory from "./src/Screens/MeetingHistory";
import { MeetingAgendaSelect } from "./src/Screens/MeetingAgendaSelect";

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
          <Stack.Screen
            name="FirstLogin"
            component={Login}
            options={AppStyle.Login}
          />
          <Stack.Screen name="SignUp" component={SignUp} />
          <Stack.Screen name="Question" component={Question} />
          <Stack.Screen name="AnswerQuestion" component={AnswerQuestion} />
          <Stack.Screen name="QuestionList" component={QuestionList} />
          <Stack.Screen name="AnswerListToday" component={AnswerListToday} />
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
            options={AppStyle.AddFamily}
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
          <Stack.Screen
            name="AnswerList2"
            component={AnswerList2}
            options={AppStyle.AnswerList}
          />

          <Stack.Screen
            name="AnswerQuestionToday"
            component={AnswerQuestionToday}
            // options={AppStyle.AnswerQuestion}
          />

          <Stack.Screen
            name="MeetingAgenda"
            component={MeetingAgenda}
            options={AppStyle.MeetingAgenda}
          />
          <Stack.Screen
            name="MeetingFamilyConnect"
            component={MeetingFamilyConnect}
            options={AppStyle.MeetingFamilyConnect}
          />
          <Stack.Screen
            name="MettingDuring"
            component={MettingDuring}
            options={AppStyle.MeetingDuring}
          />
          <Stack.Screen
            name="MeetingHistory"
            component={MeetingHistory}
            options={AppStyle.MeetingHistory}
          />
          <Stack.Screen
            name="MeetingAgendaSelect"
            component={MeetingAgendaSelect}
            options={AppStyle.MeetingAgendaSelect}
          />
          
          <Stack.Screen
            name="AccountWithdrawal"
            component={AccountWithdrawal}
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
  AddFamily: {
    title: "가족 구성원 추가",
    ...header,
  },
  AnswerList: {
    title: "가족 답변",
    ...header,
  },
  AnswerQuestion: {
    title: "답변 작성",
    ...header,
  },
  MeetingAgenda: {
    title: "나의 안건",
    ...header,
  },
  MeetingHistory: {
    title: "가족회의 돌아보기",
    ...header,
  },
  MeetingFamilyConnect: {
    title: "연결된 가족",
    ...header,
  },
  MeetingAgendaSelect: {
    title: "안건 선택",
    ...header,
  },
  MeetingDuring: {
    title: "가족회의",
    ...header,
  },
});
