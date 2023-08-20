import React from 'react';
import { SafeAreaView, StyleSheet, Text, View, Image, Dimensions, ScrollView, TouchableOpacity, Alert, Button } from 'react-native';
import { useRoute } from '@react-navigation/native';
import styles from '../components/Style';
// import { Cell, Section, TableView } from 'react-native-tableview-simple';
// const { width } = Dimensions.get('screen');

export default function HomeScreen({ navigation: { navigate }, props }){
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={{height: "100%"}}>
                    <Text>Test Home Page</Text>
                    <Button
                        onPress={() =>navigate('UserSettings')}
                        title="Navigate to user settings"
                        color="#841584"
                        accessibilityLabel="test"
                    />
                    <Button
                        onPress={() =>navigate('Travels')}
                        title="Navigate to user Travels"
                        color="#841584"
                        accessibilityLabel="test"
                    />
                    <Button
                        onPress={() =>navigate('Itenary')}
                        title="Navigate to Itenary"
                        color="#841584"
                        accessibilityLabel="test"
                    />
                    <Button
                        onPress={() =>navigate('AddTravel')}
                        title="Navigate to Add Travel"
                        color="#841584"
                        accessibilityLabel="test"
                    />
                    <Button
                        onPress={() =>navigate('AddActivity')}
                        title="Navigate to Add Activity"
                        color="#841584"
                        accessibilityLabel="test"
                    />
                    <Button
                        onPress={() =>navigate('Login')}
                        title="Navigate to Login"
                        color="#841584"
                        accessibilityLabel="test"
                    />
                    <Button
                        onPress={() =>navigate('SignUp')}
                        title="Navigate to Sign Up"
                        color="#841584"
                        accessibilityLabel="test"
                    />
            </ScrollView>
        </SafeAreaView>
    );
}
