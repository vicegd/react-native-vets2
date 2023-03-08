import { useContext } from "react";
import { View } from "react-native";
import { Camera, CameraType } from "expo-camera";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { AuthenticationContext } from "../services/authentication.context";
import { CameraContainer, CameraView } from "../theme/styles";

export const CameraScreen = ({ navigation }) => {
  const authenticationContext = useContext(AuthenticationContext);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  let cameraRef;

  const takePicture = () => {
    cameraRef
      .takePictureAsync()
      .then((picture) => {
        AsyncStorage.setItem(
          `@picture-${authenticationContext.user.uid}`,
          picture.uri
        );
        navigation.goBack();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  if (!permission) {
    //camera permissions are still loading
    return <View />;
  }

  if (permission.granted) {
    //camera permissions are not granted yet
    requestPermission();
  }

  return (
    <CameraView
      type={CameraType.front}
      ref={(ref) => {
        cameraRef = ref;
      }}
    >
      <CameraContainer onPressIn={takePicture} />
    </CameraView>
  );
};
