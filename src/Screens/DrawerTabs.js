import { createDrawerNavigator } from "@react-navigation/drawer";
import auth from "@react-native-firebase/auth";
import Home from "./Home";
import MettingMain from "./MettingMain";
import { StackActions } from "@react-navigation/native";
import Question from "./Question";
import BottomTabs from "./BottomTabs";

const DrawerTabs = () => {

  const Drawer = createDrawerNavigator();
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Test" component={BottomTabs}/>
      <Drawer.Screen name="Feed" component={Home} />
      <Drawer.Screen name="Article" component={MettingMain} />
      {/* <Drawer.Screen name="Test2" component={}/> */}
    </Drawer.Navigator>
  );
};
export default DrawerTabs;
