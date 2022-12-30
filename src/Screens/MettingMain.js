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
import { COLOR_BG, COLOR_DEEPGREEN, COLOR_GREEN } from "../Color";
import { styles } from "./AnswerQuestion";
import { mainStyle } from "./Home";



function MettingMain({ navigation: { navigate }, route }) {
  

  return (
    //오늘의 질문
    <View style={{ backgroundColor: COLOR_BG, flex: 1 }}>
      <View
        style={{
          height: 315,
          backgroundColor: COLOR_GREEN,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
          <AutoHeightImage 
          width={150}
          source={require("../오리사진.png")}
          />
    
      </View>

      <View style={{ paddingHorizontal: 15 }}>
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity
            style={[
              mainStyle.touchable,
              {
                width: 173,
                height: 160,
                backgroundColor: "white",
                borderRadius: 40,
                marginRight: 9.5,
                marginVertical: 7.5,
                marginTop: 60,
              },
            ]}
          >
            <Text style={MettingMainStyle.title}>안건 작성하기</Text>
            <Text style={MettingMainStyle.text}>함께 이야기해보고 싶은</Text>
            <Text style={MettingMainStyle.text}>주제들을 기록해 보세요!</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              mainStyle.touchable,
              {
                width: 173,
                height: 160,
                backgroundColor: "white",
                borderRadius: 40,
                marginLeft: 9.5,
                marginVertical: 7.5,
                marginTop: 60,
              },
            ]}
          >
            <Text style={MettingMainStyle.title}>안건 확인하기</Text>
            <Text style={MettingMainStyle.text}>함께 이야기해보고 싶은</Text>
            <Text style={MettingMainStyle.text}>주제들을 기록해 보세요!</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={[
            mainStyle.touchable,
            {
              width: 360,
              height: 90,
              backgroundColor: "white",
              borderRadius: 40,
              marginVertical: 7.5,
            },
          ]}
        >
          <Text style={MettingMainStyle.title}>금주의 안건 확인하기</Text>
          <Text style={MettingMainStyle.text}>
            이번주 회의 주제로 추천된 안건을 확인해 보세요!
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            mainStyle.touchable,
            {
              width: 360,
              height: 90,
              backgroundColor: "white",
              borderRadius: 40,
              marginVertical: 7.5,
            },
          ]}
        >
          <Text style={MettingMainStyle.title}>이전 회의 돌아보기</Text>
          <Text style={MettingMainStyle.text}>
            이전 회의 기록을 확인해 보세요!
          </Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
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
      </TouchableOpacity>
    </View>
  );
}

const MettingMainStyle = StyleSheet.create({
  title: {
    fontSize: 20,
  },
  text: {
    fontSize: 14,
  },
});

export default MettingMain;
