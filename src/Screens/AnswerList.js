import { BlurView } from "@react-native-community/blur";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Pressable,
  TextInput,
  StyleSheet,
  Modal,
  Image,
  TouchableOpacity,
} from "react-native";
import { COLOR_BG } from "../Color";
import { styles } from "./AnswerQuestion";
import { UserClientCollection } from "./firebase";
import { firebase } from "@react-native-firebase/auth";

function AnswerList({ navigation: { navigate }, route }) {
  //오늘의 질문, 답변 입력
  const today = new Date();
  const month = today.getMonth() + 1;
  const date = today.getDate();
  const [text, setText] = useState("");
  const user = firebase.auth().currentUser;
  // useEffect(() => {
  //   route.params === undefined ? null : setText(route.params.inputText.text);
  // });

  useEffect(() => {
    UserClientCollection.doc(user.uid).get().then(
      (doc) => {
        doc.data().answer.some(element => {
          console.log(element)
          // array.includes(1)
          if (doc.data().answer.questionKey.inclues(questionKey)) {
            setText(element.text)
          }
        });

        //

        /*
        */
        // console.log(doc.data().answer[0])
      }
    )
  }, [])


  return (
    //오늘의 질문
    <View style={{ padding: 30, backgroundColor: COLOR_BG, flex: 1 }}>
      <Text style={{ color: "grey" }}>#오늘의 질문</Text>
      <View
        style={{
          height: 177,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text style={{ fontWeight: "500", fontSize: 30 }}>
          {month} . {date}
        </Text>
        <Text>나에게 부모님/자녀란 어떤 존재인가?</Text>
      </View>
      <View>
        {/* 현재는 모든 구성원으로 나왔지만, DB에서는 id마다 날짜, 질문 내용, 나의 답변, ...이렇게 해야 하지 않을까  */}
        <View style={styles.answerView}>
          <Text>(나)의 답변</Text>
          <Text>{text}</Text>
          <View>
            <TouchableOpacity onPress={() => navigate("AnswerQuestion")}>
              {/* {text === "" ? (
                <Text style={{ color: "grey" }}>답변을 작성해주세요</Text>
              ) : (
                <Text style={styles.answerViewText}>{text}</Text>
              )} */}
              
            </TouchableOpacity>
          </View>
        </View>

        {/* 우선 View로 구성한 뒤, DB에 따라 FlatList로 구현하면 될듯  */}

        <View style={styles.answerView}>
          <Text>(가족구성원1)의 답변</Text>
          <View>
            <Text style={styles.answerViewText}>
              너무 고맙고, 소중한 존재. 때로는 너무 모질게 훈육한 것이 아닌가
              싶어도 아빠에겐 우리 딸 항상 걱정되고 잘 해주고 싶지. 아빠도
              나이를 먹어서 표현하는 방식이 네가 마음에 들지 않을 때도 있겠지만,
              항상 사랑하고 부족한 부분을 채워 주고자 하는 마음 기억해주길
              바란다.
            </Text>
            {text === "" ? (
              <BlurView
                style={styles.absolute}
                blurType="light"
                blurAmount={3}
                //   reducedTransparencyFallbackColor= {COLOR_BG}
              />
            ) : null}
          </View>
        </View>
        <View style={styles.answerView}>
          <Text>(가족구성원2)의 답변</Text>
          <View>
            <Text style={styles.answerViewText}>
              내 삶에서 가장 중요하고 소중하고 나의 애쓴 흔적이 보여지는 귀한
              존재이자 고단하고 힘든 삶을 계속 살아가게 하는 원동력. 언제나
              건강하고 행복하길 바랐으면 한다.
            </Text>
            {text === "" ? (
              <BlurView
                style={styles.absolute}
                blurType="light"
                blurAmount={3}
              />
            ) : null}
          </View>
        </View>
      </View>
    </View>
  );
}

export default AnswerList;
