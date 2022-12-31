import { useRef, useState } from "react";
import {
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { COLOR_BG, COLOR_GREEN } from "../Color";
import { mainStyle } from "./Home";
import firestore from "@react-native-firebase/firestore";
import { firebase } from "@react-native-firebase/auth";
import { ButtonContainer, SafeArea } from "./StyleComponent";
import { Alert } from "react-native";
import { useEffect } from "react";
import { getUserInformation } from "./getUserInformation";
//해당 페이지에 사용되는 모든 버튼 style component

const InformationModify = ({ navigation }) => {
  const user = firebase.auth().currentUser;
  const [name, setName] = useState("jisoo");
  const [familyID, setFamilyID] = useState(0);
  const [role, setRole] = useState(-1);
  const [sex, setSex] = useState("");
  const familyIDInput = useRef();
  //기존 정보와 비교하였을 때 정보 변경 여부
  const [diff, setDiff] = useState(false);
  const onSubmitNameEditing = () => {
    familyIDInput.current.focus();
  };
  const UserClientCollection = firestore().collection("User_Client");

  const updateUser = async () => {
    if (name === "") {
      return Alert.alert("정보를 선택해주세요");
    }

    try {
      await UserClientCollection.doc(user.uid).update({
        userName: name,
        familyID: familyID,
        //invitatonID는 이후 함수 만들어서 수정예정
        invitationID: user.uid,
        role: role,
        sex: sex,
      });

      setName("");
      setFamilyID(0);
      setRole(-1);
      console.log("Create Complete!");
      navigation.navigate("Home");
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    UserClientCollection.doc(user.uid)
      .get()
      .then(function (doc) {
        if (doc.exists) {
          setName(doc.data().userName);
          setFamilyID(doc.data().familyID);
          setRole(doc.data().role);
          setSex(doc.data().sex);
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
      <View style={mainStyle.background}>
        <Text>회원정보</Text>

        <Text>이름</Text>
        <TextInput
          placeholder={name}
          returnKeyType="next"
          value={name}
          onChangeText={(name) => {
            setName(name);
            name === getUserInformation("userName") ? null : setDiff(true);
            console.log("외부", getUserInformation("userName"));
            // getUserInformation("userName").then(function (resolvedData) {
            //   console.log(resolvedData);
            //   if (name !== resolvedData) {
            //     setDiff(true);
            //   }
            // });
          }}
          // ref={passwordInput}
          onSubmitEditing={onSubmitNameEditing}
        ></TextInput>
        <Text>가족 ID가 있나요?</Text>
        <TextInput
          placeholder={{ familyID } ? "family id" : { familyID }}
          returnKeyType="next"
          value={familyID}
          //유효한지 확인하는 과정도 필요함
          onChangeText={(ID) => setFamilyID(ID)}
          ref={familyIDInput}
        ></TextInput>
        <Text> 내 아이디는 None</Text>

        <View style={{ flexDirection: "row" }}>
          <ButtonContainer onPress={() => setRole("부모")}>
            <Text>부모</Text>
          </ButtonContainer>
          <ButtonContainer onPress={() => setRole("아동")}>
            <Text>아동</Text>
          </ButtonContainer>
        </View>

        <View style={{ flexDirection: "row" }}>
          <Text>성별</Text>
          <ButtonContainer onPress={() => setSex("남")}>
            <Text>남</Text>
          </ButtonContainer>
          <ButtonContainer onPress={() => setSex("여")}>
            <Text>여</Text>
          </ButtonContainer>
          <ButtonContainer onPress={() => setSex("기타")}>
            <Text>기타</Text>
          </ButtonContainer>
        </View>

        <TouchableOpacity
          style={{
            borderRadius: 15,
            backgroundColor: diff ? COLOR_GREEN : "grey",
            padding: 10,
            width: 100,
            alignItems: "center",
          }}
          onPress={updateUser}
        >
          <Text>완료</Text>
        </TouchableOpacity>
      </View>
    </SafeArea>
  );
};

export default InformationModify;
