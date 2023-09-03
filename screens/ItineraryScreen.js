import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, Text, View, Image, Dimensions, ScrollView, TouchableOpacity, Alert, Button, ImageBackground, ActivityIndicator } from 'react-native';
import { Cell, Section, TableView } from 'react-native-tableview-simple';
import { useRoute } from '@react-navigation/native';
import styles from '../components/Style';
import ItineraryTableRows from '../components/ItineraryTableRows';
import ItineraryImages from '../components/ItinereryImages';

// import { Cell, Section, TableView } from 'react-native-tableview-simple';

export default function ItineraryScreen ({ navigation: { navigate }, route }){
    const example1 = {
        itineraries: [
            {activityTime: '07:00 - 08:00',activityName: 'Activity1'},
            {activityTime: '08:00 - 09:30',activityName: 'Activity2'},
            {activityTime: '09:30 - 11:00',activityName: 'Activity3'},
            {activityTime: '11:00 - 12:00',activityName: 'Activity4'}
        ], 
        images: []
    }
    const example2 = {
        itineraries: [
            {activityTime: '07:00 - 08:00',activityName: 'Activity1'},
            {activityTime: '08:00 - 09:30',activityName: 'Activity2'}
        ], 
        images: ['https://p1.pxfuel.com/preview/811/128/969/vacation-destiny-travel-holiday.jpg']
    }
    const example3 = {
        itineraries: [], 
        images: ['https://p1.pxfuel.com/preview/811/128/969/vacation-destiny-travel-holiday.jpg', 'https://live.staticflickr.com/3453/3268091255_44e7049809_b.jpg']
    }

    const [itineraries, setitineraries] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isLoadingRows, setIsLoadingRows] = useState(false);
    const [images, setImages] = useState([])

    useEffect(() => {
        //fetch itinerary & images based on travel id
        setTimeout(() => {
            setitineraries(example1.itineraries);
            setImages(example1.images)
            setIsLoading(false);
        }, 1000);

    }, []);

    
    
    if(isLoading) {
        return (
            <View style={[styles.height, styles.width, styles.justifyHorizontalCenter, styles.paddingTop20]}>
                <ActivityIndicator size="large" />
            </View> 
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={[styles.mainView, styles.flexColumn]}>
                {/* Header */}
                <View style={[styles.mainView, styles.justifyHorizontalCenter, styles.justifyVerticalCenter]}>
                    <Text style={[styles.font20, styles.fontWeightBold]}>
                        HELLO WORLD
                    </Text>
                </View>
                <View style={[styles.flex2, styles.flexRow, styles.width, styles.justifyHorizontalCenter, styles.justifyVerticalCenter]}>
                    <ItineraryImages props={{images: images, navigate: navigate}}/>
                </View>
                <View style={[styles.flex5, styles.width]}>
                    <ItineraryTableRows props={{itineraries: itineraries, isLoading: isLoadingRows}}/>
                </View>
            </View>
        </SafeAreaView>
    );
}
