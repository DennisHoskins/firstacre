import { useEffect, useState } from 'react';
import {SimpleGrid } from '@mantine/core';

import type { Book } from '../interfaces/Book';
import { fetchBooks } from '../services/api';
import Card from './book/Card';

export default function BooksGrid() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setError(null);
        setLoading(true);
        const result = await fetchBooks();
        setBooks(result);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading data...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <SimpleGrid cols={{base: 1, md: 2}}>
      {books && books.map((book, index) => (
        <Card key={index} book={book} />
      ))}
    </SimpleGrid>
  );
}