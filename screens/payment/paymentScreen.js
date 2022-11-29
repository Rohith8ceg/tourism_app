import React, { useState } from "react";
import { Text, View, StyleSheet, SafeAreaView, StatusBar, ScrollView, Image, Dimensions, TouchableOpacity } from "react-native";
import { Colors, Fonts, Sizes } from "../../constants/styles";
import { MaterialIcons } from '@expo/vector-icons';
import Dialog from "react-native-dialog";

const { width } = Dimensions.get('screen');

const PaymentScreen = ({ navigation, route }) => {

    const [state, setState] = useState({
        currentPaymentMethodIndex: 2,
        showSuccessDialog: false,
    })

    const updateState = (data) => setState((state) => ({ ...state, ...data }))

    const {
        currentPaymentMethodIndex,
        showSuccessDialog,
    } = state;

    const amount = route.params.amount;

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
            <StatusBar backgroundColor={Colors.primaryColor} />
            <View style={{ flex: 1 }}>
                {header()}
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: Sizes.fixPadding * 8.0 }}
                >
                    {payableAmountInfo()}
                    {paymentMethod({
                        icon: require('../../assets/images/payment_icon/cash_on_delivery.png'),
                        paymentType: 'Pay on Delivery',
                        index: 1,
                    })}
                    {paymentMethod({
                        icon: require('../../assets/images/payment_icon/amazon_pay.png'),
                        paymentType: 'Amazon Pay',
                        index: 2,
                    })}
                    {paymentMethod({
                        icon: require('../../assets/images/payment_icon/card.png'),
                        paymentType: 'Card',
                        index: 3,
                    })}
                    {paymentMethod({
                        icon: require('../../assets/images/payment_icon/paypal.png'),
                        paymentType: 'PayPal',
                        index: 4,
                    })}
                    {paymentMethod({
                        icon: require('../../assets/images/payment_icon/skrill.png'),
                        paymentType: 'Skrill',
                        index: 5,
                    })}
                </ScrollView>
                {payButton()}
            </View>
            {successDialog()}
        </SafeAreaView>
    )

    function successDialog() {
        return (
            <Dialog.Container
                visible={showSuccessDialog}
                contentStyle={styles.dialogWrapStyle}
            >
                <View style={{ backgroundColor: Colors.whiteColor, alignItems: 'center' }}>
                    <View style={styles.successIconWrapStyle}>
                        <MaterialIcons name="done" size={40} color={Colors.primaryColor} />
                    </View>
                    <Text style={{ ...Fonts.grayColor16Regular, marginTop: Sizes.fixPadding + 10.0 }}>
                        Success!
                    </Text>
                </View>
            </Dialog.Container>
        )
    }

    function payButton() {
        return (
            <View style={styles.payButtonOuterWrapStyle}>
                <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => {
                        updateState({ showSuccessDialog: true })
                        setTimeout(() => {
                            updateState({ showSuccessDialog: false })
                            navigation.navigate('BottomTabBar');
                        }, 3000);
                    }
                    }
                    style={styles.payButtonWrapStyle}>
                    <Text style={{ ...Fonts.whiteColor19Regular }}>
                        Pay
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }

    function payableAmountInfo() {
        return (
            <View style={styles.payableAmountWrapStyle}>
                <Text style={{ ...Fonts.blackColor20Regular }}>
                    Pay  ₹{amount * 80}
                </Text>
            </View>
        )
    }

    function paymentMethod({ icon, paymentType, index }) {
        return (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => updateState({ currentPaymentMethodIndex: index })}
                style={{
                    borderColor: currentPaymentMethodIndex == index ? Colors.primaryColor : '#E0E0E0',
                    ...styles.paymentMethodWrapStyle
                }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Image
                        source={icon}
                        style={{
                            width: 50.0,
                            height: 50.0,
                        }}
                        resizeMode="contain"
                    />
                    <Text numberOfLines={1} style={{
                        ...Fonts.blackColor16Bold, marginLeft: Sizes.fixPadding,
                        width: width / 2.2
                    }}>
                        {paymentType}
                    </Text>
                </View>
                <View style={{
                    borderColor: currentPaymentMethodIndex == index ? Colors.primaryColor : '#E0E0E0',
                    ...styles.radioButtonStyle
                }}>
                    {
                        currentPaymentMethodIndex == index ?
                            <View style={{
                                width: 12.0,
                                height: 12.0,
                                borderRadius: 6.0,
                                backgroundColor: Colors.primaryColor
                            }}>
                            </View> : null
                    }
                </View>
            </TouchableOpacity>
        )
    }

    function header() {
        return (
            <View style={styles.headerWrapStyle}>
                <MaterialIcons name="arrow-back-ios" size={24} color="black"
                    onPress={() => navigation.pop()}
                />
                <Text style={{ ...Fonts.blackColor20Regular, marginLeft: Sizes.fixPadding + 5.0 }}>
                    Payment
                </Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    headerWrapStyle: {
        backgroundColor: Colors.whiteColor,
        alignItems: 'center',
        flexDirection: 'row',
        height: 60.0,
        marginHorizontal: Sizes.fixPadding * 2.0
    },
    paymentMethodWrapStyle: {
        backgroundColor: Colors.whiteColor,
        borderRadius: Sizes.fixPadding,
        borderWidth: 1.0,
        marginHorizontal: Sizes.fixPadding * 2.0,
        paddingHorizontal: Sizes.fixPadding * 2.0,
        paddingVertical: Sizes.fixPadding * 2.0,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginVertical: Sizes.fixPadding,
    },
    radioButtonStyle: {
        width: 20.0,
        height: 20.0,
        borderRadius: 10.0,
        borderWidth: 1.0,
        backgroundColor: Colors.whiteColor,
        alignItems: 'center',
        justifyContent: 'center'
    },
    payButtonOuterWrapStyle: {
        position: 'absolute',
        bottom: 0.0,
        left: 0.0,
        right: 0.0,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.whiteColor,
        borderTopColor: '#ECECEC',
        borderTopWidth: 1.0,
        height: 75.0,
        paddingHorizontal: Sizes.fixPadding * 2.0
    },
    payButtonWrapStyle: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.primaryColor,
        borderRadius: Sizes.fixPadding + 5.0,
        height: 55.0,
        width: '100%',
    },
    dialogWrapStyle: {
        borderRadius: Sizes.fixPadding,
        width: width - 150,
        paddingHorizontal: Sizes.fixPadding * 2.0,
        paddingTop: -Sizes.fixPadding,
        paddingBottom: Sizes.fixPadding * 3.0
    },
    successIconWrapStyle: {
        backgroundColor: Colors.whiteColor,
        borderColor: Colors.primaryColor,
        borderWidth: 1.0,
        width: 70.0,
        height: 70.0,
        borderRadius: 35.0,
        alignItems: 'center',
        justifyContent: 'center',
    },
    payableAmountWrapStyle: {
        backgroundColor: '#C7E9EE',
        paddingVertical: Sizes.fixPadding + 10.0,
        paddingHorizontal: Sizes.fixPadding * 2.0,
        marginBottom: Sizes.fixPadding
    }
})

export default PaymentScreen;