import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, Text, View, Image, Dimensions, ScrollView, TouchableOpacity, Alert, Button, ImageBackground, ActivityIndicator } from 'react-native';
import styles from './Style';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
const { width } = Dimensions.get('screen');


export default function AddButton ({props}) {
    return (
        <TouchableOpacity style={[styles.flex1]}>
            <View style={[styles.flex1, styles.flexColumn, styles.justifyHorizontalCenter]}>
                <View style={[styles.flex1]}></View>
                <MaterialCommunityIcons name="plus-circle-outline" size={width/16} style={[styles.flex2]}/>
                <Text style={[styles.flex2]}>{props.title}</Text>
            </View>
        </TouchableOpacity>
    )
};