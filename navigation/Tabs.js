import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeStackScreen } from '../navigation/Stacks';
import { UserProfileStackScreen } from '../navigation/Stacks';
import { AddStackScreen } from '../navigation/Stacks';

const Tab = createBottomTabNavigator();

export function HomeTabScreen() {
    return (
        <Tab.Screen
            name="Home"
            component={HomeStackScreen}
            options={{
                tabBarLabel: 'Home',
                headerShown: false
            }}
        />
    )
}

export function ProfileTabScreen( ) {
        return (
            <Tab.Screen
                name="Profile"
                component={UserProfileStackScreen}
                options={{
                    tabBarLabel: 'Profile',
                    headerShown: false,
                }}
            />
        )
}

export function AddTabScreen( ) {
    return (
        <Tab.Screen
            name="Add"
            component={AddStackScreen}
            options={{
                showLabel: false,
                headerShown: false
            }}
        />
    )
}