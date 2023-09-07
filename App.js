import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View, Image, Dimensions, ScrollView, TouchableOpacity, Alert } from 'react-native';
// import { Cell, Section, TableView } from 'react-native-tableview-simple';
import { style } from './components/Style'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useState } from 'react';
import { LoginStackScreen } from './navigation/Stacks';
import { HomeTabScreen, ProfileTabScreen, AddTabScreen } from "./navigation/Tabs"

const Tab = createBottomTabNavigator();

export default function App() {
  const [isSignedIn, setIsSignedIn] = useState(true)

  return (
    <NavigationContainer>
      {isSignedIn ? (
        <Tab.Navigator
          initialRouteName="Home" // Change this if you want to start with a different screen
          screenOptions={({ route }) => ({
              tabBarIcon: ({ focused, color, size }) => {
              let iconName;
              if (route.name === 'Home') {
                iconName = focused
                ? 'home-circle'
                : 'home-circle-outline';
              } else if (route.name === 'Profile') {
                iconName = focused
                ? 'account-circle'
                : 'account-circle-outline';
              } else if (route.name === 'Add') {
                iconName = focused
                ? 'plus-circle'
                : 'plus-circle-outline';
              }
        
            return <MaterialCommunityIcons name={iconName} size={size} color={color}/>;
          },       
          activeTintColor: 'royalblue',
          inactiveTintColor: 'gray',
        })}
        >
          {HomeTabScreen()}
          {AddTabScreen()}
          {ProfileTabScreen()}
        </Tab.Navigator>
      ) : (
        <>
          {LoginStackScreen()}
        </>
      )}

      <StatusBar barStyle="default" />
    </NavigationContainer>
  );
}

