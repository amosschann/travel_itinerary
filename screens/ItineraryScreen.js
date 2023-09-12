import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, Text, View, Image, Dimensions, ScrollView, TouchableOpacity, Alert, Button, ImageBackground, ActivityIndicator, TextInput } from 'react-native';
import { Cell, Section, TableView } from 'react-native-tableview-simple';
import styles from '../components/Style';
import Modal from "react-native-modal";
import ItineraryTableRows from '../components/ItineraryTableRows';
import ItineraryImages from '../components/ItinereryImages';
import { AddButton } from '../components/Buttons';
import ImageView from "react-native-image-viewing";
import PageLoad from '../components/PageLoad';
import { getDates } from '../helpers/DateFormatHelper';



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

    const [activityName, setActivityName] = useState();
    const [startTime, setStartTime] = useState();
    const [endTime, setEndTime] = useState();
    const [itineraries, setitineraries] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isLoadingRows, setIsLoadingRows] = useState(false);
    const [overalImages, setOveralImages] = useState([]);
    const [dates, setDates] = useState([]);
    const [images, setImages] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [viewFullScreenImages, setViewFullScreenImages] = useState(false);
    const [isModalVisible, setModalVisible] = useState(false);

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

            setDates(getDates(route.params.start_date, route.params.end_date));
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
            <PageLoad/>
        );
    }

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
      };

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

    function WrapperComponent() {
        return (
          <View>
            <Modal isVisible={isModalVisible}>
                <View style={[styles.flex1, styles.flexColumn]}>
                <View style={[styles.flex1]}/>
                <View style={[styles.flex1, styles.justifyHorizontalCenter, styles.justifyVerticalCenter, styles.backgroundBeige]}>
                <View style={[styles.flex1, styles.flexRow]}>
                        <View style={[styles.flex1]}/>
                        <TextInput
                            style={[styles.flex5, styles.borderRadiusAllBlack10, styles.width100, styles.justifyHorizontalCenter, styles.justifyVerticalCenter, styles.textAlignCenter, styles.marginBottomTop5]}
                            placeholder="ActivityName"
                            placeholderTextColor="#003f5c"
                            maxLength={16}
                            onChangeText={(activityName) => setActivityName(activityName)}
                        /> 
                        <View style={[styles.flex1]}/>
                    </View>

                    <View style={[styles.flex1, styles.flexRow]}>
                        <View style={[styles.flex1]}/>
                        <TextInput
                            style={[styles.flex5, styles.borderRadiusAllBlack10, styles.width100, styles.justifyHorizontalCenter, styles.justifyVerticalCenter, styles.textAlignCenter, styles.marginBottomTop5]}
                            placeholder="start time"
                            placeholderTextColor="#003f5c"
                            onChangeText={(startTime) => setStartTime(startTime)}
                        />
                        <View style={[styles.flex1]}/>
                    </View>

                    <View style={[styles.flex1, styles.flexRow]}>
                        <View style={[styles.flex1]}/>
                        <TextInput
                            style={[styles.flex5, styles.borderRadiusAllBlack10, styles.width100, styles.justifyHorizontalCenter, styles.justifyVerticalCenter, styles.textAlignCenter, styles.marginBottomTop5]}
                            placeholder="end time"
                            placeholderTextColor="#003f5c"
                            onChangeText={(endTime) => setEndTime(endTime)}
                        />
                        <View style={[styles.flex1]}/>
                    </View>
                    <Button title="Hide modal" onPress={toggleModal} />
                </View>
                <View style={[styles.flex1]}/>
                    
                </View>
            </Modal>
          </View>
        );
      }

    return (
        <SafeAreaView style={styles.container}>
            <View style={[styles.mainView, styles.flexColumn]}>
                {/* Images */}
                <View style={[styles.flex4, styles.flexRow, styles.width, styles.justifyHorizontalCenter, styles.justifyVerticalCenter, styles.paddingUpDown5]}>
                    <ItineraryImages props={{images: overalImages, dates: dates, navigate: navigate, changeIndex: changeIndex, viewFullScreen: viewFullScreen, index: currentIndex }}/>
                </View>
                {/* Add */}
                <View style={[styles.flex1, styles.flexRow, styles.width, styles.justifyHorizontalCenter, styles.justifyVerticalCenter, styles.borderBlackTopBottom, styles.backgroundDarkBlue]}>
                        <AddButton props={{title: 'Add Photo'}}/>
                        <AddButton props={{title: 'Add Itinerary', onPressButton: toggleModal}}/>
                </View>
                {/* Itinerary rows */}
                <View style={[styles.flex6, styles.width]}>
                    <ItineraryTableRows props={{itineraries: itineraries, isLoading: isLoadingRows}}/>
                </View>
                {WrapperComponent()}
            </View>
        </SafeAreaView>
    );
}
