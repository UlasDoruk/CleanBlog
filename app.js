const express = require('express');
const mongoose = require('mongoose');
const ejs = require('ejs');
const fileUpload = require('express-fileupload');
const methodOverride = require('method-override');
const app = express();
const photoController = require('./Controllers/photoControllers')
const pageController = require('./Controllers/pageControllers')
const Photo = require('./model/Photo');

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

app.get('/index',photoController.getAllPhotos);
app.get('/photos/:id', photoController.getPhoto);
app.post('/photos', photoController.createPhoto);
app.put('/photos/:id', photoController.updatePhoto);
app.delete('/photos/:id', photoController.deletePhoto);

app.get('/about',pageController.getAboutPage);
app.get('/add_post',pageController.getAddPhoto);
app.get('/photos/edit/:id',pageController.getEditPhoto);

port = 3000;

app.listen(port, () => {
  console.log(`Portumuz : ${port}`);
});
