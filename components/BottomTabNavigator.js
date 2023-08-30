import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { HomeTabScreen, ProfileTabScreen, AddTabScreen } from "../navigation/Tabs"

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
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
  );
};

export default BottomTabNavigator;
