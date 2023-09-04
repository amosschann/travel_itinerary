import React, { useState, useEffect, useRef, useCallback } from 'react';
import { SafeAreaView, StyleSheet, Text, View, Image, Dimensions, ScrollView, TouchableOpacity, Alert, Button, ImageBackground, ActivityIndicator } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import styles from '../components/Style';
const { width } = Dimensions.get('screen');



export default function ItineraryImages({ props }) {
    const ref = useRef(null);

    const renderItem = useCallback(({ item, index }) => (
        <View >
        <TouchableOpacity>
            <ImageBackground 
                    source={{uri: item}} 
                    style={[styles.width100, styles.height100, styles.justifyHorizontalCenter, styles.justifyVerticalCenter]} 
                    imageStyle= {[styles.objectFitCover]}
            >
            </ImageBackground>
        </TouchableOpacity>

        </View>
      ), []);

    if (props.images.length === 0) {
        return (
            <View style={[styles.flex1]}>
                    <ImageBackground 
                            source={require('../assets/itineraryImage2.jpg')} 
                            style={[styles.height100, styles.justifyHorizontalCenter, styles.justifyVerticalCenter, {width: width * 0.9, marginLeft: width * 0.05}]} 
                            imageStyle= {[{opacity:0.3}, styles.objectFitCover]}
                    >
                        <Text style={[styles.font15, styles.fontWeightBold, styles.colorDarkGrey]}>
                            Add a Photo
                        </Text>
                    </ImageBackground>
            </View>
        );
    } else {

        return (
            <View style={[styles.flex1]}>
                <Carousel
                    layout="default"
                    ref={ref}
                    data={props.images}
                    sliderWidth={width}
                    itemWidth={width * 0.90}
                    renderItem={renderItem}
                    onSnapToItem={(index) => console.log(index)}
                />
            </View>
        );
    }
}