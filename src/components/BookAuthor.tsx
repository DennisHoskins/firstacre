import { Text } from '@mantine/core';

import type { Book } from '../interfaces/Book';

export default function BookAuthor({ book } : { book: Book }) {
  return (
      <Text size="lg">
        {book.author ? `${book.author.firstName} ${book.author.lastName}`  : `Unknown Author`}
      </Text>
  );
}