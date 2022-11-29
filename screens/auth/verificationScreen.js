import React, { createRef, useState } from "react";
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
    Dimensions,
} from "react-native";
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors, Sizes, Fonts } from "../../constants/styles";
import Dialog from "react-native-dialog";
import { CircleFade } from 'react-native-animated-spinkit';

const { width } = Dimensions.get('screen');

const VerificationScreen = ({ navigation }) => {

    const [state, setState] = useState({
        isLoading: false,
        firstDigit: '',
        secondDigit: '',
        thirdDigit: '',
        forthDigit: '',
    })

    const updateState = (data) => setState((state) => ({ ...state, ...data }))

    const {
        isLoading,
        firstDigit,
        secondDigit,
        thirdDigit,
        forthDigit,
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
                        {verificationInfo()}
                        {otpFields()}
                        {resendInfo()}
                        {submitButton()}
                    </ScrollView>
                </LinearGradient>
            </ImageBackground>
            {loading()}
        </SafeAreaView >
    )

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
                onPress={() => navigation.goBack()}
            />
        )
    }

    function loading() {
        return (
            <Dialog.Container
                visible={isLoading}
                contentStyle={styles.dialogContainerStyle}
            >
                <View style={{ backgroundColor: 'white', alignItems: 'center', }}>
                    <CircleFade size={56} color={Colors.primaryColor} />
                    <Text style={{
                        ...Fonts.grayColor16Regular,
                        marginTop: Sizes.fixPadding * 2.0
                    }}>
                        Please wait..
                    </Text>
                </View>
            </Dialog.Container>
        );
    }

    function submitButton() {
        return (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => {
                    updateState({ isLoading: true })
                    setTimeout(() => {
                        updateState({ isLoading: false })
                        navigation.push('Register');
                    }, 2000);
                }}
            >
                <LinearGradient
                    start={{ x: 1, y: 0 }}
                    end={{ x: 0, y: 0 }}
                    colors={['rgba(68, 182, 200, 0.4)', 'rgba(68, 182, 200, 0.5)', 'rgba(68, 182, 200, 0.6)']}
                    style={styles.submitButtonStyle}
                >
                    <Text style={{ ...Fonts.whiteColor17Regular }}>
                        Submit
                    </Text>
                </LinearGradient>
            </TouchableOpacity >
        )
    }

    function resendInfo() {
        return (
            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: Sizes.fixPadding * 5.0
            }}>
                <Text style={{ ...Fonts.grayColor16Regular }}>
                    Didn’t receive otp code!
                </Text>
                <Text style={{ ...Fonts.whiteColor18Regular, marginLeft: Sizes.fixPadding - 5.0 }}>
                    Resend
                </Text>
            </View>
        )
    }

    function otpFields() {
        const secondTextInput = createRef();
        const thirdTextInput = createRef();
        const forthTextInput = createRef();

        return (
            <View style={styles.otpFieldsContentStyle}>
                <View style={styles.textFieldContentStyle}>
                    <TextInput
                        selectionColor={Colors.primaryColor}
                        value={firstDigit}
                        style={{ ...Fonts.whiteColor18Regular, paddingLeft: Sizes.fixPadding - 3.0 }}
                        onChangeText={(text) => {
                            updateState({ firstDigit: text })
                            secondTextInput.current.focus();
                        }}
                        keyboardType="numeric"
                    />
                </View>

                <View style={styles.textFieldContentStyle}>
                    <TextInput
                        selectionColor={Colors.primaryColor}
                        value={secondDigit}
                        style={{ ...Fonts.whiteColor18Regular, paddingLeft: Sizes.fixPadding - 3.0 }}
                        ref={secondTextInput}
                        keyboardType="numeric"
                        onChangeText={(text) => {
                            updateState({ secondDigit: text })
                            thirdTextInput.current.focus();
                        }}
                    />
                </View>

                <View style={styles.textFieldContentStyle}>
                    <TextInput
                        selectionColor={Colors.primaryColor}
                        style={{ ...Fonts.whiteColor18Regular, paddingLeft: Sizes.fixPadding - 3.0 }}
                        keyboardType="numeric"
                        value={thirdDigit}
                        ref={thirdTextInput}
                        onChangeText={(text) => {
                            updateState({ thirdDigit: text })
                            forthTextInput.current.focus();
                        }}
                    />
                </View>

                <View style={styles.textFieldContentStyle}>
                    <TextInput
                        selectionColor={Colors.primaryColor}
                        style={{ ...Fonts.whiteColor18Regular, paddingLeft: Sizes.fixPadding - 3.0 }}
                        keyboardType="numeric"
                        value={forthDigit}
                        ref={forthTextInput}
                        onChangeText={(text) => {
                            updateState({ forthDigit: text })
                            updateState({ isLoading: true })
                            setTimeout(() => {
                                updateState({ isLoading: false })
                                navigation.push('Register');
                            }, 2000);
                        }}
                    />
                </View>
            </View>
        )
    }

    function verificationInfo() {
        return (
            <View style={{
                marginTop: Sizes.fixPadding * 3.0,
                marginBottom: Sizes.fixPadding * 4.0
            }}>
                <Text style={{ ...Fonts.whiteColor30Bold }}>
                    Verification
                </Text>
                <Text style={{
                    ...Fonts.whiteColor17Regular,
                    marginTop: Sizes.fixPadding
                }}>
                    Enter the otp code from the phone we just sent you
                </Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    otpFieldsContentStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: Sizes.fixPadding * 4.0,
    },
    textFieldContentStyle: {
        height: 55.0,
        width: 55.0,
        borderRadius: Sizes.fixPadding - 5.0,
        backgroundColor: "rgba(255, 255, 255, 0.3)",
        alignItems: 'center',
        justifyContent: 'center',
    },
    submitButtonStyle: {
        borderRadius: Sizes.fixPadding * 2.5,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: Sizes.fixPadding * 2.5,
        height: 55.0,
        marginBottom: Sizes.fixPadding * 2.0,
    },
    dialogContainerStyle: {
        borderRadius: Sizes.fixPadding,
        width: width - 60,
        paddingHorizontal: Sizes.fixPadding * 3.0,
        paddingTop: -Sizes.fixPadding,
        paddingBottom: Sizes.fixPadding,
    },
})

export default VerificationScreen;