import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Entry from './Entry';
import Home from './Home';

const Stack = createStackNavigator();

export default class App extends React.Component {

    render() {
        return (
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen
                        name="Home"
                        component={Home}
                    />
                    <Stack.Screen
                        name="Entry"
                        component={Entry}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        );
    }
}
