import axios from 'axios';
import { API } from '../constants/index';
import { Photo, PhotoSearchResponse } from '../types/index';

export const parsePhotos = (photoArray: any[]): Photo[] =>
  photoArray.map((photo) => ({
    id: photo.id,
    title: photo.title,
    link: photo.link,
    media: {
      m: photo.media.m
    },
    date_taken: photo.date_taken,
    description: photo.description,
    published: photo.published,
    author: photo.author,
    author_id: photo.author_id,
    tags: photo.tags
  }));

export const getPublicFeed = async (): Promise<Photo[]> => {
  try {
    const response = await axios.get(API.FLICKR.PUBLIC_FEED_URL, {
      params: {
        format: API.FLICKR.FORMAT,
        nojsoncallback: API.FLICKR.NO_JSON_CALLBACK
      }
    });
    return parsePhotos(response.data.items);
  } catch (error) {
    throw new Error('Failed to fetch public feed');
  }
};

export const getPhotosByTags = async (tags: string): Promise<Photo[]> => {
  try {
    const response = await axios.get<PhotoSearchResponse>(API.FLICKR.PUBLIC_FEED_URL, {
      params: {
        format: API.FLICKR.FORMAT,
        nojsoncallback: API.FLICKR.NO_JSON_CALLBACK,
        tags: tags,
        tagmode: 'any'
      }
    });
    if (!response.data.photos?.photo) {
      throw new Error('Invalid response format');
    }
    return parsePhotos(response.data.photos.photo);
  } catch (error) {
    throw new Error('Failed to fetch photos by tags');
  }
};
