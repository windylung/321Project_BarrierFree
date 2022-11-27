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
import { styles } from "./AnswerQuestion";
// import { useNavigation } from '@react-navigation/native';

// const navigation = useNavigation();
// const goScreen = ({navigation : {navigate}, route}) => {
//   // console.log(route.params)
//   navigate("AnswerQuestionTwo")
// }

//render되는 화면
const renderItem = ({ item }) => {
  return (
    <View style={{ alignItems: "center" }}>
      <View style={{ flexDirection: "row", width: 360, height: 45 }}>
        {/* <Text>{item.id}</Text> */}
        <TouchableOpacity
          style={{
            flexDirection: "row",
            width: 62,
            height: 30,
            alignItems: "center",
            justifyContent: "center",
            paddingLeft: 15,
          }}
        >
          <Text style={{ fontSize: 17 }}>{item.month}</Text>
          <Text style={{ fontSize: 17 }}> / </Text>
          <Text style={{ fontSize: 17 }}>{item.date}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          // onPress={
          //   () => goScreen({QuestionId : item})
          // }
          style={{
            justifyContent: "center",
            width: 298,
            height: 30,
            paddingLeft: 20,
            paddingRight: 15,
            paddingVertical: 6,
          }}
        >
          <Text style={{ fontSize: 14 }}>{item.value}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

function QuestionList({ navigation, route }) {
  const [data, setData] = useState([]);
  const [modalVisible, setModalVisible] = useState(
    route.params.IsAnswer.answer
  );

  //질문 목록을 불러오는 함수 => 이후 DB에서 가져오도록 수정 필요
  const getData = () => {
    setData([
      {
        id: 16,
        value: "사랑도 사람도 너무나도 겁나 혼자인게 무서워",
        month: 11,
        date: 22,
      },
      {
        id: 15,
        value: "사랑도 사람도 너무나도 겁나 혼자인게 무서워",
        month: 11,
        date: 22,
      },
      {
        id: 14,
        value: "사랑도 사람도 너무나도 겁나 혼자인게 무서워",
        month: 11,
        date: 22,
      },
      {
        id: 13,
        value: "사랑도 사람도 너무나도 겁나 혼자인게 무서워",
        month: 11,
        date: 22,
      },
      {
        id: 12,
        value: "사랑도 사람도 너무나도 겁나 혼자인게 무서워",
        month: 11,
        date: 22,
      },
      {
        id: 11,
        value: "사랑도 사람도 너무나도 겁나 혼자인게 무서워",
        month: 11,
        date: 22,
      },
      {
        id: 10,
        value: "사랑도 사람도 너무나도 겁나 혼자인게 무서워",
        month: 11,
        date: 22,
      },
      {
        id: 9,
        value: "사랑도 사람도 너무나도 겁나 혼자인게 무서워",
        month: 11,
        date: 22,
      },
      {
        id: 8,
        value: "사랑도 사람도 너무나도 겁나 혼자인게 무서워",
        month: 11,
        date: 22,
      },
      {
        id: 7,
        value: "사랑도 사람도 너무나도 겁나 혼자인게 무서워",
        month: 11,
        date: 22,
      },

      {
        id: 6,
        value: "사랑도 사람도 너무나도 겁나 혼자인게 무서워",
        month: 11,
        date: 22,
      },
      {
        id: 5,
        value: "사랑도 사람도 너무나도 겁나 혼자인게 무서워",
        month: 11,
        date: 22,
      },
      {
        id: 4,
        value: "아동학대로 신고 접수된 적이 있으신가요?",
        month: 11,
        date: 22,
      },
      {
        id: 3,
        value: "상처를 치료해줄 사람어디 없나",
        month: 11,
        date: 22,
      },
      {
        id: 2,
        value: "가만히 놔두다가 끊임없이 덧나",
        month: 11,
        date: 22,
      },
      {
        id: 1,
        value: "사랑도 사람도 너무나도 겁나 혼자인게 무서워",
        month: 11,
        date: 22,
      },
    ]);
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <SafeAreaView style={{ padding: 30, backgroundColor: COLOR_BG }}>
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
              source={require("../오리사진.png")}
              style={{ height: 200, width: 200 }}
            ></Image>
            <View style={{ flexDirection: "row" }}>
              <Pressable
                style={styles.modalBtn}
                onPress={() => {
                  navigation.navigate("AnswerQuestion");
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
        ></FlatList>
      </View>
    </SafeAreaView>
  );
}

export default QuestionList;
