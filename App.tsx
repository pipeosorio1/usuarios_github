import React from 'react';
import { PaperProvider, MD3LightTheme, adaptNavigationTheme, DefaultTheme } from 'react-native-paper';
import StackNavigator from 'navigate/StackNavigator';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';


function App() {
  const { LightTheme } = adaptNavigationTheme({ reactNavigationLight: DefaultTheme });

  return (
    <>
      <StatusBar />
      <SafeAreaProvider>
        <PaperProvider theme={MD3LightTheme}>
          <NavigationContainer theme={LightTheme}>
            <StackNavigator />
          </NavigationContainer>
        </PaperProvider>
      </SafeAreaProvider>
      <Toast />
    </>
  );
}

export default App;
