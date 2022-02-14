//Photo.js dosyasını modul yaptık

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PhotoSchema = {
  title: String,
  description: String,
  image: String,
  Createdate: {
    type: Date,
    default: Date.now,
  },
};

mongoose.connect('mongodb://localhost/cleanblog-test-db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const Photo = mongoose.model('Photo', PhotoSchema);

module.exports = Photo;
