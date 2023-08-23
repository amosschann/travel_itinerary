import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View, Image, Dimensions, ScrollView, TouchableOpacity, Alert } from 'react-native';
// import { Cell, Section, TableView } from 'react-native-tableview-simple';
import { style } from './components/Style'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomTabNavigator from './components/BottomTabNavigator';

const Stack = createNativeStackNavigator();

export default function App() {


  return (
    <NavigationContainer>
        <BottomTabNavigator

        /> 
      <StatusBar barStyle="default" />
    </NavigationContainer>
  );
}

