import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  S,
  TouchableOpacitytyleSheet,
  StyleSheet,
} from "react-native";
import { COLOR_BG, COLOR_GREEN } from "../Color";

function Home({ navigation }) {
  //오늘 답변 작성 여부 (여기서 따질 필요는 없어보임)
  const [answer, setAnswer] = useState(true);
  return (
    <View style={mainStyle.background}>
      <View style={{ flexDirection: "row", justifyContent: "center" }}>
        <TouchableOpacity
          style={[mainStyle.btn, mainStyle.touchable]}
          onPress={() =>
            navigation.navigate("QuestionList", { IsAnswer: { answer } })
          }
        >
          <Text style={mainStyle.btnText}>문답</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[mainStyle.btn, mainStyle.touchable]}
          onPress={() => navigation.navigate("MettingMain")}
        >
          <Text style={mainStyle.btnText}>가족회의</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[mainStyle.btn, mainStyle.touchable]}
          onPress={() => navigation.navigate("Question")}
        >
          <Text style={mainStyle.btnText}>정보제공</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export const mainStyle = StyleSheet.create({
  background: {
    padding: 30,
    backgroundColor: COLOR_BG,
    flex: 1,
  },
  btn: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: COLOR_GREEN,
    width: 100,
    borderRadius: 10,
    marginHorizontal: 10,
    marginVertical: 20,
  },
  btnText: {
    textAlign: "center",
    fontSize: 15,
  },
  touchable: {
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Home;
