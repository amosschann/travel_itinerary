import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View, Image, Dimensions, ScrollView, TouchableOpacity, Alert, Button, ImageBackground } from 'react-native';
import styles from '../components/Style';
import TravelTable from '../components/TravelTable'
import { getAccessToken } from '../helpers/AccessTokenHelper';
import { useIsFocused } from '@react-navigation/native';


export default function HomeScreen({ navigation: { navigate }, props }){
    const [accessToken, setAccessToken] = useState('');
    const isFocused = useIsFocused();
    const [upcomingResponse, setUpcomingResponse] = useState({
        title: 'No Upcoming Travels',
        name: "Add Your Travels",
        start_date: '--/--/--',
        end_date:'--/--/--',
        id: 'default'
    })
    const [completedResponse, setCompletedResponse] = useState({
        title: 'No Upcoming Travels',
        name: "Add Your Travels",
        start_date: '--/--/--',
        end_date:'--/--/--',
        id: 'default'
    })

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

    useEffect(() => { 
        if (accessToken !== '') {
            fetchTravels();
        }
    }, [isFocused])

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
            if (Object.keys(jsonResponse).length !== 0) {
                let completedTravelResponse = jsonResponse.completedTravel;
                let upcomingTravelResponse = jsonResponse.upcomingTravel;
                if (completedTravelResponse !== undefined) {
                    setCompletedResponse(completedTravelResponse);
                }
                if (upcomingResponse !== undefined) {
                    setUpcomingResponse(upcomingTravelResponse);
                }
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
                            tripName: upcomingResponse.title,
                            tripLocation: upcomingResponse.name,
                            startDate: upcomingResponse.start_date,
                            endDate: upcomingResponse.end_date,
                            id: upcomingResponse.id,
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
                            tripName: completedResponse.title,
                            tripLocation: completedResponse.name,
                            startDate: completedResponse.start_date,
                            endDate: completedResponse.end_date,
                            id: completedResponse.id,
                            navigate: navigate, 
                            navigateType: "Completed"
                            }}
                    />
                </View>
            </View>
        </SafeAreaView>
    );
}
