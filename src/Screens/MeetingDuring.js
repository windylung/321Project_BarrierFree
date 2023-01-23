import { useEffect, useState } from "react";
import { FlatList, Modal, Text, TouchableOpacity, View } from "react-native";
import { COLOR_BG, COLOR_DEEPGREEN, COLOR_GREY } from "../Color";
import { MeetingCollection } from "./firebase";
import { mainStyle } from "./Home";
import { dateFormat } from "./dateFormat";
import { SafeArea } from "./StyleComponent";

export const MettingDuring = ({ route, navigation }) => {
  const [visible, setVisible] = useState(false);
  const [docID, setDocID] = useState(null);
  const [disabled, setDisabled] = useState(true);
  const { familyID, meetingDate, startTime, selectedAgenda } = route.params;
  //5분이 경과되면 종료하기 버튼을 활성화
  setInterval(() => {
    setDisabled(false);
    // }, 300000);
  }, 30);

  useEffect(() => {
    MeetingCollection.add({
      familyID: familyID,
      meetingDate: meetingDate,
      startTime: startTime,
      endTime: startTime,
      review: null,
      selectedAgenda: selectedAgenda,
    })
      .then((docRef) => {
        //해당 회의의 document id => 이후 종료 시간 update할 때 document 접근 위함
        setDocID(docRef.id);
      })
      .catch((e) => console.log(e));
  }, []);

  const renderItem = ({ item }) => {
    console.log(item);
    return (
      <View style={{ marginVertical: 10 }}>
        <Text>{item.agenda}</Text>
      </View>
    );
  };

  const updateEndTime = async () => {
    try {
      let endTime = new Date()
      await MeetingCollection.doc(docID).update({
        endTime: endTime
      });
    } catch {
      (e) => console.log(e);
    }
  };
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
                navigation.navigate("DrawerTabs", { screen: "메인" });
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
          <FlatList data={selectedAgenda} renderItem={renderItem} />
        </View>
        <View style={{ flex: 0.1, justifyContent: "flex-end", padding: 30 }}>
          <TouchableOpacity
            //회의 종료하기 누르면 모달 창 생성
            // onPress={() => navigation.navigate("Home")}
            disabled={disabled}
            onPress={() => {
              // DB에 끝나는 시각(종료 버튼 누르는 시각) 업데이트
              updateEndTime();
              setVisible(true);
            }}
            style={[
              mainStyle.touchable,
              {
                backgroundColor: disabled ? COLOR_GREY : COLOR_DEEPGREEN,
                borderRadius: 100,
                alignItems: "center",
                height: 50,
                marginHorizontal: 10,
              },
            ]}
          >
            <Text style={{ fontSize: 18, fontWeight: "500" }}>종료하기</Text>
          </TouchableOpacity>
          {disabled ? (
            <Text>가족회의 시작 5분 후에 종료할 수 있습니다</Text>
          ) : null}
        </View>
      </View>
    </SafeArea>
  );
};
