import { useState } from "react";
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
import { Loginstyle } from "./Login";
import * as React from 'react';
import { RadioButton } from 'react-native-paper';


//해당 페이지에 사용되는 모든 버튼 style component


const InformationInput = ({navigation}) => {
  const user = firebase.auth().currentUser;
  const [name, setName] = useState("");
  const [familyID, setFamilyID] = useState(0);
  const [role, setRole] = useState(-1);
  const [sex, setSex] = useState("");

  const [checked, setChecked] = React.useState('부모');

  const addUserCollection = firestore().collection("User_Client");
  const addUser = async () => {
    if (name === "" || role === -1 || sex === "") {
      return Alert.alert("정보를 선택해주세요");
    }

    try {
      // await addUserCollection.add({
      //   id: user.uid,
      //   userName: name,
      //   familyID: familyID,
      //   //invitatonID는 이후 함수 만들어서 수정예정
      //   invitationID: user.uid,
      //   role: role,
      // });
      await addUserCollection.doc(user.uid).set({
        userName: name,
        familyID: familyID,
        //invitatonID는 이후 함수 만들어서 수정예정
        invitationID: user.uid,
        role: role,
        sex: sex
      });

      setName("");
      setFamilyID(0);
      setRole(-1);
      console.log("Create Complete!");
      navigation.navigate("Home")
    } catch (error) {
      console.log(error.message);
    }

  };

  return (
    <SafeArea>
      <View style={mainStyle.background}>
        

        <View style={{flex : 0.4}}>
          <Text style={{ fontSize: 24, textAlign: "center",   marginTop: 100}}>회원정보를 입력해주세요</Text>
        </View>


        <View style={Loginstyle.rowalign}>
        
          <View style={Loginstyle.rightalign}>
            <Text style={Loginstyle.text}>이름 : </Text>
            
            <Text style={Loginstyle.text}>가족 내 역할 : </Text>

            <Text style={Loginstyle.text}>성별 : </Text>
            
          </View>

          <View>
            <TextInput
              placeholder="Username"
              returnKeyType="next"
              value={name}
              onChangeText={(name) => setName(name)}
              // ref={passwordInput}
              // onSubmitEditing={onSubmitPasswordEditing}
            ></TextInput>

            <View style={{flexDirection: "row",}}>
              <RadioButton
                value="부모"
                status={ checked === '부모' ? 'checked' : 'unchecked' }
                onPress={() => {setChecked('부모'); setRole("부모");}}
                color = {COLOR_GREEN}
                label = "부모"
              />

            
              <RadioButton
                value="아동"
                status={ checked === '아동' ? 'checked' : 'unchecked' }
                onPress={() => {setChecked('아동'); setRole("아동")}}
                color = {COLOR_GREEN}
              >

              </RadioButton>
            </View>



            <View style={{ flexDirection: "row" }}>
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

           </View> 
        
        </View>
        
        
        <View >
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
        </View>
        

        


        <TouchableOpacity onPress={addUser} style ={[Loginstyle.okaybutton, Loginstyle.centeralign]}>
          <Text style={Loginstyle.btnText}>완료</Text>
        </TouchableOpacity>
      </View>
    </SafeArea>
  );
};


export default InformationInput;
