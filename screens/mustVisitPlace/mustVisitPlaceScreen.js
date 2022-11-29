import React from "react";
import { Text, View, StyleSheet, SafeAreaView, TouchableOpacity, Dimensions, FlatList, StatusBar, Image } from "react-native";
import { Colors, Sizes, Fonts } from "../../constants/styles";
import CollapsingToolbar from "../../components/sliverAppBarScreen";
import { MaterialIcons } from '@expo/vector-icons';
import GoogleMap from "../../components/googleMapScreeen";

const { height } = Dimensions.get('screen');

const functionalitiesList = [
    {
        id: '1',
        image: require('../../assets/images/icons/plane.png'),
        type: 'Travel',
    },
    {
        id: '2',
        image: require('../../assets/images/icons/cycle.png'),
        type: 'Cycling',
    },
    {
        id: '3',
        image: require('../../assets/images/icons/surf.png'),
        type: 'Surfing',
    },
    {
        id: '4',
        image: require('../../assets/images/icons/trekking.png'),
        type: 'Trekking',
    }
];

const reviewsList = [
    {
        id: '1',
        userImage: require('../../assets/images/user/user_1.jpg'),
        userName: 'Ersel',
        reviewDate: 'August 2020',
        review: 'Everything was ok and the location is nice.',
    },
    {
        id: '2',
        userImage: require('../../assets/images/user/user_2.jpg'),
        userName: 'Jane',
        reviewDate: 'August 2020',
        review: 'Great spot!',
    },
    {
        id: '3',
        userImage: require('../../assets/images/user/user_3.jpg'),
        userName: 'Apollonia',
        reviewDate: 'July 2020',
        review: 'Awesome place.',
    },
];

const relatedPlacesList = [
    {
        id: '1',
        hotelImage: require('../../assets/images/hotel/hotel_1.jpg'),
        hotelName: 'Hotel des Commedies Paris',
        rating: 5.0,
        place: 'Paris',
    },
    {
        id: '2',
        hotelImage: require('../../assets/images/hotel/hotel_2.jpg'),
        hotelName: 'Paris France Hotel',
        rating: 5.0,
        place: 'Paris',
    },
    {
        id: '3',
        hotelImage: require('../../assets/images/hotel/hotel_3.jpg'),
        hotelName: 'Pullman Paris Tour Eiffel',
        rating: 5.0,
        place: 'Paris',
    },
    {
        id: '4',
        hotelImage: require('../../assets/images/hotel/hotel_4.jpg'),
        hotelName: 'Hotel Darcet',
        rating: 5.0,
        place: 'Paris',
    },
    {
        id: '5',
        hotelImage: require('../../assets/images/hotel/hotel_5.jpg'),
        hotelName: 'Novotel Tour Eiffel Hotel',
        rating: 3.0,
        place: 'Paris',
    },
    {
        id: '6',
        hotelImage: require('../../assets/images/hotel/hotel_6.jpg'),
        hotelName: 'Shangri-La Hotel',
        rating: 5.0,
        place: 'Paris',
    },
    {
        id: '7',
        hotelImage: require('../../assets/images/hotel/hotel_7.jpg'),
        hotelName: 'Le Bristol Paris',
        rating: 5.0,
        place: 'Paris',
    },
    {
        id: '8',
        hotelImage: require('../../assets/images/hotel/hotel_8.jpg'),
        hotelName: 'Castille Paris',
        rating: 4.0,
        place: 'Paris',
    }
];

