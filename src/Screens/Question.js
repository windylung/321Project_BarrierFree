import React from "react";
import { View, Text, Pressable } from "react-native";

function Question({ navigation }) {
  return (
    <View>
      <Text>오늘의 문답을 작성하지 않으셨네요!</Text>
      <View style={{ flexDirection: "row", alignSelf: "center" }}>
        <Pressable
          style={{
            backgroundColor: "skyblue",
            width: 110,
            height: 30,
            alignItems: "center",
          }}
          onPress = {() => navigation.navigate("AnswerQuestion")}
        >
          <Text>작성하러 가기</Text>
        </Pressable>
        <Pressable
          style={{
            backgroundColor: "skyblue",
            width: 110,
            height: 30,
            alignItems: "center",
          }}
          onPress = {() => navigation.navigate("QuestionList")}
        >
          <Text>나중에 할게요</Text>
        </Pressable>
      </View>
    </View>
  );
}

export default Question;
