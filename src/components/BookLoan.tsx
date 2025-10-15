import { useState } from 'react';
import { Button } from '@mantine/core';

import type { Book } from '../interfaces/Book';
import { updateBookLoanStatus } from '../services/api';

export default function BookLoan({ book } : { book: Book }) {
  const [isLoaned, setIsLoaned] = useState(book.isLoaned);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error>();

  async function setBookLoaned(bookId: string, status: boolean) {
    if (loading) return;
    try {
      setLoading(true);
      await updateBookLoanStatus(bookId, status);
      setIsLoaned(status);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }

  if (error) return <div>Error: {error.message}</div>;

  return (
    <Button
      variant="light"
      radius="xl"
      size="md"
      pr={14}
      h={48}
      mt="auto"
      color={isLoaned ? 'grey' : 'blue'}
      disabled={loading}
      onClick={() => setBookLoaned(book.id, !isLoaned)}
    >
      {isLoaned ? 'Return' : 'Loan'} Book
    </Button>
  );
}