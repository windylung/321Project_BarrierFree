import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './src/Screens/Home';
import Question from './src/Screens/Question';
import AnswerQuestion from './src/Screens/AnswerQuestion';
import QuestionList from './src/Screens/QuestionList';
import AnswerList from './src/Screens/AnswerList';
import MettingMain from './src/Screens/MettingMain';
import { Login } from './src/Screens/Login';
import InformationInput from './src/Screens/InformationInput';
import { SignUp } from './src/Screens/SignUp';
import firestore from '@react-native-firebase/firestore';

const Stack = createNativeStackNavigator();
export default function App() {
  
  return (
    <NavigationContainer>{
      <Stack.Navigator initialRouteName="Login"  screenOptions = {{ headerShown: false }}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Question" component={Question} />
        <Stack.Screen name="AnswerQuestion" component={AnswerQuestion} />
        <Stack.Screen name="QuestionList" component={QuestionList} />
        <Stack.Screen name="AnswerList" component={AnswerList} />
        <Stack.Screen name="MettingMain" component={MettingMain} />
        <Stack.Screen name="InformationInput" component={InformationInput} />
        
      </Stack.Navigator>
    }</NavigationContainer>
  );
}