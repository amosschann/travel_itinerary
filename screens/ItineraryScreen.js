import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, Text, View, Image, Dimensions, ScrollView, TouchableOpacity, Alert, Button, ImageBackground, ActivityIndicator, TextInput } from 'react-native';
import { Cell, Section, TableView } from 'react-native-tableview-simple';
import styles from '../components/Style';
import Modal from "react-native-modal";
import ItineraryTableRows from '../components/ItineraryTableRows';
import ItineraryImages from '../components/ItinereryImages';
import { AddButton, ButtonV1 } from '../components/Buttons';
import ImageView from "react-native-image-viewing";
import PageLoad from '../components/PageLoad';
import { convertToMySQLDateFormat, convertToMySQLTime, getDates } from '../helpers/DateFormatHelper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { getAccessToken } from '../helpers/AccessTokenHelper';



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

    const [accessToken, setAccessToken] = useState('');
    const [startTimeForm, setStartTimeForm] = useState(new Date());
    const [endTimeForm, setEndTimeForm] = useState(new Date());
    const [activityNameForm, setActivityNameForm] = useState('');
    const [itineraries, setitineraries] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isLoadingRows, setIsLoadingRows] = useState(false);
    const [overalImages, setOveralImages] = useState([]);
    const [dates, setDates] = useState([]);
    const [currentDate, setCurrentDate] = useState('');
    const [images, setImages] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [viewFullScreenImages, setViewFullScreenImages] = useState(false);
    const [isModalVisible, setModalVisible] = useState(false);


    useEffect(() => {
        //initial load from login
        getAccessToken().then(accessToken => {
            setAccessToken(accessToken);
        })
    }, []);

    useEffect(() => {
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
        setCurrentDate(dates[currentIndex])

        //remove loading
        setIsLoading(false);
    }, [accessToken]);

    useEffect(() => { //default itinerary
        if (itineraries.length === 0) {
            setitineraries([{activityTime: 'no activities',activityName: 'add an activity'}])
        }
    }, [itineraries]);

    useEffect(() => { //default itinerary
        //change itinerary and images for day
        setitineraries(example[currentIndex].itineraries);
        setImages(example[currentIndex].images);
        setCurrentDate(dates[currentIndex])
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

    function submitAddItinerary() {
        if (activityNameForm === '') {
            Alert.alert('input activity name');
        } else if (startTimeForm === endTimeForm) {
            Alert.alert('end time should be greater than start time');
        } else {
            let url = process.env.EXPO_PUBLIC_API_URL + 'api/itinerary/add-itinerary';
            let postData = {
                'activity_name': activityNameForm,
                'start_time': convertToMySQLTime(startTimeForm),
                'end_time': convertToMySQLTime(endTimeForm),
                'travel_id': route.params.travelid,
                'date': convertToMySQLDateFormat(currentDate)
            };
            fetch(url, {
                method: 'POST',
                mode: 'cors',
                cache: 'no-cache',
                credentials: 'same-origin',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'authorization' : accessToken
                },
                redirect: 'follow',
                referrer: 'client',
                body: JSON.stringify(postData)
            })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else if (response.status === 500) {
                    return response.json().then((error) => {
                        Alert.alert( error.message);
                    });
                } else {
                    Alert.alert('unkown error occurred');
                }
            })
            .then((jsonResponse) => {
                if (jsonResponse !== undefined) {
                    toggleModal();
                    Alert.alert('successfully added itinerary')
                }
            })
            .catch((err) => {
                console.error('Fetch error:', err);
            }); 
        } 
    }

    function WrapperComponent() {
        return (
          <View>
            <Modal isVisible={isModalVisible}>
                <View style={[styles.flex1, styles.flexColumn]}>
                <View style={[styles.flex1]}/>

                <View style={[styles.flex1, styles.justifyHorizontalCenter, styles.justifyVerticalCenter, styles.backgroundBeige]}>

                    <View style={[styles.flex1, styles.flexRow]}>
                        <View style={[styles.flex3]}/>
                        <View style={[styles.flex1, styles.justifyHorizontalCenter, styles.justifyVerticalCenter]}>
                            <TouchableOpacity style={[styles.flex, styles.justifyHorizontalCenter, styles.justifyVerticalCenter1]} onPress={toggleModal}>
                                <MaterialCommunityIcons name="close-circle-outline" size={24} color="black" />
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={[styles.flex1, styles.flexRow]}>
                        <View style={[styles.flex1]}/>
                        <TextInput
                            style={[styles.flex5, styles.borderRadiusAllBlack10, styles.width100, styles.justifyHorizontalCenter, styles.justifyVerticalCenter, styles.textAlignCenter, styles.marginBottomTop5]}
                            placeholder="ActivityName"
                            placeholderTextColor="#003f5c"
                            maxLength={16}
                            onChangeText={(activityName) => setActivityNameForm(activityName)}
                        /> 
                        <View style={[styles.flex1]}/>
                    </View>

                    <View style={[styles.flex1, styles.flexRow]}>
                        <View style={[styles.flex1, styles.justifyHorizontalEnd, styles.justifyVerticalCenter]}>
                            <Text>Start Time</Text>
                        </View>
                        <View style={[styles.flex1, styles.justifyHorizontalStart]}>
                        <DateTimePicker
                            value={startTimeForm}
                            mode="time"
                            onChange={(evt, selectedTime) => {
                                console.log(convertToMySQLTime(selectedTime))
                                setStartTimeForm(selectedTime);
                            }}
                        />
                        </View>
                    </View>

                    <View style={[styles.flex1, styles.flexRow]}>
                        <View style={[styles.flex1, styles.justifyHorizontalEnd, styles.justifyVerticalCenter]}>
                            <Text>End Time</Text>
                        </View>
                        <View style={[styles.flex1, styles.justifyHorizontalStart]}>
                            <DateTimePicker
                                style={[styles.justifyHorizontalCenter]}
                                value={endTimeForm}
                                mode="time"
                                minimumDate={startTimeForm}
                                onChange={(evt, selectedTime) => {
                                    setEndTimeForm(selectedTime);
                                }}
                            />
                        </View>
                    </View>

                    <View style={[styles.flex1, styles.flexRow]}>
                    <ButtonV1 props={{text: "Add", onPress:submitAddItinerary}}/>
                    </View>

                    <View style={[styles.flex1]}/>
                    
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
