import firestore from "@react-native-firebase/firestore";
import { firebase } from "@react-native-firebase/auth";
import { Alert, Text, TextInput, View } from "react-native";
import { ButtonContainer, SafeArea } from "./StyleComponent";
import { COLOR_DEEPGREEN } from "../Color";
import { useEffect, useState } from "react";

export const AddFamily = () => {
  const user = firebase.auth().currentUser;
  const UserClientCollection = firestore().collection("User_Client");
  const [isValid, setIsVallid] = useState(false);
  const [userID, setUserID] = useState("")
  const [invitationID, setInvitationID] = useState("");
  const [inputfamilyID, setinputFamilyID] = useState("");
  const [familyID, setFamilyID] = useState(0);
  const FamilyCollection = firestore().collection("Family");
  const addFamily = async (doc) => {
    try {
      await FamilyCollection.doc("ddhjosP5EdD2oyEvi0Yj").update(
        "family_member",
        firebase.firestore.FieldValue.arrayUnion(doc.id)
      );
      setinputFamilyID("");
      console.log("Family Update Complete!");
    } catch (error) {
      console.log(error.message);
    }
  };
  const createFamily = async (doc) => {
    try {
      await FamilyCollection.doc().set({
        family_member: [userID, doc.id],
      });
      setinputFamilyID("");
      console.log("Family Create Complete!");
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
        //   console.log(doc.id, " => ", doc.data());
        // if()
          addFamily(doc);
        });
      });
      if (isValid === false) {
        Alert.alert("유효하지 않은 코드입니다");
      }
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
  return (
    <SafeArea>
      <View>
        <Text>설정 - 가족 추가/연결</Text>
        <Text>나의 코드{invitationID}</Text>
        <View style={{ alignItems: "center" }}>
          <Text>가족으로 연결할 상대의 코드를 입력해주세요!</Text>
          {/* <Text>가족 코드{getUserInformation("inputfamilyID")}</Text> */}
          <TextInput
            placeholder={"invitation code"}
            returnKeyType="done"
            style={{
              backgroundColor: COLOR_DEEPGREEN,
              padding: 10,
              borderRadius: 100,
              width: 156,
            }}
            value={inputfamilyID}
            onChangeText={(ID) => setinputFamilyID(ID)}
          ></TextInput>
          <ButtonContainer onPress={onSubmitinputFamilyIDEditing}>
            <Text>연결</Text>
          </ButtonContainer>
        </View>
        <View style={{ alignItems: "center" }}>
          <ButtonContainer>
            <Text>연결된 가족 목록</Text>
          </ButtonContainer>
          <Text>이지수 이유정 화동이</Text>
        </View>
      </View>
    </SafeArea>
  );
};
