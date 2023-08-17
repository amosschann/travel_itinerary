import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View, Image, Dimensions, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Cell, Section, TableView } from 'react-native-tableview-simple';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen'
import UserSettingsScreen from './screens/UserSettingsScreen';
import TravelsScreen from './screens/TravelsScreen';
import ItenaryScreen from './screens/ItenaryScreen';
import AddTravelScreen from './screens/AddTravelScreen';
import AddActivityScreen from './screens/AddActivityScreen';
import LoginScreen from './screens/LoginScreen';
import SignUpScreen from './screens/SignUpScreen';

const Stack = createNativeStackNavigator();

export default function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home'>
        {/* Screens */}
        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen 
          name="UserSettings" 
          component={UserSettingsScreen}
          options={{ 
            title: 'User Settings' 
          }}
        />
        <Stack.Screen 
          name="Travels" 
          component={TravelsScreen}
          options={{ 
            title: 'Travels' 
          }}
        />
         <Stack.Screen 
          name="Itenary" 
          component={ItenaryScreen}
          options={{ 
            title: 'Itenary' 
          }}
        />
        <Stack.Screen 
          name="AddTravel" 
          component={AddTravelScreen}
          options={{ 
            title: 'Add Travel' 
          }}
        />
        <Stack.Screen 
          name="AddActivity" 
          component={AddActivityScreen}
          options={{ 
            title: 'Add Activity' 
          }}
        />
        <Stack.Screen 
          name="Login" 
          component={LoginScreen}
          options={{ 
            title: 'Login' 
          }}
        />
        <Stack.Screen 
          name="SignUp" 
          component={SignUpScreen}
          options={{ 
            title: 'Sign Up' 
          }}
        />
      </Stack.Navigator>
      {Platform.OS === "ios" && <StatusBar barStyle="default" />}
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
