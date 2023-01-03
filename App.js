import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./src/Screens/Home";
import Question from "./src/Screens/Question";
import AnswerQuestion from "./src/Screens/AnswerQuestion";
import QuestionList from "./src/Screens/QuestionList";
import AnswerList from "./src/Screens/AnswerList";
import MettingMain from "./src/Screens/MettingMain";
import { Login } from "./src/Screens/Login";
import InformationInput from "./src/Screens/InformationInput";
import { SignUp } from "./src/Screens/SignUp";
import auth from "@react-native-firebase/auth";
import InformationModify from "./src/Screens/InformationModify";
import { AddFamily } from "./src/Screens/AddFamily";
import { COLOR_DEEPGREEN, COLOR_GREEN } from "./src/Color";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import BottomTabs from "./src/Screens/BottomTabs";

const Stack = createNativeStackNavigator();
// function Root() {
//   return (
//     <Drawer.Navigator>
//       <Drawer.Screen name="Home" component={Home} />
//       <Drawer.Screen name="Profile" component={Profile} />
//       <Stack.Screen name="Settings" component={Settings} />
//     </Drawer.Navigator>
//   );
// }





export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    console.log(auth().currentUser);
    auth().onAuthStateChanged((user) => {
      if (user) {
        console.log(user);
        console.log("here");
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
      console.log(isLoggedIn);
    });
  }, []);
  return (
    <NavigationContainer>
      {
        <Stack.Navigator
          
          screenOptions={{ headerShown: true}}
        >
          {isLoggedIn === false ? (
            <Stack.Screen name="Login" component={Login} />
          ) : (
            <>
            <Stack.Screen name="BottomTabs" component={BottomTabs} options={{ headerShown: false }}/>
            <Stack.Screen name="Home" component={Home} />
            </>
          )}
          <Stack.Screen name="SignUp" component={SignUp} />
          <Stack.Screen name="Question" component={Question} />
          <Stack.Screen name="AnswerQuestion" component={AnswerQuestion} />
          <Stack.Screen name="QuestionList" component={QuestionList} />
          <Stack.Screen name="AnswerList" component={AnswerList} />
          <Stack.Screen name="MettingMain" component={MettingMain} />
          <Stack.Screen name="InformationInput" component={InformationInput} />
          <Stack.Screen
            name="InformationModify"
            component={InformationModify}
          />
          <Stack.Screen
            name="AddFamily"
            component={AddFamily}
            options={{
              title: "가족 구성원 연결",
              headerStyle: {
                backgroundColor: COLOR_DEEPGREEN,
              },
              headerTintColor: "#fff",
              headerTitleStyle: {
                fontWeight: "bold",
              },
            }}
          />
      
        </Stack.Navigator>
      }
    </NavigationContainer>
  );
}
