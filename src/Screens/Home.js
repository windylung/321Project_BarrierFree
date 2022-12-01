import React, { useState } from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { COLOR_GREEN } from "../Color";

function Home({ navigation }) {
  //오늘 답변 작성 여부 (여기서 따질 필요는 없어보임)
  const [answer, setAnswer] = useState(true);
  return (
    <View style={{flexDirection: "row", justifyContent: "center"}}>
      <Pressable
        style={mainStyle.btn}
        onPress={() =>
          navigation.navigate("QuestionList", { IsAnswer: { answer } })
        }
      >
        <Text style={mainStyle.btnText}>문답</Text>
      </Pressable>
      <Pressable
        style={mainStyle.btn}
        onPress={() => navigation.navigate("Question")}
      >
        <Text style={mainStyle.btnText}>가족회의</Text>
      </Pressable>
      <Pressable
        style={mainStyle.btn}
        onPress={() => navigation.navigate("Question")}
      >
        <Text style={mainStyle.btnText}>정보제공!</Text>
      </Pressable>
    </View>
  );
}

const mainStyle = StyleSheet.create({
  btn: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: COLOR_GREEN,
    width: 100,
    borderRadius: 10,
    marginHorizontal: 10,
    marginVertical: 20
  },
  btnText: {
    textAlign: "center",
    fontSize: 15,
  },
});

export default Home;
