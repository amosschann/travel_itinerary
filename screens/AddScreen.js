import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View, Image, Dimensions, ScrollView, TouchableOpacity, Alert, Button, TextInput, ImageBackground, KeyboardAvoidingView} from 'react-native';
import { useRoute } from '@react-navigation/native';
import { ButtonV1 } from '../components/Buttons';
import styles from '../components/Style';
import DateTimePicker from '@react-native-community/datetimepicker';
import CountryPicker from 'react-native-country-picker-modal'
import { Country } from 'react-native-country-picker-modal';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { getAccessToken } from '../helpers/AccessTokenHelper';

export default function AddScreen ({ navigation, props }){
    const [tripTitle, setTripTitle] = useState('')
    const [destinationName, setDestinationName] = useState('Select Destination');
    const [departureDate, setDepartureDate] = useState(new Date());
    const [returnDate, setReturnDate] = useState(new Date());
    const [countryPickerVisible, setCountryPickerVisible ] = useState(false);
    const [accessToken, setAccessToken] = useState('');

    useEffect(() => {
        getAccessToken().then(accessToken => {
            setAccessToken(accessToken);
        })
        
    }, []);


    function submitAddTravels() {
        let url = process.env.EXPO_PUBLIC_API_URL + 'api/travels/add-travels';

        //empty check
        if ( tripTitle === '' || destinationName === '' ) {
            alert('missing field');
            return;
        }


        let postData = {
            'title': tripTitle,
            'destination': destinationName,
            'departureDate': departureDate.toISOString().split('T')[0],
            'returnDate': returnDate.toISOString().split('T')[0],
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
                console.log(jsonResponse)
                Alert.alert('new travel created');
                setTripTitle('');
                setDestinationName('');
                setDepartureDate(new Date());
                setReturnDate(new Date());
                navigation.navigate('TravelsScreen', { navigateType: 'Upcoming' });
            }
        })
        .catch((err) => {
            console.error('Fetch error:', err);
        });

    }

    const onSelect = (country: Country) => {
        setDestinationName(country.name)
    }

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView
                style={styles.container}
                behavior="position"
            >
                <View style={[styles.mainView, styles.flexColumn]}>
                    <View style={[styles.flex3, styles.width]}> 
                        <View style={[styles.flex2]}/>
                        <View style={[styles.flex1, styles.backgroundDarkBlue]}/>
                        <ImageBackground 
                            source={require('../assets/travel-logo.png')} 
                            style={[styles.width, styles.flex3, styles.backgroundDarkBlue]} 
                            imageStyle= {[styles.objectFitCover, styles.objectFitContain]}
                        />
                        <View style={[styles.flex1, styles.backgroundDarkBlue]}/>
                    </View>
                    <View style={[styles.flex1]}/>

                    <View style={[styles.flex1, styles.flexRow]}>
                        <View style={[styles.flex1]}/>
                        <TextInput
                            style={[styles.flex5, styles.borderRadiusAllBlack10, styles.width100, styles.justifyHorizontalCenter, styles.justifyVerticalCenter, styles.textAlignCenter, styles.marginBottomTop5]}
                            placeholder="Trip Title"
                            placeholderTextColor="#003f5c"
                            value={tripTitle}
                            maxLength={16}
                            onChangeText={(tripTitle) => setTripTitle(tripTitle)}
                        /> 
                        <View style={[styles.flex1]}/>
                    </View>
                    
                    <View style={[styles.flex1, styles.flexColumn]}>
                        <View style={[styles.flex1, styles.flexRow]}>
                            <View style={[styles.flex1]}/>
                            <Text  style={[styles.flex5]}>Destination</Text>
                            <View style={[styles.flex1]}/>
                        </View>
                        <View style={[styles.flex4, styles.flexRow]}>
                            <View style={[styles.flex1]}/>
                            <View style={[styles.flex4, styles.borderRadiusAllBlack10, styles.width100, styles.textAlignCenter, styles.marginBottomTop5, styles.justifyHorizontalCenter, styles.justifyVerticalCenter]}>
                                <Text> 
                                {destinationName}
                                </Text>
                            </View>
                            <View style={[styles.flex1, styles.borderRadiusAllBlack10, styles.width100, styles.textAlignCenter, styles.marginBottomTop5, 
                            styles.justifyHorizontalCenter, styles.justifyVerticalCenter, styles.backgroundDarkBlue, styles.colorWhite]}>
                                <CountryPicker
                                    {...{
                                        destinationName,
                                        onSelect,
                                    }}
                                    placeholder={
                                        <MaterialCommunityIcons name="map-plus" size={24} color="white" />
                                    }
                                    visible={countryPickerVisible}
                                
                                />
                            </View>
                            <View style={[styles.flex1]}/>
                        </View>
                    </View>

                    <View style={[styles.flex1, styles.flexColumn]}>
                        <View style={[styles.flex1, styles.flexRow]}>
                            <View style={[styles.flex1]}/>
                            <Text  style={[styles.flex5]}>Departure Date</Text>
                            <View style={[styles.flex1]}/>
                        </View>
                        <View style={[styles.flex3, styles.flexRow]}>
                            <View style={[styles.flex1]}/>
                            <View style={[styles.flex5, styles.borderRadiusAllBlack10, styles.width100, styles.justifyHorizontalCenter, styles.justifyVerticalCenter, styles.textAlignCenter, styles.marginBottomTop5]}>
                                <DateTimePicker
                                    value={departureDate}
                                    onChange={(evt, selectedDate) => {
                                        setDepartureDate(selectedDate);
                                    }}
                                />
                            </View>
                            <View style={[styles.flex1]}/>
                        </View>
                        
                    </View>

                    <View style={[styles.flex1, styles.flexColumn]}>
                        <View style={[styles.flex1, styles.flexRow]}>
                            <View style={[styles.flex1]}/>
                            <Text  style={[styles.flex5]}>Return Date</Text>
                            <View style={[styles.flex1]}/>
                        </View>
                        <View style={[styles.flex3, styles.flexRow]}>
                            <View style={[styles.flex1]}/>
                            <View style={[styles.flex5, styles.borderRadiusAllBlack10, styles.width100, styles.justifyHorizontalCenter, styles.justifyVerticalCenter, styles.textAlignCenter, styles.marginBottomTop5]}>
                                <DateTimePicker
                                    value={returnDate}
                                    minimumDate={departureDate}
                                    onChange={(evt, selectedDate) => {
                                        setReturnDate(selectedDate);
                                    }}
                                />
                            </View>
                            <View style={[styles.flex1]}/>
                        </View>
                    </View>

                    <ButtonV1 props={{text: "Add a Travel", onPress:submitAddTravels}}/>
                    
                    <View style={[styles.flex1, styles.justifyHorizontalCenter, styles.justifyVerticalCenter]} /> 
                </View>
                
                
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}
