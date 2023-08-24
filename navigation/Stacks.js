import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen'
import UserProfileScreen from '../screens/UserProfileScreen';
import TravelsScreen from '../screens/TravelsScreen';
import ItenaryScreen from '../screens/ItenaryScreen';
import AddTravelScreen from '../screens/AddTravelScreen';
import AddActivityScreen from '../screens/AddActivityScreen';
import LoginScreen from '../screens/LoginScreen';
import SignUpScreen from '../screens/SignUpScreen';

const Stack = createNativeStackNavigator();

//**Main Stacks with Navigator */
export function HomeStackScreen() {
  return (
      <Stack.Navigator>
        {/* Screens */}
        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{
            title: "Home"
          }}
        />
        {travelStackScreen()}
        {ItenaryStackScreen()}
        {AddTravelStackScreen()}
        {AddActivityStackScreen()}
        {SignUpStackScreen()}

        </Stack.Navigator>
  );
}


export function UserProfileStackScreen() {
  return(
      <Stack.Navigator>
        <Stack.Screen 
          name="ProfileSettings" 
          component={UserProfileScreen}
          options={{ 
            title: "Profile Settings"
          }}
        />
      </Stack.Navigator>
  );
}

export function LoginStackScreen() {
  return(
    <Stack.Navigator>
      <Stack.Screen 
        name="Login" 
        component={LoginScreen}
        options={{ 
          title: 'Login' 
        }}
      />
    </Stack.Navigator>
  );
}


//**Reusable stack components */

export function travelStackScreen() {
  return(
        <Stack.Screen 
          name="Travels" 
          component={TravelsScreen}
          options={{ 
            title: 'Travels' 
          }}
        />
  );
}

export function ItenaryStackScreen() {
  return(
    <Stack.Screen 
      name="Itenary" 
      component={ItenaryScreen}
      options={{ 
        title: 'Itenary' 
      }}
    />
  );
}

export function AddTravelStackScreen() {
  return(
    <Stack.Screen 
      name="AddTravel" 
      component={AddTravelScreen}
      options={{ 
        title: 'Add Travel' 
      }}
    />
  );
}

export function AddActivityStackScreen() {
  return(
    <Stack.Screen 
      name="AddActivity" 
      component={AddActivityScreen}
      options={{ 
        title: 'Add Activity' 
      }}
    />
  );
}

export function SignUpStackScreen() {
  return(
    <Stack.Screen 
      name="SignUp" 
      component={SignUpScreen}
      options={{ 
        title: 'Sign Up' 
      }}
    />
  );
}


