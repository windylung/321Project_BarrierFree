import { useEffect, useState } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { COLOR_DEEPGREEN, COLOR_GREEN } from "../Color";
import { MettingAgendaCollection, RecommendAgendaCollection } from "./firebase";
import { mainStyle } from "./Home";
import { SafeArea } from "./StyleComponent";
import BouncyCheckbox from "react-native-bouncy-checkbox";

export const MeetingAgendaSelect = ({ route, navigation }) => {
  const { familyID } = route.params;
  let randomIndexArray = [];
  //추천 안건 리스트
  const [recommendAgenda, setRecommendAgenda] = useState([]);
  //가족들이 쓴 안건 리스트
  const [familyAgenda, setFamilyAgenda] = useState([]);
  //사용자가 선택한 안건
  const [selectedAgenda, setSelectedAgenda] = useState([]);
  // 사용자가 선택한 안건의 개수 ('다음'버튼 활성화에 필요함)
  // const [selectedNum, setSelectedNum] = useState(0);

  // useEffect(() => {
  //   setSelectedNum(selectedAgenda.length)
  //   console.log(selectedNum)
  // }, [selectedAgenda])

  // 체크 박스를 체크 하였을 때
  const onPressInCheckbox = (item) => {
    // 해당 체크 박스가 기존에 선택되지 않았다면 => selected Agenda 배열에 추가
    const newArr = selectedAgenda;
    newArr.push(item);
    setSelectedAgenda(newArr);
  };

  // 체크 박스를 체크 해지 하였을 때
  const onPressOutCheckbox = async (item) => {
    const newArr = selectedAgenda.filter((e) => e.id !== item.id);
    setSelectedAgenda(newArr);
  };

  const getRecommendAgenda = () => {
    try {
      RecommendAgendaCollection.where("index", "in", randomIndexArray)
        .get()
        .then((querySnapshot) => {
          const agendaList = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            agenda: doc.data().agenda,
          }));
          setRecommendAgenda(agendaList);
        });
    } catch {
      (e) => console.log(e);
    }
  };
  useEffect(() => {
    for (i = 0; i < 3; i++) {
      randomNum = Math.floor(Math.random() * 5);
      if (randomIndexArray.indexOf(randomNum) === -1) {
        randomIndexArray.push(randomNum);
      } else {
        i = i - 1;
      }
    }

    getRecommendAgenda();
  }, []);

  useEffect(() => {
    // orderBy("createTime")
    MettingAgendaCollection.where("familyID", "==", familyID).onSnapshot(
      (snapshot) => {
        if (snapshot !== null) {
          const familyAgenda = snapshot.docs.map((doc) => ({
            id: doc.id,
            agenda: doc.data().agenda,
          }));
          console.log(familyAgenda);
          setFamilyAgenda(familyAgenda);
        } else {
          console.log("here", snapshot);
        }
      }
    );
  }, []);

  const renderItemRecommend = ({ item }) => {
    // return <Text>{item.agenda}</Text>;
    return (
      <BouncyCheckbox
        size={23}
        fillColor={COLOR_GREEN}
        unfillColor="#FFFFFF"
        text={item.agenda}
        onPress={(isChecked) => {
          isChecked === true
            ? onPressInCheckbox(item)
            : onPressOutCheckbox(item);
        }}
        style={{ marginVertical: 5 }}
        textStyle={{
          textDecorationLine: "none",
          color: "black",
        }}
        //사각형 체크박스 구현
        // iconStyle={{
        //   borderRadius: 0,
        // }}
      />
    );
  };

  function dateFormat(date) {
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let hour = date.getHours();
    let minute = date.getMinutes();
    let second = date.getSeconds();

    month = month >= 10 ? month : '0' + month;
    day = day >= 10 ? day : '0' + day;
    hour = hour >= 10 ? hour : '0' + hour;
    // minute = minute >= 10 ? minute : '0' + minute;
    // second = second >= 10 ? second : '0' + second;

    // return date.getFullYear() + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second;
    return date.getFullYear() + '-' + month + '-' + day ;
}
  const renderItemFamilyAgenda = ({ item }) => {
    // return <Text>{item.agenda}</Text>;
    return (
      <BouncyCheckbox
        size={23}
        fillColor={COLOR_GREEN}
        unfillColor="#FFFFFF"
        text={item.agenda}
        onPress={(isChecked) => {
          isChecked === true
            ? onPressInCheckbox(item)
            : onPressOutCheckbox(item);
        }}
        style={{ marginVertical: 5 }}
        textStyle={{
          textDecorationLine: "none",
          color: "black",
        }}
      />
    );
  };

  return (
    <SafeArea>
      <View style={{ flex: 1 }}>
        <View
          style={{
            flex: 0.3,
            backgroundColor: COLOR_DEEPGREEN,
            paddingHorizontal: 30,
            paddingVertical: 20,
            alignItems: "flex-start",
          }}
        >
          <Text style={{ fontSize: 16, fontWeight: "600" }}>추천 안건</Text>
          <Text style={{ fontSize: 16 }}>
            가족 회의에서 다루고 싶은 안건을 선택해주세요
          </Text>
          <FlatList
            data={recommendAgenda}
            renderItem={renderItemRecommend}
          ></FlatList>
        </View>
        <View style={{ paddingHorizontal: 30, flex: 0.6, paddingTop: 20 }}>
          <View
            style={{
              flex: 1,
              backgroundColor: "white",
              borderRadius: 30,
              paddingHorizontal: 30,
              paddingVertical: 20,
              alignItems: "center",
            }}
          >
            <Text style={{ fontSize: 16, fontWeight: "600" }}>
              가족들이 쓴 안건
            </Text>
            {/* 가족들의 안건을 출력하는 FlatList */}
            <FlatList data={familyAgenda} renderItem={renderItemFamilyAgenda} />
          </View>
        </View>
        <View style={{ flex: 0.1, justifyContent: "flex-end", padding: 30 }}>
          <TouchableOpacity
            onPress={() =>{

              const date = new Date()
              navigation.reset({
                routes: [
                  {
                    name: "MettingDuring",
                    params: {
                      familyID: familyID,
                      startTime: dateFormat(new Date()),
                      // startTime: {

                      // },
                      selectedAgenda: selectedAgenda,
                    },
                  },
                ],
              })
            }
          }
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
            <Text style={{ fontSize: 18, fontWeight: "500" }}>다음</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeArea>
  );
};
