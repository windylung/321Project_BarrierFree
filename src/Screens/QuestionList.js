import React from "react";
import { View, Text, Pressable, FlatList } from "react-native";
import CollapsibleView from "@eliav2/react-native-collapsible-view";

function QuestionList({ navigation }) {
  const [select, setSelect] = React.useState("personal");
  return (
    <View>
      <View style={{ flexDirection: "row" }}>
        <Pressable>
          <Text
            style={{
              color: select === "personal" ? "black" : "grey",
            }}
          >
            개인 질문
          </Text>
        </Pressable>
        <Text> / </Text>
        <Pressable>
          <Text
            style={{
              color: select === "common" ? "black" : "grey",
            }}
          >
            공통 질문
          </Text>
        </Pressable>
      </View>
      {/* <FlatList>
        <Text>10 / 01  상담을 시작한 목적이 무엇인가요?</Text>
      </FlatList> */}
      <View>
        <CollapsibleView
          style={{ borderWidth: 0, alignItems: "flex-start" }}
          arrowStyling={{ size: 20, rounded: true }}
          title={
            <Text style={{ color: "black" }}>
              11 / 02 아동학대로 신고 접수된 적이 있으신가요?
            </Text>
          }
        >
          <View
            style={{
              borderLeftWidth: 30,
              borderRightWidth: 30,
              borderColor: "rgba(0, 0, 0, 0)",
            }}
          >
            <Text>
              아이와 다시 사이 좋게 지내고 싶습니다. 아이를 때리고 나서 너무
              많이 후회합니다....? 나 나나나 나나나나나나 솨 하하하하나는요
              오빠가 좋은걸`~~~ 눈물이 차올라서 고갤들어~~ 흐르지 못하게 또
              살짝웃어 ?
            </Text>
          </View>
        </CollapsibleView>

        <CollapsibleView
          style={{ borderWidth: 0, alignItems: "flex-start" }}
          arrowStyling={{ size: 20, rounded: true, color: "purple" }}
          title={
            <Text style={{ color: "black" }}>
              10 / 01 상담을 시작한 목적이 무엇인가요?
            </Text>
          }
        >
          <View
            style={{
              borderLeftWidth: 30,
              borderRightWidth: 30,
              borderColor: "rgba(0, 0, 0, 0)",
            }}
          >
            <Text>
              아이와 다시 사이 좋게 지내고 싶습니다. 아이를 때리고 나서 너무
              많이 후회합니다....? 나 나나나 나나나나나나 솨 하하하하나는요
              오빠가 좋은걸`~~~ 눈물이 차올라서 고갤들어~~ 흐르지 못하게 또
              살짝웃어 ?
            </Text>
          </View>
        </CollapsibleView>

        <CollapsibleView
          collapsibleContainerStyle={{ position: "absolute", top: "100%" }}
          style={{ borderWidth: 0, alignItems: "flex-start" }}
          arrowStyling={{ size: 20, rounded: true, color: "purple" }}
          title={
            <Text style={{ color: "black" }}>
              10 / 01 상담을 시작한 목적이 무엇인가요?
            </Text>
          }
        >
          <View
            style={{
              borderLeftWidth: 30,
              borderRightWidth: 30,   
              borderColor: "rgba(0, 0, 0, 0)",
            }}
          >
            <Text>
              아이와 다시 사이 좋게 지내고 싶습니다. 아이를 때리고 나서 너무
              많이 후회합니다....? 나 나나나 나나나나나나 솨 하하하하나는요
              오빠가 좋은걸`~~~ 눈물이 차올라서 고갤들어~~ 흐르지 못하게 또
              살짝웃어 ?
            </Text>
          </View>
        </CollapsibleView>
      </View>
    </View>
  );
}

export default QuestionList;
