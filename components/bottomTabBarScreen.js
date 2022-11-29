import React, { useState, useCallback } from "react";
import { View, TouchableOpacity, StyleSheet, BackHandler, Text, SafeAreaView, StatusBar } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';
import { Colors, Sizes, Fonts } from "../constants/styles";
import HomeScreen from "../screens/home/homeScreen";
import HotelScreen from "../screens/hotel/hotelScreen";
import TripScreen from "../screens/trip/tripScreen";
import FavoriteScreen from "../screens/favorite/favoriteScreen";
import ProfileScreen from "../screens/profile/profileScreen";
import { useFocusEffect } from "@react-navigation/native";

const BottomTabBarScreen = ({ navigation }) => {

    const backAction = () => {
        backClickCount == 1 ? BackHandler.exitApp() : _spring();
        return true;
    }

    useFocusEffect(
        useCallback(() => {
            BackHandler.addEventListener("hardwareBackPress", backAction);
            return () => BackHandler.removeEventListener("hardwareBackPress", backAction);
        }, [backAction])
    );

    function _spring() {
        updateState({ backClickCount: 1 });
        setTimeout(() => {
            updateState({ backClickCount: 0 })
        }, 1000)
    }

    const [state, setState] = useState({
        currentIndex: 1,
        backClickCount: 0
    });

    const updateState = (data) => setState((state) => ({ ...state, ...data }));

    const { currentIndex, backClickCount } = state;

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
                <StatusBar
                    translucent={false}
                    backgroundColor={Colors.primaryColor}
                />
                {currentIndex == 1 ?
                    <HomeScreen navigation={navigation} /> :
                    currentIndex == 2 ?
                        <HotelScreen navigation={navigation} /> :
                        currentIndex == 3 ?
                            <TripScreen navigation={navigation} /> :
                            currentIndex == 4 ?
                                <FavoriteScreen navigation={navigation} /> :
                                <ProfileScreen navigation={navigation} />

                }
                <View style={styles.bottomTabBarStyle}>
                    {bottomTabBarItem({
                        index: 1,
                        iconName: "home",
                    })}
                    {bottomTabBarItem({
                        index: 2,
                        iconName: "hotel",
                    })}
                    {bottomTabBarItem({
                        index: 3,
                        iconName: "flight-takeoff",
                    })}
                    {bottomTabBarItem({
                        index: 4,
                        iconName: "favorite",
                    })}
                    {bottomTabBarItem({
                        index: 5,
                        iconName: "person",
                    })}
                </View>
            </View>
            {
                backClickCount == 1
                    ?
                    <View style={[styles.animatedView]}>
                        <Text style={{ ...Fonts.whiteColor14Regular }}>
                            Press Back Once Again to Exit
                        </Text>
                    </View>
                    :
                    null
            }
        </SafeAreaView>
    )

    function bottomTabBarItem({ index, iconName }) {
        return (
            <TouchableOpacity
                activeOpacity={0.9}
                style={currentIndex == index ? styles.bottomTabSelectedIconStyle : null}
                onPress={() => updateState({ currentIndex: index })}
            >
                <MaterialIcons name={iconName} size={30} color={
                    currentIndex == index ?
                        Colors.primaryColor : Colors.grayColor
                } />
            </TouchableOpacity>
        )
    }
}

export default BottomTabBarScreen;

const styles = StyleSheet.create({
    animatedView: {
        backgroundColor: "#333333",
        position: "absolute",
        bottom: 40,
        alignSelf: 'center',
        borderRadius: Sizes.fixPadding * 2.0,
        paddingHorizontal: Sizes.fixPadding + 5.0,
        paddingVertical: Sizes.fixPadding,
        justifyContent: "center",
        alignItems: "center",
    },
    bottomTabBarStyle: {
        position: 'absolute',
        bottom: 0.0,
        left: 0.0,
        right: 0.0,
        height: 70.0,
        backgroundColor: Colors.whiteColor,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: Sizes.fixPadding * 2.0,
        borderTopColor: 'rgba(128, 128, 128, 0.1)',
        borderTopWidth: 0.30,
        elevation: 2.0
    },
    bottomTabSelectedIconStyle: {
        height: 55.0,
        width: 55.0,
        borderRadius: 27.5,
        backgroundColor: 'rgba(128, 128, 128, 0.1)',
        alignItems: 'center',
        justifyContent: 'center'
    }
})



