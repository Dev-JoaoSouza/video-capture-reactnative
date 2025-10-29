import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { CameraType, CameraRatio, VideoQuality } from "expo-camera";
import { ComponentProps } from "react";

export interface ISettingsCamera {
    cameraType: CameraType;
    cameraRatio: CameraRatio;
    cameraRatioStyle: string;
    cameraQuality: VideoQuality;
    videoFlash: boolean;
    flashIcon: ComponentProps<typeof MaterialCommunityIcons>['name']
}