import React from 'react';
import { SafeAreaView, StyleSheet, Text, View, Image, Dimensions, ScrollView, TouchableOpacity, Alert, Button } from 'react-native';
import { useRoute } from '@react-navigation/native';
import styles from '../components/Style';
// import { Cell, Section, TableView } from 'react-native-tableview-simple';
// const { width } = Dimensions.get('screen');

export default function UserSettingsScreen ({ navigation: { navigate }, props }){
    // const route = useRoute();
    // // Access the 'names' parameter from the route
    // const { names } = route.params;

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={{height: "100%"}}>
                    <Text>hello world</Text>
            </ScrollView>
        </SafeAreaView>
    );
}
