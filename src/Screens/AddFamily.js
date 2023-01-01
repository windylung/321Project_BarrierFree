import { useEffect, useState } from "react";
import { Text, View } from "react-native"
import { getUserInformation } from "./getUserInformation";
import { ButtonContainer, SafeArea } from "./StyleComponent"


export const AddFamily = ({ navigation }) => {
    // const [invitationID, setInvitationID] = useState(getUserInformation("InvitationID"));
    // useEffect(() => {
    //     // console.log(getUserInformation("role"));
    //     const invitationID = getUserInformation("InvitationID");
    //   }, []);

    const ID = getUserInformation("invitationID");
    console.log("ID", getUserInformation("invitationID"));
    return (
        <SafeArea>
        <View>
            <Text>설정 - 가족 추가</Text>
            <Text>나의 코드{getUserInformation("invitationID")}</Text>
            <Text>가족 코드{getUserInformation("familyID")}</Text>
            <ButtonContainer>
                <Text>연결된 가족 목록</Text>
            </ButtonContainer>
        </View>
    </SafeArea>
        );
};

export default AddFamily;
