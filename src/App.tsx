import { AppShell } from '@mantine/core';
import Books from './components/Books';

function App() {
  return (
    <AppShell padding="md">
      <AppShell.Main bg="#eee">
        <Books />
      </AppShell.Main>
    </AppShell>
  );
}

export default App;
