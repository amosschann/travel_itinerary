import React from 'react';
import { SafeAreaView, StyleSheet, Text, View, Image, Dimensions, ScrollView, TouchableOpacity, Alert, Button } from 'react-native';
import styles from '../components/Style';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TravelTable from '../components/TravelTable'
// import { Cell, Section, TableView } from 'react-native-tableview-simple';
// const { width } = Dimensions.get('screen');

export default function HomeScreen({ navigation: { navigate }, props }){
    return (
        <SafeAreaView style={styles.container}>
            <View style={[styles.mainView, styles.flexColumn]}>
                <View style={styles.mainView}>
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
                <View style={styles.mainView}>
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

                {/* <Button
                    style={styles.backgroundWhite}
                    onPress={async () => {
                        try {
                            const accessToken = await AsyncStorage.getItem('accessToken');
                            console.log(accessToken);
                            if (accessToken == null) {
                                await AsyncStorage.setItem('accessToken', 'exampletoken');
                            } else {
                                await AsyncStorage.removeItem('accessToken');
                            }
                        } catch (error) {
                            console.log(error)
                        }
                        
                    }}
                    title="Navigate to Login"
                    color="#841584"
                    accessibilityLabel="test"
                /> */}

            </View>


        </SafeAreaView>
    );
}
