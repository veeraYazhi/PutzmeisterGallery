import React from 'react';
import { render } from '@testing-library/react-native';
import PhotoDetailScreen from '../PhotoDetailScreen';
import { useRoute } from '@react-navigation/native';

jest.mock('@react-navigation/native', () => ({
  useRoute: jest.fn(),
}));

jest.mock('../../../utils/dateUtils', () => ({
  formatDate: (date: string) => `Formatted(${date})`,
}));

const mockPhoto = {
  title: 'Mock Photo Title',
  media: { m: 'https://mockurl.com/image.jpg' },
  link: 'https://mockurl.com',
  author: 'Mock Author',
  author_id: '12345',
  published: '2024-06-15T12:00:00Z',
  date_taken: '2024-06-14T10:00:00Z',
  tags: 'mock,test',
  description: '',
};

describe('PhotoDetailScreen', () => {
  beforeEach(() => {
    (useRoute as jest.Mock).mockReturnValue({
      params: { photo: mockPhoto },
    });
  });

  it('renders photo details correctly', () => {
    const { getByText, getByRole } = render(<PhotoDetailScreen />);

    expect(getByText('Mock Photo Title')).toBeTruthy();
    expect(getByText('Formatted(2024-06-15T12:00:00Z)')).toBeTruthy();
    expect(getByText('mock,test')).toBeTruthy();
    expect(getByRole('image')).toBeTruthy();
  });

  it('returns null if no photo is passed', () => {
    (useRoute as jest.Mock).mockReturnValueOnce({ params: {} });

    const { toJSON } = render(<PhotoDetailScreen />);
    expect(toJSON()).toBeNull();
  });
});
