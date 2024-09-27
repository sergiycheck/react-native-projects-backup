import {StyleSheet} from "react-native";
import styled from "styled-components/native";

export const AddProductContainer = styled.View`
  background-color: papayawhip;
  flex: 1;
  padding: 20px;
`;

export const SImageWrapper = styled.View`
  width: 100%;
  height: 250px;
  border-radius: 10px;
  overflow: hidden;
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

export const EditImageTouchableOpacity = styled.TouchableOpacity`
  position: absolute;
  bottom: 20px;
  right: 20px;

  display: flex;
  align-items: center;
  justify-content: center;
`;

export const AddImageTouchableOpacity = styled.TouchableOpacity`
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

export const STextInput = styled.TextInput`
  display: flex;
  height: 56px;
  width: 100%;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  border-left-width: 0;
  border-top-width: 0;
  border-bottom-width: 2px;
  border-color: orange;
  background-color: #ffdab9;
  padding-left: 12px;
  padding-top: 24px;
  color: #333;
`;

export const TextInputMaskStyles = StyleSheet.create({
  STextInput: {
    height: 56,
    width: "100%",

    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    borderBottomWidth: 2,

    borderColor: "orange",
    backgroundColor: "#ffdab9",
    paddingLeft: 12,
    paddingTop: 24,
    color: "#333",
  },
});
