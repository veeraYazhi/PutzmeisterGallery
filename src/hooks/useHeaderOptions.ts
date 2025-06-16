import { useLayoutEffect } from 'react';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { theme } from '../theme/index';

export interface HeaderOptions {
  title?: string;
  navigation: NativeStackNavigationProp<any>;
  photoTitle?: string;
}

export const useHeaderOptions = ({ title, navigation, photoTitle }: HeaderOptions) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      title: photoTitle || title,
      headerStyle: {
        backgroundColor: theme.colors.primary,
      },
      headerTintColor: theme.colors.text,
      headerTitleStyle: {
        fontWeight: 'bold',
      },
      headerTitleAlign: photoTitle ? undefined : 'center',
    });
  }, [navigation, photoTitle]);
};
