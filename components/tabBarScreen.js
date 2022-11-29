import React, { useState } from "react";
import { Text, useWindowDimensions, } from "react-native";
import { TabView, TabBar } from 'react-native-tab-view';
import { Fonts, Colors } from "../constants/styles";
import FavouriteHotels from "../screens/favouriteHotels/favouriteHotelsScreen";
import FavouriteExperiences from "../screens/favouriteExperiences/favouriteExperiencesScreen";

export default TabBarScreen = ({ navigation }) => {

    const [index, setIndex] = useState(0);
    const [routes] = useState([
        { key: 'first', title: 'Hotel' },
        { key: 'second', title: 'Experiences' },
    ]);

    const layout = useWindowDimensions();

    const renderScene = ({ route, jumpTo }) => {
        switch (route.key) {
            case 'first':
                return <FavouriteHotels navigation={navigation} />;
            case 'second':
                return <FavouriteExperiences navigation={navigation} />;
        }
    };

    return (
        <TabView
            navigationState={{ index, routes }}
            renderScene={renderScene}
            onIndexChange={setIndex}
            swipeEnabled={false}
            renderTabBar={props => (
                <TabBar
                    {...props}
                    indicatorStyle={{ backgroundColor: Colors.primaryColor, }}
                    tabStyle={{
                        width: layout.width / 2.0,
                    }}
                    scrollEnabled={true}
                    style={{ backgroundColor: 'white', }}
                    renderLabel={({ route, focused, color }) => (
                        <Text style={{ ...Fonts.blackColor16Regular }}>
                            {route.title}
                        </Text>
                    )}
                />
            )}
        />
    )
}



