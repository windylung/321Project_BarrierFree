import { FlatList, Text, TouchableOpacity, View } from "react-native";
import {
  COLOR_BG,
  COLOR_DEEPGREEN,
  COLOR_GREEN,
  COLOR_TIFGREEN,
} from "../Color";
import { SafeArea } from "./StyleComponent";
import { Calendar, CalendarList, Agenda } from "react-native-calendars";
import { useEffect, useState } from "react";
import { MeetingCollection, user, UserClientCollection } from "./firebase";
import { useRoute } from "@react-navigation/native";
<<<<<<< HEAD
import { dateFormat } from "./dateFormat";

const MettingHistory = ({ route, navigation }) => {
  const [familyID, setFamilyID] = useState();
  const [markedDates, setMarkedDates] = useState();
  const [agendaList, setAgendaList] = useState();
  const [selectedDate, setSelectedDate] = useState(dateFormat(new Date()));

  useEffect(() => {
    try {
      UserClientCollection.doc(user.uid).onSnapshot((snapshot) =>
        setFamilyID(snapshot.data().familyID)
      );
=======


const MettingHistory = ({ route, navigation }) => {
  const [familyID, setFamilyID] = useState();
  const [meetingDayList, setMeetingDayList] = useState([]);
  const today = "2023-01-19";
  // console.log(typeof today === typeof "2023-01-19");
  useEffect(() => {
    try {
      UserClientCollection.doc(user.uid)
        .onSnapshot((snapshot) => setFamilyID(snapshot.data().familyID))

      console.log(familyID)
>>>>>>> 997c775 (fix. build error)
    } catch {
      (e) => {
        console.log(e);
      };
    }
  }, []);
<<<<<<< HEAD
=======
  

  useEffect(() => {

    MeetingCollection.where("familyID", "==", familyID).get().then(
      (querysnap) => console.log(querysnap.docs)
    )
  , [familyID]})
    
  
  
  
  // 캘린더에 표시 해야 하는데, 어떻게 하는게 좋을지
    // selectedDate list 해서 map으로 쭉 훑기
{/* <Agenda
  // The list of items that have to be displayed in agenda. If you want to render item as empty date
  // the value of date key has to be an empty array []. If there exists no value for date key it is
  // considered that the date in question is not yet loaded
  items={{
    '2012-05-22': [{name: 'item 1 - any js object'}],
    '2012-05-23': [{name: 'item 2 - any js object', height: 80}],
    '2012-05-24': [],
    '2012-05-25': [{name: 'item 3 - any js object'}, {name: 'any js object'}]
  }}/> */}
>>>>>>> 997c775 (fix. build error)

  useEffect(() => {
    try {
      MeetingCollection.where("familyID", "==", familyID).onSnapshot(
        (snapshot) => {
          const markedDates = snapshot.docs.reduce((acc, current) => {
            const formattedDate = current.data().meetingDate;
            acc[formattedDate] = { marked: true };
            return acc;
          }, {});
          const modifiedMarkedDates = {
            ...markedDates,
            [selectedDate]: {
              selected: true,
              marked: markedDates[selectedDate]?.marked,
            },
          };
          setMarkedDates(modifiedMarkedDates);
        }
      );
    } catch {
      (e) => console.log(e);
    }
  }, [familyID, selectedDate]);

  useEffect(() => {
    try {
      MeetingCollection.where("familyID", "==", familyID).onSnapshot(
        (snapshot) => {
          const agendaList = snapshot.docs.reduce((acc, current) => {
            console.log("*", current.id)
            var selectedAgenda = []
            selectedAgenda.push(current.data().selectedAgenda.map((doc) => (doc["agenda"])))
            if (acc[current.data().meetingDate] === undefined) {
              acc[current.data().meetingDate] = [];
              acc[current.data().meetingDate].push({
                //Agend에 가족회의 일정 버튼 제작하기 위함
                id : current.id,
                name: selectedAgenda,
                // startTime: current.data().startTime.toDate().toLocaleTimeString(),
                // endTime: current.data().endTime.toDate().toLocaleTimeString(),
                startTime:
                  current.data().startTime.toDate().getHours().toString() +
                  "시 " +
                  current.data().startTime.toDate().getMinutes().toString() +
                  "분",
                endTime:
                  current.data().endTime.toDate().getHours().toString() +
                  "시 " +
                  current.data().endTime.toDate().getMinutes().toString() +
                  "분",
              });
            } else {
              current
                .data()
                .selectedAgenda.map((doc) => console.log(doc.agenda));
              acc[current.data().meetingDate].push({
                //Agenda에 가족회의 일정 버튼 제작하기 위함
                id : current.id,
                name: selectedAgenda,
                startTime:
                  current.data().startTime.toDate().getHours().toString() +
                  "시 " +
                  current.data().startTime.toDate().getMinutes().toString() +
                  "분",
                endTime:
                  current.data().endTime.toDate().getHours().toString() +
                  "시 " +
                  current.data().endTime.toDate().getMinutes().toString() +
                  "분",
              });
            }

            return acc;
          }, {});
          setAgendaList(agendaList);
        }
      );
    } catch {
      (e) => console.log(e);
    }
  }, [familyID]);

  return (
    <SafeArea>
      <View style={{ flex: 1, backgroundColor: COLOR_BG,}}>
        {/* <View style={{flex: 0.05, paddingHorizontal: 30, paddingVertical: 20}}>
          
        <Text style={{fontSize: 16, fontWeight: "bold"}}>이전 회의 돌아보기</Text>
        <Text>회의 내용을 누르면 후기를 작성할 수 있습니다. </Text>
        </View> */}
        <Agenda
          items={agendaList}
          markedDates={markedDates}
          renderItem={(item) => {
            console.log(item);
            return (
              <TouchableOpacity
              onPress={() => navigation.navigate("MeetingHistoryDetail", {docID: item.id})}
              
                style={{ flex: 1, marginTop: 10, marginRight: 10 }}
              >
                <View
                  style={{
                    padding: 10,
                    borderRadius: 10,
                    backgroundColor: "white",
                  }}
                >
                  <Text style={{ color: "grey" }}>
                    {item.startTime} ~ {item.endTime}
                  </Text>
                  <FlatList
                    data={item.name[0]}
                    renderItem={({item}) => {
                      return (
                        <Text>{item}</Text>
                      )
                    }}
                  />
                    
                  
                </View>
              </TouchableOpacity>
            );
          }}
          renderList={(listProps) => {
            console.log(listProps);
          }}
          refreshing={true}
          showClosingKnob={true}
          theme={{
            agendaDayTextColor: COLOR_TIFGREEN,
            agendaDayNumColor: "black",
            agendaTodayColor: "red",
            agendaKnobColor: COLOR_TIFGREEN,
          }}
        />
      </View>
    </SafeArea>
  );
};

export default MettingHistory;
