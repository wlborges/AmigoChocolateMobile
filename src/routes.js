import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const AppStack = createStackNavigator();

import Login from './pages/login';
import Register from './pages/register';
import Grupos from './pages/grupos';
import Detalhes from './pages/detalhes';
import NewGrupo from './pages/newgrupo';

export default function Routes(){
    return(
        <NavigationContainer>
            <AppStack.Navigator screenOptions={{ headerShown: false}}>
                <AppStack.Screen name="Login" component={Login} />
                <AppStack.Screen name="Register" component={Register} />
                <AppStack.Screen name="Grupos" component={Grupos} />
                <AppStack.Screen name="NewGrupo" component={NewGrupo} />
                <AppStack.Screen name="Detalhes" component={Detalhes} />
            </AppStack.Navigator>
        </NavigationContainer>
    );
}