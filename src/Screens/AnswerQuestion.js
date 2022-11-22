import React, { useState } from "react";
import { View, Text, Pressable, TextInput, StyleSheet } from "react-native";

function AnswerQuestion({ navigation }) {
  //오늘의 질문, 답변 입력
  const today = new Date();
  const month = today.getMonth() + 1;
  const date = today.getDate();
  const [text, setText] = useState("");
  return (
    //오늘의 질문
    <View style={{ padding: 30 }}>
      <Text style={{ color: "grey" }}>#오늘의 질문</Text>
      <View
        style={{
          height: 177,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text style={{ fontWeight: "500", fontSize: 30 }}>
          {month} . {date}
        </Text>
        <Text>상담을 시작한 목적이 무엇인가요?</Text>
      </View>
      <View>
        <Text>나의 답변</Text>
        <TextInput
          multiline
          placeholder="답변을 입력해주세요"
          style={styles.input}
          value={text}
          onChangeText={(payload) => setText(payload)}
        ></TextInput>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "red",
  },
  input: {
    backgroundColor: "white",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
    fontSize: 15,
    Height: 150
  },
});

export default AnswerQuestion;
