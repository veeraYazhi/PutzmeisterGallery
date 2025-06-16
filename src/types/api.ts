export interface PhotoMedia {
  m: string;
}

export interface Photo {
  id: string;
  title: string;
  link: string;
  media: PhotoMedia;
  date_taken: string;
  description: string;
  published: string;
  author: string;
  author_id: string;
  tags: string;
}

export interface PhotoResponse {
  items: Array<{
    title: string;
    link: string;
    media: PhotoMedia;
    date_taken: string;
    description: string;
    published: string;
    author: string;
    author_id: string;
    tags: string;
  }>;
}

export interface PhotoSearchResponse {
  stat: string;
  code?: number;
  photos: {
    page: number;
    pages: number;
    perpage: number;
    total: string;
    photo: Array<{
      id: string;
      owner: string;
      secret: string;
      server: string;
      farm: number;
      title: string;
      ispublic: number;
      isfriend: number;
      isfamily: number;
      dateupload: string;
      date_taken: string;
      description: string;
      published: string;
      author: string;
      author_id: string;
      tags: string;
      media: PhotoMedia;
    }>;
  };
}

export interface PublicFeedResponse {
  items: Array<{
    title: string;
    link: string;
    media: PhotoMedia;
    date_taken: string;
    description: string;
    published: string;
    author: string;
    author_id: string;
    tags: string;
  }>;
}
