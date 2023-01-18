import { Text, TouchableOpacity } from "react-native";
import { ButtonContainer, SafeArea } from "./StyleComponent";
import { user, UserClientCollection } from "./firebase";


const { View } = require("react-native");

const AccountWithdrawal = ({navigation}) => {
    //회원 탈퇴를 위한 함수
    const withDrawal = () => {
        try{
            UserClientCollection.doc(user.uid).delete();
            user.delete();
            navigation.reset({routes: [{name: 'FirstLogin'}]})
            console.log("account")
        }catch{
            (e) => console.log(e)
        }
    }
  return (
    <SafeArea>
      <View style={{ flex: 1, padding: 30 }}>
        <ButtonContainer onPress={() => withDrawal()}>
          <Text style={{ fontSize: 17, fontWeight: "600" }}>회원탈퇴</Text>
        </ButtonContainer>
      </View>
    </SafeArea>
  );
};

export default AccountWithdrawal;
