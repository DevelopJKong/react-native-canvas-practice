import { useState } from "react";
import { NativeTouchEvent, useWindowDimensions, View } from "react-native";
import Canvas from "react-native-canvas";
import styled from "styled-components/native";

const Touch = styled.Pressable`
  width: 100%;
  height: 100%;
  background-color: salmon;
`;

export default function App() {
  const { width, height } = useWindowDimensions();
  const [XValue, setXValue] = useState<number>(0);
  const [YValue, setYValue] = useState<number>(0);
  const handlePress = (e: { nativeEvent: NativeTouchEvent }) => {
    const X = e.nativeEvent.pageX;
    const Y = e.nativeEvent.pageY;
    setXValue(X);
    setYValue(Y);
  };

  const handleCanvas = (canvas: Canvas) => {
    if (canvas) {
      const ctx = canvas.getContext("2d");
      canvas.width = width;
      canvas.height = height;
      ctx.lineWidth = 5;
      ctx.lineCap = "round";
      ctx.lineTo(XValue, YValue);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(XValue, YValue);
    }
  };
  return (
    <View>
      <Touch onPress={handlePress}>
        <Canvas ref={handleCanvas} />
      </Touch>
    </View>
  );
}
