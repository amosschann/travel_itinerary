import React from 'react';
import { SafeAreaView, StyleSheet, Text, View, Image, Dimensions, ScrollView, TouchableOpacity, Alert, Button, ImageBackground } from 'react-native';
import { Cell, Section, TableView } from 'react-native-tableview-simple';
import { useRoute } from '@react-navigation/native';
import UserProfileRow from '../components/UserProfileRow';
import styles from '../components/Style';

// import { Cell, Section, TableView } from 'react-native-tableview-simple';
// const { width } = Dimensions.get('screen');

export default function UserProfileScreen ({ navigation: { navigate }, props }){
    // const route = useRoute();
    // // Access the 'names' parameter from the route
    // const { names } = route.params;

    return (
        <SafeAreaView style={styles.container}>
            <View style={[styles.mainView, styles.flexColumn]}>
                <View style={[styles.flex1]}>
                
                    <View style={[styles.flex4, styles.width100]}>
                        <ImageBackground 
                            source={require('../assets/profileBackground.jpg')} 
                            style={[styles.width, styles.flex1, styles.justifyVerticalBottom, styles.justifyHorizontalCenter]} 
                            imageStyle= {{opacity:0.3}}
                        >
                            <Image source={require('../assets/travelphoto1.jpg')} style={styles.profilePic}/>
                        </ImageBackground>                   
                    </View>
                                        
                    <View style={[styles.justifyHorizontalCenter, styles.flex1, styles.width100,
                                    styles.justifyVerticalCenter]}>
                        <Text style={[styles.font15, styles.fontWeightBold, styles.marginBottom5]}>Example Name</Text>
                        <Text style={[styles.font15]}>example@gmail.com</Text>
                    </View>
                    
                </View>

                <View style={[styles.flex1]}>
                    <TableView style={[styles.flex1]}>
                        <Section
                        key="item"
                        style={[styles.flex1]}
                        >
                            <UserProfileRow 
                                props={{title: "Edit Profile Info", navigate: navigate, iconName: 'clipboard-text-outline', navigateTo: 'examplepage'}}
                            />
                            <UserProfileRow 
                                props={{title: "Edit Profile Image", navigate: navigate, iconName: 'image-edit-outline',  navigateTo: 'examplepage'}}
                            />
                            <UserProfileRow 
                                props={{title: "More Settings", navigate: navigate, iconName: 'cog-outline',  navigateTo: 'examplepage'}}
                            />
                            <UserProfileRow 
                                props={{title: "Log Out", navigate: navigate, iconName: 'logout',  navigateTo: 'examplepage'}}
                            />
                        </Section>
                    </TableView>
                </View>
            </View>
        </SafeAreaView>
    );
}
