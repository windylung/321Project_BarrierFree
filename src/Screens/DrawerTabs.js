import { createDrawerNavigator } from "@react-navigation/drawer";
import auth, { firebase } from "@react-native-firebase/auth";
import Home from "./Home";
import MettingMain from "./MettingMain";
import { StackActions } from "@react-navigation/native";
import Question from "./Question";
import BottomTabs from "./BottomTabs";
import { AddFamily } from "./AddFamily";
import InformationModify from "./InformationModify";
import { COLOR_DEEPGREEN, COLOR_GREEN } from "../Color";
import { Alert } from "react-native";
import { useEffect } from "react";

const Logout = ({ navigation: { goBack } }) => {
console.log("hi");

         Alert.alert(
             "로그아웃 하시겠습니까?",
             "",
             [
                 {
                     text: "네",
                     onPress: () => {
                         firebase.auth().signOut();
                        },
                    },
                    {
                        text: "아니요",
                        onPress: () => {
                            goBack();
                        }
                    },
                ],
                { cancelable: false }
                )
    
};

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
      <Drawer.Screen name="가족 추가" component={AddFamily} />
      <Drawer.Screen name="로그아웃" component={Logout} />
      <Drawer.Screen name="회원탈퇴" component={AddFamily} />
    </Drawer.Navigator>
  );
};
export default DrawerTabs;
