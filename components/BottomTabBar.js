import React from 'react';
import { SafeAreaView, StyleSheet, Text, View, Image, Dimensions, ScrollView, TouchableOpacity, Alert, Button } from 'react-native';
// import { Cell, Section, TableView } from 'react-native-tableview-simple';
import { useRoute } from '@react-navigation/native';
import styles from './Style';

// const { width } = Dimensions.get('screen');

export default function UserSettingsScreen ({ navigation: { navigate }, props }){
    // const route = useRoute();
    // // Access the 'names' parameter from the route
    // const { names } = route.params;

    return (
        <SafeAreaView style={styles.container}>
            <Text>hello world</Text>
        </SafeAreaView>
    );
}
