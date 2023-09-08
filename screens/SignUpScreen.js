import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View, Image, Dimensions, ScrollView, TouchableOpacity, Alert, Button, TextInput, ImageBackground, KeyboardAvoidingView} from 'react-native';
import { useRoute } from '@react-navigation/native';
import { ButtonV1 } from '../components/Buttons';
import styles from '../components/Style';
import { useAuth } from '../components/AuthContext';
// import { Cell, Section, TableView } from 'react-native-tableview-simple';
// const { width } = Dimensions.get('screen');

export default function SignUpScreen ({ navigation }){
    const [profileName, setProfileName] = useState('')
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')


    function submitSignUp() {
        console.log(profileName, email, password, confirmPassword);
        navigation.goBack()
    }

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView
                style={styles.container}
                behavior="position"
            >
                <View style={[styles.mainView, styles.flexColumn]}>
                    <View style={[styles.flex4, styles.width]}> 
                        <View style={[styles.flex2]}/>
                        <View style={[styles.flex1, styles.backgroundDarkBlue]}/>
                        <ImageBackground 
                            source={require('../assets/travel-logo.png')} 
                            style={[styles.width, styles.flex3, styles.backgroundDarkBlue]} 
                            imageStyle= {[styles.objectFitCover, styles.objectFitContain]}
                        />
                        <View style={[styles.flex1, styles.backgroundDarkBlue]}/>
                        <View style={[styles.flex1]}/>
                    </View>
                    <View style={[styles.flex1]}/>
                    <View style={[styles.flex1, styles.flexRow]}>
                        <View style={[styles.flex1]}/>
                        <TextInput
                            style={[styles.flex5, styles.borderRadiusAllBlack10, styles.width100, styles.justifyHorizontalCenter, styles.justifyVerticalCenter, styles.textAlignCenter, styles.marginBottomTop5]}
                            placeholder="Profile Name"
                            placeholderTextColor="#003f5c"
                            maxLength={16}
                            onChangeText={(profileName) => setProfileName(profileName)}
                        /> 
                        <View style={[styles.flex1]}/>
                    </View>

                    <View style={[styles.flex1, styles.flexRow]}>
                        <View style={[styles.flex1]}/>
                        <TextInput
                            style={[styles.flex5, styles.borderRadiusAllBlack10, styles.width100, styles.justifyHorizontalCenter, styles.justifyVerticalCenter, styles.textAlignCenter, styles.marginBottomTop5]}
                            placeholder="Email"
                            inputMode='email'
                            placeholderTextColor="#003f5c"
                            onChangeText={(email) => setEmail(email)}
                        />
                        <View style={[styles.flex1]}/>
                    </View>

                    <View style={[styles.flex1, styles.flexRow]}>
                        <View style={[styles.flex1]}/>
                        <TextInput
                            style={[styles.flex5, styles.borderRadiusAllBlack10, styles.width100, styles.justifyHorizontalCenter, styles.justifyVerticalCenter, styles.textAlignCenter, styles.marginBottomTop5]}
                            placeholder="Password"
                            placeholderTextColor="#003f5c"
                            secureTextEntry={true}
                            maxLength={16}
                            onChangeText={(password) => setPassword(password)}
                        />
                        <View style={[styles.flex1]}/>
                    </View>

                    <View style={[styles.flex1, styles.flexRow]}>
                        <View style={[styles.flex1]}/>
                        <TextInput
                            style={[styles.flex5, styles.borderRadiusAllBlack10, styles.width100, styles.justifyHorizontalCenter, styles.justifyVerticalCenter, styles.textAlignCenter, styles.marginBottomTop5]}
                            placeholder="Confirm Password"
                            placeholderTextColor="#003f5c"
                            secureTextEntry={true}
                            maxLength={16}
                            onChangeText={(confirmPassword) => setConfirmPassword(confirmPassword)}
                        />
                        <View style={[styles.flex1]}/>
                    </View>



                    <ButtonV1 props={{text: "Sign Up", onPress:submitSignUp}}/>

                    <View style={[styles.flex2, styles.justifyHorizontalCenter, styles.justifyVerticalCenter]} /> 
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}
