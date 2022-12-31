import firestore from "@react-native-firebase/firestore";
import { firebase } from "@react-native-firebase/auth";
import { useState } from "react";

const UserClientCollection = firestore().collection("User_Client");
const user = firebase.auth().currentUser;

//사용자의 정보 중 type에 알맞은 정보를 return 하는 함수
// export function getUserInformation(type) {
//   return new Promise (function(resolve, reject){
//     UserClientCollection.doc(user.uid)
//     .get()
//     .then((doc) => {
//       if (doc.exists) {
//         resolve( doc.data()[type]);
//       } else {
//         reject(new Error("No such document!"));
//       }
//     })
//     .catch(function (error) {
//       reject(new Error("Error getting document"));
//     });
//   })
// };
export function getUserInformation(type) {
  UserClientCollection.doc(user.uid)
    .get()
    .then((doc) => {
      if (doc.exists) {
        data = doc.data()[type];
        // console.log("안", data);
      }
      return data;
    });
  // console.log("밖", data);
  return data;
}
