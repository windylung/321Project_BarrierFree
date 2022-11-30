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

function AnswerList({ navigation: { navigate }, route }) {
  //오늘의 질문, 답변 입력
  const today = new Date();
  const month = today.getMonth() + 1;
  const date = today.getDate();
  const [text, setText] = useState("");
  useEffect(() => {
    route.params === undefined ? null : setText(route.params.inputText.text);
  });

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
        <Text>상담을 시작한 목적이 무엇인가요?</Text>
      </View>
      <View>
        {/* 현재는 모든 구성원으로 나왔지만, DB에서는 id마다 날짜, 질문 내용, 나의 답변, ...이렇게 해야 하지 않을까  */}
        <View style={styles.answerView}>
          <Text>(나)의 답변</Text>
          <View>
            <TouchableOpacity onPress={() => navigate("AnswerQuestion")}>
              {text === "" ? (
                <Text style={{ color: "grey" }}>답변을 작성해주세요</Text>
              ) : (
                <Text  style={styles.answerViewText}>{text}</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>

        {/* 우선 View로 구성한 뒤, DB에 따라 FlatList로 구현하면 될듯  */}

        <View style={styles.answerView}>
          <Text>(가족구성원1)의 답변</Text>
          <View>
            <Text style={styles.answerViewText}>
              답변이 작성되었습니다. 이 글은 영국에서부터 시작하여 어쩌구 저쩌구
              솰라
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
              답변이 작성되었습니다. 이 글은 영국에서부터 시작하여 어쩌구 저쩌구
              솰라똑바로 봐 What's the situation 당황한 너의 시선 너머 끝내
              무너지는 성벽 차츰 밝아오는 새벽 Yeah uh 끝없이 이어지고 있어 무딘
              칼날 끝에 잘라내지 못해 계속 반복되는 문제 Yeah 미처 풀지 못한
              숙제 높은 벽 앞에 스러지던 작고 약한 바람 소리가 뒤엉켜 폭풍처럼
              몰아치는 닿지 않을 듯한 외침
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
