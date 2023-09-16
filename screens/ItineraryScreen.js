import React, { useState, useEffect } from 'react';
import { SafeAreaView, Text, View, Image, TouchableOpacity, Alert, TextInput } from 'react-native';
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
import * as Haptics from 'expo-haptics';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import * as ImageManipulator from 'expo-image-manipulator';



export default function ItineraryScreen ({ navigation: { navigate }, route }){
    const image1 = require('../assets/itineraryImage3.jpg');
    const exampleImageUri = Image.resolveAssetSource(image1).uri
    const [accessToken, setAccessToken] = useState('');
    const [initialCurrenDateLoad, setInitialCurrentDateLoad] = useState(true);
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
    const [isAddModalVisible, setAddModalVisible] = useState(false);
    const [isDeleteModalVisible, setDeleteModalVisible] = useState(false);
    const [deleteId, setDeleteId] = useState('');
    const [base64Image, setBase64Image] = useState('');


    useEffect(() => {
        //initial load from login
        getAccessToken().then(accessToken => {
            setAccessToken(accessToken);
        })
    }, []);

    useEffect(() => {
        //fetch overall images (1 for each day)
        if (accessToken !== '') {
            //fetch images for day
            //set travel overal dates
            setDates(getDates(route.params.start_date, route.params.end_date));
        }
    }, [accessToken]);

    useEffect(() => { //set current date
        if (dates.length !== 0) {
            setCurrentDate(dates[currentIndex]);
            setInitialCurrentDateLoad(false);
            let overalImage = []
            for (let i = 0; i < dates.length; i++) {
                overalImage.push(exampleImageUri)
            }
            setOveralImages(overalImage);
            setIsLoading(false);
        }
    }, [dates]);

    useEffect(() => { //fetch current itinerary from current date & set current date
        if (!initialCurrenDateLoad) {
            setCurrentDate(dates[currentIndex]) //change current date from carousel change of index
        }
    }, [currentIndex]);

    useEffect(() => { //fetch itinerary
        if (accessToken !== '') {
            fetchCurrentDateItineraryAndMedias();
        }
    }, [currentDate]);

    
    useEffect(() => { //post image
        if (accessToken !== '' && base64Image !== '') {
            postMedia();
            setBase64Image('');
        }
    }, [base64Image]);
    
    
    if(isLoading) {
        return (
            <PageLoad/>
        );
    }

    const toggleAddModel = () => {
        setAddModalVisible(!isAddModalVisible);
    };

    const toggleDeleteModel = () => {
        setDeleteModalVisible(!isDeleteModalVisible);
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
                        Alert.alert(error.message);
                    });
                } else {
                    Alert.alert('unkown error occurred');
                }
            })
            .then((jsonResponse) => {
                if (jsonResponse !== undefined) {
                    setActivityNameForm('');
                    fetchCurrentDateItineraryAndMedias();
                    toggleAddModel();
                    Alert.alert('successfully added activity')
                    Haptics.notificationAsync(
                        Haptics.NotificationFeedbackType.Success
                    )
                }
            })
            .catch((err) => {
                console.error('Fetch error:', err);
            }); 
        } 
    }

    function submitDeleteItinerary() {
        let url = process.env.EXPO_PUBLIC_API_URL + 'api/itinerary/delete-itinerary';
        let postData = {
            'activity_id': deleteId
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
            }
        })
        .then((jsonResponse) => {
            if (jsonResponse !== undefined) {
                setDeleteId('');
                fetchCurrentDateItineraryAndMedias();
                toggleDeleteModel();
                Alert.alert('successfully delete activity');
                Haptics.notificationAsync(
                    Haptics.NotificationFeedbackType.Success
                );
            }
        })
        .catch((err) => {
            console.error('Fetch error:', err);
        }); 
    }

    function fetchCurrentDateItineraryAndMedias() {
        setIsLoadingRows(true);
        const data = {
            travel_id: route.params.travelid,
            date: convertToMySQLDateFormat(currentDate)
        }
        searchParams = new URLSearchParams(data).toString();

        let url = process.env.EXPO_PUBLIC_API_URL + 'api/itinerary/get-current-date-itinerary-and-medias?' + searchParams; 
        fetch(url, {
            method: 'GET',
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
        })
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                setitineraries([{activity_name: 'no activities', start_time: '---', end_time: '---', id: 'none'}]);
                setImages([]);
                setIsLoadingRows(false);
            }
        })
        .then(async (jsonResponse) => {
            if (jsonResponse !== undefined) {
                setIsLoadingRows(false);
                if (Object.keys(jsonResponse).length === 0) {
                    //set placeholder itinerary and image set
                    setitineraries([{ activity_name: 'no activities', start_time: '---', end_time: '---', id: 'none' }]);
                    setImages([{uri: exampleImageUri}]);
                } else {
                    const hasItineraries = jsonResponse.hasOwnProperty('itineraries');
                    const hasMediaData = jsonResponse.hasOwnProperty('media_data');

                    if (hasItineraries && !hasMediaData) {
                        //only has itineraries - set placeholder image
                        setImages([{uri: exampleImageUri}]);
                        setitineraries(jsonResponse.itineraries);
                    } else if (!hasItineraries && hasMediaData) {
                        //only has medias
                        //save base64 to temp file dir to be used
                        let imageFileUris = [];
                        let imageUris = []
                        for (const base64String of jsonResponse.media_data) {
                            if (base64String !== '') {
                                const fileName = `${Date.now()}.jpg`; //generate a unique file name
                                const fileUri = `${FileSystem.cacheDirectory}${fileName}`;
                                await FileSystem.writeAsStringAsync(
                                  fileUri,
                                  base64String,
                                  { encoding: FileSystem.EncodingType.Base64 }
                                );
                                imageFileUris.push({ uri: fileUri });
                                imageUris.push(fileUri)
                            }
                        }
                        //set temp itineraries and response images
                        setitineraries([{ activity_name: 'no activities', start_time: '---', end_time: '---', id: 'none' }]);
                        setImages(imageFileUris);
                        //set overallimage of the day to the first image
                        const newOverallArray = [...overalImages];
                        newOverallArray[currentIndex] = imageUris[0];
                        setOveralImages(newOverallArray);
                    } else {
                        //save base64 to temp file dir to be used
                        let imageFileUris = [];
                        let imageUris = []
                        for (const base64String of jsonResponse.media_data) {
                            if (base64String !== '') {
                              const fileName = `${Date.now()}.jpg`; //generate a unique file name
                              const fileUri = `${FileSystem.cacheDirectory}${fileName}`;
                              await FileSystem.writeAsStringAsync(
                                fileUri,
                                base64String,
                                { encoding: FileSystem.EncodingType.Base64 }
                              );
                              imageFileUris.push({ uri: fileUri });
                              imageUris.push(fileUri)
                            }
                        }
                        //set itineraries and images
                        setitineraries(jsonResponse.itineraries);
                        setImages(imageFileUris);
                        //set overallimage of the day to the first image
                        const newOverallArray = [...overalImages];
                        newOverallArray[currentIndex] = imageUris[0];
                        setOveralImages(newOverallArray);
                    }
                }                
            }
        })
        .catch((err) => {
            console.error('Fetch error:', err);
        });
    }

    function postMedia() {
        let url = process.env.EXPO_PUBLIC_API_URL + 'api/medias/add-media';
        let postData = {
            base64_image: base64Image,
            travel_id: route.params.travelid,
            date: convertToMySQLDateFormat(currentDate)
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
            }
        })
        .then((jsonResponse) => {
            if (jsonResponse !== undefined) {
                fetchCurrentDateItineraryAndMedias();
                Alert.alert('successfully added image');
                Haptics.notificationAsync(
                    Haptics.NotificationFeedbackType.Success
                );
            }
        })
        .catch((err) => {
            console.error('Fetch error:', err);
        }); 
    }

    //add itinerary popup
    function AddPopupComponent() {
        return (
          <View>
            <Modal isVisible={isAddModalVisible}>
                <View style={[styles.flex1, styles.flexColumn]}>
                    <View style={[styles.flex1]}/>

                    <View style={[styles.flex1, styles.justifyHorizontalCenter, styles.justifyVerticalCenter, styles.backgroundBeige]}>

                        <View style={[styles.flex1, styles.flexRow]}>
                            <View style={[styles.flex3]}/>
                            <View style={[styles.flex1, styles.justifyHorizontalCenter, styles.justifyVerticalCenter]}>
                                <TouchableOpacity style={[styles.flex, styles.justifyHorizontalCenter, styles.justifyVerticalCenter1]} onPress={toggleAddModel}>
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

    //delete itinerary popup
    function deletePopupComponent() {
        return (
            <View>
            <Modal isVisible={isDeleteModalVisible}>
                <View style={[styles.flex1, styles.flexColumn]}>
                    <View style={[styles.flex1]}/>

                    <View style={[styles.flex1, styles.justifyHorizontalCenter, styles.justifyVerticalCenter, styles.backgroundBeige]}>

                        <View style={[styles.flex1, styles.flexRow]}>
                            <View style={[styles.flex3]}/>
                            <View style={[styles.flex1, styles.justifyHorizontalCenter, styles.justifyVerticalCenter]}>
                                <TouchableOpacity style={[styles.flex, styles.justifyHorizontalCenter, styles.justifyVerticalCenter1]} onPress={toggleDeleteModel}>
                                    <MaterialCommunityIcons name="close-circle-outline" size={24} color="black" />
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View style={[styles.flex1, styles.textAlignCenter]}>
                            <Text style={[styles.font20, styles.fontWeightBold]}>Confirm Acitivity Delete</Text>
                        </View>

                        <View style={[styles.flex1, styles.flexRow]}>
                            <ButtonV1 props={{text: "Delete", onPress:submitDeleteItinerary}}/>
                        </View>

                        <View style={[styles.flex1]}/>
                        
                    </View>
                    
                    <View style={[styles.flex1]}/> 
                </View>
            </Modal>
            </View>
        );
    }

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: false,
          base64: true,
          quality: 1,
        });
    
        if (!result.canceled) {
            const base64String = result.assets[0].base64;
            // Call the function to compress the base64 image
            compressBase64Image(base64String, 800, 100)
            .then((compressedBase64) => {
                // The compressedBase64 contains the compressed image data
                setBase64Image(compressedBase64);
            })
            .catch((error) => {
                console.error(error);
            });
            
            
        }
    };

    const compressBase64Image = async (base64String, maxWidth, quality) => {
        try {
            const compressedImage1 = await ImageManipulator.manipulateAsync(
                `data:image/jpeg;base64,${base64String}`,
                [],
                { compress: quality / 100 } // Quality is a value between 0 and 1
              );
          
              //calculate the new dimensions while preserving the aspect ratio
              let initalWidth = compressedImage1.width;
              let initalHeight = compressedImage1.height;
              let newHeight = (initalHeight / initalWidth ) * maxWidth

          const compressedImage = await ImageManipulator.manipulateAsync(
            `data:image/jpeg;base64,${base64String}`,
            [
              {
                resize: {
                  width: maxWidth,
                  height: newHeight,
                },
              },
            ],
            { compress: quality / 100 } // Quality is a value between 0 and 1
          );
          return convertImageToBase64(compressedImage.uri);
        } catch (error) {
          throw error;
        }
    };

    const convertImageToBase64 = async (uri) => {
        try {
          const base64String = await FileSystem.readAsStringAsync(uri, {
            encoding: FileSystem.EncodingType.Base64,
          });
          return base64String;
        } catch (error) {
          throw error;
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={[styles.mainView, styles.flexColumn]}>
                {/* Images */}
                <View style={[styles.flex4, styles.flexRow, styles.width, styles.justifyHorizontalCenter, styles.justifyVerticalCenter, styles.paddingUpDown5]}>
                    <ItineraryImages props={{images: overalImages, dates: dates, navigate: navigate, changeIndex: changeIndex, viewFullScreen: viewFullScreen, index: currentIndex }}/>
                </View>
                {/* Add */}
                <View style={[styles.flex1, styles.flexRow, styles.width, styles.justifyHorizontalCenter, styles.justifyVerticalCenter, styles.borderBlackTopBottom, styles.backgroundDarkBlue]}>
                        <AddButton props={{title: 'Add Photo', onPressButton: pickImage}}/>
                        <AddButton props={{title: 'Add Itinerary', onPressButton: toggleAddModel}}/>
                </View>
                {/* Itinerary rows */}
                <View style={[styles.flex6, styles.width]}>
                    <ItineraryTableRows props={{itineraries: itineraries, isLoading: isLoadingRows, toggleDelete: toggleDeleteModel, setDeleteId: setDeleteId}}/>
                </View>
                {AddPopupComponent()}
                {deletePopupComponent()}
            </View>
        </SafeAreaView>
    );
}
