import React, { useState } from 'react';
import { SafeAreaView, Text, View, TouchableOpacity, Alert, TextInput, ImageBackground, KeyboardAvoidingView } from 'react-native';
import { ButtonV1 } from '../components/Buttons';
import styles from '../components/Style';
import { useAuth } from '../components/AuthContext';
import * as SecureStore from 'expo-secure-store';
import * as Haptics from 'expo-haptics';

// import { Cell, Section, TableView } from 'react-native-tableview-simple';
// const { width } = Dimensions.get('screen');

export default function SignInScreen ({ navigation: { navigate }, props }){
    const {signIn} = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')


    function submitSignIn() {
        let url = process.env.EXPO_PUBLIC_API_URL + 'api/auth/signIn'; 

        //empty check
        if (
            email === '' ||
            password === '' 
        ) {
            alert('incorrect username or password');
            return;
        }

        let postData = {
            'email': email.toLowerCase(),
            'password': password
        };

        fetch(url, {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            redirect: 'follow',
            referrer: 'client',
            body: JSON.stringify(postData)
        })
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else if (response.status === 500) {
                return response.json().then((error) => {
                    Alert.alert( error.message);
                });
            } else {
                Alert.alert('connection error');
            }
        })
        .then(async (jsonResponse) => {
            if (jsonResponse !== undefined) {
                //store key
                try {
                    await SecureStore.setItemAsync('accessToken', jsonResponse.accessToken);
                } catch (e) {
                    Alert.alert('connection error');
                return;
                }
                Haptics.notificationAsync(
                    Haptics.NotificationFeedbackType.Success
                );
                signIn();
            }
        })
        .catch((err) => {
            console.error('Fetch error:', err);
        });
    }

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView
                style={styles.container}
                behavior="position"
            >
                <View style={[styles.mainView, styles.flexColumn]}>
                    <View style={[styles.flex6, styles.width]}> 
                        <View style={[styles.flex1, styles.backgroundDarkBlue]}/>
                        <ImageBackground 
                            source={require('../assets/travel-logo.png')} 
                            style={[styles.width, styles.flex3, styles.backgroundDarkBlue]} 
                            imageStyle= {[styles.objectFitCover, styles.objectFitContain]}
                        />
                        <View style={[styles.flex1, styles.backgroundDarkBlue]}/>
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

                    <View style={[styles.flex1]}/>

                    <ButtonV1 props={{text: "Sign In", onPress: submitSignIn}}/>
                    <View style={[styles.flex3, styles.justifyHorizontalCenter, styles.justifyVerticalCenter]}> 
                        <View style={[styles.flex1]}/>
                        <View style={[styles.flex1]}>
                        <Text>Don't have an account? </Text>
                            <TouchableOpacity onPress={() => {navigate('SignUpScreen')}}>
                                <Text style={[styles.colorDarkBlue, styles.fontWeightBold]}>Sign Up</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={[styles.flex3]}/>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}
