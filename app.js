const express = require('express');
const mongoose = require('mongoose');
const ejs = require('ejs');
const fileUpload = require('express-fileupload');
const methodOverride = require('method-override');
const app = express();
const photoController = require('./Controllers/photoControllers')
const pageController = require('./Controllers/pageControllers')
const Photo = require('./model/Photo');

mongoose.connect('mongodb+srv://ulasdoruk:hjex594uec@cluster0.esskl.mongodb.net/cleanblog-test-db?retryWrites=true&w=majority',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    /* useFindAndModify : false, */
  }
);

app.set('view engine', 'ejs');

//Middleware
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(fileUpload());
app.use(methodOverride('_method',{
  methods:['POST','GET']
}))
// photoController ROUTE

app.get('/index',photoController.getAllPhotos);
app.get('/photos/:id', photoController.getPhoto);
app.post('/photos', photoController.createPhoto);
app.put('/photos/:id', photoController.updatePhoto);
app.delete('/photos/:id', photoController.deletePhoto);

// pageController ROUTE
app.get('/about',pageController.getAboutPage);
app.get('/add_post',pageController.getAddPhoto);
app.get('/photos/edit/:id',pageController.getEditPhoto);

port = process.env.PORT || 5000

app.listen(port, () => {
  console.log(`Portumuz : ${port}`);
});
