import React from 'react';
import { Image, View, StyleSheet, Text, ScrollView, StatusBar, Platform } from 'react-native';
import { useRoute, RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../types/navigationConfig';
import { formatDate } from '../utils/dateUtils';
import { IMAGES } from '../constants';
import { theme } from '../theme/index';
import { commonStyles } from '../styles/commonStyles';


const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  contentWrapper: {
    marginHorizontal: theme.spacing.medium,
    marginVertical: theme.spacing.medium,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold' as const,
    marginBottom: theme.spacing.small,
    color: theme.colors.text,
  },
  date: {
    fontSize: 14,
    color: theme.colors.text,
    marginBottom: theme.spacing.small,
  },
  tags: {
    fontSize: 14,
    color: theme.colors.text,
  }
});

const PhotoDetailScreen: React.FC = () => {
  const route = useRoute<RouteProp<RootStackParamList, 'PhotoDetail'>>();
  const photo = route.params?.photo;

  if (!photo) {
    return null;
  }

  const renderPhotoDetails = () => (
    <View style={styles.contentWrapper}>
      <Text style={styles.title}>{photo.title}</Text>
      <Text style={styles.date}>{formatDate(new Date(photo.published))}</Text>
      <Text style={styles.tags}>{photo.tags}</Text>
    </View>
  );

  return (
    <View style={commonStyles.container}>
      <StatusBar barStyle="light-content" backgroundColor={theme.colors.primaryDark} />
      <View style={styles.overlay} />
      <ScrollView contentContainerStyle={commonStyles.contentContainer}>
        <View style={commonStyles.imageContainer}>
          <Image 
            source={{ uri: photo.media.m || IMAGES.placeholder }}
            style={commonStyles.image}
            resizeMode="cover"
          />
        </View>
        {renderPhotoDetails()}
      </ScrollView>
    </View>
  );
};

export default PhotoDetailScreen;
