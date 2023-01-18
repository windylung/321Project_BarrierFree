import firestore from "@react-native-firebase/firestore";

export const UserClientCollection = firestore().collection("User_Client");
export const AnswerCollection = firestore().collection("Answer");
export const QuestionCollection = firestore().collection("Question");
export const FamilyCollection = firestore().collection("Family");
export const RecommendAgendaCollection = firestore().collection("Recommend_Agenda");
export const MettingAgendaCollection = firestore().collection("MettingAgenda");
export const MettingCollection = firestore().collection("Metting");
import { firebase } from "@react-native-firebase/auth";
export const user = firebase.auth().currentUser;
