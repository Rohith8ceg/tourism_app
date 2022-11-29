import React from "react";
import { Text, View, StyleSheet, SafeAreaView, StatusBar } from "react-native";
import { Colors, Fonts } from "../../constants/styles";
import TabBarScreen from "../../components/tabBarScreen";

const FavoriteScreen = ({ navigation }) => {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <StatusBar translucent={false} backgroundColor={Colors.primaryColor} />
            <View>
                {header()}
            </View>
            <TabBarScreen navigation={navigation} />
        </SafeAreaView>
    )

    function header() {
        return (
            <View style={styles.headerWrapStyle}>
                <Text style={{ ...Fonts.blackColor20Regular }}>
                    Favorite
                </Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    headerWrapStyle: {
        backgroundColor: Colors.whiteColor,
        alignItems: 'center',
        justifyContent: 'center',
        height: 60.0,
    }
})

export default FavoriteScreen;