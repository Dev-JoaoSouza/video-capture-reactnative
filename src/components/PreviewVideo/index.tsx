import { View } from "react-native";
import { VideoView, useVideoPlayer } from "expo-video";
import * as MediaLibrary from "expo-media-library";
import { shareAsync } from 'expo-sharing';
import { ButtonCamera } from "../ButtonCamera";
import { styles } from "./styles";
import { IPreviewVideo } from "./types";

const PreviewVideo = ({video, ratio, func}: IPreviewVideo) => {
    const player = useVideoPlayer(video);

    const savePhoto = async () => {
        if (video) {
            await MediaLibrary.saveToLibraryAsync(video);
            func();
        }
    }

    const sharePhoto = async () => {
        if (video) {
            await shareAsync(video);
        }
    }

    return(
        <View style={styles.container}>
            <VideoView
                style={[styles.video, {aspectRatio: ratio}]}
                player={player}
                nativeControls={true}
            />
            <View style={styles.containerButton}>
                <ButtonCamera name="trash-can-outline" func={func}/>
                <ButtonCamera name="content-save-outline" func={savePhoto}/>
                <ButtonCamera name="share-variant" func={sharePhoto}/>
            </View>
        </View>
    )
};

export { PreviewVideo };