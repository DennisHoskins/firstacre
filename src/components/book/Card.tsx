import {
  Card as MantineCard,
  Flex,
  Space,
  Text,
  Title,
} from '@mantine/core';

import type { Book } from '../../interfaces/Book';
import Author from './Author';
import Rating from './Rating';
import Details from './Details';
import Tags from './Tags';
import Loan from './Loan';

export default function Card({ book } : { book: Book }) {
  return (
    <MantineCard shadow="sm" padding="lg" radius="md" withBorder>
      <Title size="h1">{book.title}</Title>
      <Author book={book} />
      <Rating book={book} />
      <Space h="md" />
      <Text>{book.description}</Text>
      <Space h="md" />
      <Flex direction="column" mt="auto">
        <Details book={book} />
        <Space h="md" />
        <Tags book={book} />
        <Space h="md" />
        <Loan book={book} />
      </Flex>
    </MantineCard>
  );
}