import { BlurView } from "@react-native-community/blur";
import React, { useEffect, useReducer, useState } from "react";
import {
  View,
  Text,
  Pressable,
  FlatList,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Modal,
  Image,
} from "react-native";
import { COLOR_BG, COLOR_GREEN } from "../Color";
import { styles } from "./AnswerQuestionToday";
import { SafeArea } from "./StyleComponent";
import {
  FamilyCollection,
  QuestionCollection,
  user,
  UserClientCollection,
} from "./firebase";

// const navigation = useNavigation();
// const goScreen = ({navigation : {navigate}, route}) => {
//   // console.log(route.params)
//   navigate("AnswerQuestionTwo")
// }

function QuestionList({ navigation }) {
  const [data, setData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [name, setName] = useState("");
  const [userID, setUserID] = useState("");
  const [familyID, setFamilyID] = useState("");
  const [question, setQuestion] = useState("");
  const [questionKey, setQuestionKey] = useState(0);
  const today = new Date();

  //질문 목록을 불러오는 함수 => 이후 DB에서 가져오도록 수정 필요
  const getData = () => {
    QuestionCollection.onSnapshot((snapshot) => {
      const QuestionArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        value: doc.data().Question,
      }));
      console.log(QuestionArray);
      setData(QuestionArray);
    });
  };
  // useEffect(() => {
  //   getData();
  // }, []);

  //render되는 화면
  const renderItem = ({ item }) => {
    
    if (item.id > String(questionKey)) {
      return null;
    } else {
      return (
        <View style={{ alignItems: "center", backgroundColor: COLOR_BG }}>
          <View style={{ flexDirection: "row", width: 360, height: 45 }}>
            <TouchableOpacity
              style={{
                flexDirection: "row",
                width: 62,
                height: 30,
                alignItems: "center",
                justifyContent: "center",
                paddingLeft: 15,
              }}
              onPress={() => navigation.navigate("AnswerList2", {questionKey : item.id, question : item.text, familyID: familyID})}
            >
              <Text style={{ fontSize: 17 }}>{item.id}.</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                justifyContent: "center",
                width: 298,
                height: 30,
                paddingLeft: 20,
                paddingRight: 15,
                paddingVertical: 6,
              }}
              onPress={() => navigation.navigate("AnswerList2", {questionKey : item.id, question : item.value, familyID: familyID})}
            >
              <Text style={{ fontSize: 14 }}>{item.value}</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    }
  };

  const getInform = async () => {
    try {
      await UserClientCollection.doc(user.uid)
        .get()
        .then(function (doc) {
          if (doc.exists) {
            setModalVisible(
              !(doc.data().currentAnswer === today.toDateString())
            );

            setName(doc.data().userName);
            setUserID(doc.id);
            setFamilyID(doc.data().familyID);
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

  useEffect(() => {
    getInform();
    getQuestionIndex();
    getData();
  }, []);

  return (
    <SafeArea>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        style={{ backgroundColor: COLOR_GREEN }}
      >
        <View style={[styles.centeredView, { flex: 1 }]}>
          <View
            style={{
              backgroundColor: COLOR_GREEN,
              paddingHorizontal: 30,
              paddingVertical: 50,
              borderRadius: 30,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text>"오늘의 문답"을 작성하지 않으셨네요!</Text>
            <Image
              source={require("../MainCharacter-removebg-preview.png")}
              style={{ height: 200, width: 200, resizeMode: "cover" }}
            ></Image>

            <View style={{ flexDirection: "row" }}>
              <Pressable
                style={styles.modalBtn}
                onPress={() => {
                  navigation.navigate("AnswerQuestionToday");
                  setModalVisible(false);
                }}
              >
                <Text>작성하러 가기</Text>
              </Pressable>
              <Pressable
                style={styles.modalBtn}
                onPress={() => {
                  setModalVisible(false);
                }}
              >
                <Text>나중에 할게요</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>

      <View
        style={{
          paddingHorizontal: 20,
          paddingVertical: 10,
          justifyContent: "center",
          alignItems: "center",
          marginVertical: 45,
        }}
      >
        <Text style={{ fontSize: 24 }}>답변 목록</Text>
      </View>

      <View>
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => String(item.id)}
          // onEndReachedThreshold = {10}
        ></FlatList>
      </View>
      {modalVisible ? (
        <BlurView style={styles.absolute} blurType="dark" blurAmount={4} />
      ) : null}
    </SafeArea>
  );
}

export default QuestionList;
