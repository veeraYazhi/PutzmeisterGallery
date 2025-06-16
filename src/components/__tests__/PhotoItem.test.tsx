import React from 'react';
import { render } from '@testing-library/react-native';
import PhotoSection from '../PhotoSection';
import { Photo } from 'types/flickr';

const mockPhotos: Photo[] = [
  {
    title: 'Test Photo 1',
    link: 'https://flickr.com/photo1',
    media: { m: 'https://via.placeholder.com/150' },
    author: 'Author 1',
    author_id: '1',
    published: '2024-06-01T10:00:00Z',
    date_taken: '2024-06-01T09:00:00Z',
    tags: 'test',
    description: '',
  },
  {
    title: 'Test Photo 2',
    link: 'https://flickr.com/photo2',
    media: { m: 'https://via.placeholder.com/150' },
    author: 'Author 2',
    author_id: '2',
    published: '2024-06-02T10:00:00Z',
    date_taken: '2024-06-02T09:00:00Z',
    tags: 'demo',
    description: '',
  },
];

describe('PhotoSection', () => {
  it('renders section title', () => {
    const { getByText } = render(
      <PhotoSection title="Test Section" photos={mockPhotos} />
    );

    expect(getByText('Test Section')).toBeTruthy();
  });

  it('renders all photo items', () => {
    const { getAllByTestId } = render(
      <PhotoSection title="Gallery" photos={mockPhotos} />
    );

    // Ensure PhotoItem is rendered for each photo
    const photoItems = getAllByTestId('photo-container');
    expect(photoItems.length).toBe(mockPhotos.length);
  });

  it('renders empty state with no photos', () => {
    const { queryAllByTestId } = render(
      <PhotoSection title="Empty Gallery" photos={[]} />
    );

    const photoItems = queryAllByTestId('photo-container');
    expect(photoItems.length).toBe(0);
  });
});
