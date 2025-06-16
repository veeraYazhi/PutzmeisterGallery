import React from 'react';
import { useState, useEffect } from 'react';
import { View, ScrollView, StatusBar, StyleSheet } from 'react-native';
import { Loading } from '../components/Loading';
import { PhotoSectionData } from '../types/photoSection';
import { getPhotosByTags, getPublicFeed } from '../services/flickrApi';
import PhotoSection from '../components/PhotoSection';
import { theme } from '../theme/index';
import { commonStyles } from '../styles/commonStyles';

const HomeScreen: React.FC = () => {

  // State management
  const [photos, setPhotos] = useState<PhotoSectionData>(() => ({
    kitten: [],
    dog: [],
    public: []
  }));
  const [loading, setLoading] = useState(true);

  // Photo fetching logic
  const fetchPhotos = async (): Promise<void> => {
    try {
      setLoading(true);

      // Fetch photos in parallel
      const [kittenPhotos, dogPhotos, publicPhotos] = await Promise.all([
        getPhotosByTags('kitten,cat'),
        getPhotosByTags('dog,puppy'),
        getPublicFeed()
      ]);

      setPhotos({
        kitten: kittenPhotos || [],
        dog: dogPhotos || [],
        public: publicPhotos || []
      });
    } catch (err: any) {
      console.error('Error fetching photos:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPhotos();
  }, []);

  return (
    <View style={commonStyles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={theme.colors.primaryDark} />
      <View style={styles.overlay} />
      <ScrollView contentContainerStyle={commonStyles.contentContainer}>
        {loading ? (
          <Loading size="large" color={theme.colors.text} />
        ) : (
          <>
            <PhotoSection 
              title="Kittens" 
              photos={photos.kitten} 
              sectionKey="kittens"
            />
            <PhotoSection 
              title="Dogs" 
              photos={photos.dog} 
              sectionKey="dogs"
            />
            <PhotoSection 
              title="Public Feed" 
              photos={photos.public} 
              sectionKey="public"
            />
          </>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  section: {
    marginVertical: theme.spacing.medium,
  },
  sectionHeader: {
    marginBottom: theme.spacing.medium,
  },
  infoContainer: {
    padding: theme.spacing.medium,
    backgroundColor: theme.colors.background,
    marginHorizontal: theme.spacing.medium,
    marginTop: theme.spacing.medium,
  }
});

export default HomeScreen;