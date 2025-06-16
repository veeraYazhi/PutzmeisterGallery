import React from 'react';
import { render, waitFor, fireEvent } from '@testing-library/react-native';
import HomeScreen from '../HomeScreen';
import { flickrApi } from '../../services/flickrApi';

// Mock navigation
jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({ navigate: jest.fn() }),
}));

// Mock API methods
jest.mock('../../../services/flickrApi', () => ({
  flickrApi: {
    getPhotosByTags: jest.fn(),
    getPublicFeed: jest.fn(),
  },
}));

const mockPhotos = [
  {
    title: 'Cute Photo',
    media: { m: 'https://test.com/cute.jpg' },
    link: 'https://flickr.com/photo/1',
    author: 'author',
    author_id: '123', 
    published: '',
    date_taken: '',
    tags: '',
    description: '',
  },
];

describe('HomeScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('shows loader while fetching', async () => {
    (flickrApi.getPhotosByTags as jest.Mock).mockResolvedValueOnce([]);
    (flickrApi.getPhotosByTags as jest.Mock).mockResolvedValueOnce([]);
    (flickrApi.getPublicFeed as jest.Mock).mockResolvedValueOnce([]);

    const { getByTestId, queryByText } = render(<HomeScreen />);

    expect(queryByText('Kittens')).toBeNull(); // sections not visible yet
    expect(getByTestId('ActivityIndicator')).toBeTruthy();

    await waitFor(() => expect(queryByText('Kittens')).toBeTruthy());
  });

  it('renders photo sections when data is loaded', async () => {
    (flickrApi.getPhotosByTags as jest.Mock).mockResolvedValue(mockPhotos);
    (flickrApi.getPublicFeed as jest.Mock).mockResolvedValue(mockPhotos);

    const { getByText } = render(<HomeScreen />);

    await waitFor(() => {
      expect(getByText('Kittens')).toBeTruthy();
      expect(getByText('Dogs')).toBeTruthy();
      expect(getByText('Public Feed')).toBeTruthy();
    });
  });

  it('shows error and allows retry on failure', async () => {
    (flickrApi.getPhotosByTags as jest.Mock).mockRejectedValue(new Error('Network Error'));
    (flickrApi.getPublicFeed as jest.Mock).mockRejectedValue(new Error('Network Error'));

    const { getByText, queryByText } = render(<HomeScreen />);

    await waitFor(() => {
      expect(getByText('Network Error')).toBeTruthy();
      expect(getByText('Tap to retry')).toBeTruthy();
    });

    (flickrApi.getPhotosByTags as jest.Mock).mockResolvedValue(mockPhotos);
    (flickrApi.getPublicFeed as jest.Mock).mockResolvedValue(mockPhotos);

    fireEvent.press(getByText('Tap to retry'));

    await waitFor(() => {
      expect(queryByText('Kittens')).toBeTruthy();
    });
  });
});
