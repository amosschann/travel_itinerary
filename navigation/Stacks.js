import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen'
import UserProfileScreen from '../screens/UserProfileScreen';
import TravelsScreen from '../screens/TravelsScreen';
import ItenaryScreen from '../screens/ItenaryScreen';
import AddScreen from '../screens/AddScreen';
import LoginScreen from '../screens/LoginScreen';
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
        {ItenaryStackScreen()}
        {SignUpStackScreen()}

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

export function LoginStackScreen() {
  const LoginStack = createNativeStackNavigator();
  return(
    <LoginStack.Navigator>
      <LoginStack.Screen 
        name="LoginScreen" 
        component={LoginScreen}
        options={{ 
          title: 'Login' 
        }}
      />
    </LoginStack.Navigator>
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
          title: 'Add' 
        }}
      />
    </AddStack.Navigator>
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

export function ItenaryStackScreen() {
  const ItenaryStack = createNativeStackNavigator();
  return(
    <ItenaryStack.Screen 
      name="ItenaryScreen" 
      component={ItenaryScreen}
      options={{ 
        title: 'Itenary' 
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


