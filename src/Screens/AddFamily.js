import firestore from "@react-native-firebase/firestore";
import { firebase } from "@react-native-firebase/auth";
import { Alert, FlatList, Text, TextInput, View } from "react-native";
import { ButtonContainer, SafeArea } from "./StyleComponent";
import { COLOR_DEEPGREEN } from "../Color";
import { useEffect, useState } from "react";

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
        createAnswerTable(docRef.id)
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
        answer : [],
        currentIndex : 0
      });
      console.log("Create Complete!!");
    } catch (error) {
      console.log(error.message);
    }
  }

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
      <View>
        <Text>설정 - 가족 추가/연결</Text>
        <Text>나의 코드{invitationID}</Text>
        <View style={{ alignItems: "center" }}>
          <Text>가족으로 연결할 상대의 코드를 입력해주세요!</Text>
          {/* <Text>가족 코드{getUserInformation("inputfamilyID")}</Text> */}
          <TextInput
            placeholder={"invitation code"}
            returnKeyType="done"
            autoCapitalize="none"
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
          {/* <FlatList
            data={renderingData}
            renderItem={renderItem}
            keyExtractor={(item) => String(item.id)}
          /> */}
          <Text>이지수 이유정 화동이</Text>
        </View>
      </View>
    </SafeArea>
  );
};
