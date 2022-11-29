import React, { useState, useCallback } from "react";
import {
    Text,
    View,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    ImageBackground,
    ScrollView,
    TextInput,
    TouchableOpacity,
    BackHandler
} from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { Colors, Sizes, Fonts } from "../../constants/styles";
import { MaterialIcons } from '@expo/vector-icons';
import { useFocusEffect } from "@react-navigation/native";

const RegisterScreen = ({ navigation }) => {

    const backAction = () => {
        navigation.navigate('Welcome')
        return true;
    }

    useFocusEffect(
        useCallback(() => {
            BackHandler.addEventListener("hardwareBackPress", backAction);
            return () => BackHandler.removeEventListener("hardwareBackPress", backAction);
        }, [backAction])
    );

    const [state, setState] = useState({
        userName: '',
        email: '',
        password: '',
        confirmPassword: '',
    })

    const updateState = (data) => setState((state) => ({ ...state, ...data }))

    const {
        userName,
        email,
        password,
        confirmPassword,
    } = state;

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <StatusBar translucent backgroundColor="rgba(0,0,0,0)" />
            <ImageBackground
                style={{ flex: 1 }}
                source={require('../../assets/images/bg.jpg')}
                resizeMode="cover"
            >
                <LinearGradient
                    start={{ x: 0, y: 1 }}
                    end={{ x: 0, y: 0 }}
                    colors={['black', 'rgba(0,0.10,0,0.77)', 'rgba(0,0,0,0.1)',]}
                    style={{ flex: 1, paddingHorizontal: Sizes.fixPadding * 2.0 }}
                >
                    <ScrollView showsVerticalScrollIndicator={false}>
                        {backArrow()}
                        {registerInfo()}
                        {userNameTextField()}
                        {emailTextField()}
                        {passwordTextField()}
                        {confirmPasswordTextField()}
                        {continueButton()}
                    </ScrollView>
                </LinearGradient>
            </ImageBackground>
        </SafeAreaView >
    )

    function continueButton() {
        return (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => { navigation.navigate('BottomTabBar'); }}
            >
                <LinearGradient
                    start={{ x: 1, y: 0 }}
                    end={{ x: 0, y: 0 }}
                    colors={['rgba(68, 182, 200, 0.4)', 'rgba(68, 182, 200, 0.5)', 'rgba(68, 182, 200, 0.6)']}
                    style={styles.continueButtonStyle}
                >
                    <Text style={{ ...Fonts.whiteColor17Regular }}>
                        Continue
                    </Text>
                </LinearGradient>
            </TouchableOpacity >
        )
    }

    function confirmPasswordTextField() {
        return (
            <TextInput
                style={{ ...Fonts.whiteColor17Regular, ...styles.textFieldContentStyle }}
                value={confirmPassword}
                secureTextEntry={true}
                onChangeText={(text) => updateState({ confirmPassword: text })}
                placeholder="Confirm Password"
                placeholderTextColor="white"
            />
        )
    }

    function passwordTextField() {
        return (
            <TextInput
                style={{ ...Fonts.whiteColor17Regular, ...styles.textFieldContentStyle }}
                value={password}
                secureTextEntry={true}
                onChangeText={(text) => updateState({ password: text })}
                placeholder="Password"
                placeholderTextColor="white"
            />
        )
    }

    function emailTextField() {
        return (
            <TextInput
                style={{ ...Fonts.whiteColor17Regular, ...styles.textFieldContentStyle }}
                value={email}
                onChangeText={(text) => updateState({ email: text })}
                placeholder="Email"
                placeholderTextColor="white"
            />
        )
    }

    function userNameTextField() {
        return (
            <TextInput
                style={{ ...Fonts.whiteColor17Regular, ...styles.textFieldContentStyle }}
                value={userName}
                onChangeText={(text) => updateState({ userName: text })}
                placeholder="Username"
                placeholderTextColor="white"
            />
        )
    }

    function backArrow() {
        return (
            <MaterialIcons
                name="arrow-back"
                size={24}
                color={Colors.whiteColor}
                style={{
                    marginTop: Sizes.fixPadding * 7.0,
                    marginBottom: Sizes.fixPadding
                }}
                onPress={() => navigation.navigate('Welcome')}
            />
        )
    }

    function registerInfo() {
        return (
            <View style={{
                marginTop: Sizes.fixPadding * 3.0,
                marginBottom: Sizes.fixPadding * 5.0
            }}>
                <Text style={{ ...Fonts.whiteColor30Bold }}>
                    Register
                </Text>
                <Text style={{
                    ...Fonts.whiteColor17Regular,
                    marginTop: Sizes.fixPadding
                }}>
                    Create account
                </Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    textFieldContentStyle: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 55.0,
        paddingHorizontal: Sizes.fixPadding * 2.0,
        backgroundColor: "rgba(255, 255, 255, 0.3)",
        borderRadius: Sizes.fixPadding * 2.5,
        marginBottom: Sizes.fixPadding * 2.5,
    },
    continueButtonStyle: {
        borderRadius: Sizes.fixPadding * 2.5,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: Sizes.fixPadding + 10.0,
        height: 55.0,
        marginBottom: Sizes.fixPadding * 2.0,
    },
})

export default RegisterScreen;