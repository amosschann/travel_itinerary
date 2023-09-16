import React from 'react';
import { SafeAreaView, Text, View, Image, ImageBackground } from 'react-native';
import { Section, TableView } from 'react-native-tableview-simple';
import UserProfileRow from '../components/UserProfileRow';
import styles from '../components/Style';

// import { Cell, Section, TableView } from 'react-native-tableview-simple';
// const { width } = Dimensions.get('screen');

export default function UserProfileScreen ({ navigation: { navigate }, signOut, props }){
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
                        >
                            <Image source={require('../assets/travelphoto1.jpg')} style={styles.profilePic}/>
                        </ImageBackground>                   
                    </View>
                                        
                    <View style={[styles.justifyHorizontalCenter, styles.flex1, styles.width100,
                                    styles.justifyVerticalCenter]}>
                        <Text style={[styles.font15, styles.fontWeightBold, styles.marginBottom5, styles.colorDarkBlue]}>Example Name</Text>
                        <Text style={[styles.font15, styles.colorDarkBlue]}>example@gmail.com</Text>
                    </View>
                    
                </View>

                <View style={[styles.flex1]}>
                    <TableView style={[styles.flex1]}>
                        <Section
                        key="item"
                        style={[styles.flex1]}
                        >
                            <UserProfileRow 
                                props={{title: "Update Profile Info", navigate: navigate, iconName: 'clipboard-text-outline', navigateTo: 'examplepage'}}
                            />
                            <UserProfileRow 
                                props={{title: "Update Profile Image", navigate: navigate, iconName: 'image-edit-outline',  navigateTo: 'examplepage'}}
                            />
                            <UserProfileRow 
                                props={{title: "More Settings", navigate: navigate, iconName: 'cog-outline',  navigateTo: 'InProgressPage'}}
                            />
                            <UserProfileRow 
                                props={{title: "Sign Out", navigate: navigate, iconName: 'logout',  navigateTo: 'signOut', signOut: signOut} }
                            />
                        </Section>
                    </TableView>
                </View>
            </View>
        </SafeAreaView>
    );
}
