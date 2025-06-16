import React from 'react';
import { View, FlatList, StyleSheet, Text } from 'react-native';
import { Photo } from '../types/index';
import PhotoItem from './PhotoItem';
import { theme } from '../theme/index';

interface PhotoSectionProps {
  title: string;
  photos: Photo[];
  sectionKey?: string;
}

const PhotoSection: React.FC<PhotoSectionProps> = ({ title, photos }) => {
  const renderItem = ({ item }: { item: Photo }) => (
    <PhotoItem 
      photo={item}
    />
  );

  return (
    <View style={styles.section}>
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
      </View>
      <FlatList
        data={photos}
        renderItem={renderItem}
        keyExtractor={(item) => item?.id?.toString() || item.title || Date.now().toString() + Math.random().toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
        style={{ flexGrow: 1 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    marginBottom: 20,
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: theme.colors.primary,
  },
  title: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
  listContainer: {
    padding: 8,
    flexGrow: 1,
  },
});

export default PhotoSection;
