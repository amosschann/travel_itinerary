import React from 'react';
import { SafeAreaView, StyleSheet, Text, View, Image, Dimensions, ScrollView, TouchableOpacity, Alert, Button } from 'react-native';
import { useRoute } from '@react-navigation/native';
import styles from '../components/Style';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import { Cell, Section, TableView } from 'react-native-tableview-simple';
// const { width } = Dimensions.get('screen');

export default function HomeScreen({ navigation: { navigate }, props }){
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.scrollView}>

                <Text>Test Home Pdagee</Text>
                <Button
                    style={styles.backgroundWhite}
                    onPress={() =>navigate('ProfileSettings')}
                    title="Navigate to user settings"
                    color="#841584"
                    accessibilityLabel="test"
                />
                <Button
                    style={styles.backgroundWhite}
                    onPress={() =>navigate('Travels')}
                    title="Navigate to user Travels"
                    color="#841584"
                    accessibilityLabel="test"
                />
                <Button
                    style={styles.backgroundWhite}
                    onPress={() =>navigate('Itenary')}
                    title="Navigate to Itenary"
                    color="#841584"
                    accessibilityLabel="test"
                />
                <Button
                     style={styles.backgroundWhite}
                    onPress={() =>navigate('AddTravel')}
                    title="Navigate to Add Travel"
                    color="#841584"
                    accessibilityLabel="test"
                />
                <Button
                    style={styles.backgroundWhite}
                    onPress={() =>navigate('AddActivity')}
                    title="Navigate to Add Activity"
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
                    onPress={() =>navigate('SignUp')}
                    title="Navigate to Sign Up"
                    color="#841584"
                    accessibilityLabel="test"
                />

            </ScrollView>


        </SafeAreaView>
    );
}
