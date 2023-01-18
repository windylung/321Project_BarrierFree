import { createDrawerNavigator } from "@react-navigation/drawer";
import auth, { firebase } from "@react-native-firebase/auth";
import Home from "./Home";
import MettingMain from "./MeetingMain";
import { StackActions } from "@react-navigation/native";
import Question from "./Question";
import BottomTabs from "./BottomTabs";
import { AddFamily } from "./AddFamily";
import InformationModify from "./InformationModify";
import { COLOR_DEEPGREEN, COLOR_GREEN } from "../Color";
import { Alert } from "react-native";
import { useEffect } from "react";
import AccountWithdrawal from "./AccountWithdrawal";
import { Logout } from "./Logout";

const DrawerTabs = () => {
  const Drawer = createDrawerNavigator();
  return (
    <Drawer.Navigator
      initialRouteName="Test"
      screenOptions={{
        drawerActiveBackgroundColor: COLOR_DEEPGREEN,
        drawerActiveTintColor: "white",
      }}
    >
      <Drawer.Screen
        name="메인"
        component={BottomTabs}
        options={{ headerShown: false }}
      />
      <Drawer.Screen
        name="회원정보 수정"
        component={InformationModify}
        options={{
          title: "회원정보 수정",
          headerStyle: {
            backgroundColor: COLOR_DEEPGREEN,
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      />
      <Drawer.Screen name="가족 추가" component={AddFamily} options={{
        title: "가족 구성원 연결",
        headerStyle: {
          backgroundColor: COLOR_DEEPGREEN,
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}/>
      <Drawer.Screen name="로그아웃" component={Logout} />
      <Drawer.Screen name="회원탈퇴" component={AccountWithdrawal} />
    </Drawer.Navigator>
  );
};


export default DrawerTabs;
