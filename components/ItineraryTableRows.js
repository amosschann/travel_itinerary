import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, Text, View, Image, Dimensions, ScrollView, TouchableOpacity, Alert, Button, ActivityIndicator } from 'react-native';
import { Cell, Section, TableView } from 'react-native-tableview-simple';
import styles from './Style';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const { width } = Dimensions.get('screen');

export default function ItineraryTableRows ({ props }){
    //cell content for itinerary
    function CellRow({cellProps}) {
        let borderTop = '';
        if (cellProps.index === 0) {
            borderTop = styles.borderBlackTop;
        }

        if (props.isLoading) {
            return (
                <View style={[styles.height, styles.width, styles.justifyHorizontalCenter, styles.paddingTop20]}>
                    <ActivityIndicator size="large" />
                </View> 
            )
        }
        return (
            <TouchableOpacity onPress={() => console.log('go to edit / delete')}>
                <Cell
                    key={'cellrow' + cellProps.index}
                    contentContainerStyle={[styles.heightVW10, styles.justifyVerticalCenter, styles.borderBlackBottom, borderTop]}
                    image={<MaterialCommunityIcons style={[styles.justifyVerticalCenter]} name="clock-outline" size={width/15}/>}
                    cellContentView={
                        //time and activity name
                        <View style={[styles.flexRow, styles.flex1]}>
                            <View style={[styles.justifyVerticalCenter, styles.flex5, styles.justifyHorizontalCenter]}>
                                <Text style={[styles.marginBottom5]}>{cellProps.activityTime}</Text>
                                <Text style={[styles.font15]}>{cellProps.activityName}</Text>
                            </View>
                            <View style={[styles.justifyHorizontalCenter, styles.justifyVerticalCenter, styles.flex1]}>
                                <MaterialCommunityIcons name="menu" size={width/15}/>
                            </View>
                        </View>
                    }
                />
            </TouchableOpacity>
        )
    }

    return (
        <ScrollView style={[styles.mainView]}>
            <TableView style={[]}>
                    <Section key='itinerary table'>
                    {props.itineraries.map((resp, index) => (
                        <CellRow cellProps={{activityTime: resp.activityTime, activityName: resp.activityName, index:index}}/> 
                    ))    
                    }
                       
                    </Section>
            </TableView>
        </ScrollView>
    );
}
