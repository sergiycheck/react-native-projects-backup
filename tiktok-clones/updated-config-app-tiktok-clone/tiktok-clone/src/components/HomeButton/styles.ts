import { ViewProps } from "react-native";
import { ExecutionContext } from "styled-components";
import styled from "styled-components/native";

type Props = ExecutionContext &
  Omit<ViewProps, never> & {
    home: boolean;
  };

export const Container = styled.View`
  top: 3px;
  width: 45px;
  height: 30px;
  justify-content: center;
  border-radius: 10px;
  align-items: center;
  background: ${(props: Props) => (props.home ? "#fff" : "#000")};
  border-left-width: 3px;
  border-left-color: #20d5ea;
  border-right-width: 3px;
  border-right-color: #ec376d;
`;

export const Button = styled.TouchableOpacity.attrs({
  activeOpacity: 1,
})``;
