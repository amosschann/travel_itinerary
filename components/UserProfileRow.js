import React from 'react';
import { Text, View, Dimensions, TouchableOpacity } from 'react-native';
import { Cell } from 'react-native-tableview-simple';
import { useAuth } from './AuthContext';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from './Style';
import * as SecureStore from 'expo-secure-store';
import * as Haptics from 'expo-haptics';

// import { Cell, Section, TableView } from 'react-native-tableview-simple';
const { height } = Dimensions.get('screen');
const imageHeight = height * 0.03;

export default function UserProfileRow ({props}){
    const {signOut} = useAuth();
    return (
            <TouchableOpacity onPress={async () => {
                    if (props.navigateTo === 'signOut') {
                        try {
                            await SecureStore.deleteItemAsync('accessToken');
                        } catch (error) {
                            console.error('Error clearing AsyncStorage data:', error);
                        }
                        signOut();
                        Haptics.notificationAsync(
                            Haptics.NotificationFeedbackType.Success
                        );
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