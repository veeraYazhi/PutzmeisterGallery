import React from 'react';
import { TouchableOpacity, Image, Text, View, StyleSheet, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigationConfig';
import { Photo } from '../types/index';
import { IMAGES } from '../constants';
import { theme } from '../theme/index';

interface PhotoItemProps {
  photo: Photo;
  width?: number;
  height?: number;
}

const PhotoItem: React.FC<PhotoItemProps> = ({ photo, width = 150, height = 150 }) => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  Dimensions.get('window');

  const handleImageError = () => {
    console.log('Failed to load image:', photo.media.m);
  };

  return (
    <TouchableOpacity 
      style={[styles.container, { width, height }]}
      testID="photo-container"
      onPress={() => navigation.navigate('PhotoDetail', { photo })}
    >
      <Image 
        source={{ uri: photo.media.m || IMAGES.placeholder }}
        style={styles.image}
        resizeMode="cover"
        onError={handleImageError}
      />
      <View style={styles.overlay}>
        <Text style={styles.title} numberOfLines={2}>
          {photo.title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 8,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: theme.colors.background,
  },
  image: {
    width: 100,
    height: 200,
    aspectRatio: 1,
  },
  overlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 8,
  },
  title: {
    color: theme.colors.text,
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default PhotoItem;
