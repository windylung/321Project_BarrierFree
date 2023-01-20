import auth from "@react-native-firebase/auth";
import {
  AppleButton,
  appleAuth,
} from "@invertase/react-native-apple-authentication";
import { View } from "react-native";
import { SafeArea } from "./StyleComponent";
import { useState } from "react";
import { user } from "./firebase";

export const SocialLogin = ({navigation}) => {
  const [isLoadingEnd, setIsLoadingEnd] = useState(false);
  const checkLoggedIn = () => {
    auth().onAuthStateChanged((user) => {
        if (user) {
            setLoggedIn(true)
            console.log("loggedIn")
        } else {
            setLoggedIn(false)
            console.log("loggedOut")
        }
    }
    )
}
console.log(isLoadingEnd)
  async function onAppleButtonPress() {
    // Start the sign-in request
    const appleAuthRequestResponse = await appleAuth.performRequest({
      requestedOperation: appleAuth.Operation.LOGIN,
      requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
    });

    // Ensure Apple returned a user identityToken
    if (!appleAuthRequestResponse.identityToken) {
      throw "Apple Sign-In failed - no identify token returned";
    }

    // Create a Firebase credential from the response
    const { identityToken, nonce } = appleAuthRequestResponse;
    const appleCredential = auth.AppleAuthProvider.credential(
      identityToken,
      nonce
    );

    // Sign the user in with the credential
    return auth().signInWithCredential(appleCredential);
    
  }

  return (
    <SafeArea>
      <View style={{ alignItems: "center", padding: 30 }}>
        <AppleButton
          buttonStyle={AppleButton.Style.WHITE}
          buttonType={AppleButton.Type.SIGN_IN}
          style={{
            width: 160,
            height: 45,
          }}
          onPress={() =>
            onAppleButtonPress()
              .then(() => {
                console.log("Apple sign-in complete!")
                navigation.navigate("InformationInput");
            }
              )
              .catch((error) => console.log(error))
          }
        />
      </View>
    </SafeArea>
  );
};
