import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, Text, View, Image, Dimensions, ScrollView, TouchableOpacity, Alert, Button, ImageBackground, ActivityIndicator } from 'react-native';
import { Cell, Section, TableView } from 'react-native-tableview-simple';
import { useRoute } from '@react-navigation/native';
import styles from '../components/Style';
import ItineraryTableRows from '../components/ItineraryTableRows';
import ItineraryImages from '../components/ItinereryImages';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AddButton from '../components/AddButton';
import ImageView from "react-native-image-viewing";



export default function ItineraryScreen ({ navigation: { navigate }, route }){
    const example = [ 
        {
            itineraries: [
                {activityTime: '07:00 - 08:00',activityName: 'Activity1'},
                {activityTime: '08:00 - 09:30',activityName: 'Activity2'},
                {activityTime: '09:30 - 11:00',activityName: 'Activity3'},
                {activityTime: '11:00 - 12:00',activityName: 'Activity4'}
            ], 
            images: [{uri: 'https://img.rawpixel.com/s3fs-private/rawpixel_images/website_content/frholiday_vacation_travel_beach-image-kybdf8bh.jpg?w=1200&h=1200&dpr=1&fit=clip&crop=default&fm=jpg&q=75&vib=3&con=3&usm=15&cs=srgb&bg=F4F4F3&ixlib=js-2.2.1&s=e4b7fe83119657ac47e35811096da617'}]
        },
        {
            itineraries: [
                {activityTime: '07:00 - 08:00',activityName: 'Activity1'},
                {activityTime: '08:00 - 09:30',activityName: 'Activity2'}
            ], 
            images: [{uri: 'https://p1.pxfuel.com/preview/811/128/969/vacation-destiny-travel-holiday.jpg'}]
        },
        {
            itineraries: [], 
            images: [{uri: 'https://live.staticflickr.com/3453/3268091255_44e7049809_b.jpg'}, {uri: 'https://p1.pxfuel.com/preview/811/128/969/vacation-destiny-travel-holiday.jpg'}, {uri: 'https://live.staticflickr.com/3453/3268091255_44e7049809_b.jpg'}]
        }
    ];

    const [itineraries, setitineraries] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isLoadingRows, setIsLoadingRows] = useState(false);
    const [overalImages, setOveralImages] = useState([]);
    const [dates, setDates] = useState([]);
    const [images, setImages] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [viewFullScreenImages, setViewFullScreenImages] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            //fetch overall images (1 for each day)
            setOveralImages([
                'https://img.rawpixel.com/s3fs-private/rawpixel_images/website_content/frholiday_vacation_travel_beach-image-kybdf8bh.jpg?w=1200&h=1200&dpr=1&fit=clip&crop=default&fm=jpg&q=75&vib=3&con=3&usm=15&cs=srgb&bg=F4F4F3&ixlib=js-2.2.1&s=e4b7fe83119657ac47e35811096da617',
                'https://p1.pxfuel.com/preview/811/128/969/vacation-destiny-travel-holiday.jpg',
                'https://live.staticflickr.com/3453/3268091255_44e7049809_b.jpg'
            ]);
            //fetch itinerary for day
            setitineraries(example[0].itineraries);
            //fetch images for day
            setImages(example[0].images);
            //fetch overal dates
            setDates(['10/09/23', '11/09/23', '12/09/23']);
            //remove loading
            setIsLoading(false);

        }, 1000);

    }, []);

    useEffect(() => { //default itinerary
        if (itineraries.length === 0) {
            setitineraries([{activityTime: 'no activities',activityName: 'add an activity'}])
        }
    }, [itineraries]);

    useEffect(() => { //default itinerary
        //change itinerary and images for day
        setitineraries(example[currentIndex].itineraries);
        setImages(example[currentIndex].images);
    }, [currentIndex]);

    
    
    if(isLoading) {
        return (
            <View style={[styles.height, styles.width, styles.justifyHorizontalCenter, styles.paddingTop20]}>
                <ActivityIndicator size="large" />
            </View> 
        );
    }

    const changeIndex = (index) => {
        setCurrentIndex(index);
    }

    const viewFullScreen = (index) => {
        setViewFullScreenImages(true);
    }

    if (viewFullScreenImages) {
        return(
            <ImageView
            images={images}
            imageIndex={0}
            visible={true}
            onRequestClose={() => setViewFullScreenImages(false)}
            />
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={[styles.mainView, styles.flexColumn]}>
                {/* Images */}
                <View style={[styles.flex4, styles.flexRow, styles.width, styles.justifyHorizontalCenter, styles.justifyVerticalCenter, styles.paddingUpDown5]}>
                    <ItineraryImages props={{images: overalImages, dates: dates, navigate: navigate, changeIndex: changeIndex, viewFullScreen: viewFullScreen }}/>
                </View>
                {/* Add */}
                <View style={[styles.flex1, styles.flexRow, styles.width, styles.justifyHorizontalCenter, styles.justifyVerticalCenter, styles.borderBlackTopBottom]}>
                    <AddButton props={{title: 'Add Days'}}/>
                    <AddButton props={{title: 'Add Photo'}}/>
                    <AddButton props={{title: 'Add Itinerary'}}/>
                </View>
                {/* Itinerary rows */}
                <View style={[styles.flex6, styles.width]}>
                    <ItineraryTableRows props={{itineraries: itineraries, isLoading: isLoadingRows}}/>
                </View>
            </View>
        </SafeAreaView>
    );
}
