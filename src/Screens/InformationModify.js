import { useRef, useState } from "react";
import {
  Button,
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
import { Loginstyle } from "./Login";
import { CheckBox } from 'react-native-elements';
//해당 페이지에 사용되는 모든 버튼 style component

const InformationModify = ({ navigation }) => {
  const user = firebase.auth().currentUser;
  const [name, setName] = useState("jisoo");
  const [familyID, setFamilyID] = useState(0);
  
  const [Parents, setParents] = useState(false);
  const [Children, setChildren] = useState(false);

  const [Male, setMale] = useState(false);
  const [Female, setFemale] = useState(false);
  const [Other, setOther] = useState(false);

  const rolePartents = () => {
    setParents(true);
    setChildren(false);
    setRole("부모");
  }

  const roleChildren = () => {
    setParents(false);
    setChildren(true);
    setRole("자녀");
  }

  const genderMale = () => {
    setMale(true);
    setFemale(false);
    setOther(false);
    setSex("남자");
  }
  const genderFemale = () => {
    setMale(false);
    setFemale(true);
    setOther(false);
    setSex("여자");
  }
  const genderOther = () => {
    setMale(false);
    setFemale(false);
    setOther(true);
    setSex("기타");
  }

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
        
        <View style={{flex : 0.3}}>
          <Text style={{ fontSize: 24, textAlign: "center",   marginTop: 80}}>설정 - 정보수정</Text>
        </View>
      

        <View style={{flexDirection : "row", flex : 0.3, marginTop : 25}}>
          <View style={{flex : 0.4}}>
          
            <View style={Loginstyle.rightalign}>
              <Text style={Loginstyle.text}>아이디 : </Text>
              
              <Text style={Loginstyle.text}>비밀번호 : </Text>

            </View>
          </View>
            
          <View style={{flex : 0.5}}>
            <Text style={Loginstyle.text}>
              {user.email}
              </Text>
            <View style={{flexDirection : "row", marginTop : 4}}>
              <Text>
                (비밀번호 비공개)
              </Text>

              <TouchableOpacity>
                <Text style={{marginLeft : 50, fontSize : 10, marginTop : 4}}>비밀번호 변경</Text>
              </TouchableOpacity>
            </View>
            
          </View>
        </View>
        

        <View style={{flexDirection : "row", flex : 0.3, marginTop : -30}}>
          <View style={{flex : 0.9}}>
          
            <View style={Loginstyle.rightalign}>
              <Text style={Loginstyle.text}>이름 : </Text>
              
              <Text style={Loginstyle.text}>가족 내 역할 : </Text>

              <Text style={Loginstyle.text}>성별 : </Text>
            </View>
          </View>

          <View>
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

            <View style={{ flexDirection: "row" ,  alignContent : "center", justifyContent : "center"}}>
              <CheckBox
              title="부모"
              checked={user.rolePartents}
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
              checked={user.roleChildren}
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
              checked={user.genderMale}
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
              checked={user.genderFemale}
              onPress={genderFemale}
              checkedColor={COLOR_GREEN}
              containerStyle={{ backgroundColor : COLOR_BG, borderColor: COLOR_BG, padding : 0, marginVertical : 3, marginHorizontal : 0}}
              textStyle={{fontSize : 14}}
              size={14} 
              /> 

              <CheckBox
              title="기타"
              center
              checked={user.genderOther}
              onPress={genderOther}
              checkedColor={COLOR_GREEN}
              containerStyle={{ backgroundColor : COLOR_BG, borderColor: COLOR_BG, padding : 0, marginVertical : 3 , marginHorizontal : 0}}
              textStyle={{fontSize : 14}}
              size={14} 
              />           
            </View> 
          </View>
        </View>

        <TouchableOpacity
          style={Loginstyle.okaybutton}
          onPress={updateUser}
        >
          <Text style={Loginstyle.btnText}>완료</Text>
        </TouchableOpacity>

      </View>
    </SafeArea>
  );
};

export default InformationModify;
