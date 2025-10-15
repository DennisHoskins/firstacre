// Base URL for the API server
const BASE_URL = 'http://localhost:3000';

/**
 * Fetches all books from the API with their associated author data
 * @returns Promise that resolves to an array of books
 * @throws Error if the HTTP request fails
 */
export async function fetchBooks() {
  const response = await fetch(`${BASE_URL}/books?_embed=author`);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
}

/**
 * Updates the tags array for a specific book
 * @param bookId - The ID of the book to update
 * @param tags - Array of tag strings to assign to the book
 * @returns Promise that resolves to the updated book object
 * @throws Error if the HTTP request fails
 */
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

/**
 * Updates the loan status of a specific book
 * @param bookId - The ID of the book to update
 * @param isLoaned - Boolean indicating whether the book is currently loaned out
 * @returns Promise that resolves to the updated book object
 * @throws Error if the HTTP request fails
 */
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