const express = require('express');
const app = express();
const port = 3000;

// منع التخزين المؤقت (Cache) للتطوير
app.use((req, res, next) => {
  res.set('Cache-Control', 'no-store, no-cache, must-revalidate, private');
  next();
});

app.get('/', (req, res) => {
  res.sendFile('./views/home.html', { root: __dirname });
});

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
