import React, { useState } from "react";
import { Text, View, StyleSheet, SafeAreaView, StatusBar, Dimensions, ScrollView, TouchableOpacity } from "react-native";
import { Colors, Fonts, Sizes } from "../../constants/styles";
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { CalendarList } from 'react-native-calendars';
import { Dialog } from 'react-native-paper';

var date = new Date().getDate();
var month = new Date().getMonth() + 1;
var dummyMonth = month.toString();
var finalMonth = dummyMonth.length == 1 ? `0${month}` : month
var year = new Date().getFullYear();

const { width } = Dimensions.get('screen');

const additionalRulesList = [
    {
        id: '1',
        rule: 'The apartment can be occupied on the day of the arrival from 2PM and should be vacated before 11AM on the day of departure.wherever possible we are flexible with these times but please sdvise us of your requirements in advance!We reserve the right to charge an extra day payment if you stay later than 11 AM and it was not agreed with us formerly in email,in advance.'
    },
    {
        id: '2',
        rule: 'We kindly ask all our guest to fill our registration book upon arrival.'
    },
    {
        id: '3',
        rule: 'Please leave all the keys received in the keybox,as agreed previously,at the handover.'
    },
    {
        id: '4',
        rule: 'Please always lock the doors ti youe apartment,i.e. the street door,the apartment door and the security gate if available.'
    },
    {
        id: '5',
        rule: 'In case any apartment key is lost you should inform us immediately;the necessary lock and key changes will be charged to you.'
    },
    {
        id: '6',
        rule: 'The apartment can be used by our checked-in guests only.'
    }
];

