import { Text, TouchableOpacity, View } from "react-native";
import { COLOR_BG } from "../Color";
import { SafeArea } from "./StyleComponent";
import { Calendar, CalendarList, Agenda } from "react-native-calendars";
import { useEffect, useState } from "react";
import { MeetingCollection, user, UserClientCollection } from "./firebase";
import { useRoute } from "@react-navigation/native";


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
    } catch {
      (e) => {
        console.log(e);
      };
    }
  }, []);
  

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

  // agenda
  return (
    <SafeArea>
      <View style={{ flex: 1, backgroundColor: COLOR_BG }}>
        <Calendar
          onDayPress={(day) => {
            console.log("selected day", day);
          }}
          onDayLongPress={(day) => {
            console.log("selected day", day);
          }}
          monthFormat={"yyyy MM"}
          onMonthChange={(month) => {
            console.log("month changed", month);
          }}
          // 화살표 색상 변경에 필요할 듯 renderArrow
          //   renderArrow={(direction) => <Arrow />}

          firstDay={1}
          onPressArrowLeft={(subtractMonth) => subtractMonth()}
          onPressArrowRight={(addMonth) => addMonth()}
          disableAllTouchEventsForDisabledDays={true}
          renderHeader={(date) => {
            return (
              <Text>
                {date.getFullYear()} . {date.getMonth() + 1}
              </Text>
            );
          }}
          enableSwipeMonths={true}
          markedDates={{
            [today]: { selected: true, marked: true, selectedColor: "blue" },
          }}
        />
      </View>
    </SafeArea>
  );
};

export default MettingHistory;
