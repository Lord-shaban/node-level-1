const express = require('express');
const mongoose = require('mongoose');
const postModel = require('./models/post');
const app = express();
const port = 3000;
app.use(express.json());

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});


mongoose.connect('mongodb+srv://dearahmed65_db_user:SVE0jlafRQSNyhLR@cluster0.whuf9d6.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0').then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.log(err);
});


// منع التخزين المؤقت (Cache) للتطوير
app.use((req, res, next) => {
  res.set('Cache-Control', 'no-store, no-cache, must-revalidate, private');
  next();
});

app.get('/home', (req, res) => {
  res.sendFile('./views/home.html', { root: __dirname });
});
app.get('/test', (req, res) => {
    let num="";
    for(let i=0 ; i <= 100 ; i++){
        num += i + " "
    }
  res.send(`${num}`);
});

app.post("/add",(req,res)=>{
//   res.send(`${req.body.name} hello yor are ${req.query.age} years old`);
res.json({
    name: req.body.name,
    age: req.query.age
})
});

app.get('/sum/:num1/:num2', (req,res) => {
const num1 = req.params.num1;
const num2 = req.params.num2;
const sum = Number(num1) + Number(num2);
    res.send(`the sum is ${sum} `);
});

app.post('/posts', async (req, res) => {
    const newPost = new postModel();

    const postTitle = req.body.title;
    const postContent = req.body.content;
    const postAuthor = req.body.author;

    newPost.title = postTitle;
    newPost.content = postContent;
    newPost.author = postAuthor;
    newPost.date = new Date();
    await newPost.save();
    res.send('Post created successfully');
   
});
