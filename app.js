const express = require('express');
const mongoose = require("mongoose")
const ejs = require('ejs');
const path = require('path');
const app = express();
//Photo.js dosyasını require ettik
const Photo = require('./model/Photo');

app.set('view engine', 'ejs');

//Middleware
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Route
app.get('/index', async (req, res) => {
  const photo = await Photo.find({})
  /* res.sendFile(resolve(__dirname,"public/index.html")) */
  res.render('index',{
    photo
  });
});

app.get('/about', (req, res) => {
  res.render('about');
});
app.get('/add_post', (req, res) => {
  res.render('add_post');
});

app.post('/photos', async (req, res) => {
  await Photo.create(req.body)
  res.redirect('/index');
});

port = 3000;

app.listen(port, () => {
  console.log(`Portumuz : ${port}`);
});
