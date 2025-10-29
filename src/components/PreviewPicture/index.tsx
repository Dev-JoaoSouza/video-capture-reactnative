import { Image, View } from "react-native";
import * as MediaLibrary from "expo-media-library";
import { shareAsync } from 'expo-sharing';
import { styles } from "./styles";
import { ButtonCamera } from "../ButtonCamera";
import { IPreviewPicture } from "./types";

const PreviewPicture = ({photo, ratio, func}: IPreviewPicture) => {
    const savePhoto = async () => {
        if (photo) {
            await MediaLibrary.saveToLibraryAsync(photo);
            func();
        }
    }

    const sharePhoto = async () => {
        if (photo) {
            await shareAsync(photo);
        }
    }
    
    return(
        <View style={styles.container}>
            {photo && <Image
                style={[styles.photo, {aspectRatio: ratio}]}
                source={{uri: photo}}
            />}
            <View style={styles.containerButton}>
                <ButtonCamera name="trash-can-outline" func={func}/>
                <ButtonCamera name="content-save-outline" func={savePhoto}/>
                <ButtonCamera name="share-variant" func={sharePhoto}/>
            </View>
        </View>
    )
};

export { PreviewPicture };