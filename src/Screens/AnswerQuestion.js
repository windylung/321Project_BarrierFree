import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";
import { COLOR_BG, COLOR_DEEPGREEN } from "../Color";
import firestore from "@react-native-firebase/firestore";
import { firebase } from "@react-native-firebase/auth";
import {
  AnswerCollection,
  FamilyCollection,
  QuestionCollection,
  user,
  UserClientCollection,
} from "./firebase";
import { ButtonContainer, SafeArea } from "./StyleComponent";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export const AnswerQuestion = ({ navigation }) => {
  //오늘의 질문, 답변 입력

  const [text, setText] = useState("");
  const [name, setName] = useState("");
  const [userID, setUserID] = useState("");
  const [familyID, setFamilyID] = useState("");
  const [question, setQuestion] = useState("");
  const [questionKey, setQuestionKey] = useState(0);
  const inputAccessoryViewID = "uniqueID";
  const [existedAnswer, setExistedAnswer] = useState("");

  const getInform = async () => {
    try {
      await UserClientCollection.doc(user.uid)
        .get()
        .then(function (doc) {
          if (doc.exists) {
            setName(doc.data().userName);
            setUserID(doc.id);
            setFamilyID(doc.data().familyID);
            doc.data().answer.forEach((answer) => {
              if (answer.questionKey === questionKey) {
                setText(answer.text);
                setExistedAnswer(answer.text);
              }
            });
          } else {
            console.log("No such document!");
          }
        });
    } catch {
      console.log("error!");
    }
  };

  const getQuestionIndex = async () => {
    try {
      await FamilyCollection.doc(familyID)
        .get()
        .then((doc) => {
          setQuestionKey(doc.data().index);
        });
    } catch {
      console.log("error!");
    }
  };

  const getQuestion = async () => {
    try {
      await QuestionCollection.doc(String(questionKey))
        .get()
        .then((doc) => {
          setQuestion(doc.data().Question);
        });
    } catch {
      console.log("error!");
    }
  };

  useEffect(() => {
    getInform();
  }, []);

  useEffect(() => {
    getQuestion();
  }, []);

  useEffect(() => {
    getQuestionIndex();
  }, []);

  const onSubmitAnswer = async () => {
    await UserClientCollection.doc(user.uid).update({
      answer: firebase.firestore.FieldValue.arrayRemove({
        questionKey: questionKey,
        text: existedAnswer,
      }),
    });

    await UserClientCollection.doc(user.uid).update({
      answer: firebase.firestore.FieldValue.arrayUnion({
        questionKey: questionKey,
        text: text,
      }),
    });

    setExistedAnswer(text);
  };

  return (
    //오늘의 질문
    <SafeArea>
      <View style={{ padding: 30, backgroundColor: COLOR_BG, flex: 1 }}>
        <View
          style={{
            height: 177,
            alignItems: "center",
            justifyContent: "center",
            flex: 0.3,
          }}
        >
          <Text style={{ fontWeight: "500", fontSize: 30 }}>{questionKey}</Text>
          <Text style={{ fontSize: 17 }}>{question}</Text>
        </View>

        <View style={{ flex: 0.7 }}>
          <Text style={{ fontSize: 15, fontWeight: "700" }}>
            나의 답변{"\n"}
          </Text>

          <TextInput
            multiline
            placeholder="답변을 입력해주세요"
            style={[styles.input]}
            value={text}
            onChangeText={(payload) => setText(payload)}
            inputAccessoryViewID={inputAccessoryViewID}
            returnKeyType={"done"}
            onSubmitEditing={onSubmitAnswer}
          ></TextInput>

            <TouchableOpacity
              style={{
                backgroundColor: COLOR_DEEPGREEN,
                alignSelf: "center",
                justifyContent: "center",
                alignItems: "center",
                width: "80%",
                borderRadius: 20,
                marginTop: 20,
                // paddingVertical: "3%",
                flex: 0.1,
              }}
              onPress={() => {
                onSubmitAnswer();
                navigation.goBack();
              }}
            >
              <Text>완료</Text>
            </TouchableOpacity>
        </View>
      </View>
    </SafeArea>
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
