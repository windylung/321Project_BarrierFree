import React from "react";
import { View, Text, Pressable, Modal } from "react-native";

function QuestionModal({ navigation }) {
  return (
    <View style={{ flexDirection: "row", backgroundColor: "green" }}>
      <Modal>
        <Pressable
          style={{ paddingHorizontal: 20 }}
          onPress={() => navigation.navigate("Question")}
        >
          <Text>문답</Text>
        </Pressable>
        <Pressable
          style={{ paddingHorizontal: 20 }}
          onPress={() => navigation.navigate("Question")}
        >
          <Text>가족회의</Text>
        </Pressable>
      </Modal>
    </View>
  );
}

export default QuestionModal;
