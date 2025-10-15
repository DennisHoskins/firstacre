import type { Author } from './Author';

export interface Book {
  id: string;
  authorId: string;
  title: string;
  rating: number;
  ratingsCount: number;
  reviewsCount: number;
  pageCount: number;
  format: string;
  firstPublished: string;
  description: string;
  tags: string[];
  isLoaned: boolean;
  author?: Author;
}
