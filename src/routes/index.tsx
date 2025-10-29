import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { PhotoScreen } from "../screens/PhotoScreen";
import { VideoScreen } from "../screens/VideoScreen";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

const Routes = () => {
    const {Navigator, Screen} = createBottomTabNavigator();

    return(
        <NavigationContainer>
            <Navigator>
                <Screen
                    name="photo"
                    component={PhotoScreen}
                    options={{
                        headerShown: false,
                        tabBarShowLabel: false,
                        tabBarStyle: {
                            backgroundColor: "#777"
                        },
                        tabBarActiveTintColor: "#fff",
                        tabBarInactiveTintColor: "#aaa",
                        tabBarIcon: ({color}) => (<MaterialCommunityIcons name="camera" size={30} color={color} />)
                    }}
                />
                <Screen
                    name="video"
                    component={VideoScreen}
                    options={{
                        headerShown: false,
                        tabBarShowLabel: false,
                        tabBarStyle: {
                            backgroundColor: "#777"
                        },
                        tabBarActiveTintColor: "#fff",
                        tabBarInactiveTintColor: "#aaa",
                        tabBarIcon: ({color}) => (<MaterialCommunityIcons name="video" size={30} color={color} />)
                    }}
                />
            </Navigator>
        </NavigationContainer>
    )
};

export { Routes };