import { AppShell } from '@mantine/core';
import BooksGrid from './components/BooksGrid';

function App() {
  return (
    <AppShell padding="md">
      <AppShell.Main bg="#eee">
        <BooksGrid />
      </AppShell.Main>
    </AppShell>
  );
}

export default App;
