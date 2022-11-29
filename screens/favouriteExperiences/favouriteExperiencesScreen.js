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
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { Fonts, Colors, Sizes } from "../../constants/styles";
import { SwipeListView } from 'react-native-swipe-list-view';
import { Snackbar } from 'react-native-paper';

const { width } = Dimensions.get('screen');

const favouriteExperiencesList = [
    {
        key: '1',
        experienceImage: require('../../assets/images/popular_experiences/popular_experiences_2.jpg'),
        rating: '5.0',
        experience: 'Fine Wines & Ruin Bars',
        from: 'Wine tasting',
        amountPerPerson: 61,
    },
    {
        key: '2',
        experienceImage: require('../../assets/images/popular_experiences/popular_experiences_3.jpg'),
        rating: '4.81',
        experience: 'Budapest Boat Cruise With a ',
        from: 'Boat ride',
        amountPerPerson: 31,
    },
    {
        key: '3',
        experienceImage: require('../../assets/images/popular_experiences/popular_experiences_4.jpg'),
        rating: '5.0',
        experience: 'Budapest Historic and',
        from: 'History walk',
        amountPerPerson: 64,
    },
];

const rowSwipeAnimatedValues = {};

Array(favouriteExperiencesList.length + 1)
    .fill('')
    .forEach((_, i) => {
        rowSwipeAnimatedValues[`${i}`] = new Animated.Value(0);
    });

const FavouriteExperiences = ({ navigation }) => {

    const [showSnackBar, setShowSnackBar] = useState(false);

    const [listData, setListData] = useState(favouriteExperiencesList);

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
            <View style={styles.favouriteExperiencesWrapStyle}>
                <Image
                    source={data.item.experienceImage}
                    style={styles.favouriteExperiencesImageStyle}
                    resizeMode="cover"
                >
                </Image>
                <View style={styles.favouriteExperiencesDetailWrapStyle}>
                    <Text numberOfLines={2} style={{ ...Fonts.blackColor18Regular }}>
                        {data.item.experience}
                    </Text>
                    <Text style={{ ...Fonts.grayColor18Regular, marginVertical: Sizes.fixPadding - 5.0 }}>
                        {data.item.from}
                    </Text>
                    <Text style={{ ...Fonts.blackColor16Regular }}>
                        From  ₹{data.item.amountPerPerson * 80}/person
                    </Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: Sizes.fixPadding - 5.0 }}>
                        <MaterialIcons
                            name="star"
                            size={20}
                            color='#C0CA33'
                        />
                        <Text style={{ ...Fonts.blackColor16Regular, marginLeft: Sizes.fixPadding - 5.0 }}>
                            {data.item.rating}
                        </Text>
                    </View>
                </View>
            </View>
        </TouchableHighlight>

    );

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
                        <MaterialCommunityIcons name="cup-water" size={60} color={Colors.grayColor} />
                        <Text style={{ ...Fonts.grayColor16Regular, marginTop: Sizes.fixPadding * 2.0 }}>
                            No Item in Favorite Experiences
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
                Experience Removed from Favorite
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
    },
    favouriteExperiencesWrapStyle: {
        flexDirection: 'row',
        backgroundColor: Colors.whiteColor,
        marginBottom: Sizes.fixPadding * 2.0,
        marginHorizontal: Sizes.fixPadding * 2.0,
    },
    favouriteExperiencesImageStyle: {
        height: 190.0,
        width: 120.0,
        borderTopLeftRadius: Sizes.fixPadding + 5.0,
        borderBottomLeftRadius: Sizes.fixPadding + 5.0,
    },
    favouriteExperiencesDetailWrapStyle: {
        padding: Sizes.fixPadding + 5.0,
        backgroundColor: Colors.whiteColor,
        width: width - 160,
        borderColor: '#ECECEC',
        borderWidth: 0.70,
        elevation: 1.0,
        borderTopRightRadius: Sizes.fixPadding + 5.0,
        borderBottomRightRadius: Sizes.fixPadding + 5.0,
    }
})

export default FavouriteExperiences;