import { PORT } from './global';
import { createServer } from 'node:http';

const server = createServer((req, res) => {
  res.end();
});

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
