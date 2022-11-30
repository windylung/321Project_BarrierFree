import React, { useState } from "react";
import { View, Text, Pressable } from "react-native";

function Home({ navigation }) {
  //오늘 답변 작성 여부 (여기서 따질 필요는 없어보임)
	const [answer, setAnswer] = useState(true);
  return (
    <View style={{flexDirection: "row"}}>
      <Pressable style= {{paddingHorizontal: 20}} onPress={() => navigation.navigate("QuestionList", {IsAnswer : {answer}})}>
        <Text>문답</Text>
      </Pressable>
      <Pressable style= {{paddingHorizontal: 20}} onPress={() => navigation.navigate("Question")}>
        <Text>가족회의</Text>
      </Pressable>
      <Pressable style= {{paddingHorizontal: 20}} onPress={() => navigation.navigate("Question")}>
        <Text>정보제공</Text>
      </Pressable>
    </View>
  );
}

export default Home;
