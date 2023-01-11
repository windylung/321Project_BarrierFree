import Question from "./Question";
import Home from "./Home";
import MettingMain from "./MettingMain";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer, StackActions } from "@react-navigation/native";
import AnswerQuestion from "./AnswerQuestionToday";
import { StyleSheet } from "react-native";
import { News } from "./News";
import { COLOR_DEEPGREEN } from "../Color";
import QuestionList from "./QuestionList";

const Tab = createBottomTabNavigator();
const BottomTabs = () => {
    return (
        <Tab.Navigator initialRouteName="Home">
          <Tab.Screen name="문답" component={QuestionList}  options={BottomTabsStyle.QuestionList}/>
          <Tab.Screen name="Home" component={Home} options={BottomTabsStyle.Home}/>
          <Tab.Screen name="가족회의" component={MettingMain}  options={BottomTabsStyle.MettingMain}/>
          <Tab.Screen name="정보제공" component={News} options={BottomTabsStyle.News} />
        </Tab.Navigator>
    );  
};
const header = {
  headerStyle: {
    backgroundColor: COLOR_DEEPGREEN,
  },
  headerTintColor: "#fff",
  headerTitleStyle: {
    fontWeight: "bold",
  },
};

const BottomTabsStyle = StyleSheet.create({
  Home : {
    title: "Home",
    ...header
  },
  QuestionList : {
    title: "문답",
    ...header
  },
  MettingMain : {
    title: "가족회의",
    ...header
  },
  News : {
    title: "정보제공",
    ...header
  }
});

export default BottomTabs;



