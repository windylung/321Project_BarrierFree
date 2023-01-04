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
import { CheckBox } from 'react-native-elements';


//해당 페이지에 사용되는 모든 버튼 style component


const InformationInput = ({navigation}) => {
  const user = firebase.auth().currentUser;
  const [name, setName] = useState("");
  const [familyID, setFamilyID] = useState(0);

  const [Parents, setParents] = useState(false);
  const [Children, setChildren] = useState(false);

  const [Male, setMale] = useState(false);
  const [Female, setFemale] = useState(false);
  const [Other, setOther] = useState(false);

  const rolePartents = () => {
    setParents(true);
    setChildren(false);
    setRole("Parents");
  }

  const roleChildren = () => {
    setParents(false);
    setChildren(true);
    setRole("Children");
  }

  const genderMale = () => {
    setMale(true);
    setFemale(false);
    setOther(false);
    setSex("Male");
  }
  const genderFemale = () => {
    setMale(false);
    setFemale(true);
    setOther(false);
    setSex("Female");
  }
  const genderOther = () => {
    setMale(false);
    setFemale(false);
    setOther(true);
    setSex("Other");
  }

  const [role, setRole] = useState(-1);
  const [sex, setSex] = useState("");

  const [checked, setChecked] = React.useState('부모');

  const addUserCollection = firestore().collection("User_Client");
  const addUser = async () => {
    if (name === "" || role === -1 || sex === "")
    {
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
      navigation.navigate("DrawerTabs")
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
        
          <View style={{    alignItems: 'flex-end', flex : 0.9}}>
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

            <View style={{ flexDirection: "row" ,  alignContent : "center", justifyContent : "center"}}>
              <CheckBox
              title="부모"
              checked={Parents}
              onPress={rolePartents}
              center
              checkedColor={COLOR_GREEN}
              containerStyle={{ backgroundColor : COLOR_BG, borderColor: COLOR_BG, padding : 0, marginVertical : 3, marginHorizontal : 0}}
              textStyle={{fontSize : 14}}
              size={14} 
              />

              <CheckBox
              title="자녀"
              center
              checked={Children}
              onPress={roleChildren}
              checkedColor={COLOR_GREEN}
              containerStyle={{ backgroundColor : COLOR_BG, borderColor: COLOR_BG, padding : 0, marginVertical : 3, marginHorizontal : 0}}
              textStyle={{fontSize : 14}}
              size={14} 
              />       
            </View> 

            <View style={{ flexDirection: "row" ,  alignContent : "center", justifyContent : "center"}}>
              <CheckBox
              title="남자"
              checked={Male}
              onPress={genderMale}
              center
              checkedColor={COLOR_GREEN}
              containerStyle={{ backgroundColor : COLOR_BG, borderColor: COLOR_BG, padding : 0, marginVertical : 3, marginHorizontal : 0}}
              textStyle={{fontSize : 14}}
              size={14} 
              />

              <CheckBox
              title="여자"
              center
              checked={Female}
              onPress={genderFemale}
              checkedColor={COLOR_GREEN}
              containerStyle={{ backgroundColor : COLOR_BG, borderColor: COLOR_BG, padding : 0, marginVertical : 3, marginHorizontal : 0}}
              textStyle={{fontSize : 14}}
              size={14} 
              /> 

              <CheckBox
              title="기타"
              center
              checked={Other}
              onPress={genderOther}
              checkedColor={COLOR_GREEN}
              containerStyle={{ backgroundColor : COLOR_BG, borderColor: COLOR_BG, padding : 0, marginVertical : 3 , marginHorizontal : 0}}
              textStyle={{fontSize : 14}}
              size={14} 
              />           
            </View> 
          </View>
        </View>
        


        <TouchableOpacity onPress={() => addUser()} style ={[Loginstyle.okaybutton, Loginstyle.centeralign]}>
          <Text style={Loginstyle.btnText}>완료</Text>
        </TouchableOpacity>
      </View>
    </SafeArea>
  );
};


export default InformationInput;
