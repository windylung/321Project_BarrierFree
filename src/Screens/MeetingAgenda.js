import { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  KeyboardAvoidingView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { COLOR_DEEPGREEN, COLOR_GREY } from "../Color";
import {
  MettingAgendaCollection,
  user,
  UserClientCollection,
} from "./firebase";
import { SafeArea } from "./StyleComponent";

export const MeetingAgenda = () => {
  const [agenda, setAgenda] = useState("");
  const [agendaList, setAgendaList] = useState([]);
  const renderItem = ({ item }) => {
    return (
      <View
        style={{
          borderRadius: 50,
          backgroundColor: COLOR_GREY,
          height: 40,
          justifyContent: "center",
          paddingHorizontal: 30,
          marginVertical: 10,
        }}
      >
        <Text>{item.agenda}</Text>
      </View>
    );
  };

  const onSubmitAgendaEditing = async (agenda) => {
    try {
      await MettingAgendaCollection.doc().set({
        userID: user.uid,
        familyID: familyID,
        agenda: agenda,
        createTime: Date.now(),
      });
      setAgenda("");
      console.log("Create Complete!!");
    } catch (error) {
      console.log(error.message);
    }
  };
  const [familyID, setFamilyID] = useState();
  useEffect(() => {
    try {
      UserClientCollection.doc(user.uid)
        .get()
        .then((doc) => {
          setFamilyID(doc.data().familyID);
        });
    } catch {
      (e) => {
        console.log(e);
      };
    }
  }, []);

  useEffect(() => {
    try {
      MettingAgendaCollection.where("userID", "==", user.uid)
        .orderBy("createTime")
        .onSnapshot((snapshot) => {
          if (snapshot !== null) {
            const agendaList = snapshot.docs.map((doc) => ({
              agenda: doc.data().agenda,
            }));
            setAgendaList(agendaList);
          }
        });
    } catch {
      (e) => {
        console.log(e);
      };
    }
  }, [agendaList]);

  return (
    <SafeArea>
      <View style={{ flex: 1, padding: 30 }}>
        <TextInput
          multiline
          style={{
            backgroundColor: "white",
            borderRadius: 50,
            height: 42,
            borderWidth: 1,
            borderColor: COLOR_GREY,
            paddingHorizontal: "5%",
            justifyContent: "center",
            alignItems: "center",
          }}
          placeholder="안건을 입력하세요"
          returnKeyType="done"
          value={agenda}
          onChangeText={(text) => setAgenda(text)}
          onSubmitEditing={() => onSubmitAgendaEditing(agenda)}
        ></TextInput>
        <FlatList data={agendaList} renderItem={renderItem}></FlatList>
      </View>
    </SafeArea>
  );
};
