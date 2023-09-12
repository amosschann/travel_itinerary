import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View, Image, Dimensions, ScrollView, TouchableOpacity, Alert, Button, ImageBackground } from 'react-native';
import styles from '../components/Style';
import TravelTable from '../components/TravelTable'
import { getAccessToken } from '../helpers/AccessTokenHelper';
import { formatDate } from '../helpers/DateFormatHelper';

export default function HomeScreen({ navigation: { navigate }, props }){
    const [accessToken, setAccessToken] = useState('');
    const [completedTitle, setCompletedTitle] = useState('No Upcoming Travels');
    const [upcomingTitle, setUpcomingTitle] = useState('No Upcoming Travels');
    const [completedeLocation, setCompletedLocation] = useState('Add Your Travels');
    const [upcomingLocation, setUpcomingLocation] = useState('Add Your Travels');
    const [completedStartDate, setCompletedStartDate] = useState('--/--/--')
    const [upcomingStartDate, setUpcomingStartDate] = useState('--/--/--')

    useEffect(() => {
        //initial load from login
        getAccessToken().then(accessToken => {
            setAccessToken(accessToken);
        })
    }, []);

    useEffect(() => {
        //initial load from login
        if (accessToken !== '') {
            fetchTravels();
        }
        
    }, [accessToken]);


    function fetchTravels() {
        let url = process.env.EXPO_PUBLIC_API_URL + 'api/travels/get-travels'; 
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
                let completedTravelResponse = jsonResponse.completedTravel;
                let upcomingTravelResponse = jsonResponse.upcomingTravel;
                setCompletedTitle(completedTravelResponse.title);
                setCompletedLocation(completedTravelResponse.name);
                setUpcomingTitle(upcomingTravelResponse.title);
                setUpcomingLocation(upcomingTravelResponse.name);
                setUpcomingStartDate(formatDate(upcomingTravelResponse.start_date));
                setCompletedStartDate(formatDate(completedTravelResponse.start_date));
                
            }
        })
        .catch((err) => {
            console.error('Fetch error:', err);
        });
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={[styles.mainView, styles.flexColumn]}>
                <View style={[styles.mainView]}>
                    <TravelTable
                        props={{
                            header: true,
                            key:"upcomingTravel",
                            type:"default1", 
                            headerTitle: "Upcoming Travels", 
                            tripName: upcomingTitle,
                            tripLocation: upcomingLocation,
                            startDate: upcomingStartDate,
                            navigate: navigate, 
                            navigateType: "Upcoming"
                        }}
                    />
                </View>
                <View style={[styles.mainView]}>
                    <TravelTable
                        props={{
                            header: true,
                            key:"completedTravel",
                            type:"default2", 
                            headerTitle: "Completed Travels", 
                            tripName: completedTitle,
                            tripLocation: completedeLocation,
                            startDate: completedStartDate,
                            navigate: navigate, 
                            navigateType: "Completed"
                            }}
                    />
                </View>

                <Button
                    style={styles.backgroundWhite}
                    onPress={async () => {
                        fetchTravels()
                    }}
                    title="test fetch"
                    color="#841584"
                    accessibilityLabel="test"
                />
            </View>


        </SafeAreaView>
    );
}
