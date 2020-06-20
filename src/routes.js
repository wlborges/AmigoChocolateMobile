import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const AppStack = createStackNavigator();

import Login from './pages/login';
import Grupos from './pages/grupos';
import Detalhes from './pages/detalhes';

export default function Routes(){
    return(
        <NavigationContainer>
            <AppStack.Navigator screenOptions={{ headerShown: false}}>
                <AppStack.Screen name="Login" component={Login} />
                <AppStack.Screen name="Grupos" component={Grupos} />
                <AppStack.Screen name="Detalhes" component={Detalhes} />
            </AppStack.Navigator>
        </NavigationContainer>
    );
}