const MustVisitPlaceScreen = ({ navigation, route }) => {

    const place = route.params.place;

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
            <StatusBar translucent backgroundColor="transparent" />
            <View style={{ flex: 1 }}>
                <CollapsingToolbar
                    leftItem={
                        <View style={{ alignItems: 'center', width: '100%' }}>
                            <Text style={{ ...Fonts.blackColor20Regular }}>
                                {place.placeName}
                            </Text>
                            <MaterialIcons name="arrow-back" size={24}
                                color={Colors.blackColor}
                                onPress={() => navigation.pop()}
                                style={{
                                    position: 'absolute',
                                    left: 20.0,
                                }}
                            />
                        </View>
                    }
                    element={
                        <View>
                            <Text style={{ ...Fonts.blackColor30Bold }}>
                                {place.placeName}
                            </Text>
                            <View style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                marginVertical: Sizes.fixPadding
                            }}>
                                <MaterialIcons
                                    name="location-on"
                                    size={17}
                                    color={Colors.grayColor}
                                />
                                <Text style={{ ...Fonts.grayColor16Regular, marginLeft: Sizes.fixPadding - 3.0 }}>
                                    {place.location}
                                </Text>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                                <MaterialIcons
                                    name="star"
                                    size={17}
                                    color='#C0CA33'
                                />
                                <Text style={{ ...Fonts.blackColor16Regular, marginLeft: Sizes.fixPadding - 3.0 }}>
                                    {place.rating.toFixed(1)}
                                </Text>
                            </View>
                        </View>
                    }
                    toolbarColor={Colors.whiteColor}
                    toolBarMinHeight={100}
                    toolbarMaxHeight={height / 2.0}
                    src={place.placeImage}>
                    <View style={{
                        paddingBottom: Sizes.fixPadding * 2.0,
                        paddingTop: Sizes.fixPadding * 2.0
                    }}>
                        {functionalities()}
                        {title({ title: 'About' })}
                        {aboutInfo()}
                        {title({ title: 'Location' })}
                        {location()}
                        {title({ title: 'Review' })}
                        {reviews()}
                        {showAllReviewsButton()}
                        {title({ title: 'Related Places' })}
                        {relatedPlaces()}
                        {bookNowButton()}
                    </View>
                </CollapsingToolbar>
            </View>
        </SafeAreaView>
    )

    function bookNowButton() {
        return (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => navigation.pop()}
                style={styles.bookNowButtonStyle}>
                <Text style={{ ...Fonts.whiteColor19Regular }}>
                    Book Now
                </Text>
            </TouchableOpacity>
        )
    }

    function relatedPlaces() {
        const renderItem = ({ item }) => (
            <View style={{ width: 160.0, marginRight: Sizes.fixPadding * 2.0 }}>
                <Image
                    source={item.hotelImage}
                    style={{
                        width: 160.0,
                        height: 140.0,
                        borderRadius: Sizes.fixPadding + 5.0
                    }}
                    resizeMode="cover"
                />
                <Text numberOfLines={2} style={{ ...Fonts.blackColor18Bold, marginBottom: Sizes.fixPadding - 5.0 }}>
                    {item.hotelName}
                </Text>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <MaterialIcons name="location-on" size={20} color={Colors.grayColor} />
                    <Text style={{ ...Fonts.grayColor15Regular, marginLeft: Sizes.fixPadding - 5.0 }}>
                        {item.place}
                    </Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <MaterialIcons name="star" size={20} color='#C0CA33' />
                    <Text style={{ ...Fonts.grayColor15Regular, marginLeft: Sizes.fixPadding - 5.0 }}>
                        ({item.rating.toFixed(1)})
                    </Text>
                </View>
            </View>
        )
        return (
            <FlatList
                horizontal
                data={relatedPlacesList}
                keyExtractor={(item) => `${item.id}`}
                renderItem={renderItem}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{
                    paddingLeft: Sizes.fixPadding * 2.0,
                    paddingVertical: Sizes.fixPadding * 2.0
                }}
            />
        )
    }

    function showAllReviewsButton() {
        return (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => navigation.push('AllReviews')}
                style={styles.showAllReviewsButtonStyle}>
                <Text style={{ ...Fonts.primaryColor18Regular }}>
                    Show all reviews
                </Text>
            </TouchableOpacity>
        )
    }

    function reviews() {
        return (
            reviewsList.map((item, index) => (
                <View key={item.id}>
                    <View style={{
                        ...styles.reviewsWrapStyle,
                        marginTop: index == 0 ? Sizes.fixPadding + 5.0 : 0.0
                    }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Image
                                source={item.userImage}
                                style={{
                                    width: 70.0, height: 70.0, borderRadius: 35.0,
                                }}
                                resizeMode="cover"
                            />
                            <View style={{ marginLeft: Sizes.fixPadding }}>
                                <Text style={{ ...Fonts.blackColor16Regular }}>
                                    {item.userName}
                                </Text>
                                <Text style={{ ...Fonts.grayColor16Regular, marginVertical: Sizes.fixPadding - 8.0 }}>
                                    {item.reviewDate}
                                </Text>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <MaterialIcons name="star" size={20} color='#C0CA33' />
                                    <MaterialIcons name="star" size={20} color='#C0CA33' />
                                    <MaterialIcons name="star" size={20} color='#C0CA33' />
                                    <MaterialIcons name="star" size={20} color='#C0CA33' />
                                    <MaterialIcons name="star" size={20} color='#C0CA33' />
                                </View>
                            </View>
                        </View>
                        <Text numberOfLines={2} style={{ ...Fonts.blackColor18Regular, marginTop: Sizes.fixPadding }}>
                            {item.review}
                        </Text>
                    </View>
                </View>
            ))
        )
    }

    function location() {
        return (
            <View style={styles.mapStyle}>
                <GoogleMap
                    latitude={37.33233141}
                    longitude={-122.0312186}
                    height={270}
                />
            </View>
        )
    }

    function aboutInfo() {
        return (
            <Text style={{
                ...Fonts.grayColor16Regular,
                marginBottom: Sizes.fixPadding + 5.0,
                marginHorizontal: Sizes.fixPadding * 2.0
            }}>
                Lorem ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book
            </Text>
        )
    }

    function title({ title }) {
        return (
            <Text style={{
                ...Fonts.blackColor20Bold, marginHorizontal: Sizes.fixPadding * 2.0,
                marginVertical: Sizes.fixPadding
            }}>
                {title}
            </Text>
        )
    }

    function functionalities() {
        const renderItem = ({ item }) => (
            <View style={{ alignItems: 'center', marginRight: Sizes.fixPadding * 2.0 }}>
                <Image
                    source={item.image}
                    style={{
                        width: 70.0,
                        height: 70.0,
                    }}
                    resizeMode="cover"
                />
                <Text style={{ ...Fonts.blackColor16Regular, marginTop: Sizes.fixPadding - 3.0 }}>
                    {item.type}
                </Text>
            </View>
        )
        return (
            <View>
                <FlatList
                    horizontal
                    data={functionalitiesList}
                    keyExtractor={(item) => `${item.id}`}
                    renderItem={renderItem}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{
                        paddingLeft: Sizes.fixPadding * 2.0,
                        paddingBottom: Sizes.fixPadding - 5.0
                    }}
                />
            </View>

        )
    }
}

