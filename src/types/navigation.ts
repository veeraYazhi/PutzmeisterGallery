import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { Photo } from './api';
import { RootStackParamList } from './navigationConfig';

export type PhotoDetailScreenProps = {
  route: RouteProp<RootStackParamList, 'PhotoDetail'>;
};

export type HomeScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Home'>;
};
