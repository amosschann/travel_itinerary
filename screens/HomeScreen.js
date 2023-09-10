import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View, Image, Dimensions, ScrollView, TouchableOpacity, Alert, Button, ImageBackground } from 'react-native';
import styles from '../components/Style';
import TravelTable from '../components/TravelTable'
import { getAccessToken } from '../helpers/AccessTokenHelper';

export default function HomeScreen({ navigation: { navigate }, props }){
    const [accessToken, setAccessToken] = useState('');

    useEffect(() => {
        //initial load from login
        getAccessToken().then(accessToken => {
            setAccessToken(accessToken);
        })
        console.log('calleddd')
    }, []);

    useEffect(() => {
        //initial load from login
        if (accessToken !== '') {
            // console.log(accessToken);
        }
        
    }, [accessToken]);


    function fetchTravels() {
        let url = process.env.EXPO_PUBLIC_API_URL + 'api/travels/get-travels'; 
        console.log(url)
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
                console.log(jsonResponse);
                
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
                            tripName: "No Upcoming Travels",
                            tripLocation: "Add Your Travels",
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
                            tripName: "No Completed Travels",
                            tripLocation: "Add Your Travels",
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
