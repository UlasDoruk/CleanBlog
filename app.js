const express = require('express');
const ejs = require('ejs');
const path = require('path');
const app = express();

app.set('view engine', 'ejs');

 app.use(express.static('public')); 


app.get('/', (req, res) => {
  /* res.sendFile(resolve(__dirname,"public/index.html")) */
  res.render('index.ejs');
});

app.get("/about",(req,res)=>{
  res.render("about")
})
app.get('/add_post', (req, res) => {
  res.render('add_post');
});


port = 3000;

app.listen(port, () => {
  console.log(`Portumuz : ${port}`);
});
