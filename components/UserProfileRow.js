import React from 'react';
import { SafeAreaView, StyleSheet, Text, View, Image, Dimensions, ScrollView, TouchableOpacity, Alert, Button } from 'react-native';
import { Cell, Section, TableView } from 'react-native-tableview-simple';
import { useAuth } from './AuthContext';
import { useRoute } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from './Style';

// import { Cell, Section, TableView } from 'react-native-tableview-simple';
const { height } = Dimensions.get('screen');
const imageHeight = height * 0.03;

export default function UserProfileRow ({props}){
    const {signOut} = useAuth();
    return (
            <TouchableOpacity onPress={() => {
                    console.log('go to ' + props.navigateTo);
                    if (props.navigateTo === 'signOut') {
                        signOut();
                    }
                }}>
                <Cell
                    key={props.title}
                    contentContainerStyle={[]}
                    image={<MaterialCommunityIcons name={props.iconName} size={imageHeight}/>}
                    cellContentView={
                        <>
                        <View style={[styles.paddingLeftVW10, styles.heightVH9, styles.justifyVerticalCenter, styles.width70]}>
                            <Text style={[styles.font20, styles.colorDarkBlue]}>{props.title}</Text>
                        </View>
                        <View style={[styles.justifyHorizontalCenter, styles.heightVH9, styles.justifyVerticalCenter, styles.width20]}>
                            <Text style={[styles.font20, styles.colorDarkBlue]}>></Text>
                        </View>
                        </>
                    }
                />
            </TouchableOpacity>
    )
}