const styles = StyleSheet.create({
    mapStyle: {
        borderRadius: Sizes.fixPadding * 2.0,
        marginTop: Sizes.fixPadding,
        overflow: 'hidden',
        elevation: 3.0,
        marginBottom: Sizes.fixPadding,
        marginHorizontal: Sizes.fixPadding * 2.0
    },
    reviewsWrapStyle: {
        backgroundColor: Colors.whiteColor,
        borderColor: '#ECECEC',
        borderWidth: 1.0,
        marginHorizontal: Sizes.fixPadding * 2.0,
        borderRadius: Sizes.fixPadding * 2.0,
        paddingHorizontal: Sizes.fixPadding * 2.0,
        paddingTop: Sizes.fixPadding * 2.0,
        elevation: 2.0,
        paddingBottom: Sizes.fixPadding * 2.1,
        marginBottom: Sizes.fixPadding * 2.0,
    },
    showAllReviewsButtonStyle: {
        marginHorizontal: Sizes.fixPadding * 2.0,
        marginBottom: Sizes.fixPadding * 4.0,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.whiteColor,
        borderColor: Colors.primaryColor,
        borderRadius: Sizes.fixPadding + 5.0,
        borderWidth: 1.0,
        height: 55.0,
    },
    bookNowButtonStyle: {
        backgroundColor: Colors.primaryColor,
        borderRadius: Sizes.fixPadding + 5.0,
        height: 55.0,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: Sizes.fixPadding * 2.0,
        marginTop: Sizes.fixPadding,
        marginBottom: Sizes.fixPadding * 2.0,
    }
})

export default MustVisitPlaceScreen;