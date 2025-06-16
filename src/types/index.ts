export * from './api';
export * from './navigation';
export * from './photoSection';
export * from './errors';

export type PublicFeedResponse = {
  items: Array<{
    title: string;
    link: string;
    media: {
      m: string;
    };
    date_taken: string;
    description: string;
    published: string;
    author: string;
    author_id: string;
    tags: string;
  }>;
};