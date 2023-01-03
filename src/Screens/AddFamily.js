import firestore from "@react-native-firebase/firestore";
import { firebase } from "@react-native-firebase/auth";
import {
  Alert,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { ButtonContainer, SafeArea } from "./StyleComponent";
import { COLOR_DEEPGREEN, COLOR_GREEN, COLOR_GREY } from "../Color";
import { useEffect, useState } from "react";
import Clipboard from "@react-native-clipboard/clipboard";
import styled from "styled-components";

export const AddFamily = () => {
  const user = firebase.auth().currentUser;
  const [isValid, setIsVallid] = useState(false);
  const [userID, setUserID] = useState("");
  const [invitationID, setInvitationID] = useState("");
  const [inputfamilyID, setinputFamilyID] = useState("");
  const [renderingData, setRenderingData] = useState("");
  const [familyID, setFamilyID] = useState(0);
  const UserClientCollection = firestore().collection("User_Client");
  const FamilyCollection = firestore().collection("Family");
  const AnswerCollection = firestore().collection("Answer");
  //doc을 user의 family에 포함

  const copyToClipboard = () => {
    Clipboard.setString(invitationID);
  };
  const mergeFamily = async (doc) => {
    try {
      await FamilyCollection.doc(doc.data().familyID)
        .get()
        .then((members) => {
          members.data().family_member.forEach((member) => {
            FamilyCollection.doc(familyID).update(
              "family_member",
              firebase.firestore.FieldValue.arrayUnion(member)
            );
            UserClientCollection.doc(member).update("familyID", familyID);
          });
          //병합 이후에 doc.data().familyID는 삭제
          FamilyCollection.doc(doc.data().familyID).delete();
        });
      console.log("addDocToFamily Complete!");
    } catch (error) {
      console.log(error.message);
    }
  };

  const addDocToFamily = async (doc) => {
    try {
      await FamilyCollection.doc(familyID).update(
        "family_member",
        firebase.firestore.FieldValue.arrayUnion(doc.id)
      );
      UserClientCollection.doc(doc.id).update("familyID", familyID);
      console.log("addDocToFamily Complete!");
    } catch (error) {
      console.log(error.message);
    }
  };

  //user를 doc의 family에 추가
  const addUserToFamily = async (doc) => {
    try {
      await FamilyCollection.doc(doc.data().familyID).update(
        "family_member",
        firebase.firestore.FieldValue.arrayUnion(userID)
      );
      UserClientCollection.doc(userID).update("familyID", doc.data().familyID);
      console.log("addUserToFamily Complete!");
    } catch (error) {
      console.log(error.message);
    }
  };

  const createFamily = async (doc) => {
    try {
      await FamilyCollection.add({
        family_member: [userID, doc.id],
      }).then((docRef) => {
        createAnswerTable(docRef.id);
        UserClientCollection.doc(doc.id).update("familyID", docRef.id);
        UserClientCollection.doc(userID).update("familyID", docRef.id);
      });
      console.log("Family Create Complete!");
    } catch (error) {
      console.log(error.message);
    }
  };

  const createAnswerTable = async (id) => {
    try {
      await AnswerCollection.doc(id).set({
        answer: [],
        currentIndex: 0,
      });
      console.log("Create Complete!!");
    } catch (error) {
      console.log(error.message);
    }
  };

  const onSubmitinputFamilyIDEditing = () => {
    if (inputfamilyID === invitationID) {
      return Alert.alert("자신의 코드와 동일합니다 다시 입력해주세요");
    }
    //유효성 확인
    UserClientCollection.where("invitationID", "==", inputfamilyID)
      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          setIsVallid(true);
          console.log(doc.id, " => ", doc.data());

          if (familyID === 0 && doc.data().familyID === 0) {
            console.log("create Family");
            createFamily(doc);
          } else if (doc.data().familyID === 0) {
            console.log("addDocToFamily");
            addDocToFamily(doc);
          } else if (familyID === 0) {
            addUserToFamily(doc);
          } else {
            Alert.alert(
              "다른 가족에 속한 사용자입니다. 사용자의 그룹과 병합하시겠습니까?",
              "",
              [
                {
                  text: "네",
                  onPress: () => mergeFamily(doc),
                },
                {
                  text: "아니요",
                  onPress: () => console.log("no"),
                },
              ],
              { cancelable: false }
            );
          }
          setinputFamilyID("");
        });
      });
    if (isValid === false) {
      Alert.alert("유효하지 않은 코드입니다");
    }
  };

  const renderItem = (item) => {
    return (
      <View>
        <Text>{item}</Text>
      </View>
    );
  };

  useEffect(() => {
    UserClientCollection.doc(user.uid)
      .get()
      .then(function (doc) {
        if (doc.exists) {
          //   setName(doc.data().userName);
          setUserID(doc.id);
          setFamilyID(doc.data().familyID);
          setInvitationID(doc.data().invitationID);
          //   setRole(doc.data().role);
          //   setSex(doc.data().sex);
        } else {
          console.log("No such document!");
        }
      })
      .catch(function (error) {
        console.log("Error getting document:", error);
      });
  }, []);

  useEffect(() => {
    FamilyCollection.doc(familyID)
      .get()
      .then((doc) => {
        DATA = doc.data().family_member
      })
      .catch((error) => console.log(error));
  }, []);

  //   useEffect(() => {
  //     try {
  //       FamilyCollection.doc(familyID)
  //         .get()
  //         .then(function (doc) {
  //           // if (doc.exists){
  //           //     setRenderingData(doc.data().family_member);
  //           // }
  //           console.log(doc.data().family_member);
  //         });
  //     } catch {
  //       (error) => {
  //         console.log(error);
  //       };
  //     }
  //   }, []);

  return (
    <SafeArea>
      <View style={{ padding: 30, flex: 0.8 }}>
        <View
          style={{
            flex: 2,
            alignSelf: "center",
            alignItems: "flex-start",
            justifyContent: "center",
          }}
        >
          <Text style={{ fontWeight: "bold" }}>나의 코드</Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text> {invitationID}</Text>
            <TouchableOpacity
              style={{ marginHorizontal: 5 }}
              onPress={copyToClipboard}
            >
              <Image
                source={require("../Image/copy_icon.png")}
                style={{
                  resizeMode: "contain",
                  width: 23,
                }}
              ></Image>
            </TouchableOpacity>
          </View>
        </View>

        <View
          style={{ alignItems: "center", flex: 3, justifyContent: "center" }}
        >
          <Text>가족으로 연결할 상대방의 코드를 입력해주세요!</Text>
          {/* <Text>가 족 코드{getUserInformation("inputfamilyID")}</Text> */}
          <View style={{ flexDirection: "row" }}>
            <TextInput
              placeholder={"invitation code"}
              returnKeyType="done"
              autoCapitalize="none"
              style={{
                backgroundColor: COLOR_DEEPGREEN,
                padding: 10,
                borderRadius: 100,
                width: "60%",
                marginVertical: 10,
              }}
              value={inputfamilyID}
              onChangeText={(ID) => setinputFamilyID(ID)}
            ></TextInput>
            <TouchableOpacity
              onPress={onSubmitinputFamilyIDEditing}
              style={{
                backgroundColor: COLOR_GREEN,
                padding: 10,
                borderRadius: 100,
                width: "20%",
                marginVertical: 10,
                marginHorizontal: 5,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text>연결</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            borderBottomColor: "grey",
            borderBottomWidth: StyleSheet.hairlineWidth,
          }}
        />
        <View style={{ alignItems: "center", flex: 5, marginVertical: 10 }}>
          <TouchableOpacity
            onPress={onSubmitinputFamilyIDEditing}
            style={{
              backgroundColor: COLOR_GREEN,
              padding: 10,
              borderRadius: 100,
              width: "80%",
              marginVertical: 10,
              marginHorizontal: 5,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={{ fontSize: 16, fontWeight: "600" }}>
              연결된 가족 목록
            </Text>
          </TouchableOpacity>
          {/* <FlatList
            data={DATA}
            renderItem={renderItem}
            keyExtractor={(item) => String(item.id)}
          /> */}
          <Text>이지수 이유정 화동이</Text>
        </View>
      </View>
    </SafeArea>
  );
};
