import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, Text, View, Image, Dimensions, ScrollView, TouchableOpacity, Alert, Button } from 'react-native';
import { Cell, Section, TableView } from 'react-native-tableview-simple';
import { useRoute } from '@react-navigation/native';
import styles from '../components/Style';
import ItineraryTableRows from '../components/itineraryTableRows';

// import { Cell, Section, TableView } from 'react-native-tableview-simple';

export default function ItineraryScreen ({ navigation: { navigate }, route }){
    const [itineraries, setitineraries] = useState([
                                                {activityTime: '07:00 - 08:00',activityName: 'Activity1'},
                                                {activityTime: '08:00 - 09:30',activityName: 'Activity1'},
                                                {activityTime: '09:30 - 11:00',activityName: 'Activity1'},
                                                {activityTime: '11:00 - 12:00',activityName: 'Activity1'}
                                                ])

    useEffect(() => {
        //fetch itinerary base on travel id
        console.log('fetching itinerary');
    }, []);
    

    return (
        <SafeAreaView style={styles.container}>
            <View style={[styles.mainView, styles.flexColumn]}>
                {/* Header */}
                <View style={[styles.mainView, styles.justifyHorizontalCenter, styles.justifyVerticalCenter]}>
                    <Text style={[styles.font20, styles.fontWeightBold]}>
                        HELLO WORLD
                    </Text>
                </View>
                <View style={[styles.flex2, styles.width, styles.justifyHorizontalCenter, styles.justifyVerticalCenter, styles.borderGreyLight]}>
                    <Text style={[styles.font20, styles.fontWeightBold]}>
                        HELLO WORLD
                    </Text>
                </View>
                <View style={[styles.flex5, styles.width]}>
                    <ItineraryTableRows props={{itineraries: itineraries}}/>
                </View>
            </View>
        </SafeAreaView>
    );
}
