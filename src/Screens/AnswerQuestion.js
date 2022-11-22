import React from "react";
import { View, Text, Pressable, TextInput } from "react-native";

function AnswerQuestion({ navigation }) {
  //오늘의 질문, 답변 입력
  return (
    //오늘의 질문
    <View>
      <Text style={{ color: "grey" }}>#오늘의 질문</Text>
      <Text>10. 01</Text>
      <Text>상담을 시작한 목적이 무엇인가요?</Text>
      <View>
        <Text>나의 답변</Text>
        <TextInput style={{
            minHeight : 120,
            backgroundColor : "grey"
        }}></TextInput>
      </View>
    </View>
  );
}

export default AnswerQuestion;
