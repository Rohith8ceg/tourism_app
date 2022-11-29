import React from "react";
import {
    Text,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    ImageBackground,
} from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { Sizes, Fonts } from "../constants/styles";

const SplashScreen = ({ navigation }) => {

    setTimeout(() => {
        navigation.navigate('Onboarding')
    }, 3000)

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <StatusBar translucent backgroundColor="rgba(0,0,0,0)" />
            <ImageBackground
                style={{ flex: 1 }}
                source={require('../assets/images/bg.jpg')}
                resizeMode="cover"
            >
                <LinearGradient
                    start={{ x: 0, y: 1 }}
                    end={{ x: 0, y: 0 }}
                    colors={['black', 'rgba(0,0.10,0,0.77)', 'rgba(0,0,0,0.1)',]}
                    style={styles.pageStyle}
                >
                    <Text style={{ ...Fonts.whiteColor35Pecifico_Bold }}>
                        TravelPro
                    </Text>
                    <Text style={{ ...Fonts.whiteColor17Regular, marginTop: Sizes.fixPadding }}>
                        Plane your trip with TravelPro
                    </Text>
                </LinearGradient>
            </ImageBackground>
        </SafeAreaView >
    )
}

const styles = StyleSheet.create({
    pageStyle: {
        flex: 1,
        paddingHorizontal: Sizes.fixPadding * 2.0,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default SplashScreen;