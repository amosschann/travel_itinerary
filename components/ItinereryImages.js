import React, { useState, useEffect, useRef, useCallback } from 'react';
import { SafeAreaView, StyleSheet, Text, View, Image, Dimensions, ScrollView, TouchableOpacity, Alert, Button, ImageBackground, ActivityIndicator } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import styles from '../components/Style';
const { width } = Dimensions.get('screen');



export default function ItineraryImages({ props }) {
    const ref = useRef(null);
    const renderItem = useCallback(({ item, index }) => (
        <View style={[styles.flex1, styles.paddingUpDown10]}>
        <TouchableOpacity style={[styles.flex1, styles.flexColumn]} onPress={() => props.viewFullScreen()}>
            <ImageBackground 
                    source={{uri: item}} 
                    style={[styles.flex4, styles.justifyHorizontalCenter, styles.justifyVerticalCenter, styles.borderRadiusTop]} 
                    imageStyle= {[styles.objectFitCover]}
            />
            <View style={[styles.flex1, styles.justifyVerticalCenter, styles.justifyHorizontalCenter, styles.borderRadiusBottom, styles.backgroundWhite]}>
                <Text>{props.dates[Number(index)]}</Text>
            </View>
        </TouchableOpacity>

        </View>
      ), [props.slideImages]);


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
                    itemWidth={width * 0.5}
                    renderItem={renderItem}
                    onSnapToItem={(index) => props.changeIndex(index)}
                />
            </ImageBackground>
        </View>
    );
}