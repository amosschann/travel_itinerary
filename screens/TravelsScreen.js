import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, Text, View, Image, Dimensions, ScrollView, TouchableOpacity, Alert, Button, ActivityIndicator, ImageBackground } from 'react-native';
import { useRoute } from '@react-navigation/native';
import styles from '../components/Style';
import TravelTable from '../components/TravelTable';
import PageLoad from '../components/PageLoad';
import { getAccessToken } from '../helpers/AccessTokenHelper';
// import { Cell, Section, TableView } from 'react-native-tableview-simple';
// const { width } = Dimensions.get('screen');

export default function TravelsScreen ({ navigation: { navigate }, route }){
    const [accessToken, setAccessToken] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [travelsResponse, setTravelsResponse] = useState([{
        title: 'No Travels',
        name: "Add Your Travels",
        start_date: '--/--/--',
        end_date: '--/--/--',
        id: 'default',
    }]);

    useEffect(() => {
        //initial load from login
        getAccessToken().then(accessToken => {
            setAccessToken(accessToken);
        })
    }, []);

    useEffect(() => {
        if (accessToken !== '') {
            //fetch travels
            if (route.params.navigateType === "Upcoming") {
                //api call to get upcoming travels
                fetchTravels("Upcoming");
            } else if (route.params.navigateType === "Completed") {
                //api call to get completed travels
                fetchTravels("Completed");
            }
        }
    }, [accessToken]);

    useEffect(() => {
        setIsLoading(false);  
    }, [travelsResponse]);


    function fetchTravels(type) {
        let url;
        if (type === "Upcoming") {
            url = process.env.EXPO_PUBLIC_API_URL + 'api/travels/get-upcoming-travels'; 
        } else if (type === "Completed") {
            url = process.env.EXPO_PUBLIC_API_URL + 'api/travels/get-completed-travels'; 
        }
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
            return response.json();
        })
        .then((jsonResponse) => {
            if (jsonResponse !== undefined) {
                if (jsonResponse.length !== 0) {
                    setTravelsResponse(jsonResponse);
                } else {
                    setIsLoading(false);  
                }
            }
            setIsLoading(false);  
        })
        .catch((err) => {
            console.error('Fetch error:', err);
        });

    }


    if(isLoading) {
        return (
            <PageLoad/>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={[styles.mainView, styles.flexColumn]}>
                {/* Header */}
                <View style={[styles.mainView, styles.justifyHorizontalCenter, styles.justifyVerticalCenter]}>
                    <Text style={[styles.font20, styles.fontWeightBold, styles.colorDarkBlue]}>
                        {route.params.navigateType}
                    </Text>
                </View>
                <View style={[styles.flex10, styles.width]}>
                    <ScrollView style={styles.mainView}>
                        {travelsResponse.map((resp, index) => (
                            <TravelTable
                                key={'travelTable-' + index}
                                props={{
                                    header: false,
                                    type:resp.images?resp.images: route.params.navigateType ==="Upcoming"? "default1" : "default2",
                                    tripName:resp.title,
                                    startDate: resp.start_date,
                                    endDate: resp.end_date,
                                    tripLocation:resp.name,
                                    navigate:navigate,
                                    id: resp.id
                                }}
                            />
                            ))
                        }
                    </ScrollView>
                </View>
            </View>
        </SafeAreaView>
    );
}
