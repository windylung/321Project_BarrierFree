import { useEffect, useState } from "react";
import { Modal, Text, TouchableOpacity, View } from "react-native";
import { COLOR_BG, COLOR_DEEPGREEN } from "../Color";
import { MettingCollection } from "./firebase";
import { mainStyle } from "./Home";
import { SafeArea } from "./StyleComponent";

export const MettingDuring = ({ route, navigation }) => {
  const [visible, setVisible] = useState(false);
  const { familyID, startTime, selectedAgenda } = route.params;

  useEffect(() => {
    MettingCollection.doc().set({
      familyID: familyID,
      startTime: startTime,
      endTime: startTime,
      review: [],
      selectedAgenda: selectedAgenda,
    });
  }, []);
  
  return (
    <SafeArea>
      <View style={{ flex: 1, padding: 30 }}>
        {/* '종료하기'버튼을 눌렀을 때 나오는 모달 창 
        => 아무곳이나 선택해도 모달이 사라지고, 화면 이동함  */}
        <Modal animationType="fade" transparent={true} visible={visible}>
          <TouchableOpacity
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "rgba(0, 0, 0, 0.4)",
            }}
            onPress={() => {
              //아무 곳이나 누르면 modal 창 사라짐
              setVisible(false);
              //1초 기다린 후 home 화면으로 이동
              setTimeout(() => {
                navigation.navigate("Home");
              }, 1000);
            }}
          >
            <View
              style={{
                backgroundColor: COLOR_BG,
                flex: 0.4,
                width: "80%",
                borderRadius: 30,
                padding: 30,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text>가족 회의가 종료되었습니다.</Text>
              <Text style={{ color: "grey" }}>화면을 터치해 주세요</Text>
            </View>
          </TouchableOpacity>
        </Modal>

        <View
          style={{
            flex: 0.9,
            backgroundColor: "white",
            borderRadius: 30,
            padding: 30,
            alignItems: "center",
          }}
        >
          <Text>오늘의 안건</Text>
        </View>
        <View style={{ flex: 0.1, justifyContent: "flex-end", padding: 30 }}>
          <TouchableOpacity
            //회의 종료하기 누르면 모달 창 생성
            // onPress={() => navigation.navigate("Home")}
            onPress={() => {
              setVisible(true);
            }}
            style={[
              mainStyle.touchable,
              {
                backgroundColor: COLOR_DEEPGREEN,
                borderRadius: 100,
                alignItems: "center",
                height: 50,
                marginHorizontal: 10,
              },
            ]}
          >
            <Text style={{ fontSize: 18, fontWeight: "500" }}>종료하기</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeArea>
  );
};
