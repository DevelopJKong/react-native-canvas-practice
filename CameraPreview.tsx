import { Camera } from "expo-camera";
import React, { useState, useRef } from "react";
import {
  ImageBackground,
  NativeTouchEvent,
  Pressable,
  Text,
  useWindowDimensions,
  View,
  Dimensions,
} from "react-native";
import Canvas from "react-native-canvas";
import styled from "styled-components/native";
const { height: currentHeight, width: currentWidth } = Dimensions.get("window");
const CameraBox = styled(Camera)`
  width: 100px;
  height: 100px;
  justify-content: center;
  align-items: center;
  position: relative;
  bottom: 0;
`;

const CameraPreview = () => {
  const camera = useRef<Camera>(null);
  const [photo, setPhoto] = useState<{ uri: string }>({ uri: "" });
  const [objectBox, setObjectBox] = useState([
    {
      name: "test01",
      BBox: [75, 140, 150, 110],
    },
    {
      name: "test02",
      BBox: [75, 160, 100, 100],
    },
    {
      name: "test03",
      BBox: [185, 10, 280, 100],
    },
    {
      name: "test04",
      BBox: [10, 410, 100, 80],
    },
  ]);

  const handleCanvas = async (canvas: Canvas) => {
    if (canvas) {
      let ctx = canvas.getContext("2d");

      // canvas size
      canvas.width = currentWidth;
      canvas.height = currentHeight;

      ctx.lineWidth = 10;
      ctx.strokeStyle = "red";

      // Wall
      for (let obj of objectBox) {
        ctx.strokeRect(...(obj.BBox as [number, number, number, number]));
      }
    }
  };

  const onPress = (e: { nativeEvent: NativeTouchEvent }) => {
    console.log("e.nativeEvent", e.nativeEvent);
    const X = e.nativeEvent.pageX;
    const Y = e.nativeEvent.pageY;

    const tttt = objectBox
      .map((value) => ({
        minX: value.BBox[0],
        maxX: value.BBox[0] + value.BBox[2],
        minY: value.BBox[1],
        maxY: value.BBox[1] + value.BBox[3],
      }))
      .filter((item) => {
        let check = item.minX <= X && item.maxX >= X && item.minY <= Y && item.maxY >= Y;
        console.log("check", check);

        return check;
      });

    console.log("tttt", tttt);
    console.log("X:", X);
    console.log("Y:", Y);
  };

  /**
   * @title ???????????? ?????? idCard??? ?????? ??????
   * @description ????????? ??? ?????? ???????????? ?????? ?????? api ????????? ???????????? ?????????????????? ?????????????????? ???????????????
   * @returns {Promise<void>}
   */
  const retakePicture = async () => {
    try {
      const options = { quality: 0.5, base64: true };
      if (camera.current) {
        const data = await camera.current.takePictureAsync(options);
        setPhoto({ uri: data.uri });
      }
    } catch (error) {
      console.log("takePicture:::", error); // ! error log
    }
  };

  return (
    <View
      style={{
        position: "relative",
        flex: 1,
        width: currentWidth,
        height: currentHeight,
      }}
    >
      {/* ????????? ??????????????? */}
      <ImageBackground
        source={{ uri: photo && photo.uri }}
        style={{
          flex: 1,
        }}
      />

      <Pressable style={{ backgroundColor: "red" }} onPress={retakePicture}>
        <Text>?????? ??????</Text>
      </Pressable>

      <Pressable style={{ backgroundColor: "blue" }}>
        <Text>????????? ????????? ?????????</Text>
      </Pressable>

      <Canvas
        style={{
          width: currentWidth,
          height: currentHeight,
          position: "absolute",
          left: 0,
          top: 0,
          zIndex: 1000,
        }}
        ref={handleCanvas}
      />
      <CameraBox ref={camera}></CameraBox>
      <Pressable style={{ width: 200, height: 200, backgroundColor: "rgba(0,0,0,0.3)" }} onPress={onPress} />
    </View>
  );
};

export default CameraPreview;
