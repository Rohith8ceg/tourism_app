import React, { useState } from "react";
import {
    Text,
    View,
    TouchableOpacity,
    TouchableHighlight,
    StyleSheet,
    Image,
    Animated,
    Dimensions
} from "react-native";
import { Fonts, Colors, Sizes } from "../../constants/styles";
import { SwipeListView } from 'react-native-swipe-list-view';
import { Snackbar } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';

const { width } = Dimensions.get('screen');

const favouriteHotelsList = [
    {
        key: '1',
        hotelImage: require('../../assets/images/hotel/hotel_1.jpg'),
        hotelName: 'Hotel Mercure Paris Centre Tour Eiffel',
        rating: 5.0,
        place: 'Paris',
        amount: 70,
    },
    {
        key: '2',
        hotelImage: require('../../assets/images/hotel/hotel_2.jpg'),
        hotelName: 'Novotel Tour Eiffel Hotel',
        rating: 4.0,
        place: 'London',
        amount: 50,
    },
    {
        key: '3',
        hotelImage: require('../../assets/images/hotel/hotel_3.jpg'),
        hotelName: 'Paris France Hotel',
        rating: 5.0,
        place: 'France',
        amount: 60,
    },
];

const rowSwipeAnimatedValues = {};

Array(favouriteHotelsList.length + 1)
    .fill('')
    .forEach((_, i) => {
        rowSwipeAnimatedValues[`${i}`] = new Animated.Value(0);
    });

const FavouriteHotels = ({ navigation }) => {

    const [showSnackBar, setShowSnackBar] = useState(false);

    const [listData, setListData] = useState(favouriteHotelsList);

    const closeRow = (rowMap, rowKey) => {
        if (rowMap[rowKey]) {
            rowMap[rowKey].closeRow();
        }
    };

    const deleteRow = (rowMap, rowKey) => {
        closeRow(rowMap, rowKey);
        const newData = [...listData];
        const prevIndex = listData.findIndex(item => item.key === rowKey);
        newData.splice(prevIndex, 1);
        setListData(newData);
        setShowSnackBar(true);
    };

    const onSwipeValueChange = swipeData => {
        const { key, value } = swipeData;
        rowSwipeAnimatedValues[key].setValue(Math.abs(value));
    };

    const renderItem = data => (
        <TouchableHighlight
            style={{ ...styles.rowFront, }}
            activeOpacity={0.9}
        >
            <TouchableOpacity
                activeOpacity={0.9}
                style={styles.recommendedWrapStyle}>
                <Image
                    source={data.item.hotelImage}
                    style={styles.recommendedImageStyle}
                />
                <View style={styles.recommendedInfoWrapStyle}>
                    <View style={{
                        width: width / 1.7
                    }}>
                        <Text numberOfLines={2} style={{ ...Fonts.blackColor18Regular }}>
                            {data.item.hotelName}
                        </Text>
                        <View style={{
                            flexDirection: 'row',
                            marginVertical: Sizes.fixPadding - 5.0,
                            alignItems: 'center'
                        }}>
                            {showRating({ number: data.item.rating })}
                            <Text style={{ ...Fonts.grayColor15Regular, marginLeft: Sizes.fixPadding }}>
                                ({data.item.rating.toFixed(1)})
                            </Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <MaterialIcons
                                name="location-on"
                                size={16}
                                color={Colors.grayColor}
                            />
                            <Text style={{ ...Fonts.grayColor17Regular, marginLeft: Sizes.fixPadding - 3.0 }}>
                                {data.item.place}
                            </Text>
                        </View>
                    </View>
                    <View style={{ alignItems: 'center' }}>
                        <Text style={{ ...Fonts.primaryColor30Regular }}>
                        ₹{data.item.amount * 80}
                        </Text>
                        <Text style={{ ...Fonts.grayColor15Regular }}>
                            per night
                        </Text>
                    </View>
                </View>
            </TouchableOpacity>
        </TouchableHighlight>
    );

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


    const renderHiddenItem = (data, rowMap) => (
        <View style={styles.rowBack}>
            <TouchableOpacity
                style={styles.backDeleteContinerStyle}
                onPress={() => deleteRow(rowMap, data.item.key)}
            >
                <Animated.View
                    style={[
                        {
                            transform: [
                                {
                                    scale: rowSwipeAnimatedValues[
                                        data.item.key
                                    ].interpolate({
                                        inputRange: [45, 90],
                                        outputRange: [0, 1],
                                        extrapolate: 'clamp',
                                    }),
                                },
                            ],
                        },
                    ]}
                >
                    <MaterialIcons name="delete" size={29} color="white" style={{ alignSelf: 'center' }} />
                    <Text style={{ ...Fonts.whiteColor14Regular, alignSelf: 'center' }}>Delete</Text>
                </Animated.View>
            </TouchableOpacity>
        </View>
    );

    return (
        <View style={{ flex: 1 }}>
            {
                listData.length == 0 ?
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <MaterialIcons name="hotel" size={60} color={Colors.grayColor} />
                        <Text style={{ ...Fonts.grayColor16Regular, marginTop: Sizes.fixPadding * 2.0 }}>
                            No Item in Favorite Hotel
                        </Text>
                    </View>
                    :
                    <SwipeListView
                        data={listData}
                        renderItem={renderItem}
                        renderHiddenItem={renderHiddenItem}
                        rightOpenValue={-100}
                        onSwipeValueChange={onSwipeValueChange}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{
                            paddingVertical: Sizes.fixPadding * 2.0,
                            paddingBottom: Sizes.fixPadding * 7.0,
                        }}
                    />
            }
            <Snackbar
                style={styles.snackBarContainerStyle}
                visible={showSnackBar}
                onDismiss={() => setShowSnackBar(false)}
            >
                Hotel Removed from Favorite
            </Snackbar>
        </View>
    );
}

const styles = StyleSheet.create({
    snackBarContainerStyle: {
        position: 'absolute',
        bottom: 60.0,
        left: -10.0,
        right: -10.0,
        backgroundColor: '#333333'
    },
    rowFront: {
        backgroundColor: Colors.whiteColor,
    },
    rowBack: {
        alignItems: 'center',
        flex: 1.0,
    },
    backDeleteContinerStyle: {
        alignItems: 'center',
        bottom: 20,
        justifyContent: 'center',
        position: 'absolute',
        top: 0,
        width: 100,
        backgroundColor: 'red',
        right: 0,
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
    }
})

export default FavouriteHotels;