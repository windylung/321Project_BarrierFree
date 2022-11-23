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

function AnswerQuestion({ navigation }) {
  //오늘의 질문, 답변 입력
  const today = new Date();
  const month = today.getMonth() + 1;
  const date = today.getDate();
  const [text, setText] = useState("");
  const [modalVisible, setModalVisible] = useState(true);
  return (
    //오늘의 질문
    <View style={{ padding: 30 }}>
      <Modal animationType="slide" transparent={true} visible={modalVisible} style={{backgroundColor: "green"}}>
        <View
          style={[
            styles.centeredView,
            {
                
              backgroundColor: "green",
              alignSelf: "center",
            },
          ]}
        >
          <Text>"오늘의 문답"을 작성하지 않으셨네요!</Text>
          <Image
            source={require("../오리사진.png")}
            style={{ height: 200, width: 200 }}
          ></Image>
          <View style={{flexDirection: "row"}}>
            <Pressable
              style={{
                alignItems: "center",
              }}
              onPress={() => setModalVisible(false)}
            >
              <Text>작성하러 가기</Text>
            </Pressable>
            <Pressable
              style={{
                width: 110,
                height: 30,
                alignItems: "center",
              }}
              onPress={() => {
                navigation.navigate("QuestionList");
                setModalVisible(false);
              }}
            >
              <Text>나중에 할게요</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
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
});

export default AnswerQuestion;
