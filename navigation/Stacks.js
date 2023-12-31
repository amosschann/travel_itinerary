import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen'
import UserProfileScreen from '../screens/UserProfileScreen';
import TravelsScreen from '../screens/TravelsScreen';
import ItineraryScreen from '../screens/ItineraryScreen';
import AddScreen from '../screens/AddScreen';
import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';


//**Main Stacks with Navigator */
export function HomeStackScreen() {
  const HomeStack = createNativeStackNavigator();
  return (
      <HomeStack.Navigator>
        {/* Screens */}
        <HomeStack.Screen 
          name="HomeScreen" 
          component={HomeScreen} 
          options={{
            title: "Home"
          }}
        />
        {travelStackScreen()}
        {itineraryStackScreen()}

        </HomeStack.Navigator>
  );
}


export function UserProfileStackScreen() {
  const ProfileStack = createNativeStackNavigator();
  return(
      <ProfileStack.Navigator>
        <ProfileStack.Screen 
          name="ProfileSettingsScreen" 
          component={UserProfileScreen}
          options={{ 
            title: "Profile Settings"
          }}
        />
      </ProfileStack.Navigator>
  );
}

export function AddStackScreen() {
  const AddStack = createNativeStackNavigator();
  return(
    <AddStack.Navigator>
      <AddStack.Screen 
        name="AddScreen" 
        component={AddScreen}
        options={{ 
          title: 'Add Travels' 
        }}
      />
      {travelStackScreen()}
    </AddStack.Navigator>
  );
}

export function SignInStackScreen() {
  const SignInStack = createNativeStackNavigator();
  return(
    <SignInStack.Navigator>
      <SignInStack.Screen 
        name="SignInScreen" 
        component={SignInScreen}
        options={{ 
          title: 'Sign In'
        }}
      />
      {SignUpStackScreen()}
    </SignInStack.Navigator>
  );
}


//**Reusable stack components */

export function travelStackScreen() {
  const TravelStack = createNativeStackNavigator();
  return(
        <TravelStack.Screen 
          name="TravelsScreen" 
          component={TravelsScreen}
          options={{ 
            title: 'Travels' 
          }}
        />
  );
}

export function itineraryStackScreen() {
  const itineraryStack = createNativeStackNavigator();
  return(
    <itineraryStack.Screen 
      name="ItineraryScreen" 
      component={ItineraryScreen}
      options={{ 
        title: 'Itinerary' 
      }}
    />
  );
}

export function SignUpStackScreen() {
  const SignUpStack = createNativeStackNavigator();
  return(
    <SignUpStack.Screen 
      name="SignUpScreen" 
      component={SignUpScreen}
      options={{ 
        title: 'Sign Up' 
      }}
    />
  );
}




