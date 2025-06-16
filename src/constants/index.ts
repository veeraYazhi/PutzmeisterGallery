export const API = {
  FLICKR: {
    PUBLIC_FEED_URL: 'https://api.flickr.com/services/feeds/photos_public.gne',
    FORMAT: 'json',
    NO_JSON_CALLBACK: 1,
  },
} as const;

export const IMAGES = {
  placeholder: 'https://via.placeholder.com/300',
  error: 'https://via.placeholder.com/300?text=Error'
} as const;