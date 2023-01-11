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
import AutoHeightImage from "react-native-auto-height-image";
import styled from "styled-components";
import { COLOR_BG, COLOR_DEEPGREEN, COLOR_GREEN, COLOR_GREY } from "../Color";
import { styles } from "./AnswerQuestionToday";
import { mainStyle } from "./Home";
import { SafeArea } from "./StyleComponent";

function MettingMain({ navigation }) {
  return (
    //오늘의 질문
    <SafeArea>
      <View style={{ backgroundColor: COLOR_BG, flex: 1 }}>
        <View
          style={{
            flex: 0.4,
            backgroundColor: COLOR_GREEN,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image
            source={require("../MainCharacter-removebg-preview.png")}
            style={{ height: "100%", width: "80%", resizeMode: "cover" }}
          ></Image>
        </View>

        <View style={{ paddingHorizontal: 30, flex: 0.6, paddingTop: '10%'}}>
          <TouchableOpacity
            style={{
              backgroundColor: "white",
              height: '30%',
              borderRadius: 20,
              borderWidth: 1,
              borderColor: COLOR_GREY,
              padding: 30,
              marginVertical: 10
            }}
          >
              <Text style={{fontSize: 17}}>안건 작성하기</Text>
              <Text style={{fontSize: 14, color: 'grey'}}>작성한 안건 목록을 확인해 보세요!</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: "white",
              height: '30%',
              borderRadius: 20,
              borderWidth: 1,
              borderColor: COLOR_GREY,
              padding: 30,
              marginVertical: 10
            }}
          >
              <Text style={{fontSize: 17}}>이전 회의 돌아보기</Text>
              <Text style={{fontSize: 14, color: 'grey'}}>이전 회의 기록과 후기를 확인해 보세요!</Text>
          </TouchableOpacity>
        </View>
        {/* <TouchableOpacity
          style={[
            mainStyle.touchable,
            {
              width: 235,
              height: 60,
              backgroundColor: COLOR_DEEPGREEN,
              borderRadius: 100,
              position: "absolute",
              top: 285,

              bottom: 0,

              left: 79,

              right: 0,
            },
          ]}
        >
          <Text style={{ fontSize: 24 }}>회의 시작하기</Text>
        </TouchableOpacity> */}
      </View>
    </SafeArea>
  );
}

const MettingBtn = styled.TouchableOpacity`
  align-
`;

export default MettingMain;
