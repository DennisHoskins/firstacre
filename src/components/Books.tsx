import { useEffect, useState } from 'react';
import {
  Badge,
  Button,
  Card,
  Flex,
  Rating,
  SimpleGrid,
  Space,
  Text,
  TextInput,
  Title,
} from '@mantine/core';

interface Book {
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

interface Author {
  id: string;
  firstName: string;
  lastName: string;
  averageRating: number;
  website: string;
}

export function Books() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error>();

  async function fetchData() {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:3000/books?_embed=author');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      setBooks(result);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }

  async function setBookLoaned(bookId: string, status: boolean) {
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:3000/books/${bookId}`, {
        method: 'PATCH',
        body: JSON.stringify({
          isLoaned: status,
        }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      await response.json();
      fetchData();
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }

  async function addTag(bookId: string, tag: string) {
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:3000/books/${bookId}`, {
        method: 'PATCH',
        body: JSON.stringify({
          tags: [tag],
        }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      await response.json();
      fetchData();
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) return <div>Loading data...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <SimpleGrid cols={2}>
      {books.map((book) => {
        return (
          <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Title size="h1">{book.title}</Title>
            <Text size="lg">
              {book.author.firstName} {book.author.lastName}
            </Text>

            <Flex align="center" gap="lg" wrap="wrap">
              <Rating value={book.rating} fractions={4} readOnly />
              <Text size="lg" fw={700}>
                {book.rating}
              </Text>
              <Text size="xs">
                {new Intl.NumberFormat('en-CA').format(book.ratingsCount)}{' '}
                ratings
              </Text>
            </Flex>

            <Space h="md" />

            <Text>{book.description}</Text>

            <Space h="md" />

            <Flex direction="column" mt="auto">
              <Text size="xs" c="dimmed">
                {book.pageCount} Pages
              </Text>
              <Text size="xs" c="dimmed">
                First published{' '}
                {new Intl.DateTimeFormat('en-CA', {
                  dateStyle: 'long',
                }).format(new Date(book.firstPublished))}
              </Text>

              <Space h="md" />

              <form
                id={`form-${book.id}`}
                onSubmit={(e) => {
                  e.preventDefault();
                  const form = document.getElementById(`form-${book.id}`);
                  const formData = new FormData(form);
                  addTag(book.id, formData.get('tag'));
                }}
              >
                <Flex align="center" gap="sm">
                  <TextInput
                    name="tag"
                    flex="1"
                    placeholder="Add new tag"
                  ></TextInput>
                  <Button type="submit" color="blue" variant="light">
                    Add
                  </Button>
                </Flex>
              </form>

              <Space h="md" />

              <Flex gap="xs">
                {book.tags.map((tag) => (
                  <Badge variant="default">{tag.toUpperCase()}</Badge>
                ))}
              </Flex>

              <Space h="md" />

              <Button
                variant="light"
                radius="xl"
                size="md"
                pr={14}
                h={48}
                mt="auto"
                color={book.isLoaned ? 'grey' : 'blue'}
                onClick={() => setBookLoaned(book.id, !book.isLoaned)}
              >
                {book.isLoaned ? 'Return' : 'Loan'} Book
              </Button>
            </Flex>
          </Card>
        );
      })}
    </SimpleGrid>
  );
}

export default Books;
