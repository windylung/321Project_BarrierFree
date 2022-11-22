import React from "react";
import { View, Text, Pressable } from "react-native";

function Home({ navigation }) {
  return (
    <View>
      <Pressable onPress={() => navigation.navigate("Question")}>
        <Text>문답</Text>
      </Pressable>
      <Pressable onPress={() => navigation.navigate("Question")}>
        <Text>가족회의</Text>
      </Pressable>
      <Pressable onPress={() => navigation.navigate("Question")}>
        <Text>정보제공</Text>
      </Pressable>
    </View>
  );
}

export default Home;
