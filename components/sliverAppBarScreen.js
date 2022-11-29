import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Colors } from "../constants/styles";
import { LinearGradient } from 'expo-linear-gradient';
import {
    Animated,
    StatusBar,
    StyleSheet,
    View,
} from 'react-native';

const propTypes = {
    children: PropTypes.node.isRequired,
    src: PropTypes.any,
    element: PropTypes.element,
    titleColor: PropTypes.string,
    leftItem: PropTypes.element,
    leftItemPress: PropTypes.func,
    rightItem: PropTypes.element,
    rightItemPress: PropTypes.func,
    toolbarColor: PropTypes.string,
    toolbarMaxHeight: PropTypes.number,
    toolbarMinHeight: PropTypes.number,
    borderBottomRadius: PropTypes.number,
    isImageBlur: PropTypes.bool,
    childrenMinHeight: PropTypes.number,
    isImage: PropTypes.bool,
}

const defaultProps = {
    leftItem: null,
    leftItemPress: null,
    rightItem: null,
    rightItemPress: null,
    element: null,
    titleColor: '#fff',
    toolbarColor: Colors.primaryColor,
    toolbarMaxHeight: 300,
    toolbarMinHeight: 55,
    borderBottomRadius: 0,
    childrenMinHeight: 700,
    isImage: true,
};

class CollapsingToolbar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            scrollY: new Animated.Value(0),
        };
    }

    render() {
        const {
            children,
            src,
            leftItem,
            element,
            toolbarColor,
            toolbarMaxHeight,
            toolbarMinHeight,
            borderBottomRadius,
            childrenMinHeight,
            isImage,
        } = this.props;

        const scrollDistance = toolbarMaxHeight - toolbarMinHeight;

        const headerTranslate = this.state.scrollY.interpolate({
            inputRange: [0, scrollDistance],
            outputRange: [0, -scrollDistance + 50],
            extrapolate: 'clamp',
        });

        const imageOpacity = this.state.scrollY.interpolate({
            inputRange: [0, scrollDistance / 2, scrollDistance],
            outputRange: [1, 1, 0],
            extrapolate: 'clamp',
        });

        const imageTranslate = this.state.scrollY.interpolate({
            inputRange: [0, scrollDistance],
            outputRange: [0, 100],
            extrapolate: 'clamp',
        });

        const elementScale = this.state.scrollY.interpolate({
            inputRange: [0, 50, 100],
            outputRange: [1, 1, 0],
            extrapolate: 'clamp',
        });

        return (
            <View style={styles.fill}>
                <Animated.ScrollView
                    style={styles.fill}
                    scrollEventThrottle={1}
                    showsVerticalScrollIndicator={false}
                    onScroll={Animated.event(
                        [{ nativeEvent: { contentOffset: { y: this.state.scrollY } } }],
                        { useNativeDriver: true },
                    )}>
                    <View style={{ marginTop: toolbarMaxHeight, minHeight: childrenMinHeight }}>
                        {children}
                    </View>
                </Animated.ScrollView>

                <Animated.View
                    style={[
                        styles.header,
                        {
                            backgroundColor: toolbarColor,
                            height: toolbarMaxHeight,
                            transform: [{ translateY: headerTranslate }],
                            borderBottomLeftRadius: borderBottomRadius,
                            borderBottomRightRadius: borderBottomRadius,
                        },
                    ]}
                >
                    <Animated.Image
                        style={[
                            styles.backgroundImage,
                            {
                                height: toolbarMaxHeight,
                                backgroundColor: toolbarColor,
                                opacity: imageOpacity,
                                transform: [{ translateY: imageTranslate }],
                            },
                        ]}
                        borderBottomLeftRadius={borderBottomRadius}
                        borderBottomRightRadius={borderBottomRadius}
                        source={src}
                    />
                    <LinearGradient
                        start={{ x: 0, y: 0 }}
                        end={{ x: 0, y: 1 }}
                        colors={[
                            'transparent',
                            'transparent',
                            'rgba(255,255,255,0.2)',
                            'rgba(255,255,255,0.5)',
                            'rgba(255,255,255,0.6)',
                            'rgba(255,255,255,0.8)',
                            'rgba(255,255,255,0.9)',
                            'rgba(255,255,255,0.99)',
                        ]}
                        style={{
                            width: '100%',
                            height: toolbarMaxHeight,
                        }}
                    >
                        <Animated.View
                            style={[
                                styles.action,
                                {
                                    backgroundColor: 'transparent',
                                    transform: [
                                        { scale: elementScale },
                                    ],
                                    bottom: isImage ? 20 : 0.0,
                                    paddingHorizontal: isImage ? 20 : 0.0,
                                },
                            ]}
                        >
                            {element}
                        </Animated.View>
                    </LinearGradient>
                </Animated.View>


                <Animated.View style={styles.bar}>
                    {leftItem}
                </Animated.View>
            </View>
        );
    }
}

CollapsingToolbar.propTypes = propTypes;
CollapsingToolbar.defaultProps = defaultProps;

const styles = StyleSheet.create({
    fill: {
        flex: 1,
    },
    content: {
        flex: 1,
    },
    header: {
        top: 0,
        left: 0,
        right: 0,
        overflow: 'hidden',
        position: 'absolute',
    },
    backgroundImage: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        width: null,
        resizeMode: 'cover',
    },
    action: {
        left: 0,
        right: 0,
        flexDirection: 'row',
        alignItems: 'center',
        position: 'absolute',
    },
    bar: {
        top: StatusBar.currentHeight,
        left: 0,
        right: 0,
        height: 56,
        position: 'absolute',
        flexDirection: "row",
        alignItems: 'center',
        width: '100%',
        backgroundColor: 'transparent',
    },
    left: {
        top: 0,
        left: 0,
        width: 50,
        height: 56,
        alignItems: 'center',
        justifyContent: 'center',
    },
    right: {
        top: 0,
        right: 0,
        height: 56,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default CollapsingToolbar;