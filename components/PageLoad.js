import React, { useState, useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import styles from './Style';


export default function PageLoad() {
    return (
        <View style={[styles.flexColumn, styles.flex1, styles.width, styles.backgroundWhite]}>
            <View style={[styles.flex1, styles.width]}/>
            <View style={[styles.width, styles.justifyHorizontalCenter, styles.flex1]}>
                <ActivityIndicator size="large" />
            </View> 
        </View>
    );
};