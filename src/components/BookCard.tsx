import {
  Card,
  Flex,
  Space,
  Text,
  Title,
} from '@mantine/core';

import type { Book } from '../interfaces/Book';
import BookAuthor from './BookAuthor';
import BookRating from './BookRating';
import BookDetails from './BookDetails';
import BookTags from './BookTags';
import BookLoan from './BookLoan';

export default function BookCard({ book } : { book: Book }) {
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Title size="h1">{book.title}</Title>
      <BookAuthor book={book} />
      <BookRating book={book} />
      <Space h="md" />
      <Text>{book.description}</Text>
      <Space h="md" />
      <Flex direction="column" mt="auto">
        <BookDetails book={book} />
        <Space h="md" />
        <BookTags book={book} />
        <Space h="md" />
        <BookLoan book={book} />
      </Flex>
    </Card>
  );
}