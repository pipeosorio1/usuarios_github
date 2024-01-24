import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Header } from 'components';
import { pages } from 'constantes';
import Home from 'pages/Home';
import User from 'pages/User';


function StackNavigator() {
  const Stack = createNativeStackNavigator();

  const options = { back: true };

  return (
    <Stack.Navigator
      initialRouteName={pages.HOME}
      screenOptions={{ header: Header }}
    >
      <Stack.Screen
        name={pages.HOME}
        component={Home}
      />
      <Stack.Screen
        name={pages.USER}
        component={User}
        options={options}
      />
    </Stack.Navigator>
  );
}

export default StackNavigator;
