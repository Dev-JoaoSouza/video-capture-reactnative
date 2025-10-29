import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#222"
    },
    areaButtonTop: {
        width: "100%",
        alignItems: "flex-end",
        position: "absolute",
        left: 0,
        top: 35,
        zIndex: 1,
        paddingHorizontal: 8
    },
    settingMenu: {
        width: "100%",
        height: 210,
        alignItems: "center",
        justifyContent: "center",
        gap: 20,
        backgroundColor: "#222",
        position: "absolute",
        top: 28,
        left: 0,
        zIndex: 2,
        borderBottomStartRadius: 15,
        borderBottomEndRadius: 15,
        paddingBottom: 20
    },
    settingMenuClose: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "flex-end",
        paddingHorizontal: 15
    },
    settingMenuOption: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderRadius: 18,
        backgroundColor: "#000",
        paddingHorizontal: 18,
        width: "90%",
    },
    settingMenuItem: {
        color: "#fff",
        fontSize: 16
    },
    settingMenuSeletec: {
        color: "#000",
        backgroundColor: "#f3dc09ff",
        borderRadius: 20,
        padding: 8
    },
    camera: {
        width: "100%"
    },
    timerContainer: {
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        left: 0,
        bottom: 90,
        zIndex: 1
    },
    timer: {
        fontSize: 20,
        color: "#fff"
    },
    areaButtonBotton: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
        position: "absolute",
        left: 0,
        bottom: 30,
        zIndex: 1,
        paddingHorizontal: 8
    }
});