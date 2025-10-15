const BASE_URL = 'http://localhost:3000';

export async function fetchBooks() {
  const response = await fetch(`${BASE_URL}/books?_embed=author`);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
}

export async function updateBookTags(bookId: string, tags: string[]) {
  const response = await fetch(`${BASE_URL}/books/${bookId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ tags }),
  });
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
}

export async function updateBookLoanStatus(bookId: string, isLoaned: boolean) {
  const response = await fetch(`${BASE_URL}/books/${bookId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ isLoaned }),
  });
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
}