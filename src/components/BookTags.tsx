import { useState } from 'react';
import {
  Badge,
  Button,
  Flex,
  Space,
  TextInput,
} from '@mantine/core';

import type { Book } from '../interfaces/Book';
import { updateBookTags } from '../services/api';

export default function BookTags({ book } : { book: Book }) {
  const [tags, setTags] = useState<string[]>(book.tags);
  const [tagInput, setTagInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error>();

  async function addTag(bookId: string, tag?: string | null) {
    if (!tag) return;
    if (loading) return;
    
    const cleanTag = tag.trim().toLowerCase();
    
    if (!cleanTag) return;
    if (!/^[a-z\s-]+$/.test(cleanTag)) {
      // allow letters, spaces, and hyphens only
      setError(new Error('Tags can only contain letters'));
      return;
    }
    if (tags.includes(cleanTag)) {
      setError(new Error('Tag already exists'));
      return;
    }
    
    try {
      setLoading(true);
      const newTags = [...tags, cleanTag];
      await updateBookTags(bookId, newTags);
      setTags(newTags);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) return <div>Loading data...</div>;

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          addTag(book.id, tagInput);
          setTagInput('');
        }}
      >
        <Flex align="center" gap="sm">
          <TextInput
            name="tag"
            flex="1"
            placeholder="Add new tag"
            value={tagInput}
            onChange={(e) => setTagInput(e.currentTarget.value)}
          />
          <Button type="submit" color="blue" variant="light">
            Add
          </Button>
        </Flex>
      </form>

      <Space h="md" />

      <Flex gap="xs">
        {tags.map((tag, index) => (
          <Badge key={index} variant="default">{tag.toUpperCase()}</Badge>
        ))}
      </Flex>

      {error && (
        <>
          <Space h="md" />
          <div>Error: {error.message}</div>
        </>
      )}
    </>
  );
}