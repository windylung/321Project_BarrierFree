import { firebase } from "@react-native-firebase/auth";
import { useFocusEffect } from "@react-navigation/native";
import React from "react";
import { Alert } from "react-native";
export const Logout = ({ navigation: { goBack } }) => {
  useFocusEffect(
    //화면으로 들어왔을 때
    React.useCallback(() => {
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
              return (goBack());
            },
          },
        ],
        { cancelable: false }
      );
      console.log("들어옴");
    }, [])
  );
};
