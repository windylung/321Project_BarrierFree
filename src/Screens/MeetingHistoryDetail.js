import { firebase } from "@react-native-firebase/firestore";
import { useEffect, useState } from "react";
import {
  Alert,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { COLOR_TIFGREEN } from "../Color";
import { MeetingCollection, user } from "./firebase";
import { SafeArea } from "./StyleComponent";

export const MeetingHistoryDetail = ({ route, navigation }) => {
  const { docID } = route.params;
  const [meetingNum, setMeetingNum] = useState(0);
  const [meetingObj, setMeetingObj] = useState({});
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [selectedAgenda, setSelectedAgenda] = useState([]);
  // 이전에 입력한 후기 (처음이라면 "")
  const [review, setReview] = useState("");
  // 입력한 후기
  const [reviewInput, setReviewInput] = useState("");
  const [isInput, setIsInput] = useState(false);
  useEffect(() => {
    try {
      MeetingCollection.doc(docID.toString())
        .get()
        .then((doc) => {
          if (doc.exists) {
            console.log(doc.data());
            setMeetingObj(doc.data());
            setStartTime(
              doc.data().startTime.toDate().getHours().toString() +
                "시 " +
                doc.data().startTime.toDate().getMinutes().toString() +
                "분"
            );
            setEndTime(
              doc.data().endTime.toDate().getHours().toString() +
                "시 " +
                doc.data().endTime.toDate().getMinutes().toString() +
                "분"
            );
            const agenda = doc
              .data()
              .selectedAgenda.map((doc) => doc["agenda"]);

            console.log("data : ", doc.data().review);
            doc.data().review.forEach((item) => {
              if (item.userID === user.uid) {
                console.log(item.review);
                setReview(item.review);
                setReviewInput(item.review);
              }
            });
            setSelectedAgenda(agenda);
          }
        })
        .catch((e) => console.log(e));
    } catch {
      (e) => console.log(e);
    }
  }, []);

  const renderItem = ({ item }) => {
    return <Text style={{ fontSize: 16 }}>{item}</Text>;
  };

  const onSubmitReviewEditing = async (reviewInput) => {

    if (reviewInput === "") {
      return Alert.alert("후기를 입력해주세요");
    }
    console.log(review);
    await MeetingCollection.doc(docID.toString()).update({
      // 입력을 완료했을 때, 이전 review를 삭제
      review: firebase.firestore.FieldValue.arrayRemove({
        userID: user.uid,
        review: review,
      }),
    });
    await MeetingCollection.doc(docID.toString()).update({
      // 이후, 현재 입력 값을 새롭게 추가
      review: firebase.firestore.FieldValue.arrayUnion({
        userID: user.uid,
        review: reviewInput,
    
      }),
    });
    //사용자가 입력 => 저장 후 다시 수정할 경우 대비 
    setReview(reviewInput)

    Alert.alert("답변이 저장되었습니다")
  };

  return (
    <SafeArea>
      <View style={{ flex: 1, backgroundColor: COLOR_TIFGREEN }}>
        <View
          style={{
            paddingHorizontal: 40,
            flex: 311 / 864,
            padding: 30,
            justifyContent: "center",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 10,
            }}
          >
            <Image
              source={require("../Image/calendar.png")}
              style={{ width: 40, height: 40, marginRight: 20 }}
              resizeMode="cover"
            ></Image>
            <Text style={{ fontSize: 16 }}>{meetingObj.meetingDate}</Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 10,
            }}
          >
            <Image
              source={require("../Image/clock.png")}
              style={{ width: 40, height: 40, marginRight: 20 }}
              resizeMode="cover"
            ></Image>
            <Text style={{ fontSize: 16 }}>
              {startTime} ~ {endTime}
            </Text>
          </View>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 10,
            }}
          >
            <Image
              source={require("../Image/agenda.png")}
              style={{ width: 40, height: 40, marginRight: 20 }}
              resizeMode="cover"
            ></Image>
            <FlatList data={selectedAgenda} renderItem={renderItem} />
          </View>
        </View>
        <View
          style={{
            backgroundColor: "white",
            flex: 553 / 864,
            padding: 40,
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,

            justifyContent: "space-between",
          }}
        >
          <View style={{ alignItems: "flex-start" }}>
            <Text style={{ fontSize: 18, fontWeight: "bold" }}>
              가족회의는 어땠나요?
            </Text>

            <TouchableOpacity
              onPress={() => setIsInput(true)}
              style={{ marginTop: 40 }}
            >
              
                <TextInput
                  multiline
                  placeholder="후기를 작성해주세요"
                  value={reviewInput}
                  autoCapitalize="none"
                  autoCorrect={false}
                  returnKeyType="done"
                  onChangeText={(text) => setReviewInput(text)}
                  onSubmitEditing={() => onSubmitReviewEditing(reviewInput)}
                ></TextInput>
              
              
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={{ alignItems: "center"}} onPress={() => onSubmitReviewEditing(reviewInput)}>
            <Text style={{color: COLOR_TIFGREEN, fontWeight: "bold"}}>완료</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeArea>
  );
};
