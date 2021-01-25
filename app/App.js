import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Board from "./src/screen/board"
import Home from './src/screen/Home'
import FinishPage from './src/screen/finish'
import {Provider} from 'react-redux'
import store from './redux/store';

export default function App() {
  const Stack = createStackNavigator();

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen 
            name="Home" 
            component={Home} 
            options={{
            title: 'SUGOKU', 
            headerStyle: {
              backgroundColor : "#292b2c",
              },
            headerTintColor: 'white',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
            headerTitleAlign: 'center'
            }} 
          />
          <Stack.Screen name="Game" component={Board} />
          <Stack.Screen name="Finish" component={FinishPage} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
