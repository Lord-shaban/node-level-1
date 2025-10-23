const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 3000;

// منع التخزين المؤقت (Cache) للتطوير
app.use((req, res, next) => {
  res.set('Cache-Control', 'no-store, no-cache, must-revalidate, private');
  next();
});

app.get('/home', (req, res) => {
  res.sendFile('./views/home.html', { root: __dirname });
});
app.get('/test', (req, res) => {
  res.send('Test Page');
});

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});

mongoose.connect('mongodb+srv://dearahmed65_db_user:SVE0jlafRQSNyhLR@cluster0.whuf9d6.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0').then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.log(err);
});
