import firestore from "@react-native-firebase/firestore";

export const UserClientCollection = firestore().collection("User_Client");
export const AnswerCollection = firestore().collection("Answer");
export const QuestionCollection = firestore().collection("Question");

