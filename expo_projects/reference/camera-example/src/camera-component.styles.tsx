import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  justify-content: center;
`;

export const CameraStyled = styled.View`
  flex: 1;
  position: relative;
`;

export const FaceBoundsRect = styled.View`
  border-color: yellow;
  border-radius: 10px;
  border-width: 1px;
`;

export const ButtonContainer = styled.View`
  flex: 1;
  flex-direction: column;
  background-color: transparent;
  justify-content: flex-end;
  align-items: center;
  margin: 64px;
`;

export const ButtonStyled = styled.TouchableOpacity`
  flex: 1;
  align-items: center;
`;

export const TextStyled = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: white;
`;

export const RecordButton = styled.TouchableOpacity`
  padding: 10px;
  width: 80px;
  height: 80px;
  border-width: 6px;
  border-color: #8c1227;
  border-radius: 40px;
  bottom: 5%;
  position: absolute;
  background-color: #fe2b54;
`;

export const StopRecordButton = styled(RecordButton)`
  border-color: #2c128c;
  background-color: #c62bfe;
  right: 5%;
`;
