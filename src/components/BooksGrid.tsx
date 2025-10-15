import { useCallback, useEffect, useState } from 'react';
import {SimpleGrid } from '@mantine/core';

import type { Book } from '../interfaces/Book';
import { fetchBooks } from '../services/api';
import BookCard from './BookCard';

export default function BooksGrid() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error>();

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const result = await fetchBooks();
      setBooks(result);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (loading) return <div>Loading data...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <SimpleGrid cols={{base: 1, md: 2}}>
      {books.map((book, index) => {
        return (
          <BookCard key={index} book={book} />
        );
      })}
    </SimpleGrid>
  );
}