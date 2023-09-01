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
            <ScrollView style={styles.scrollView}>
                <View style={[styles.width100, styles.heightVW2]}></View>
                <TravelTable 
                    prop={{type:"default1", headerTitle: "Upcoming Travels"}}
                />
                <View style={[styles.width100, styles.heightVW2]}></View>
                <TravelTable 
                    prop={{type:"default2", headerTitle: "Completed Travels"}}
                />
                <View style={[styles.width100, styles.heightVW2]}></View>
                <Button
                    style={styles.backgroundWhite}
                    onPress={() =>navigate('ProfileSettingsScreen')}
                    title="Navigate to user settings"
                    color="#841584"
                    accessibilityLabel="test"
                />
                <Button
                    style={styles.backgroundWhite}
                    onPress={() =>navigate('TravelsScreen')}
                    title="Navigate to user Travels"
                    color="#841584"
                    accessibilityLabel="test"
                />
                <Button
                    style={styles.backgroundWhite}
                    onPress={() =>navigate('ItenaryScreen')}
                    title="Navigate to Itenary"
                    color="#841584"
                    accessibilityLabel="test"
                />
                <Button
                    style={styles.backgroundWhite}
                    onPress={() =>navigate('AddScreen')}
                    title="Navigate to Add"
                    color="#841584"
                    accessibilityLabel="test"
                />
                <Button
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
                />
                <Button
                    style={styles.backgroundWhite}
                    onPress={() =>navigate('SignUpScreen')}
                    title="Navigate to Sign Up"
                    color="#841584"
                    accessibilityLabel="test"
                />

            </ScrollView>


        </SafeAreaView>
    );
}
