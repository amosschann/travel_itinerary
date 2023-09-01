import React from 'react';
import { SafeAreaView, StyleSheet, Text, View, Image, Dimensions, ScrollView, TouchableOpacity, Alert, Button } from 'react-native';
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
            <View style={[styles.scrollView, styles.flexColumn]}>
                <View style={[styles.flex1]}>
                    <TableView>
                        <Section
                        key="item"
                        hideSurroundingSeparators={true}
                        style={styles.flex1}
                        >
                            <Cell
                                key="UserProfilePic"
                                contentContainerStyle={[]}
                                cellContentView={
                                    <View style={[styles.justifyHorizontalCenter, styles.heightVW25, styles.width100,
                                                styles.justifyVerticalCenter]}>
                                        <Text style={[styles.font20]}>PHOTO</Text>
                                    </View>
                                }
                            />
                            <Cell
                                key="UserProfileInfo"
                                contentContainerStyle={[]}
                                cellContentView={
                                    <View style={[styles.justifyHorizontalCenter, styles.heightVW5, styles.width100,
                                                 styles.justifyVerticalCenter]}>
                                        <Text style={[styles.font15, styles.fontWeightBold]}>UserName</Text>
                                    </View>
                                }
                            />
                        </Section>
                    </TableView>
                </View>

                <View style={[styles.flex1]}>
                    <TableView style={[styles.flex1]}>
                        <Section
                        key="item"
                        style={[styles.flex1]}
                        >
                            <UserProfileRow 
                                props={{title: "Edit Profile Info", navigate: navigate, iconName: 'clipboard-text-outline'}}
                            />
                            <UserProfileRow 
                                props={{title: "Edit Profile Image", navigate: navigate, iconName: 'image-edit-outline'}}
                            />
                            <UserProfileRow 
                                props={{title: "More Settings", navigate: navigate, iconName: 'cog-outline'}}
                            />
                            <UserProfileRow 
                                props={{title: "Log Out", navigate: navigate, iconName: 'logout'}}
                            />
                        </Section>
                    </TableView>
                </View>
            </View>
        </SafeAreaView>
    );
}
