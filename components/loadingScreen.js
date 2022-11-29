import React, { useEffect } from "react";
import { View } from "react-native";
import * as Font from "expo-font";
import { Colors } from "../constants/styles";

const LoadingScreen = ({ navigation }) => {

    useEffect(() => {
        async function loadFont() {
            await Font.loadAsync({
                NotoSans_Bold: require("../assets/fonts/noto_sans/NotoSans-Bold.ttf"),
                NotoSans_Regular: require("../assets/fonts/noto_sans/NotoSans-Regular.ttf"),
                Pecifico_Regular: require("../assets/fonts/pacifico/Pacifico-Regular.ttf")
            });
            navigation.navigate('Splash');
        }
        loadFont();
    })

    return (
        <View style={{ flex: 1, backgroundColor: Colors.whiteColor }} />
    )
}

export default LoadingScreen;


