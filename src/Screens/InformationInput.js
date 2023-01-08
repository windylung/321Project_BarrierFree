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

const InformationInput = () => {
  const user = firebase.auth().currentUser;
  const [name, setName] = useState("");
  const [familyID, setFamilyID] = useState(0);
  const [role, setRole] = useState(-1);
  const [sex, setSex] = useState("");
  const today = new Date();
  const yesterday = new Date(today)
  yesterday.setDate(yesterday.getDate() - 1);
  const currentAnswer = [today.getMonth() + 1, today.getDate() - 1];
  const [checked, setChecked] = React.useState('부모');

  const addUserCollection = firestore().collection("User_Client");
  const addUser = async () => {
    try {
      await addCollection.add({
        id: user.uid,
        userName: name,
        familyID: familyID,
        //invitatonID는 이후 함수 만들어서 수정예정
        invitationID: user.uid,
        role: role,
        sex: sex,
        currentAnswer : yesterday.toDateString(),
        answer : {}
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
        <TouchableOpacity style={{backgroundColor: COLOR_GREEN}} onPress={addUser}>
            <Text>완료</Text>
        </TouchableOpacity>
      </View>

      {/* <TextInput
        placeholder="Password"
        secureTextEntry
        returnKeyType="done"
        value={password}
        ref={passwordInput}
        onChangeText={(text) => setPassword(text)}
        onSubmitEditing={onSubmitPasswordEditing}
      ></TextInput>
      <TextInput
        placeholder="Password"
        secureTextEntry
        returnKeyType="done"
        value={password}
        ref={passwordInput}
        onChangeText={(text) => setPassword(text)}
        onSubmitEditing={onSubmitPasswordEditing}
      ></TextInput> */}
    </SafeAreaView>
  );
};

export default InformationInput;
