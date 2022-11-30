import React, { useState } from "react";
import { Text, View, StyleSheet, SafeAreaView, StatusBar, Image, Dimensions, FlatList, TouchableOpacity } from "react-native";
import { Colors, Fonts, Sizes } from "../../constants/styles";
import { MaterialIcons } from '@expo/vector-icons';
import { SharedElement } from 'react-navigation-shared-element';
import Carousel, { Pagination } from 'react-native-snap-carousel-v4';
import GoogleMap from "../../components/googleMapScreeen";
import { Snackbar } from 'react-native-paper';

const { width } = Dimensions.get('screen');

const facilitiesList = [
    {
        id: '1',
        facilityImage: require('../../assets/images/icons/parking.png'),
        facilityName: 'Free Parking',
    },
    {
        id: '2',
        facilityImage: require('../../assets/images/icons/lift.png'),
        facilityName: 'Lift',
    },
    {
        id: '3',
        facilityImage: require('../../assets/images/icons/wifi.png'),
        facilityName: 'Wifi',
    },
    {
        id: '4',
        facilityImage: require('../../assets/images/icons/kitchen.png'),
        facilityName: 'Kitchen',
    },
    {
        id: '5',
        facilityImage: require('../../assets/images/icons/ac.png'),
        facilityName: 'Air conditioning',
    },
    {
        id: '6',
        facilityImage: require('../../assets/images/icons/tv.png'),
        facilityName: 'Television',
    },
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

const HotelDetailScreen = ({ navigation, route }) => {

    const item = route.params.item;
    console.log(item)

    const [state, setState] = useState({
        hotels: [
            {
                image: item.hotelImage,
            },
            {
                image: item.hotelImage,
            },
            {
                image: item.hotelImage,
            },
        ],
        activeSlide: 0,
        isInFavorite: false,
        showSnackBar: false,
    })

    const updateState = (data) => setState((state) => ({ ...state, ...data }))

    const {
        hotels,
        activeSlide,
        isInFavorite,
        showSnackBar,
    } = state;

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
            <StatusBar backgroundColor={Colors.primaryColor} />
            <View style={{ flex: 1 }}>
                {header()}
                <FlatList
                    ListHeaderComponent={
                        <>
                            {hotelImages()}
                            {hotelInfo()}
                            {divider()}
                            {title({ title: 'Facility' })}
                            {facilities()}
                            {divider()}
                            {title({ title: 'About this Place' })}
                            {aboutPlace()}
                            {divider()}
                            {title({ title: 'Sleeping arrangements' })}
                            {sleepingArrangementsInfo()}
                            {divider()}
                            {title({ title: 'Location' })}
                            {location()}
                            {divider()}
                            {title({ title: 'Review' })}
                        </>
                    }
                    data={reviewsList}
                    keyExtractor={(item) => `${item.id}`}
                    showsVerticalScrollIndicator={false}
                    renderItem={renderItem}
                    contentContainerStyle={{
                        paddingBottom: Sizes.fixPadding * 7.0
                    }}
                    ListFooterComponent={
                        <>
                            {showAllReviewsButton()}
                            {title({ title: 'Related Places' })}
                            {relatedPlaces()}
                        </>
                    }
                />
            </View>
            {amountInfoAndBookNowButton()}
            <Snackbar
                style={styles.snackBarStyle}
                visible={showSnackBar}
                onDismiss={() => updateState({ showSnackBar: false })}
            >
                {isInFavorite ? 'Added to Favorite' : 'Remove from Favorite'}
            </Snackbar>
        </SafeAreaView>
    )

    function amountInfoAndBookNowButton() {
        return (
            <View style={styles.amountInfoAndBookNowButtonWrapStyle}>
                <View style={{
                    flexDirection: 'row',
                }}>
                    <Text style={{ ...Fonts.blackColor20Bold }}>
                        From ₹{item.amount * 80}
                    </Text>
                    <Text style={{
                        ...Fonts.blackColor16Regular,
                        alignSelf: 'flex-end'
                    }}>
                        {`/night  `}
                    </Text>
                </View>
                <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => navigation.push('BookNow', {
                        booking: 'hotel',
                        amount: item.amount,
                    })}
                    style={styles.bookNowButtonStyle}>
                    <Text style={{ ...Fonts.whiteColor19Regular }}>
                        Book now
                    </Text>
                </TouchableOpacity>
            </View>
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

    const renderItem = ({ item, index }) => (
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
    )

    function location() {
        return (
            <View style={styles.mapStyle}>
                <GoogleMap
                    latitude={item.latitude}
                    longitude={item.longitude}
                    height={250}
                />
            </View>
        )
    }

    function sleepingArrangementsInfo() {
        return (
            <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: Sizes.fixPadding * 2.0,
                marginHorizontal: Sizes.fixPadding * 2.0,
            }}>
                <View style={styles.sleepingArrangementsWrapStyle}>
                    <Image
                        source={require('../../assets/images/icons/bed.png')}
                        style={{
                            width: 40.0,
                            height: 40.0,
                            marginBottom: Sizes.fixPadding
                        }}
                        resizeMode="cover"
                    />
                    <Text style={{ ...Fonts.blackColor16Regular }}>
                        Bedroom 1
                    </Text>
                    <Text style={{ ...Fonts.grayColor16Regular }}>
                        1 queen bed
                    </Text>
                </View>
                <View style={styles.sleepingArrangementsWrapStyle}>
                    <Image
                        source={require('../../assets/images/icons/bed.png')}
                        style={{
                            width: 40.0,
                            height: 40.0,
                            marginBottom: Sizes.fixPadding
                        }}
                        resizeMode="cover"
                    />
                    <Text style={{ ...Fonts.blackColor16Regular }}>
                        Bedroom 1
                    </Text>
                    <Text style={{ ...Fonts.grayColor16Regular }}>
                        1 king bed
                    </Text>
                </View>
            </View>
        )
    }

    function aboutPlace() {
        return (
            <Text style={{
                ...Fonts.grayColor16Regular,
                marginHorizontal: Sizes.fixPadding * 2.0,
                textAlign: 'justify',
                marginTop: Sizes.fixPadding
            }}>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
            </Text>
        )
    }

    function facilities() {
        const renderItem = ({ item }) => (
            <View style={{
                alignItems: 'center',
                marginRight: Sizes.fixPadding * 2.0,
            }}>
                <View style={styles.facilityImageWrapStyle}>
                    <Image
                        source={item.facilityImage}
                        style={{ height: 40.0, width: 40.0 }}
                        resizeMode="cover"
                    />
                </View>
                <Text style={{ ...Fonts.primaryColor15Regular, marginTop: Sizes.fixPadding }}>
                    {item.facilityName}
                </Text>
            </View>
        )
        return (
            <FlatList
                horizontal
                data={facilitiesList}
                keyExtractor={(item) => `${item.id}`}
                renderItem={renderItem}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{
                    paddingLeft: Sizes.fixPadding * 2.0,
                    paddingTop: Sizes.fixPadding * 2.0,
                }}
            />
        )
    }

    function title({ title }) {
        return (
            <Text style={{
                ...Fonts.blackColor18Regular,
                marginHorizontal: Sizes.fixPadding * 2.0
            }}>
                {title}
            </Text>
        )
    }

    function hotelInfo() {
        return (
            <View style={{ marginHorizontal: Sizes.fixPadding * 2.0 }}>
                <Text numberOfLines={2} style={{ ...Fonts.blackColor18Bold, marginTop: Sizes.fixPadding + 5.0 }}>
                    {item.hotelName}
                </Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: Sizes.fixPadding }}>
                    <MaterialIcons name="star" size={17} color="#C0CA33" />
                    <Text style={{ ...Fonts.blackColor15Regular, marginLeft: Sizes.fixPadding - 5.0 }}>
                        {item.rating.toFixed(1)}
                    </Text>
                    <Text style={{ ...Fonts.grayColor15Regular, marginLeft: Sizes.fixPadding - 5.0 }}>(12)</Text>
                    <Text style={{ ...Fonts.primaryColor15Regular, marginLeft: Sizes.fixPadding }}>
                        Budapest, Hungary
                    </Text>
                </View>
            </View>
        )
    }

    function divider() {
        return (
            <View style={{
                backgroundColor: Colors.grayColor,
                height: 0.7,
                marginVertical: Sizes.fixPadding * 2.0,
                marginHorizontal: Sizes.fixPadding * 2.0,
            }}>
            </View>
        )
    }

    function _renderItem({ item, index }) {
        return (
            <Image
                source={item.image}
                style={{
                    width: width,
                    height: 400.0,
                }}
                resizeMode="cover"
            />
        )
    }

    function hotelImages() {
        return (
            <SharedElement id={item.id}>
                <View>
                    <Carousel
                        data={hotels}
                        sliderWidth={width}
                        autoplay={true}
                        loop={true}
                        autoplayInterval={4000}
                        itemWidth={width}
                        renderItem={_renderItem}
                        onSnapToItem={(index) => updateState({ activeSlide: index })}
                    />
                    {pagination()}
                </View>
            </SharedElement>
        )
    }

    function pagination() {
        return (
            <Pagination
                dotsLength={hotels.length}
                activeDotIndex={activeSlide}
                containerStyle={styles.sliderPaginationWrapStyle}
                dotStyle={styles.sliderActiveDotStyle}
                inactiveDotStyle={styles.sliderInactiveDotStyle}
            />
        );
    }

    function header() {
        return (
            <View style={styles.headerWrapStyle}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <MaterialIcons
                        name="arrow-back"
                        size={24}
                        color="black"
                        onPress={() => navigation.pop()}
                    />
                    <Text numberOfLines={1} style={styles.headerTextStyle}>
                        {item.hotelName}
                    </Text>
                </View>
                <MaterialIcons
                    name={isInFavorite ? "favorite" : "favorite-border"}
                    size={24}
                    color="black"
                    onPress={() => updateState({
                        isInFavorite: !isInFavorite,
                        showSnackBar: true
                    })}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    headerWrapStyle: {
        backgroundColor: Colors.whiteColor,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: 60.0,
        marginHorizontal: Sizes.fixPadding * 2.0
    },
    headerTextStyle: {
        ...Fonts.blackColor20Regular,
        width: width / 1.5,
        marginLeft: Sizes.fixPadding + 5.0
    },
    sliderActiveDotStyle: {
        width: 12,
        height: 12,
        borderRadius: 6.0,
        backgroundColor: Colors.whiteColor,
        marginHorizontal: Sizes.fixPadding - 15.0
    },
    sliderInactiveDotStyle: {
        width: 15,
        height: 15,
        borderRadius: 7.5,
        backgroundColor: Colors.primaryColor
    },
    sliderPaginationWrapStyle: {
        position: 'absolute',
        bottom: -20.0,
        left: 0.0,
        right: 0.0,
    },
    facilityImageWrapStyle: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 70.0,
        height: 70.0,
        borderRadius: 35.0,
        backgroundColor: Colors.whiteColor,
        borderColor: Colors.primaryColor,
        borderWidth: 1.0,
        elevation: 2.0,
    },
    sleepingArrangementsWrapStyle: {
        flex: 0.45,
        backgroundColor: Colors.whiteColor,
        borderColor: Colors.primaryColor,
        borderWidth: 1.0,
        borderRadius: Sizes.fixPadding + 5.0,
        padding: Sizes.fixPadding * 2.0,
        elevation: 2.0,
    },
    mapStyle: {
        borderRadius: Sizes.fixPadding * 2.0,
        marginTop: Sizes.fixPadding * 2.0,
        overflow: 'hidden',
        elevation: 3.0,
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
    amountInfoAndBookNowButtonWrapStyle: {
        position: 'absolute',
        bottom: 0.0,
        height: 70.0,
        left: 0.0,
        right: 0.0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: Colors.whiteColor,
        alignItems: 'center',
        paddingHorizontal: Sizes.fixPadding * 2.0,
        borderTopColor: '#ECECEC',
        borderTopWidth: 0.50,
    },
    bookNowButtonStyle: {
        backgroundColor: Colors.primaryColor,
        alignItems: 'center',
        paddingHorizontal: Sizes.fixPadding * 2.0,
        paddingVertical: Sizes.fixPadding,
        justifyContent: 'center',
        borderRadius: Sizes.fixPadding + 5.0
    },
    snackBarStyle: {
        position: 'absolute',
        bottom: 60.0,
        left: -10.0,
        right: -10.0,
        backgroundColor: '#333333',
        elevation: 0.0,
    }
})

export default HotelDetailScreen;