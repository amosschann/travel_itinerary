import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, Text, View, Image, Dimensions, ScrollView, TouchableOpacity, Alert, Button, ActivityIndicator, ImageBackground } from 'react-native';
import { useRoute } from '@react-navigation/native';
import styles from '../components/Style';
import TravelTable from '../components/TravelTable';
import PageLoad from '../components/PageLoad';
// import { Cell, Section, TableView } from 'react-native-tableview-simple';
// const { width } = Dimensions.get('screen');

export default function TravelsScreen ({ navigation: { navigate }, route }){
    const [isLoading, setIsLoading] = useState(true);
    const [exampleGetTravelsResponse, setExampleGetTravelsResponse] = useState();

    useEffect(() => {
        setTimeout(() => {
            //fetch travels
            if (route.params.navigateType === "Upcoming") {
                //api call to get upcoming travels
                console.log('upcomming fetch')
            } else if (route.params.navigateType === "Completed") {
                //api call to get completed travels
                console.log('completed fetch')
            }
            setExampleGetTravelsResponse([
                {type:"default1", navigate: navigate, tripName: "Trip 1 Example", tripLocation: "Singapore"}, 
                {type:"default2", navigate: navigate, tripName: "Trip 2 Example", tripLocation: "London , England"},
                {type:"default1", navigate: navigate, tripName: "Trip 3 Example", tripLocation: "Singapore"}, 
                {type:"default2", navigate: navigate, tripName: "Trip 4 Example", tripLocation: "London , England"}
            ]);
            setIsLoading(false);
        }, 1000);
    }, []);

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
                        {exampleGetTravelsResponse.map((resp, index) => (
                            <TravelTable
                                key={'travelTable-' + index}
                                props={{
                                    header: false,
                                    type:resp.type,
                                    tripName:resp.tripName,
                                    tripLocation:resp.tripLocation,
                                    navigate:navigate
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
