import {Text } from '@mantine/core';

import type { Book } from '../interfaces/Book';

export default function BookDetails({ book } : { book: Book }) {
  return (
    <>
      <Text size="xs" c="dimmed">
        {book.pageCount} Pages
      </Text>
      <Text size="xs" c="dimmed">
        First published{' '}
        {new Intl.DateTimeFormat('en-CA', {
          dateStyle: 'long',
        }).format(new Date(book.firstPublished))}
      </Text>
    </>
  );
}