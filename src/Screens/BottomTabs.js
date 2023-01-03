import Question from "./Question";
import Home from "./Home";
import MettingMain from "./MettingMain";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import AnswerQuestion from "./AnswerQuestion";

const Tab = createBottomTabNavigator();
const BottomTabs = () => {
    return (
        <Tab.Navigator>
          <Tab.Screen name="문답" component={AnswerQuestion} />
          <Tab.Screen name="Home" component={Home} />
          <Tab.Screen name="가족회의" component={MettingMain} />
          <Tab.Screen name="정보제공" component={MettingMain} />
        </Tab.Navigator>

    );  
};

export default BottomTabs;



