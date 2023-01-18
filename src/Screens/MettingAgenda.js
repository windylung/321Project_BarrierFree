import { Image, Text, TouchableOpacity, View } from "react-native";
import { COLOR_GREY } from "../Color";
import { SafeArea } from "./StyleComponent";

export const MettingAgenda = () => {
  return (
    <SafeArea>
      <View style={{ flex: 1, padding: 30 }}>
        
        <View
          style={{
            borderRadius: 50,
            backgroundColor: "white",
            width: "90%",
            alignSelf: "center",
            borderColor: COLOR_GREY,
            borderWidth: 1,
            marginVertical: 10,
            flexDirection: "row",
            paddingVertical: 10,
            paddingHorizontal: 20,
            justifyContent: "space-between",
          }}
        >
          <View style={{flex: 0.8}}>
            <Text style={{ fontSize: 15 }}>
            아침미다 준비에 시간이 너무 오래걸려요 씻는 순서를 정하고 싶어요
            </Text>
          </View>
          <View style={{flex: 0.1, alignItems: "center", justifyContent: "center"}}>
            <TouchableOpacity>
              <Text style={{ fontSize: 15 }}>X</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            borderRadius: 50,
            backgroundColor: "white",
            width: "90%",
            alignSelf: "center",
            borderColor: COLOR_GREY,
            borderWidth: 1,
            marginVertical: 10,
            flexDirection: "row",
            paddingVertical: 10,
            paddingHorizontal: 20,
            justifyContent: "space-between",
          }}
        >
          <View style={{flex: 0.8}}>
            <Text style={{ fontSize: 15 }}>
            가족 여행을 가고 싶어요
            </Text>
          </View>
          <View style={{flex: 0.1, alignItems: "center", justifyContent: "center"}}>
            <TouchableOpacity>
              <Text style={{ fontSize: 15 }}>X</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            borderRadius: 50,
            backgroundColor: "white",
            width: "90%",
            alignSelf: "center",
            borderColor: COLOR_GREY,
            borderWidth: 1,
            marginVertical: 10,
            flexDirection: "row",
            paddingVertical: 10,
            paddingHorizontal: 20,
            justifyContent: "space-between",
          }}
        >
          <View style={{flex: 0.8}}>
            <Text style={{ fontSize: 15 }}>
            가족 여행을 가고 싶어요
            </Text>
          </View>
          <View style={{flex: 0.1, alignItems: "center", justifyContent: "center"}}>
            <TouchableOpacity>
              <Text style={{ fontSize: 15 }}>X</Text>
            </TouchableOpacity>
          </View>
        </View>
        
      </View>
    </SafeArea>
  );
};
