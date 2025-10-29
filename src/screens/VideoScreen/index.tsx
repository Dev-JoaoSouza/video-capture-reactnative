import { useEffect, useRef, useState } from "react";
import { View, Text, StatusBar } from "react-native";
import { Camera, CameraView } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import { ButtonCamera } from "../../components/ButtonCamera";
import { PreviewVideo } from "../../components/PreviewVideo";
import { styles } from "./styles";
import { ISettingsCamera } from "./types";

const VideoScreen = () => {
    const [hasCameraPermission, setHasCameraPermission] = useState<boolean>(false);
    const [hasMicrophonePermission, setHasMicrophonePermission] = useState<boolean>(false);
    const [hasMediaLibraryPermission, setHasMediaLibraryPermission] = useState<boolean>(false);
    const [cameraSettings, setCameraSettings] = useState<ISettingsCamera>({
        cameraType: "back",
        cameraRatio: "4:3",
        cameraRatioStyle: "3/4",
        cameraQuality: "1080p",
        videoFlash: false,
        flashIcon: "flash-off"
    })
    const [showSettings, setShowSettings] = useState<boolean>(false);
    const [isRecording, setIsRecording] = useState<boolean>(false);
    const [isRecordingPause, setIsRecordingPause] = useState<boolean>(false);
    const [video, setVideo] = useState<string | null>(null);
    const [timer, setTimer] = useState<number>(0);
    const cameraRef = useRef<CameraView>(null);

    useEffect( () => {
        const fetchPermissions = async () => {
            const cameraPermission = await Camera.requestCameraPermissionsAsync();
            const microphonePermission = await Camera.requestMicrophonePermissionsAsync();
            const mediaLibraryPermission = await MediaLibrary.requestPermissionsAsync();

            setHasCameraPermission(cameraPermission.status === "granted");
            setHasMicrophonePermission(microphonePermission.status === "granted");
            setHasMediaLibraryPermission(mediaLibraryPermission.status === "granted");
        }
        
        if (!hasCameraPermission && !hasMicrophonePermission && !hasMediaLibraryPermission) {
            fetchPermissions();
        }

        let timer: ReturnType<typeof setInterval> | null = null;

        if (isRecording && !isRecordingPause) {
            timer = setInterval(() => {
                setTimer((prev) => prev + 1);
            }, 1000);
        } else {
            if (timer !== null) {
                clearInterval(timer);
            }
        }

        return () => {
            if (timer !== null) {
                clearInterval(timer);
            }
        };
    }, [isRecording, isRecordingPause])

    if (hasCameraPermission === false || hasMicrophonePermission === false) {
        return <Text style={styles.container}>Não tem permissão de Camera ou audio</Text>;
    }

    if (hasMediaLibraryPermission === false) {
        return <Text style={styles.container}>Não tem acesso a bibliotecas</Text>;
    }
    
    const changeFlash = () => {
        if (cameraSettings.videoFlash) {
            setCameraSettings((prev) => ({...prev, videoFlash: false, flashIcon: "flash-off"}));
        } else {
            setCameraSettings((prev) => ({...prev, videoFlash: true, flashIcon: "flash"}));
        }
    }

    const startVideo = async () => {
        setIsRecording(true);

        if (cameraRef && cameraRef.current) {
            const data = await cameraRef.current.recordAsync();
            if (data) {
                setVideo(data.uri);
            }
        }
    }

    const pauseVideo = async () => {
        setIsRecordingPause(true);
        if (cameraRef && cameraRef.current) {
            await cameraRef.current.toggleRecordingAsync();
        }
    }

    const resumeVideo = async () => {
        setIsRecordingPause(false);
        if (cameraRef && cameraRef.current) {
            await cameraRef.current.toggleRecordingAsync();
        }
    }

    const stopVideo = () => {
        setIsRecording(false);
        setIsRecordingPause(false);
        setTimer(0);
        if (cameraRef && cameraRef.current) {
            cameraRef.current.stopRecording();
        }
    }

    const changeCameraType = () => {
        setCameraSettings((prev) => ({...prev, cameraType: prev.cameraType === "front" ? "back" : "front"}))
    }

    const settings =  () => {
        if(!isRecording){
            setShowSettings((prev) => prev ? false : true);
        }
    }

    const discardVideo = () => {
        setVideo(null);
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
                        style={[styles.settingMenuItem, cameraSettings.cameraRatio === "1:1" ? styles.settingMenuSeletec : ""]}
                        onPress={() => setCameraSettings((prev) => ({...prev, cameraRatio: "1:1", cameraRatioStyle: "1/1"}))}
                    >1:1</Text>
                    <Text
                        style={[styles.settingMenuItem, cameraSettings.cameraRatio === "4:3" ? styles.settingMenuSeletec : ""]}
                        onPress={() => setCameraSettings((prev) => ({...prev, cameraRatio: "4:3", cameraRatioStyle: "3/4"}))}
                    >4:3</Text>
                    <Text
                        style={[styles.settingMenuItem, cameraSettings.cameraRatio === "16:9" ? styles.settingMenuSeletec : ""]}
                        onPress={() => setCameraSettings((prev) => ({...prev, cameraRatio: "16:9", cameraRatioStyle: "9/16"}))}
                    >16:9</Text>
                </View>
                <View style={styles.settingMenuOption}>
                    <Text
                        style={[styles.settingMenuItem, cameraSettings.cameraQuality === "2160p" ? styles.settingMenuSeletec : ""]}
                        onPress={() => setCameraSettings((prev) => ({...prev, cameraQuality: "2160p"}))}
                    >2160p</Text>
                    <Text
                        style={[styles.settingMenuItem, cameraSettings.cameraQuality === "1080p" ? styles.settingMenuSeletec : ""]}
                        onPress={() => setCameraSettings((prev) => ({...prev, cameraQuality: "1080p"}))}
                    >1080p</Text>
                    <Text
                        style={[styles.settingMenuItem, cameraSettings.cameraQuality === "720p" ? styles.settingMenuSeletec : ""]}
                        onPress={() => setCameraSettings((prev) => ({...prev, cameraQuality: "720p"}))}
                    >720p</Text>
                    <Text
                        style={[styles.settingMenuItem, cameraSettings.cameraQuality === "480p" ? styles.settingMenuSeletec : ""]}
                        onPress={() => setCameraSettings((prev) => ({...prev, cameraQuality: "480p"}))}
                    >480p</Text>
                </View>
            </View>
            <CameraView
                style={[styles.camera, {aspectRatio: cameraSettings.cameraRatioStyle}]}
                ref={cameraRef}
                facing={cameraSettings.cameraType}
                ratio={cameraSettings.cameraRatio}
                videoQuality={cameraSettings.cameraQuality}
                enableTorch={cameraSettings.videoFlash}
                mode="video"
            />
            <View style={styles.timerContainer}>
                <Text style={[styles.timer, {color: isRecording ? "red" : "white"}]}>
                    {Math.floor(timer/60).toString().padStart(2, '0')}:{(timer % 60).toString().padStart(2, '0')}
                </Text>
            </View>
            <View style={styles.areaButtonBotton}>
                <ButtonCamera name={cameraSettings.flashIcon} func={changeFlash} />
                {!isRecording && <ButtonCamera name="video-outline" func={startVideo} />}
                {isRecording && !isRecordingPause && <ButtonCamera name="pause-circle-outline" func={pauseVideo} />}
                {isRecording && isRecordingPause && <ButtonCamera name="restart" func={resumeVideo} />}

                {!isRecording && <ButtonCamera name="camera-flip" func={changeCameraType} />}
                {isRecording && <ButtonCamera name="stop-circle-outline" func={stopVideo} />}
            </View>
            {video && <PreviewVideo video={video} ratio={cameraSettings.cameraRatioStyle} func={discardVideo}/>}
            <StatusBar barStyle="light-content"/>
        </View>
    )
};

export { VideoScreen };