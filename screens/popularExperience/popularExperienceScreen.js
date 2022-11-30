import React, { useState } from "react";
import { Text, View, StyleSheet, SafeAreaView, StatusBar, Dimensions, ScrollView, Image, ImageBackground, TouchableOpacity } from "react-native";
import { Colors, Fonts, Sizes } from "../../constants/styles";
import { MaterialIcons } from '@expo/vector-icons';
import Carousel, { Pagination } from 'react-native-snap-carousel-v4';
import { LinearGradient } from 'expo-linear-gradient';
import GoogleMap from "../../components/googleMapScreeen";
import { db } from "../../firebaseConfig";
const { width } = Dimensions.get('screen');

const PopularExperienceScreen = ({ navigation, route }) => {

    const [state, setState] = useState({
        experiences: [
            {
                image: require('../../assets/images/experience/experience_1.jpg'),
            },
            {
                image: require('../../assets/images/experience/experience_2.jpg'),
            },
            {
                image: require('../../assets/images/experience/experience_3.jpg'),
            }
        ],
        activeSlide: 0,
    })
    const [image, setImage] = useState(null);
    const updateState = (data) => setState((state) => ({ ...state, ...data }))

    const {
        experiences,
        activeSlide
    } = state;

    const item = route.params.item;
    async function fetch_img() {
        await db
          .collection("Data").doc("oYgL6pfD9HvkXCbNhRBQ")
          .get()
          .then((res) => {
            console.log("----",res);
            setImage(res.data()["base64"]);
            console.log("fetched here in profile screen")
          })
      }
    fetch_img();
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
            <StatusBar backgroundColor={Colors.primaryColor} />
            <View style={{ flex: 1 }}>
                {header()}
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: Sizes.fixPadding * 9.0 }}
                >
                    {photosWithSlider()}
                    {photosInfo()}
                    {divider()}
                    {experienceHostedInfo()}
                    {divider()}
                    {title({ title: 'What you\'ll do' })}
                    {willDoInfo()}
                    {divider()}
                    {title({ title: 'What\'s included' })}
                    {includedInfo()}
                    {divider()}
                    {meetTheHostInfo()}
                    {divider()}
                    {title({ title: 'Where you\'ll be' })}
                    {location()}
                </ScrollView>
            </View>
            {amountInfoAndBookNowButton()}
        </SafeAreaView>
    )

    function amountInfoAndBookNowButton() {
        return (
            <View style={styles.amountInfoAndBookNowButtonWrapStyle}>
                <View style={{
                    flexDirection: 'row',
                }}>
                    <Text style={{ ...Fonts.blackColor20Bold }}>
                        From  ₹{item.amountPerPerson * 80}
                    </Text>
                    <Text style={{
                        ...Fonts.blackColor16Regular,
                        alignSelf: 'flex-end'
                    }}>
                        {` / person`}
                    </Text>
                </View>
                <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => navigation.push('BookNow', {
                        booking: 'other',
                        amount: item.amountPerPerson,
                    })}
                    style={styles.bookNowButtonStyle}>
                    <Text style={{ ...Fonts.whiteColor19Regular }}>
                        Book now
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }

    function location() {
        return (
            <View style={styles.mapStyle}>
                <GoogleMap
                    latitude={37.33233141}
                    longitude={-122.0312186}
                    height={220}
                />
            </View>
        )
    }

    function meetTheHostInfo() {
        return (
            <View style={{ marginHorizontal: Sizes.fixPadding * 2.0 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Image
                         source={{ uri: `data:image/jpeg;base64,${image}` }}
                        style={{
                            width: 80.0,
                            height: 80.0,
                            borderRadius: 40.0,
                        }}
                        resizeMode="cover"
                    />
                    <View style={{
                        marginLeft: Sizes.fixPadding,
                        height: 80.0,
                        justifyContent: 'space-between',
                        paddingVertical: Sizes.fixPadding - 2.0
                    }}>
                        <Text style={{ ...Fonts.blackColor20Bold }}>
                            Meet your host,Peter
                        </Text>
                        <Text style={{ ...Fonts.grayColor17Regular }}>
                            Host on TravelPro since 2018
                        </Text>
                    </View>
                </View>
                <View style={{
                    flexDirection: 'row',
                    marginTop: Sizes.fixPadding,
                    alignItems: 'center'
                }}>
                    <MaterialIcons
                        name="star"
                        size={20}
                        color='#C0CA33'
                        style={{ marginRight: Sizes.fixPadding - 5.0 }}
                    />
                    <Text style={{ ...Fonts.grayColor17Regular, marginRight: Sizes.fixPadding + 5.0 }}>
                        208 Reviews
                    </Text>
                    <MaterialIcons name="verified-user" size={20} color='#C0CA33'
                        style={{ marginRight: Sizes.fixPadding - 5.0 }}
                    />
                    <Text
                        numberOfLines={1}
                        style={{ ...Fonts.grayColor17Regular, width: width / 2.0, }}>
                        Identify verification
                    </Text>
                </View>
                <Text style={{
                    ...Fonts.grayColor16Regular,
                    textAlign: 'justify',
                    marginVertical: Sizes.fixPadding
                }}>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                </Text>
                <View style={{
                    alignItems: 'flex-start',
                    marginTop: Sizes.fixPadding
                }}>
                    <View style={styles.contactHostButtonStyle}>
                        <Text style={{ ...Fonts.primaryColor18Regular }}>
                            Contact host
                        </Text>
                    </View>
                </View>

            </View>
        )
    }

    function includedInfo() {
        return (
            <View style={styles.includeInfoOuterWrapStyle}>
                <View style={styles.includeInfoInnerWrapStyle}>
                    <Image
                        source={require('../../assets/images/icons/travel.png')}
                        style={{ height: 40.0, width: 40.0 }}
                        resizeMode="cover"
                    />
                    <Text style={{ ...Fonts.blackColor16Bold, marginVertical: Sizes.fixPadding - 5.0 }}>
                        Equipment
                    </Text>
                    <Text numberOfLines={1} style={{ ...Fonts.blackColor16Regular }}>
                        Photo Equipment - special lenses.
                    </Text>
                </View>
            </View>
        )
    }

    function willDoInfo() {
        return (
            <Text style={{
                ...Fonts.grayColor16Regular,
                marginTop: Sizes.fixPadding,
                marginHorizontal: Sizes.fixPadding * 2.0,
                textAlign: 'justify'
            }}>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry.orem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
            </Text>
        )
    }

    function title({ title }) {
        return (
            <Text style={{
                marginHorizontal: Sizes.fixPadding * 2.0,
                ...Fonts.blackColor18Bold
            }}>
                {title}
            </Text>
        )
    }

    function experienceHostedInfo() {
        return (
            <View style={{
                marginHorizontal: Sizes.fixPadding * 2.0,
            }}>
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                }}>
                    <Text style={{ ...Fonts.blackColor18Bold }}>
                        Experience hosted by peter
                    </Text>
                    <Image
                         source={{ uri: `data:image/jpeg;base64,${image}` }}
                        style={{
                            height: 50.0,
                            width: 50.0,
                            borderRadius: 25.0,
                        }}
                        resizeMode="cover"
                    />
                </View>
                {relatedToHost({
                    image: require('../../assets/images/icons/clock.png'),
                    info: '90 mins'
                })}
                {relatedToHost({
                    image: require('../../assets/images/icons/tag.png'),
                    info: 'Includes equipment'
                })}
                {relatedToHost({
                    image: require('../../assets/images/icons/group.png'),
                    info: 'Up to 4 people'
                })}
                {relatedToHost({
                    image: require('../../assets/images/icons/chat.png'),
                    info: 'Hosted in English'
                })}
            </View>
        )
    }

    function relatedToHost({ image, info }) {
        return (
            <View style={{
                flexDirection: 'row', alignItems: 'center',
                marginTop: Sizes.fixPadding
            }}>
                <Image
                    source={image}
                    style={{ width: 30.0, height: 30.0 }}
                    resizeMode="cover"
                />
                <Text style={{ ...Fonts.blackColor16Regular, marginLeft: Sizes.fixPadding }}>
                    {info}
                </Text>
            </View>
        )
    }

    function photosInfo() {
        return (
            <View style={{ marginHorizontal: Sizes.fixPadding * 2.0, marginTop: Sizes.fixPadding }}>
                <Text style={{ ...Fonts.blackColor20Bold }}>
                    Private Scenic Travel Photo Shoot
                </Text>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <MaterialIcons
                        name="star"
                        size={20}
                        color='#C0CA33'
                    />
                    <Text style={{ ...Fonts.grayColor16Regular }}>4.96 (208)</Text>
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

    function photosWithSlider() {
        return (
            <View>
                <Carousel
                    data={experiences}
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
        )
    }

    function _renderItem({ item, index }) {
        return (
            <View>
                <ImageBackground
                    source={item.image}
                    style={{
                        width: width,
                        height: 500.0,
                    }}
                >
                    <LinearGradient
                        start={{ x: 0, y: 0 }}
                        end={{ x: 0, y: 1 }}
                        colors={[
                            'transparent',
                            'transparent',
                            'transparent',
                            'transparent',
                            'transparent',
                            'rgba(255,255,255,0.7)',
                            'rgba(255,255,255,0.99)',
                        ]}
                        style={{
                            width: width,
                            height: 500.0,
                        }}
                    >
                    </LinearGradient>
                </ImageBackground>
            </View>
        )
    }

    function pagination() {
        return (
            <Pagination
                dotsLength={experiences.length}
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
                <MaterialIcons
                    name="arrow-back"
                    size={24}
                    color="black"
                    onPress={() => navigation.goBack()}
                />
                <Text numberOfLines={1} style={{
                    ...Fonts.blackColor20Regular,
                    width: width / 1.3,
                    marginLeft: Sizes.fixPadding + 5.0
                }}>
                    {item.experience}
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
    includeInfoInnerWrapStyle: {
        backgroundColor: Colors.whiteColor,
        borderColor: '#ECECEC',
        borderWidth: 1.0,
        elevation: 1.0,
        borderRadius: Sizes.fixPadding * 2.0,
        padding: Sizes.fixPadding * 2.0,
    },
    includeInfoOuterWrapStyle: {
        alignItems: 'flex-start',
        maxWidth: width - 40,
        marginHorizontal: Sizes.fixPadding * 2.0,
        marginTop: Sizes.fixPadding + 5.0
    },
    contactHostButtonStyle: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.whiteColor,
        borderRadius: Sizes.fixPadding,
        height: 52.0,
        borderColor: Colors.primaryColor,
        borderWidth: 1.0,
        paddingHorizontal: Sizes.fixPadding * 2.0,
    },
    mapStyle: {
        borderRadius: Sizes.fixPadding + 5.0,
        marginTop: Sizes.fixPadding * 2.0,
        overflow: 'hidden',
        elevation: 3.0,
        marginHorizontal: Sizes.fixPadding * 2.0
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
})

export default PopularExperienceScreen;