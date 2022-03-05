const express = require('express');
const mongoose = require('mongoose');
const ejs = require('ejs');
const path = require('path');
const fileUpload = require('express-fileupload');
const methodOverride = require('method-override');
const app = express();
const fs = require('fs');
//Photo.js dosyasını require ettik
const Photo = require('./model/Photo');
/* const req = require('express/lib/request'); */

mongoose.connect('mongodb://localhost/cleanblog-test-db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  /* useFindAndModify : false, */
});

app.set('view engine', 'ejs');

//Middleware
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(fileUpload());
app.use(methodOverride('_method',{
  methods:['POST','GET']
}))

app.get('/index', async (req, res) => {
  const photos = await Photo.find({});
  res.render('index', {
    photos,
  });
});

app.get('/photos/:id', async (req, res) => {
  const photo = await Photo.findById(req.params.id);
  res.render('photo', {
    photo,
  });
});

app.get('/about', (req, res) => {
  res.render('about');
});
app.get('/add_post', (req, res) => {
  res.render('add_post');
});

app.post('/photos', async (req, res) => {
  const uploadDir = 'public\\uploads';

  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
  }

  let uploadeImage = req.files.image;
  let uploadPath = __dirname +"\\public\\uploads\\" + uploadeImage.name;

  uploadeImage.mv(uploadPath, async () => {
    await Photo.create({
      ...req.body,
      image: '\\uploads\\' + uploadeImage.name,
    });
    res.redirect('/index');
  });
});

app.get('/photos/edit/:id', async (req, res) => {
  const photo = await Photo.findOne({ _id: req.params.id });
  res.render('edit', {
    photo,
  });
});

app.put('/photos/:id', async (req, res) => {
  const photo = await Photo.findOne({ _id: req.params.id });
  photo.title = req.body.title;
  photo.description = req.body.description;
  photo.save();
  res.redirect(`/photos/${req.params.id}`);
});

app.delete('/photos/:id', async (req, res) => {
  const photo = await Photo.findOne({ _id: req.params.id });
  let deleteImage = __dirname + "\\..\\public\\" + photo.image;
  fs.unlinkSync(deleteImage,);
  await Photo.findByIdAndRemove(req.params.id);
  res.redirect('/index');
});

port = 3000;

app.listen(port, () => {
  console.log(`Portumuz : ${port}`);
});
