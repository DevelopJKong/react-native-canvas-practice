import { View } from "react-native";
import styled from "styled-components/native";
import CameraPreview from "./CameraPreview";

const Touch = styled.Pressable`
  width: 100%;
  height: 100%;
  background-color: salmon;
`;

export default function App() {
  return (
    <View>
      <CameraPreview />
    </View>
  );
}
