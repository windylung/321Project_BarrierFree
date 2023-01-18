import styled from "styled-components/native";
import { COLOR_BG, COLOR_GREEN } from "../Color";

export const ButtonContainer = styled.TouchableOpacity`
  background-color: ${COLOR_GREEN};
  border-radius: 15px;
  padding: 10px 30px;
  margin: 10px 0px;
  justify-content: center;
  align-items: center
`;
export const SafeArea = styled.SafeAreaView`
  flex: 1;
  backgroundColor: ${COLOR_BG}
`;


