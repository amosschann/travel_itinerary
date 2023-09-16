import React, { useState, useEffect } from 'react';
import { Text, View, Dimensions, TouchableOpacity } from 'react-native';
import styles from './Style';
const { width } = Dimensions.get('screen');
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


export function ButtonV1 ({props}) {
    return (
        <TouchableOpacity style={[styles.flex1]} onPress={props.onPress}>
            <View style={[styles.flex1, styles.flexRow, styles.justifyHorizontalCenter]}>
                <View style={styles.flex1} />
                <View style={[styles.flex5, styles.backgroundDarkBlue, styles.justifyHorizontalCenter, styles.justifyVerticalCenter, styles.heightVH5, styles.borderRadiusAllBlack10]}>
                    <Text style={[styles.colorWhite]}>{props.text}</Text>
                </View>
                <View style={styles.flex1} />
            </View>
        </TouchableOpacity>
    )
};

export function AddButton ({props}) {
    return (
        <TouchableOpacity style={[styles.flex1]} onPress={props.onPressButton}>
            <View style={[styles.flex1, styles.flexColumn, styles.justifyHorizontalCenter]}>
                <View style={[styles.flex1]}></View>
                <MaterialCommunityIcons name="plus-circle-outline" size={width/16} style={[styles.flex2, styles.colorWhite]}/>
                <Text style={[styles.flex2, styles.colorWhite]}>{props.title}</Text>
            </View>
        </TouchableOpacity>
    )
};