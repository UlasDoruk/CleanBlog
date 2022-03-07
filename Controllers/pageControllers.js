const Photo = require('../model/Photo')

exports.getAboutPage = (req, res) => {
  res.render('about');
};

exports.getAddPhoto = (req, res) => {
  res.render('add_post');
};

exports.getEditPhoto = async (req, res) => {
  const photo = await Photo.findOne({ _id: req.params.id });
  res.render('edit', {
    photo,
  });
};
