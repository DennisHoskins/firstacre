import {
  Flex,
  Rating as MantineRating,
  Text,
} from '@mantine/core';

import type { Book } from '../../interfaces/Book';

export default function Rating({ book } : { book: Book }) {
  return (
      <Flex align="center" gap="lg" wrap="wrap">
        <MantineRating value={book.rating} fractions={4} readOnly />
        <Text size="lg" fw={700}>
          {book.rating}
        </Text>
        <Text size="xs">
          {new Intl.NumberFormat('en-CA').format(book.ratingsCount)}{' '}
          ratings
        </Text>
      </Flex>
  );
}