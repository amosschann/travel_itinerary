import React, { useState, useEffect, useRef, useCallback } from 'react';
import { SafeAreaView, StyleSheet, Text, View, Image, Dimensions, ScrollView, TouchableOpacity, Alert, Button, ImageBackground, ActivityIndicator } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import styles from '../components/Style';
const { width } = Dimensions.get('screen');



export default function ItineraryImages({ props }) {
    const ref = useRef(null);
    const [currentIndex, setCurrentIndex] = useState(props.index);
    const renderItem = useCallback(({ item, index }) => (
        <View style={[styles.flex1, styles.paddingUpDown10]}>
        <TouchableOpacity style={[styles.flex1, styles.flexColumn, styles.borderRadiusTop, styles.borderRadiusBottom]} onPress={() => {
            if (currentIndex === index) {
                props.viewFullScreen();
            }
        }}>
            <ImageBackground 
                source={{uri: item}} 
                style={[styles.flex4, styles.justifyHorizontalCenter, styles.justifyVerticalCenter, ]} 
                imageStyle= {[styles.objectFitCover]}
            />
            <View style={[styles.flex1, styles.justifyVerticalCenter, styles.justifyHorizontalCenter, styles.backgroundDarkBlue]}>
                <Text style={[styles.colorWhite]}>{props.dates[Number(index)]}</Text>
            </View>
        </TouchableOpacity>

        </View>
      ), [props.slideImages, currentIndex]);


    return (
        <View style={[styles.flex1]}>
                <ImageBackground 
                    source={require('../assets/itineraryImage2.jpg')} 
                    style={[styles.width, styles.flex1, styles.justifyVerticalBottom, styles.justifyHorizontalCenter]} 
                    imageStyle= {{opacity:0.2}}
                >
                <Carousel
                    layout="default"
                    ref={ref}
                    data={props.images}
                    sliderWidth={width}
                    itemWidth={width * 0.6}
                    renderItem={renderItem}
                    onSnapToItem={(index) => {
                        props.changeIndex(index);
                        setCurrentIndex(index);
                    }}
                    firstItem={props.index}
                />
            </ImageBackground>
        </View>
    );
}