/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from 'src/screens/login';
import RegisterScreen from 'src/screens/register';
import SplashScreen from 'src/screens/splash';
import CompleteRegistrationScreen from 'src/screens/complete-registration';
import HomeScreen from 'src/screens/home';
import ErrorScreen from 'src/screens/error';
import AuthContextProvider from 'src/contexts/auth';
import ThemeProvider from 'src/contexts/theme';

export type RootStackParamList = {
  Register: undefined;
  Login: undefined;
  Loading: undefined;
  Home: undefined;
  Splash: undefined;
  CompleteRegistration: undefined;
  Error: undefined;
};

const App = () => {
  const Stack = createNativeStackNavigator<RootStackParamList>();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [state, setState] = useState<any>(null);

  return (
    <ThemeProvider>
      <NavigationContainer onStateChange={navigationState => setState(navigationState)}>
        <AuthContextProvider navigationState={state}>
          <Stack.Navigator
            initialRouteName="Splash"
            screenOptions={{
              headerTintColor: 'black',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
              headerTransparent: true,
              headerShadowVisible: false,
              headerTitleAlign: 'center',
            }}>
            <Stack.Screen
              name="Register"
              component={RegisterScreen}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="Splash"
              component={SplashScreen}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="CompleteRegistration"
              component={CompleteRegistrationScreen}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="Error"
              component={ErrorScreen}
              options={{
                headerShown: false,
              }}
            />
          </Stack.Navigator>
        </AuthContextProvider>
      </NavigationContainer>
    </ThemeProvider>
  );
};

export default App;
