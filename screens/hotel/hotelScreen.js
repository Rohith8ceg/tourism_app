import React from "react";
import { Text, View, StyleSheet, FlatList, TouchableOpacity, Image, Dimensions } from "react-native";
import { Colors, Fonts, Sizes } from "../../constants/styles";
import { SharedElement } from 'react-navigation-shared-element';
import { MaterialIcons } from '@expo/vector-icons';

const { width } = Dimensions.get('screen');

export const hotelsList = [
    {
        id: '1',
        hotelImage: require('../../assets/images/hotel/hotel_1.jpg'),
        hotelName: 'Hotel des Comedies Paris',
        rating: 5.0,
        place: 'Paris',
        amount: 70,
    },
    {
        id: '2',
        hotelImage: require('../../assets/images/hotel/hotel_2.jpg'),
        hotelName: 'Paris France Hotel',
        rating: 5.0,
        place: 'London',
        amount: 45,
    },
    {
        id: '3',
        hotelImage: require('../../assets/images/hotel/hotel_3.jpg'),
        hotelName: 'Pullman Paris Tour Eiffel',
        rating: 5.0,
        place: 'Paris',
        amount: 75,
    },
    {
        id: '4',
        hotelImage: require('../../assets/images/hotel/hotel_4.jpg'),
        hotelName: 'Hotel Darcet',
        rating: 5.0,
        place: 'Paris',
        amount: 80,
    },
    {
        id: '5',
        hotelImage: require('../../assets/images/hotel/hotel_5.jpg'),
        hotelName: 'Novotel Tour Eiffel Hotel',
        rating: 3.0,
        place: 'Paris',
        amount: 29,
    },
    {
        id: '6',
        hotelImage: require('../../assets/images/hotel/hotel_6.jpg'),
        hotelName: 'Shangri-La Hotel',
        rating: 5.0,
        place: 'Paris',
        amount: 110,
    },
    {
        id: '7',
        hotelImage: require('../../assets/images/hotel/hotel_7.jpg'),
        hotelName: 'Le Bristol Paris',
        rating: 5.0,
        place: 'Paris',
        amount: 90,
    },
    {
        id: '8',
        hotelImage: require('../../assets/images/hotel/hotel_8.jpg'),
        hotelName: 'Castille Paris',
        rating: 4.0,
        place: 'Paris',
        amount: 39,
    },
];

const HotelScreen = ({ navigation }) => {

    const renderItem = ({ item }) => (
        <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => navigation.push('HotelDetail',
                {
                    item
                }
            )}
            style={styles.recommendedWrapStyle}>
            <SharedElement id={item.id}>
                <Image
                    source={item.hotelImage}
                    style={styles.recommendedImageStyle}
                />
            </SharedElement>
            <View style={styles.recommendedInfoWrapStyle}>
                <View style={{
                    width: width / 1.7
                }}>
                    <Text numberOfLines={2} style={{ ...Fonts.blackColor18Regular }}>
                        {item.hotelName}
                    </Text>
                    <View style={{
                        flexDirection: 'row',
                        marginVertical: Sizes.fixPadding - 5.0,
                        alignItems: 'center'
                    }}>
                        {showRating({ number: item.rating })}
                        <Text style={{ ...Fonts.grayColor15Regular, marginLeft: Sizes.fixPadding }}>
                            ({item.rating.toFixed(1)})
                        </Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <MaterialIcons
                            name="location-on"
                            size={16}
                            color={Colors.grayColor}
                        />
                        <Text style={{ ...Fonts.grayColor17Regular, marginLeft: Sizes.fixPadding - 3.0 }}>
                            {item.place}
                        </Text>
                    </View>
                </View>
                <View style={{ alignItems: 'center' }}>
                    <Text style={{ ...Fonts.primaryColor30Regular }}>
                        ₹{item.amount * 80}
                    </Text>
                    <Text style={{ ...Fonts.grayColor15Regular }}>
                        per night
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    )

    return (
        <View style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
            <View>
                {header()}
                {hotels()}
                {mapIcon()}
            </View>
        </View>
    )

    function mapIcon() {
        return (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => navigation.push('HotelWithMap')}
                style={styles.mapIconWrapStyle}>
                <MaterialIcons name="map" size={27} color={Colors.primaryColor} />
            </TouchableOpacity>
        )
    }

    function hotels() {
        return (
            <FlatList
                data={hotelsList}
                keyExtractor={(item) => `${item.id}`}
                renderItem={renderItem}
                contentContainerStyle={{
                    paddingBottom: Sizes.fixPadding * 13.0,
                    paddingTop: Sizes.fixPadding * 2.0
                }}
                showsVerticalScrollIndicator={false}
            />
        )
    }

    function header() {
        return (
            <View style={styles.headerWrapStyle}>
                <Text style={{ ...Fonts.blackColor20Regular }}>
                    Hotel
                </Text>
            </View>
        )
    }

    function showRating({ number }) {
        return (
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                {
                    (number == 5.0 || number == 4.0 || number == 3.0 || number == 2.0 || number == 1.0) ?
                        <MaterialIcons
                            name="star"
                            size={24}
                            color='#C0CA33'
                        />
                        :
                        <MaterialIcons
                            name="star-outline"
                            size={24}
                            color='#C0CA33'
                        />
                }
                {
                    (number == 5.0 || number == 4.0 || number == 3.0 || number == 2.0) ?
                        <MaterialIcons
                            name="star"
                            size={24}
                            color='#C0CA33'
                        />
                        :
                        <MaterialIcons
                            name="star-outline"
                            size={24}
                            color='#C0CA33'
                        />
                }
                {
                    (number == 5.0 || number == 4.0 || number == 3.0) ?
                        <MaterialIcons
                            name="star"
                            size={24}
                            color='#C0CA33'
                        />
                        :
                        <MaterialIcons
                            name="star-outline"
                            size={24}
                            color='#C0CA33'
                        />
                }
                {
                    (number == 5.0 || number == 4.0) ?
                        <MaterialIcons
                            name="star"
                            size={24}
                            color='#C0CA33'
                        />
                        :
                        <MaterialIcons
                            name="star-outline"
                            size={24}
                            color='#C0CA33'
                        />
                }
                {
                    (number == 5.0) ?
                        <MaterialIcons
                            name="star"
                            size={24}
                            color='#C0CA33'
                        />
                        :
                        <MaterialIcons
                            name="star-outline"
                            size={24}
                            color='#C0CA33'
                        />
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    headerWrapStyle: {
        backgroundColor: Colors.whiteColor,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 1.0,
        height: 60.0,
    },
    recommendedWrapStyle: {
        backgroundColor: Colors.whiteColor,
        borderRadius: Sizes.fixPadding + 7.0,
        elevation: 2.0,
        marginHorizontal: Sizes.fixPadding * 2.0,
        marginBottom: Sizes.fixPadding * 2.0
    },
    recommendedImageStyle: {
        height: 200.0,
        width: '100%',
        borderTopLeftRadius: Sizes.fixPadding + 7.0,
        borderTopRightRadius: Sizes.fixPadding + 7.0,
    },
    recommendedInfoWrapStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: Sizes.fixPadding + 5.0
    },
    mapIconWrapStyle: {
        position: 'absolute',
        bottom: 143.0,
        right: 15.0,
        width: 60.0,
        height: 60.0,
        borderRadius: 30.0,
        backgroundColor: Colors.whiteColor,
        elevation: 2.0,
        alignItems: 'center',
        justifyContent: 'center'
    }
})

export default HotelScreen;