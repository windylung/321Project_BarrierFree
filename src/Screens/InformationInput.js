import { useState } from "react";
import {
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { COLOR_GREEN } from "../Color";
import { mainStyle } from "./Home";
import firestore from "@react-native-firebase/firestore";
import { firebase } from "@react-native-firebase/auth";
import styled from 'styled-components/native'

const ButtonContainer = styled.TouchableOpacity`
    background-color: ${COLOR_GREEN};
    border-radius: 15px;
    padding: 15px 40px;
    margin: 10px 0px;
    justify-content: center;
`;

const InformationInput = () => {
  const user = firebase.auth().currentUser;
  const [name, setName] = useState("");
  const [familyID, setFamilyID] = useState(0);
  const [role, setRole] = useState(-1);
  const [sex, setSex] = useState("");

  const addCollection = firestore().collection("Users");
  const userDocument = firestore().collection("Users");
  console.log(userDocument);
  const addUser = async () => {
    try {
      await addCollection.add({
        id: user.uid,
        userName: name,
        familyID: familyID,
        //invitatonID는 이후 함수 만들어서 수정예정
        invitationID: user.uid,
        role: role,
      });
      setName("");
      setFamilyID(0);
      setRole(-1);
      console.log("Create Complete!");
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <SafeAreaView style={mainStyle.background}>
      <Text>회원정보</Text>

      <Text>이름</Text>
      <TextInput
        placeholder="Username"
        returnKeyType="next"
        value={name}
        onChangeText={(name) => setName(name)}
        // ref={passwordInput}
        // onSubmitEditing={onSubmitPasswordEditing}
      ></TextInput>
      <Text>가족 ID가 있나요?</Text>
      <TextInput
        placeholder="family id"
        returnKeyType="next"
        value={familyID}
        //유효한지 확인하는 과정도 필요함
        onChangeText={(ID) => setFamilyID(ID)}
        // ref={passwordInput}
        // onSubmitEditing={onSubmitPasswordEditing}
      ></TextInput>

      <Text> 내 아이디는 None</Text>
      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity
          style={{
            backgroundColor: COLOR_GREEN,
            width: 80,
            height: 30,
            justifyContent: "center",
            alignItems: "center",
            marginHorizontal: 10,
          }}
          onPress={() => setRole("부모")}
        >
          <Text>부모</Text>
        </TouchableOpacity>
        <ButtonContainer>
          <Text>Test</Text>
        </ButtonContainer>
        <TouchableOpacity
          style={{
            backgroundColor: COLOR_GREEN,
            width: 80,
            height: 30,
            justifyContent: "center",
            alignItems: "center",
            marginHorizontal: 10,
          }}
          onPress={() => setRole("아동")}
        >
          <Text>아동</Text>
        </TouchableOpacity>
      </View>

      <View style={{ flexDirection: "row" }}>
        <Text>성별</Text>
        <TouchableOpacity
          style={{
            backgroundColor: COLOR_GREEN,
            width: 80,
            height: 30,
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={() => setRole("부모")}
        >
          <Text>남</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: COLOR_GREEN,
            width: 80,
            height: 30,
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={() => setRole("아동")}
        >
          <Text>여</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: COLOR_GREEN,
            width: 80,
            height: 30,
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={() => setRole("부모")}
        >
          <Text>기타</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={{ backgroundColor: COLOR_GREEN, width: 88, height: 48, borderRadius: 100, alignItems: "center", justifyContent: "center"}}
        onPress={addUser}
      >
        <Text>완료</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default InformationInput;
