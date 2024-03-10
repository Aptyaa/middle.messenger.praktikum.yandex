// import express from 'express'

// const PORT = 3000
// const app = express()
// app.use(express.static('./dist'))

// app.listen(PORT, () => {
//   console.log(`Server works on ${PORT}`)
// })

import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const PORT = 3000;

const filename = fileURLToPath(import.meta.url);

const dirname = path.dirname(filename);

app.use(express.static(path.join(dirname, 'dist')));

app.get('/*', (req, res) => {
  res.sendFile('index.html', { root: path.join(dirname, 'dist') });
});

app.listen(PORT, function () {
  console.log(`Сервер запущен на ${PORT} порте`);
});
