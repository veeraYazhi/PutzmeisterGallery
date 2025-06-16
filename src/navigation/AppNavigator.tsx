import React from 'react';
import { createNativeStackNavigator, NativeStackNavigationOptions } from '@react-navigation/native-stack';
import { ROUTES } from '../constants/routes';
import HomeScreen from '../screens/HomeScreen';
import PhotoDetailScreen from '../screens/PhotoDetailScreen';

const Stack = createNativeStackNavigator();

const navigationConfig: NativeStackNavigationOptions = {
  headerStyle: {
    backgroundColor: '#4CAF50',
  },
  animation: 'slide_from_right',
  headerTintColor: '#fff',
  headerTitleAlign: 'center',
  headerTitleStyle: {
    fontWeight: 'bold' as const,
  },
};

const AppNavigator: React.FC = () => {
  return (
    <Stack.Navigator screenOptions={navigationConfig}>
      <Stack.Screen 
        name={ROUTES.HOME} 
        component={HomeScreen}
        options={{
          title: 'Putzmeister Gallery App',
        }}
      />
       <Stack.Screen
        name={ROUTES.PHOTO_DETAIL} 
        component={PhotoDetailScreen}
        options={{
          title: 'Photo Details',
        }}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;
