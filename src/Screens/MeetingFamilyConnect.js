import { useEffect, useState } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { COLOR_DEEPGREEN, COLOR_GREY } from "../Color";
import { FamilyCollection, user, UserClientCollection } from "./firebase";
import { mainStyle } from "./Home";
import { SafeArea } from "./StyleComponent";

export const MeetingFamilyConnect = ({ navigation }) => {
  const [familyID, setFamilyID] = useState();
  const [data, setData] = useState([]);
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
      UserClientCollection.where("familyID", "==", familyID).onSnapshot(
        (snapshot) => {
          if (snapshot !== null) {
            const data = snapshot.docs.map((doc) => ({
              id: doc.id,
              userName: doc.data().userName,
              role: doc.data().role,
            }));
            setData(data);
          }
        }
      );
    } catch {
      (e) => console.log(e);
    }
  }, [familyID]);
  // const getData = () => {
  //   try {
  //     console.log(familyID)
  //     if (familyID !== 0) {
  //       UserClientCollection.where("familyID", "==", familyID)
  //         .onSnapshot((snapshot) => {
  //           const data = snapshot.docs.map((doc) => ({
  //             id: doc.id,
  //             userName: doc.data().userName,
  //           }));
  //           setData(data);
  //         });
  //     }
  //   } catch {
  //     (e) => console.log(e);
  //   }
  // };

  const renderItem = ({ item }) => {
    return (
      <View
        style={{
          
          borderRadius: 50,
          backgroundColor: COLOR_GREY,
          height: 40,
          justifyContent: "space-evenly",
          alignItems: "center",
          // paddingHorizontal: 30,
          marginVertical: 10,
          width: 250,
          flexDirection: "row",
        
        }}
      >
        <Text>{item.userName}</Text>
        <Text>{item.role}</Text>
      </View>
    );
  };
  return (
    <SafeArea>
      <View style={{ flex: 1, padding: 30 }}>
        <View
          style={{
            flex: 0.9,
            backgroundColor: "white",
            borderRadius: 30,
            padding: 30,
            alignItems: "center",
          }}
        >
          <Text>연결된 가족 목록</Text>
          {familyID === 0 ? (
            <Text style={{ color: "grey" }}>연결된 가족이 없습니다</Text>
          ) : (
            <FlatList
              data={data}
              renderItem={renderItem}
              keyExtractor={(item) => String(item.id)}
            />
          )}
        </View>
        <View style={{ flex: 0.1, justifyContent: "flex-end", padding: 30 }}>
          <TouchableOpacity
            onPress={() => navigation.navigate("MeetingAgendaSelect", {familyID: familyID})}
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