const BookNowScreen = ({ navigation, route }) => {

    const [state, setState] = useState({
        dateSelected: { '2012-05-19': { disabled: true, disableTouchEvent: true } },
        showStartDateSelection: false,
        selectedStartDateDay: '',
        selectedStartDateMonth: '',
        selectedStartDateYear: '',
        isViewSelectedStartDate: false,
        endDateSelected: { '2012-05-19': { disabled: true, disableTouchEvent: true } },
        showEndDateSelection: false,
        selectedEndDateDay: '',
        selectedEndDateMonth: '',
        selectedEndDateYear: '',
        isViewSelectedEndDate: false,
        showDateSelection: false,
        selectedDateDay: '',
        selectedDateMonth: '',
        selectedDateYear: '',
        isViewSelectedDate: false,
        showNumberOfGuestSelection: false,
        adultsCount: 1,
        childrensCount: 0,
        infantsCount: 0,
        totalGuest: 1,
    })

    const updateState = (data) => setState((state) => ({ ...state, ...data }))

    const {
        dateSelected,
        showStartDateSelection,
        selectedStartDateDay,
        selectedStartDateMonth,
        selectedStartDateYear,
        isViewSelectedStartDate,
        endDateSelected,
        showEndDateSelection,
        selectedEndDateDay,
        selectedEndDateMonth,
        selectedEndDateYear,
        isViewSelectedEndDate,
        showDateSelection,
        selectedDateDay,
        selectedDateMonth,
        selectedDateYear,
        isViewSelectedDate,
        showNumberOfGuestSelection,
        adultsCount,
        childrensCount,
        infantsCount,
        totalGuest,
    } = state;

    const amount = route.params.amount;
    const booking = route.params.booking;

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
            <StatusBar backgroundColor={Colors.primaryColor} />
            <View style={{ flex: 1 }}>
                {header()}
                {
                    booking == 'hotel' ?
                        <ScrollView
                            showsVerticalScrollIndicator={false}
                            contentContainerStyle={{ paddingBottom: Sizes.fixPadding * 8.0 }}
                        >
                            {selectDateInfo()}
                            {rulesInfo()}
                            {additionalRuleInfo()}

                        </ScrollView> :
                        <ScrollView>
                            {dateAndGuestsInfo()}
                        </ScrollView>
                }
                {bookNowButton()}
            </View>
            {selectStartDateDialog()}
            {selectEndDateDialog()}
            {selectDateDialog()}
            {selectNumberOfGuestDialog()}
        </SafeAreaView>
    )

    function selectNumberOfGuestDialog() {
        return (
            <Dialog visible={showNumberOfGuestSelection}
                style={{
                    borderRadius: Sizes.fixPadding,
                    padding: Sizes.fixPadding * 2.0
                }}
            >
                <View style={styles.numberOfGuestsWrapStyle}>
                    <Text style={{ ...Fonts.blackColor18Regular }}>
                        Adults
                    </Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <TouchableOpacity
                            activeOpacity={0.9}
                            onPress={() => {
                                adultsCount != 1 ?
                                    updateState({ adultsCount: adultsCount - 1 })
                                    :
                                    null
                            }
                            }
                            style={{
                                ...styles.addAndSubtractGuestIconWrapStyle,
                                borderColor: adultsCount == 1 ? Colors.grayColor : Colors.blackColor,
                            }}>
                            <MaterialCommunityIcons name="minus" size={20}
                                color={adultsCount == 1 ? Colors.grayColor : Colors.blackColor}
                            />
                        </TouchableOpacity>
                        <Text style={{ ...Fonts.blackColor18Regular, marginHorizontal: Sizes.fixPadding }}>
                            {adultsCount}
                        </Text>
                        <TouchableOpacity
                            activeOpacity={0.9}
                            onPress={() => updateState({ adultsCount: adultsCount + 1 })}
                            style={{
                                ...styles.addAndSubtractGuestIconWrapStyle,
                                borderColor: Colors.blackColor,
                            }}>
                            <MaterialIcons name="add" size={20} color="black" />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{ ...styles.numberOfGuestsWrapStyle, marginVertical: Sizes.fixPadding }}>
                    <View>
                        <Text style={{ ...Fonts.blackColor18Regular }}>
                            Children
                        </Text>
                        <Text style={{ ...Fonts.grayColor16Regular }}>
                            Ages 2-12
                        </Text>
                    </View>

                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <TouchableOpacity
                            activeOpacity={0.9}
                            onPress={() => {
                                childrensCount != 0 ?
                                    updateState({ childrensCount: childrensCount - 1 })
                                    :
                                    null
                            }
                            }
                            style={{
                                ...styles.addAndSubtractGuestIconWrapStyle,
                                borderColor: childrensCount == 0 ? Colors.grayColor : Colors.blackColor,
                            }}>
                            <MaterialCommunityIcons name="minus" size={20}
                                color={
                                    childrensCount == 0 ?
                                        Colors.grayColor
                                        : Colors.blackColor
                                }
                            />
                        </TouchableOpacity>
                        <Text style={{ ...Fonts.blackColor18Regular, marginHorizontal: Sizes.fixPadding }}>
                            {childrensCount}
                        </Text>
                        <TouchableOpacity
                            activeOpacity={0.9}
                            onPress={() => updateState({ childrensCount: childrensCount + 1 })}
                            style={{
                                ...styles.addAndSubtractGuestIconWrapStyle,
                                borderColor: Colors.blackColor,
                            }}>
                            <MaterialIcons name="add" size={20} color="black" />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.numberOfGuestsWrapStyle}>
                    <View>
                        <Text style={{ ...Fonts.blackColor18Regular }}>
                            Infants
                        </Text>
                        <Text style={{ ...Fonts.grayColor16Regular }}>
                            Ages 2-12
                        </Text>
                    </View>

                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <TouchableOpacity
                            activeOpacity={0.9}
                            onPress={() => {
                                infantsCount != 0 ?
                                    updateState({ infantsCount: infantsCount - 1 })
                                    :
                                    null
                            }
                            }
                            style={{
                                ...styles.addAndSubtractGuestIconWrapStyle,
                                borderColor: infantsCount == 0 ?
                                    Colors.grayColor
                                    : Colors.blackColor,
                            }}>
                            <MaterialCommunityIcons name="minus" size={20}
                                color={
                                    infantsCount == 0 ?
                                        Colors.grayColor
                                        : Colors.blackColor
                                }
                            />
                        </TouchableOpacity>
                        <Text style={{ ...Fonts.blackColor18Regular, marginHorizontal: Sizes.fixPadding }}>
                            {infantsCount}
                        </Text>
                        <TouchableOpacity
                            activeOpacity={0.9}
                            onPress={() => { updateState({ infantsCount: infantsCount + 1 }) }}
                            style={{
                                ...styles.addAndSubtractGuestIconWrapStyle,
                                borderColor: Colors.blackColor,
                            }}>
                            <MaterialIcons name="add" size={20} color="black" />
                        </TouchableOpacity>
                    </View>
                </View>
                <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => {
                        updateState({
                            totalGuest: adultsCount + childrensCount + infantsCount,
                            showNumberOfGuestSelection: false
                        })
                    }}
                    style={styles.saveButtonStyle}>
                    <Text style={{ ...Fonts.whiteColor19Regular }}>
                        Save
                    </Text>
                </TouchableOpacity>
            </Dialog>
        )
    }

    function selectDateDialog() {
        return (
            <Dialog visible={showDateSelection}
                style={{ borderRadius: Sizes.fixPadding }}
            >
                <View style={styles.selectDateWrapStyle}>
                    <Text style={{ ...Fonts.whiteColor14Regular }}>
                        SELECTD DATE
                    </Text>
                    {
                        selectedDateDay == '' ?
                            <Text style={{ ...Fonts.whiteColor25Regular }}>
                                {date} {getMonthInWord({ month: month })} {year}
                            </Text>
                            :
                            <Text style={{ ...Fonts.whiteColor25Regular }}>
                                {`${selectedDateDay} `}
                                {getMonthInWord({ month: selectedDateMonth })}
                                {` ${selectedDateYear}`}
                            </Text>
                    }
                </View>
                <CalendarList
                    horizontal={true}
                    minDate={Date()}
                    pagingEnabled={true}
                    markedDates={dateSelected}
                    calendarWidth={width - 50.0}
                    pastScrollRange={0}
                    futureScrollRange={12}
                    onDayPress={(day) => {
                        updateState({
                            dateSelected: { [day.dateString]: { selected: true, selectedColor: Colors.primaryColor } },
                            selectedDateDay: day.day,
                            selectedDateYear: day.year,
                            selectedDateMonth: day.month,
                        })
                    }}
                    onMonthChange={(month) => { }}
                    onPressArrowLeft={subtractMonth => subtractMonth()}
                    onPressArrowRight={addMonth => addMonth()}
                    theme={{
                        calendarBackground: Colors.whiteColor,
                        textSectionTitleColor: Colors.grayColor,
                        textSectionTitleDisabledColor: 'red',
                        arrowColor: Colors.grayColor,
                        monthTextColor: Colors.grayColor,
                        dayTextColor: Colors.blackColor,
                        textDisabledColor: '#d9e1e8',
                        selectedDayTextColor: 'white',
                    }}
                />
                <View style={styles.calenderCancelOkButtonWrapStyle}>
                    <TouchableOpacity
                        activeOpacity={0.9}
                        onPress={() => {
                            updateState({ showDateSelection: false })
                        }}
                    >
                        <Text style={{ ...Fonts.primaryColor15Regular, marginRight: Sizes.fixPadding + 5.0 }}>
                            CANCEL
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        activeOpacity={0.9}
                        onPress={() => {
                            updateState({
                                showDateSelection: false,
                                isViewSelectedDate: true
                            })
                        }}
                    >
                        <Text style={{ ...Fonts.primaryColor15Regular }}>
                            OK
                        </Text>
                    </TouchableOpacity>
                </View>
            </Dialog>
        )
    }

    function dateAndGuestsInfo() {
        return (
            <View style={styles.selectDateInfoWrapStyle}>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ ...Fonts.blackColor20Bold }}>
                        From  ₹{amount * 80}
                    </Text>
                    <Text style={{
                        ...Fonts.blackColor16Regular,
                        alignSelf: 'flex-end'
                    }}>
                        {` / person`}
                    </Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <MaterialCommunityIcons name="tag" size={17} color={Colors.grayColor} />
                    <Text style={{ ...Fonts.blackColor16Regular, marginVertical: Sizes.fixPadding }}>
                        Book for 2 guests, save 10% or more
                    </Text>
                </View>
                <View style={styles.dateAndGuestWrapStyle}>
                    <TouchableOpacity
                        activeOpacity={0.9}
                        onPress={() => updateState({ showDateSelection: true })}
                        style={{
                            ...styles.dateAndGuestStyle, paddingLeft: Sizes.fixPadding * 2.5,
                        }}>
                        <View>
                            <Text style={{
                                ...Fonts.blackColor14Regular,
                                paddingBottom: Sizes.fixPadding - 5.0,
                            }}>
                                DATE
                            </Text>
                            <Text style={{ ...Fonts.blackColor14Regular, }}>
                                {
                                    selectedDateDay == '' ?
                                        `${year}-${finalMonth}-${date}` :
                                        isViewSelectedDate ?
                                            `${selectedDateYear}-${selectedDateMonth}-${selectedDateDay}`
                                            : `${year}-${finalMonth}-${date}`
                                }
                            </Text>
                        </View>
                        <MaterialIcons
                            name="keyboard-arrow-down"
                            size={22}
                            color={Colors.grayColor} />
                    </TouchableOpacity>
                    <View style={{
                        backgroundColor: Colors.blackColor,
                        width: 1.0,
                        height: 90.0,
                    }}>
                    </View>
                    <TouchableOpacity
                        activeOpacity={0.9}
                        onPress={() => updateState({ showNumberOfGuestSelection: true })}
                        style={{
                            paddingRight: Sizes.fixPadding * 2.5,
                            ...styles.dateAndGuestStyle
                        }}>
                        <View>
                            <Text style={{
                                ...Fonts.blackColor14Regular,
                                paddingBottom: Sizes.fixPadding - 5.0,
                            }}>
                                GUESTS
                            </Text>
                            <Text style={{ ...Fonts.blackColor14Regular, }}>
                                {totalGuest} guest
                            </Text>
                        </View>
                        <MaterialIcons
                            name="keyboard-arrow-down"
                            size={22}
                            color={Colors.grayColor} />
                    </TouchableOpacity>
                </View>
                <View style={styles.dateAndTimeWrapStyle}>
                    <View>
                        <Text style={{ ...Fonts.blackColor18Regular }}>
                            {
                                selectedDateDay == '' ?
                                    `${year}-${finalMonth}-${date}` :
                                    isViewSelectedDate ?
                                        `${selectedDateYear}-${selectedDateMonth}-${selectedDateDay}`
                                        : `${year}-${finalMonth}-${date}`
                            }
                        </Text>
                        <Text style={{ ...Fonts.grayColor16Regular }}>
                            7:00 AM - 8:30 AM
                        </Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={{ ...Fonts.blackColor20Bold }}>
                            ${amount}
                        </Text>
                        <Text style={{
                            ...Fonts.blackColor18Regular,
                        }}>
                            {`/person`}
                        </Text>
                    </View>
                </View>
            </View>
        )
    }

    function bookNowButton() {
        return (
            <View style={styles.bookNowButtonOuterWrapStyle}>
                <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => navigation.navigate('Payment', { amount: amount })}
                    style={styles.bookNowButtonWrapStyle}>
                    <Text style={{ ...Fonts.whiteColor19Regular }}>
                        Book now
                    </Text>
                </TouchableOpacity>
            </View>

        )
    }

    function additionalRuleInfo() {
        return (
            <View style={styles.additionalRuleInfoWrapStyle}>
                <Text style={{ ...Fonts.blackColor20Bold, marginBottom: Sizes.fixPadding }}>
                    Additional rules
                </Text>
                {
                    additionalRulesList.map((item) => (
                        <View key={item.id}
                            style={{
                                marginVertical: Sizes.fixPadding - 5.0,
                            }}>
                            <Text
                                style={{
                                    ...Fonts.blackColor16Regular,
                                    textAlign: 'justify',
                                }}>
                                {item.id}. {item.rule}
                            </Text>
                        </View>
                    ))
                }
            </View>
        )
    }

    function rulesInfo() {
        return (
            <View style={styles.ruleInfoWrapStyle}>
                <Text style={{ ...Fonts.blackColor20Bold, marginBottom: Sizes.fixPadding }}>Rules</Text>
                {rule(
                    {
                        icon: <MaterialCommunityIcons name="clock-time-four-outline" size={17} color="black" />,
                        rule: 'Check-in:After 2:00 pm'
                    }
                )}
                {rule(
                    {
                        icon: <MaterialCommunityIcons name="clock-time-four-outline" size={17} color="black" />,
                        rule: 'Check out:11:00 am'
                    }
                )}
                {rule(
                    {
                        icon: <MaterialCommunityIcons name="door-open" size={17} color="black" />,
                        rule: 'Self check-in with lockbox'
                    }
                )}
                {rule(
                    {
                        icon: <MaterialCommunityIcons name="smoking-off" size={17} color="black" />,
                        rule: 'No smoking'
                    }
                )}
                {rule(
                    {
                        icon: <MaterialIcons name="pets" size={17} color="black" />,
                        rule: 'Pets are allowed'
                    }
                )}
            </View>
        )
    }

    function rule({ icon, rule }) {
        return (
            <View style={{
                flexDirection: 'row', alignItems: 'center',
                marginVertical: Sizes.fixPadding - 6.0
            }}>
                {icon}
                <Text style={{ ...Fonts.blackColor14Regular, marginLeft: Sizes.fixPadding }}>
                    {rule}
                </Text>
            </View>
        )
    }

    function selectEndDateDialog() {
        return (
            <Dialog visible={showEndDateSelection}
                style={{ borderRadius: Sizes.fixPadding }}
            >
                <View style={styles.selectDateWrapStyle}>
                    <Text style={{ ...Fonts.whiteColor14Regular }}>
                        SELECTD DATE
                    </Text>
                    {
                        selectedStartDateDay == '' ?
                            <Text style={{ ...Fonts.whiteColor25Regular }}>
                                {date + 1} {getMonthInWord({ month: month })} {year}
                            </Text>
                            :
                            <Text style={{ ...Fonts.whiteColor25Regular }}>
                                {`${selectedEndDateDay} `}
                                {getMonthInWord({ month: selectedEndDateMonth })}
                                {` ${selectedEndDateYear}`}
                            </Text>
                    }
                </View>
                <CalendarList
                    horizontal={true}
                    minDate={Date()}
                    pagingEnabled={true}
                    markedDates={endDateSelected}
                    calendarWidth={width - 50.0}
                    pastScrollRange={0}
                    futureScrollRange={12}
                    onDayPress={(day) => {
                        updateState({
                            endDateSelected: { [day.dateString]: { selected: true, selectedColor: Colors.primaryColor } },
                            selectedEndDateDay: day.day,
                            selectedEndDateYear: day.year,
                            selectedEndDateMonth: day.month,
                        })
                    }}
                    onMonthChange={(month) => { }}
                    onPressArrowLeft={subtractMonth => subtractMonth()}
                    onPressArrowRight={addMonth => addMonth()}
                    theme={{
                        calendarBackground: Colors.whiteColor,
                        textSectionTitleColor: Colors.grayColor,
                        textSectionTitleDisabledColor: 'red',
                        arrowColor: Colors.grayColor,
                        monthTextColor: Colors.grayColor,
                        dayTextColor: Colors.blackColor,
                        textDisabledColor: '#d9e1e8',
                        selectedDayTextColor: 'white',
                    }}
                />
                <View style={styles.calenderCancelOkButtonWrapStyle}>
                    <TouchableOpacity
                        activeOpacity={0.9}
                        onPress={() => {
                            updateState({ showEndDateSelection: false })
                        }}
                    >
                        <Text style={{ ...Fonts.primaryColor15Regular, marginRight: Sizes.fixPadding + 5.0 }}>
                            CANCEL
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        activeOpacity={0.9}
                        onPress={() => {
                            updateState({
                                showEndDateSelection: false,
                                isViewSelectedEndDate: true
                            })
                        }}
                    >
                        <Text style={{ ...Fonts.primaryColor15Regular }}>
                            OK
                        </Text>
                    </TouchableOpacity>
                </View>
            </Dialog>
        )
    }

    function getMonthInWord({ month }) {
        return month == 1 ?
            'Jan,' : month == 2 ?
                'Feb,' : month == 3 ?
                    'Mar,' : month == 4 ?
                        'Apr,' : month == 5 ?
                            'May,' : month == 6 ?
                                'Jun,' : month == 7 ?
                                    'Jul,' : month == 8 ?
                                        'Aug,' : month == 9 ?
                                            'Sup,' : month == 10 ?
                                                'Oct,' : month == 11 ?
                                                    'Nov,' : month == 12 ?
                                                        'Des,' : null

    }

    function selectStartDateDialog() {
        return (
            <Dialog visible={showStartDateSelection}
                style={{ borderRadius: Sizes.fixPadding }}
            >
                <View style={styles.selectDateWrapStyle}>
                    <Text style={{ ...Fonts.whiteColor14Regular }}>
                        SELECTD DATE
                    </Text>
                    {
                        selectedStartDateDay == '' ?
                            <Text style={{ ...Fonts.whiteColor25Regular }}>
                                {date} {getMonthInWord({ month: month })} {year}
                            </Text>
                            :
                            <Text style={{ ...Fonts.whiteColor25Regular }}>
                                {`${selectedStartDateDay} `}
                                {getMonthInWord({ month: selectedStartDateMonth })}
                                {` ${selectedStartDateYear}`}
                            </Text>
                    }
                </View>
                <CalendarList
                    horizontal={true}
                    pagingEnabled={true}
                    markedDates={dateSelected}
                    calendarWidth={width - 50.0}
                    pastScrollRange={0}
                    futureScrollRange={12}
                    minDate={Date()}
                    onDayPress={(day) => {
                        updateState({
                            dateSelected: { [day.dateString]: { selected: true, selectedColor: Colors.primaryColor } },
                            selectedStartDateDay: day.day,
                            selectedStartDateYear: day.year,
                            selectedStartDateMonth: day.month,
                        })
                    }}
                    onMonthChange={(month) => { }}
                    onPressArrowLeft={subtractMonth => subtractMonth()}
                    onPressArrowRight={addMonth => addMonth()}
                    disableAllTouchEventsForDisabledDays={true}
                    theme={{
                        calendarBackground: Colors.whiteColor,
                        textSectionTitleColor: Colors.grayColor,
                        textSectionTitleDisabledColor: 'red',
                        arrowColor: Colors.grayColor,
                        monthTextColor: Colors.grayColor,
                        dayTextColor: Colors.blackColor,
                        textDisabledColor: '#d9e1e8',
                        selectedDayTextColor: 'white',
                    }}
                />
                <View style={styles.calenderCancelOkButtonWrapStyle}>
                    <TouchableOpacity
                        activeOpacity={0.9}
                        onPress={() => {
                            updateState({ showStartDateSelection: false })
                        }}
                    >
                        <Text style={{ ...Fonts.primaryColor15Regular, marginRight: Sizes.fixPadding + 5.0 }}>
                            CANCEL
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        activeOpacity={0.9}
                        onPress={() => {
                            updateState({
                                showStartDateSelection: false,
                                isViewSelectedStartDate: true
                            })
                        }}
                    >
                        <Text style={{ ...Fonts.primaryColor15Regular }}>
                            OK
                        </Text>
                    </TouchableOpacity>
                </View>
            </Dialog>
        )
    }

    function selectDateInfo() {
        return (
            <View style={styles.selectDateInfoWrapStyle}>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ ...Fonts.blackColor20Bold }}>
                        From  ₹{amount * 80}
                    </Text>
                    <Text style={{
                        ...Fonts.blackColor16Regular,
                        alignSelf: 'flex-end'
                    }}>
                        {` / night`}
                    </Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <MaterialCommunityIcons name="tag" size={17} color={Colors.grayColor} />
                    <Text style={{ ...Fonts.blackColor16Regular, marginVertical: Sizes.fixPadding }}>
                        Pay with stripe, save 10% or more
                    </Text>
                </View>
                <View style={styles.startAndEndDateWrapStyle}>
                    <TouchableOpacity
                        activeOpacity={0.9}
                        onPress={() => updateState({ showStartDateSelection: true })}
                        style={{
                            ...styles.startAndEndDateStyle,
                            paddingLeft: Sizes.fixPadding * 2.0,
                        }}>
                        <View>
                            <Text style={{
                                ...Fonts.blackColor14Regular,
                                paddingBottom: Sizes.fixPadding - 5.0,
                            }}>
                                START DATE
                            </Text>
                            <Text style={{ ...Fonts.blackColor14Regular, }}>
                                {
                                    selectedStartDateDay == '' ?
                                        `${year}-${finalMonth}-${date}` :
                                        isViewSelectedStartDate ?
                                            `${selectedStartDateYear}-${selectedStartDateMonth}-${selectedStartDateDay}`
                                            : `${year}-${finalMonth}-${date}`
                                }
                            </Text>
                        </View>
                        <MaterialIcons
                            name="keyboard-arrow-down"
                            size={22}
                            color={Colors.grayColor}
                        />
                    </TouchableOpacity>
                    <View style={{
                        backgroundColor: Colors.blackColor,
                        width: 1.0,
                        height: 90.0,
                    }}>
                    </View>
                    <TouchableOpacity
                        activeOpacity={0.9}
                        onPress={() => updateState({ showEndDateSelection: true })}
                        style={{
                            paddingRight: Sizes.fixPadding * 2.0,
                            ...styles.startAndEndDateStyle
                        }}>
                        <View>
                            <Text style={{
                                ...Fonts.blackColor14Regular,
                                paddingBottom: Sizes.fixPadding - 5.0,
                            }}>
                                END DATE
                            </Text>
                            <Text style={{ ...Fonts.blackColor14Regular, }}>
                                {
                                    selectedEndDateDay == '' ?
                                        `${year}-${finalMonth}-${date + 1}` :
                                        isViewSelectedEndDate ?
                                            `${selectedEndDateYear}-${selectedEndDateMonth}-${selectedEndDateDay}`
                                            : `${year}-${finalMonth}-${date + 1}`
                                }
                            </Text>
                        </View>
                        <MaterialIcons
                            name="keyboard-arrow-down"
                            size={22}
                            color={Colors.grayColor} />
                    </TouchableOpacity>
                </View>
                <View style={styles.startToEndDateWrapStyle}>
                    <View style={{ alignItems: 'center' }}>
                        <Text style={{ ...Fonts.blackColor18Regular }}>
                            {
                                selectedStartDateDay == '' ?
                                    `${year}-${finalMonth}-${date}` :
                                    isViewSelectedStartDate ?
                                        `${selectedStartDateYear}-${selectedStartDateMonth}-${selectedStartDateDay}`
                                        : `${year}-${finalMonth}-${date}`
                            }
                        </Text>
                        <Text style={{ ...Fonts.grayColor16Regular }}>
                            to
                        </Text>
                        <Text style={{ ...Fonts.blackColor18Regular }}>
                            {
                                selectedEndDateDay == '' ?
                                    `${year}-${finalMonth}-${date + 1}` :
                                    isViewSelectedEndDate ?
                                        `${selectedEndDateYear}-${selectedEndDateMonth}-${selectedEndDateDay}`
                                        : `${year}-${finalMonth}-${date + 1}`
                            }
                        </Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={{ ...Fonts.blackColor20Bold }}>
                        ₹{amount * 80}
                        </Text>
                        <Text style={{
                            ...Fonts.blackColor18Regular,
                        }}>
                            {`/night`}
                        </Text>
                    </View>
                </View>
            </View>
        )
    }

    function header() {
        return (
            <View style={styles.headerWrapStyle}>
                <MaterialIcons
                    name="arrow-back"
                    size={24}
                    color={Colors.blackColor}
                    onPress={() => navigation.pop()}
                />
                <Text style={{ ...Fonts.blackColor20Regular, marginLeft: Sizes.fixPadding + 5.0 }}>
                    Select Date
                </Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    headerWrapStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.whiteColor,
        height: 60.0,
        marginHorizontal: Sizes.fixPadding * 2.0
    },
    calenderCancelOkButtonWrapStyle: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginTop: Sizes.fixPadding,
        marginRight: Sizes.fixPadding + 10.0,
        marginBottom: Sizes.fixPadding * 2.0,
    },
    selectDateWrapStyle: {
        paddingHorizontal: Sizes.fixPadding * 2.0,
        paddingVertical: Sizes.fixPadding,
        backgroundColor: Colors.primaryColor,
        height: 100.0,
        justifyContent: 'space-between',
        borderTopLeftRadius: Sizes.fixPadding,
        borderTopRightRadius: Sizes.fixPadding,
    },
    selectDateInfoWrapStyle: {
        backgroundColor: Colors.whiteColor,
        marginHorizontal: Sizes.fixPadding * 2.0,
        marginVertical: Sizes.fixPadding,
        borderRadius: Sizes.fixPadding * 2.0,
        borderColor: '#ECECEC',
        borderWidth: 1.0,
        elevation: 1.0,
        paddingVertical: Sizes.fixPadding + 5.0,
        paddingHorizontal: Sizes.fixPadding + 10.0,
    },
    startAndEndDateWrapStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: Colors.whiteColor,
        borderRadius: Sizes.fixPadding + 5.0,
        borderColor: Colors.blackColor,
        height: 90.0,
        borderWidth: 1.0,
    },
    startAndEndDateStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        flex: 0.45,
    },
    startToEndDateWrapStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: Sizes.fixPadding + 5.0
    },
    ruleInfoWrapStyle: {
        backgroundColor: Colors.whiteColor,
        marginHorizontal: Sizes.fixPadding * 2.0,
        marginVertical: Sizes.fixPadding,
        borderRadius: Sizes.fixPadding * 2.0,
        borderColor: '#ECECEC',
        borderWidth: 1.0,
        elevation: 1.0,
        paddingVertical: Sizes.fixPadding + 5.0,
        paddingHorizontal: Sizes.fixPadding + 10.0,
    },
    additionalRuleInfoWrapStyle: {
        backgroundColor: Colors.whiteColor,
        marginHorizontal: Sizes.fixPadding * 2.0,
        marginVertical: Sizes.fixPadding,
        borderRadius: Sizes.fixPadding * 2.0,
        borderColor: '#ECECEC',
        borderWidth: 1.0,
        elevation: 1.0,
        paddingVertical: Sizes.fixPadding + 5.0,
        paddingHorizontal: Sizes.fixPadding + 10.0,
    },
    bookNowButtonOuterWrapStyle: {
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
    bookNowButtonWrapStyle: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.primaryColor,
        borderRadius: Sizes.fixPadding + 5.0,
        height: 55.0,
        width: '100%',
    },
    dateAndGuestWrapStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: Colors.whiteColor,
        borderRadius: Sizes.fixPadding + 5.0,
        borderColor: Colors.blackColor,
        height: 90.0,
        borderWidth: 1.0,
    },
    dateAndGuestStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        flex: 0.45,
    },
    dateAndTimeWrapStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: Sizes.fixPadding + 5.0
    },
    addAndSubtractGuestIconWrapStyle: {
        backgroundColor: Colors.whiteColor,
        borderWidth: 1.0,
        alignItems: 'center',
        justifyContent: 'center',
        width: 30.0,
        height: 30.0,
        borderRadius: 15.0,
    },
    numberOfGuestsWrapStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    saveButtonStyle: {
        backgroundColor: Colors.primaryColor,
        alignItems: 'center',
        justifyContent: 'center',
        height: 55.0,
        marginTop: Sizes.fixPadding + 5.0,
        borderRadius: Sizes.fixPadding + 5.0,
    }
})

export default BookNowScreen;