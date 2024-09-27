import {StyleSheet} from "react-native";
import styled from "styled-components/native";

export const StyledContainer = styled.View`
  background-color: papayawhip;
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const StyledText = styled.Text`
  color: #bf4f74;
`;

export const SErrorText = styled.Text`
  color: red;
`;

export const StyledButton = styled.TouchableOpacity`
  background: #bf4f74;
  color: white;
  border: 2px solid #bf4f74;
  border-radius: 8px;
  padding: 12px;
  width: 100%;
  display: flex;
  justify-content: center;
`;
export const StyledButtonText = styled.Text`
  color: white;
  font-weight: bold;
  font-size: 16px;
`;

export const StyledProductItem = styled.TouchableOpacity`
  background-color: #fff;
  border-radius: 10px;
  padding: 20px;
  margin-top: 20px;

  flex-direction: column;
  display: flex;
  gap: 7px;
`;

export const AddProductAbsolute = styled.TouchableOpacity`
  position: absolute;
  bottom: 20px;
  right: 20px;
  width: 60px;
  height: 60px;
  border-radius: 30px;
  background-color: #bf4f74;
  align-items: center;
  justify-content: center;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const imageStyles = StyleSheet.create({
  image: {
    flex: 1,
    backgroundColor: "#0553",
    height: 200,
    width: "100%",
  },
});
