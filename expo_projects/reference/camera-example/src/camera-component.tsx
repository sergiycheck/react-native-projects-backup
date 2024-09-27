import { AutoFocus, Camera, CameraType } from "expo-camera";
import React, { useState } from "react";
import { Button, Text, View } from "react-native";
import * as FaceDetector from "expo-face-detector";
import {
  Container,
  RecordButton,
  FaceBoundsRect,
  StopRecordButton,
} from "./camera-component.styles";
import * as MediaLibrary from "expo-media-library";

export default function CameraExample() {
  const [type, setType] = useState(CameraType.front);
  const [permission, requestPermission] = Camera.useCameraPermissions();

  const [faceBounds, setFaceBounds] = useState<FaceDetector.FaceFeature["bounds"] | null>(null);
  const [visibleFaceBounds, setVisibleFaceBounds] = useState(true);
  const cameraRef = React.useRef<Camera>(null);

  const resetFaceBounds = React.useCallback(() => {
    setFaceBounds(null);
    setVisibleFaceBounds(() => true);
  }, [visibleFaceBounds, faceBounds]);

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      setVisibleFaceBounds(() => false);
      setFaceBounds(null);
    }, 2000);

    return () => {
      clearTimeout(timeout);
    };
  }, [type]);

  const toggleCameraType = React.useCallback(() => {
    resetFaceBounds();
    setType((current) => (current === CameraType.back ? CameraType.front : CameraType.back));
  }, [type]);

  const handleFacesDetected = ({ faces }: { faces: FaceDetector.FaceFeature[] }) => {
    if (faces.length === 0) return;

    setFaceBounds(() => ({
      ...faces[0].bounds,
    }));
  };

  const [hasAudioPermission, setHasAudioPermission] = React.useState(false);
  const [hasCameraPermission, setHasCameraPermission] = React.useState(false);

  const [permissionMediaResponse, requestMediaPermission] = MediaLibrary.usePermissions();

  React.useEffect(() => {
    (async () => {
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(cameraStatus.granted);
      const audioStatus = await Camera.requestMicrophonePermissionsAsync();
      setHasAudioPermission(audioStatus.status === "granted");

      await requestMediaPermission();
    })();
  }, []);

  const [recordUri, setRecordUri] = React.useState<string | undefined>(undefined);

  const handleStartRecoring = async () => {
    console.log("start recording");
    const recording = await cameraRef.current?.recordAsync();
    setRecordUri(recording?.uri);
    console.log(recording);

    console.log("saving to library");
    const asset = await MediaLibrary.createAssetAsync(recording?.uri);
    console.log(asset);
  };

  const handleStopRecording = async () => {
    console.log("stop recording");
    cameraRef.current?.stopRecording();
  };

  // React.useEffect(() => {
  //   async function recordingHandler() {
  //     if (isRecording) {
  //       console.log("start recording");

  //       const recording = await cameraRef.current?.recordAsync();
  //     }
  //   }

  //   recordingHandler();
  // }, [isRecording]);

  if (!permission) {
    // Camera permissions are still loading
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet
    return (
      <Container>
        <Text style={{ textAlign: "center" }}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="grant permission" />
      </Container>
    );
  }

  return (
    <Container>
      <Camera
        ref={cameraRef}
        style={{
          flex: 1,
          position: "relative",
        }}
        type={type}
        autoFocus={AutoFocus.on}
        onFacesDetected={handleFacesDetected}
        faceDetectorSettings={{
          mode: FaceDetector.FaceDetectorMode.fast,
          detectLandmarks: FaceDetector.FaceDetectorLandmarks.none,
          runClassifications: FaceDetector.FaceDetectorClassifications.none,
          minDetectionInterval: 100,
          tracking: true,
        }}
      >
        {!!faceBounds && visibleFaceBounds && (
          <FaceBoundsRect
            style={{
              top: faceBounds?.origin.y,
              left: faceBounds?.origin.x,
              width: faceBounds?.size.width,
              height: faceBounds?.size.height,
            }}
          ></FaceBoundsRect>
        )}
        <RecordButton
          onPress={() => {
            handleStartRecoring();
          }}
        />
        <StopRecordButton
          onPress={() => {
            handleStopRecording();
          }}
        />
        {/* <ButtonContainer>
          <ButtonStyled onPress={toggleCameraType}>
            <TextStyled>Flip Camera</TextStyled>
          </ButtonStyled>
        </ButtonContainer> */}
      </Camera>
    </Container>
  );
}
