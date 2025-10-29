import { ComponentProps, useEffect, useRef, useState } from "react";
import { Text, View, StatusBar } from "react-native";
import { Camera, CameraView, CameraType, CameraRatio, VideoQuality, FlashMode } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { ButtonCamera } from "../../components/ButtonCamera";
import { PreviewPicture } from "../../components/PreviewPicture";
import { styles } from "./styles";

const PhotoScreen = () => {
    const cameraRef = useRef<CameraView>(null);
    const [hasCameraPermission, setHasCameraPermission] = useState<boolean>(false);
    const [hasMediaLibraryPermission, setHasMediaLibraryPermission] = useState<boolean>(false);
    const [cameraType, setCameraType] = useState<CameraType>("back");
    const [cameraRatio, setCameraRatio] = useState<CameraRatio>("4:3");
    const [cameraRatioStyle, setCameraRatioStyle] = useState("3/4");
    const [cameraQuality, setCameraQuality] = useState<VideoQuality>("1080p");
    const [showSettings, setShowSettings] = useState<boolean>(false);
    const [cameraFlash, setCameraFlash] = useState<FlashMode>("off");
    const [falshIcon, setFlashIcon] = useState<ComponentProps<typeof MaterialCommunityIcons>['name']>("flash-off");
    const [photo, setPhoto] = useState<string | null>(null);

    useEffect(() => {
        (async () => {
            const cameraPermission = await Camera.requestCameraPermissionsAsync();
            const mediaLibraryPermission = await MediaLibrary.requestPermissionsAsync();

            setHasCameraPermission(cameraPermission.status === "granted");
            setHasMediaLibraryPermission(mediaLibraryPermission.status === "granted");
        })()
    });

    if (hasCameraPermission === false) {
        return <Text style={styles.container}>Não tem permissão para acessar a Camera</Text>;
    }

    if (hasMediaLibraryPermission === false) {
        return <Text style={styles.container}>Não tem acesso a bibliotecas</Text>;
    }

    const changeFlash = () => {
        if (cameraFlash === "off") {
            setCameraFlash("on");
            setFlashIcon("flash");
        } else if (cameraFlash === "on") {
            setCameraFlash("auto");
            setFlashIcon("flash-auto");
        } else {
            setCameraFlash("off");
            setFlashIcon("flash-off");
        }
    }
    
    const takePicture = async () => {
        if (cameraRef && cameraRef.current) {
            const data = await cameraRef.current.takePictureAsync();
            setPhoto(data.uri);
        }
    }

    const changeCameraType = () => {
        setCameraType((prev) => (prev === "front" ? "back" : "front"));
    }

    const settings =  () => {
        setShowSettings((prev) => prev ? false : true);
    }

    const discardPhoto = () => {
        setPhoto(null);
    }
    
    return(
        <View style={styles.container}>
            <View style={styles.areaButtonTop}>
                <ButtonCamera name="cog" func={settings} />
            </View>
            <View style={[styles.settingMenu, {display: showSettings ? "flex" : "none"}]}>
                <View style={styles.settingMenuClose}>
                    <ButtonCamera name="close" func={settings} />
                </View>
                <View style={styles.settingMenuOption}>
                    <Text
                        style={[styles.settingMenuItem, cameraRatio === "1:1" ? styles.settingMenuSeletec : ""]}
                        onPress={() => {setCameraRatio("1:1"); setCameraRatioStyle("1/1")}}
                    >1:1</Text>
                    <Text
                        style={[styles.settingMenuItem, cameraRatio === "4:3" ? styles.settingMenuSeletec : ""]}
                        onPress={() => {setCameraRatio("4:3"); setCameraRatioStyle("3/4")}}
                    >4:3</Text>
                    <Text
                        style={[styles.settingMenuItem, cameraRatio === "16:9" ? styles.settingMenuSeletec : ""]}
                        onPress={() => {setCameraRatio("16:9"); setCameraRatioStyle("9/16")}}
                    >16:9</Text>
                </View>
                <View style={styles.settingMenuOption}>
                    <Text
                        style={[styles.settingMenuItem, cameraQuality === "2160p" ? styles.settingMenuSeletec : ""]}
                        onPress={() => setCameraQuality("2160p")}
                    >2160p</Text>
                    <Text
                        style={[styles.settingMenuItem, cameraQuality === "1080p" ? styles.settingMenuSeletec : ""]}
                        onPress={() => setCameraQuality("1080p")}
                    >1080p</Text>
                    <Text
                        style={[styles.settingMenuItem, cameraQuality === "720p" ? styles.settingMenuSeletec : ""]}
                        onPress={() => setCameraQuality("720p")}
                    >720p</Text>
                    <Text
                        style={[styles.settingMenuItem, cameraQuality === "480p" ? styles.settingMenuSeletec : ""]}
                        onPress={() => setCameraQuality("480p")}
                    >480p</Text>
                </View>
            </View>
            <CameraView
                style={[styles.camera, {aspectRatio: cameraRatioStyle}]}
                ref={cameraRef}
                facing={cameraType}
                flash={cameraFlash}
                ratio={cameraRatio}
                videoQuality={cameraQuality}
                mode="picture"
            />
            <View style={styles.areaButtonBotton}>
                <ButtonCamera name={falshIcon} func={changeFlash} />
                <ButtonCamera name="camera-outline" func={takePicture} />
                <ButtonCamera name="camera-flip" func={changeCameraType} />
            </View>
            {photo && <PreviewPicture photo={photo} ratio={cameraRatioStyle} func={discardPhoto} />}
            <StatusBar barStyle="light-content"/>
        </View>
    )
}

export { PhotoScreen };