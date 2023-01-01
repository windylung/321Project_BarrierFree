import firestore from "@react-native-firebase/firestore";
import { firebase } from "@react-native-firebase/auth";

export const user = firebase.auth().currentUser;
export const UserClientCollection = firestore().collection("User_Client");
export const AnswerCollection = firestore().collection("Answer");
export const QuestionCollection = firestore().collection("Question");

