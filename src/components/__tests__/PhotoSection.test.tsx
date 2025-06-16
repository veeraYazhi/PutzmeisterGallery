import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react-native';
import PhotoSection from '../PhotoSection';
import { Photo } from '../../types/flickr';
import { NavigationContainer } from '@react-navigation/native';

const mockPhotos: Photo[] = [
  {
    title: 'Photo 1',
    link: 'https://example.com/photo1.jpg',
    media: { m: 'https://example.com/photo1.jpg' },
    date_taken: '2024-01-01',
    published: '2024-01-01',
    author: 'Author 1',
    author_id: '1',
    tags: 'tag1',
    description: ''
  },
  {
    title: 'Photo 2',
    link: 'https://example.com/photo2.jpg',
    media: { m: 'https://example.com/photo2.jpg' },
    date_taken: '2024-01-02',
    published: '2024-01-02',
    author: 'Author 2',
    author_id: '2',
    tags: 'tag2',
    description: ''
  },
];

describe('PhotoSection', () => {
  it('renders section title correctly', () => {
    render(
      <NavigationContainer>
        <PhotoSection title="Test Section" photos={mockPhotos} />
      </NavigationContainer>
    );

    expect(screen.getByText('Test Section')).toBeTruthy();
  });

  it('renders all photos in the list', () => {
    render(
      <NavigationContainer>
        <PhotoSection title="Test Section" photos={mockPhotos} />
      </NavigationContainer>
    );

    expect(screen.getAllByTestId('photo-item')).toHaveLength(2);
  });

  it('renders empty section when no photos', () => {
    render(
      <NavigationContainer>
        <PhotoSection title="Empty Section" photos={[]} />
      </NavigationContainer>
    );

    expect(screen.queryByTestId('photo-item')).toBeNull();
  });

  it('scrolls horizontally', () => {
    render(
      <NavigationContainer>
        <PhotoSection title="Test Section" photos={mockPhotos} />
      </NavigationContainer>
    );

    const flatList = screen.getByTestId('photo-list');
    fireEvent(flatList, 'scroll', { nativeEvent: { contentOffset: { x: 100 } } });
  });
});
