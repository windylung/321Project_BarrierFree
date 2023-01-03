import { createDrawerNavigator } from "@react-navigation/drawer";
import auth from "@react-native-firebase/auth";
import Home from "./Home";
import MettingMain from "./MettingMain";

const DrawerTabs = () => {
  const Drawer = createDrawerNavigator();
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Feed" component={Home} />
      <Drawer.Screen name="Article" component={MettingMain} />
    </Drawer.Navigator>
  );
};
export default DrawerTabs;
