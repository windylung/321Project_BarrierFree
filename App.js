import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './src/Screens/Home';
import Question from './src/Screens/Question';
import AnswerQuestion from './src/Screens/AnswerQuestion';
import QuestionList from './src/Screens/QuestionList';
import QuestionModal from './src/Screens/Modal';
import AnswerList from './src/Screens/AnswerList';


const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <NavigationContainer>{
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Question" component={Question} />
        <Stack.Screen name="AnswerQuestion" component={AnswerQuestion} />
        <Stack.Screen name="QuestionList" component={QuestionList} />
        <Stack.Screen name="AnswerList" component={AnswerList} />
        
      </Stack.Navigator>
    }</NavigationContainer>
  );
}