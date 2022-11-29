import React from "react";
import { Text, View, StyleSheet, ImageBackground, StatusBar, TouchableOpacity } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { Colors, Sizes, Fonts } from '../../constants/styles';

const TripScreen = ({ navigation }) => {
    return (
        <View style={{ flex: 1 }}>
            <StatusBar translucent backgroundColor="transparent" />
            <ImageBackground
                source={require('../../assets/images/everest.jpg')}
                style={{ flex: 1 }}
            >
                <LinearGradient
                    start={{ x: 0, y: 0 }}
                    end={{ x: 0, y: 1 }}
                    colors={[
                        'transparent',
                        'transparent',
                        'rgba(255,255,255,0.2)',
                        'rgba(255,255,255,0.4)',
                        'rgba(255,255,255,0.6)',
                        'rgba(255,255,255,0.8)',
                        'rgba(255,255,255,0.9)',
                        'rgba(255,255,255,0.99)',
                        'white',
                    ]}
                    style={styles.pageWrapStyle}
                >
                    <Text style={{ ...Fonts.blackColor30Bold }}>
                        Where to trip?
                    </Text>
                    <Text style={{
                        ...Fonts.grayColor19Regular,
                        marginVertical: Sizes.fixPadding,
                    }}>
                        Plan your next trip with TravelPro
                    </Text>
                    <TouchableOpacity
                        activeOpacity={0.9}
                        onPress={() => navigation.navigate('ExploreTrip')}
                        style={styles.exploreTripButtonStyle}>
                        <Text style={{ ...Fonts.primaryColor19Regular }}>
                            Explore trips
                        </Text>
                    </TouchableOpacity>
                </LinearGradient>
            </ImageBackground>
        </View>
    )
}

const styles = StyleSheet.create({
    pageWrapStyle: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingBottom: Sizes.fixPadding * 11.0,
        paddingLeft: Sizes.fixPadding * 4.0,
        paddingRight: Sizes.fixPadding * 2.0,
    },
    exploreTripButtonStyle: {
        borderColor: Colors.primaryColor,
        borderWidth: 1.0,
        backgroundColor: Colors.whiteColor,
        borderRadius: Sizes.fixPadding,
        paddingHorizontal: Sizes.fixPadding * 2.0,
        paddingVertical: Sizes.fixPadding,
        alignSelf: 'flex-start'
    }
})

export default TripScreen;