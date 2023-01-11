import { View } from "react-native";
import { Image } from "react-native-elements";
// import FastImage from "react-native-fast-image";
import { COLOR_BG } from "../Color";
import { SafeArea } from "./StyleComponent";

export const News = () => {
  return (
    <SafeArea>
      <View style={{flex: 1}}>
        {/* <FastImage
          style={{ width: "100%", height: "100%" }}
          source={require("../Image/walkingDuck.gif")}
          resizeMode={FastImage.resizeMode.cover}
        ></FastImage> */}
      </View>
    </SafeArea>
  );
};
