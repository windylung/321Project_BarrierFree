import React, { useState } from "react";
import {
  View,
  Text,
  Pressable,
  TextInput,
  StyleSheet,
  Modal,
  Image,
} from "react-native";
import { COLOR_GREEN } from "../Color";

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

export const styles = StyleSheet.create({
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
    Height: 150,
  },
  centeredView: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modal: {
    height: 450,
    width: 360,
    alignItems: "center",
    margin: 20,
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalBtn: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    marginHorizontal: 11,

    // borderRightWidth: 10,
    // borderLeftWidth: 10,
    // borderTopWidth: 5,
    // borderEndWidth: 5,
    // borderColor: "white",
  },
});

export default AnswerQuestion;
