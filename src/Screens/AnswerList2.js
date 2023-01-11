import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { COLOR_DEEPGREEN } from "../Color";
import { SafeArea } from "./StyleComponent";
import { firebase, doc, onSnapshot } from "@react-native-firebase/firestore";
import { FamilyCollection, UserClientCollection } from "./firebase";
import { useEffect, useState } from "react";

export const AnswerList2 = ({ route, navigation }) => {
  const { questionKey, question, familyID } = route.params;
  const [data, setData] = useState([]);

  function getAnswerList() {
    UserClientCollection.where("familyID", "==", familyID)
      .get()
      .then((snapshot) => {
        const answerList = snapshot.docs.map((doc) => {
            var text = "";
            if (doc.data().answer !== undefined) {
                
                if (doc.data().answer.find(element => element.questionKey === Number(questionKey)) !== undefined)
                    text = doc.data().answer.find(element => element.questionKey === Number(questionKey)).text
            }
          return ({
            name: doc.data().userName,
            text : text
          });
        });
        console.log(answerList);
        setData(answerList);
      })
      .catch((e) => console.log(e));
  }

  useEffect(() => {
    getAnswerList();
  }, []);
  const renderItem = ({ item }) => {
    return (
      <Text>
        {item.name}.{item.text}
      </Text>
    );
  };
  return (
    <SafeArea>
      <View style={{ padding: 20, flex: 1 }}>
        <Text style={{ color: "grey" }}></Text>
        <View
          style={{
            height: 177,
            alignItems: "center",
            justifyContent: "center",
            flex: 0.3,
          }}
        >
          <Text style={{ fontWeight: "500", fontSize: 30 }}>
            {Number(questionKey) < 10 ? "0" : null}
            {questionKey}.
          </Text>
          <Text style={{ fontSize: 17 }}>{question}</Text>
        </View>
        {/* 현재는 모든 구성원으로 나왔지만, DB에서는 id마다 날짜, 질문 내용, 나의 답변, ...이렇게 해야 하지 않을까  */}
        <View style={{ flex: 0.7 }}>
          <Text style={{ fontSize: 15, fontWeight: "700" }}>
            나의 답변{"\n"}
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate("AnswerQuestion")}>
            <Text>수정하기</Text>
          </TouchableOpacity>
          <FlatList data={data} renderItem={renderItem}></FlatList>
          <TouchableOpacity
            style={{
              backgroundColor: COLOR_DEEPGREEN,
              alignSelf: "center",
              justifyContent: "center",
              alignItems: "center",
              width: "80%",
              borderRadius: 20,
              marginTop: 20,
              // paddingVertical: "3%",
              flex: 0.1,
            }}
            onPress={() => {
              navigation.goBack();
            }}
          >
            <Text>완료</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeArea>
  );
};
