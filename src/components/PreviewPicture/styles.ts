import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: "100%",
        flex: 1,
        position: "absolute",
        top: 0,
        left: 0,
        zIndex: 4,
        alignItems: "center",
        justifyContent: "center",
        gap: 20,
        backgroundColor: "#999"
    },
    photo: {
        width: "80%",
        borderRadius: 10
    },
    containerButton: {
        width: "80%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 8 
    }
});