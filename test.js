//moongoosu çağırdık
const mongoose = require('mongoose');
// mongoose şemasını atadık
const Schema = mongoose.Schema;
//mongoose'u pc'mizde bulunan db'ye bağladık
mongoose.connect('mongodb://localhost/pcat-test-db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
//Yeni şema oluşturduk
const PhotoSchema = new Schema({
  title: String,
  description: String,
});
//Photo adlı collection oluşturduk
const Photo = mongoose.model('Photo', PhotoSchema);
//Photo collectionuna yeni obje ekledik
Photo.create({
  title: 'Photo_2',
  description: 'Photo_2 desc',
});
//Eklediğimiz verileri okuma
/* Photo.find({}, (err, data) => {
  console.log(data);
});
 //Collection veri update
const id = '620937d501221a1a50436130';
Photo.findByIdAndUpdate(
  id,
  {
    title: 'Photo_3',
    description: 'Photo_3 desc',
  },
  {
    new: true,
  },
  (err, data) => {
    console.log(`Updated data`);
  }
); */
//Collectiondan veri silme
/* const id_1 = '6209379abacf938c9ea7a982';
Photo.findByIdAndDelete(id,(err,data)=>{
    console.log(`Photo is removed..`)
})  */