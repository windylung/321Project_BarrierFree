import React, { useState } from "react";
import { View, Text, Pressable } from "react-native";

function Home({ navigation }) {
	const [answer, setAnswer] = useState(false);
  return (
    <View style={{flexDirection: "row"}}>
      <Pressable style= {{paddingHorizontal: 20}} onPress={() => answer===false ? navigation.navigate("AnswerQuestion") : navigation.navigate("QuestionList")}>
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
