import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { AuthProvider, useAuth } from './components/AuthContext';
import { SafeAreaView, StyleSheet, Text, View, Image, Dimensions, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { SignInStackScreen, SignUpStackScreen } from './navigation/Stacks';
import { HomeTabScreen, ProfileTabScreen, AddTabScreen } from "./navigation/Tabs"

const Tab = createBottomTabNavigator();

function MainApp() {
  const { isSignedIn } = useAuth();

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
                  color = '#141f31';
              } else if (route.name === 'Profile') {
                iconName = focused
                  ? 'account-circle'
                  : 'account-circle-outline';
                  color = '#141f31';
              } else if (route.name === 'Add') {
                iconName = focused
                  ? 'plus-circle'
                  : 'plus-circle-outline';
                  color = '#141f31';
              }
              return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: '#141f31',
            tabBarInactiveTintColor: 'grey',
          })}
        >
          {/* POST LOGIN */}
          {HomeTabScreen()}
          {AddTabScreen()}
          {ProfileTabScreen()}
        </Tab.Navigator>
      ) :
        (
          <>
            {/* PRE LOGIN */}
            {SignInStackScreen()}
            {SignUpStackScreen()}
          </>
        )}

      <StatusBar barStyle="default" />
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <MainApp />
    </AuthProvider>
  );
}
