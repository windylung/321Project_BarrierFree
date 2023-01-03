import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Pressable,
  TextInput,
  StyleSheet,
  Modal,
  Image,
  TouchableOpacity,
  InputAccessoryView,
  Button,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { COLOR_BG } from "../Color";
import firestore from "@react-native-firebase/firestore";
import { firebase } from "@react-native-firebase/auth";
import {
  AnswerCollection,
  QuestionCollection,
  user,
  UserClientCollection,
} from "./firebase";
import { ButtonContainer } from "./StyleComponent";

const AnswerQuestion = ({ navigation: { navigate } }) => {
  //오늘의 질문, 답변 입력
  const today = new Date();
  const month = today.getMonth() + 1;
  const date = today.getDate();
  const [text, setText] = useState("");
  const [name, setName] = useState("");
  const [userID, setUserID] = useState("");
  const [familyID, setFamilyID] = useState("");
  const [question, setQuestion] = useState("");
  const inputAccessoryViewID = "uniqueID";
  const user = firebase.auth().currentUser;

  // AnswerCollection.doc()

  useEffect(() => {
      UserClientCollection.doc(user.uid)
        .get()
        .then(function (doc) {
          if (doc.exists) {
            setName(doc.data().userName);
            setUserID(doc.id);
            setFamilyID(doc.data().familyID);
          } else {
            console.log("No such document!");
          }
        })
        .catch(function (error) {
          console.log("Error getting document:", error);
        });

      AnswerCollection.doc(familyID)
        .get()
        .then((doc) => {
          if (doc.exists) {
            console.log(doc.data().currentIndex);
            return doc.data().currentIndex;
          }
        })
        .then((idx) => {
          QuestionCollection.doc(String(0))
            .get()
            .then((q) => {
              setQuestion(q.data().Question);
            })
            .catch((error) => console.log(error));
        })
        .catch((error) => {
          console.log(error);
        });
  }, []);

  return (
    //오늘의 질문
    <View style={{ padding: 30, backgroundColor: COLOR_BG, flex: 1 }}>
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
        <Text>{question}</Text>
      </View>
      {/* 현재는 모든 구성원으로 나왔지만, DB에서는 id마다 날짜, 질문 내용, 나의 답변, ...이렇게 해야 하지 않을까  */}
      <View style={styles.answerView}>
        <Text>(나)의 답변</Text>
        <TextInput
          multiline
          placeholder="답변을 입력해주세요"
          style={styles.input}
          value={text}
          onChangeText={(payload) => setText(payload)}
          inputAccessoryViewID={inputAccessoryViewID}
          returnKeyType={"done"}
          // onSubmitEditting={() => navigate("AnswerList")}
        ></TextInput>
        <ButtonContainer>
          <Text>완료</Text>
        </ButtonContainer>
      </View>
    </View>
  );
};

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  input: {
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
  answerView: {
    paddingVertical: 15,
    marginVertical: 7.5,
  },
  absolute: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  answerViewText: {
    marginVertical: 10,
    marginHorizontal: 10,
  },
});

export default AnswerQuestion;
