const express = require('express');
const ejs = require('ejs');
const path = require('path');
const app = express();

app.set('view engine', 'ejs');

//Middleware
 app.use(express.static('public')); 
 app.use(express.urlencoded({extended:true}))
 app.use(express.json())

//Route
app.get('/index', (req, res) => {
  /* res.sendFile(resolve(__dirname,"public/index.html")) */
  res.render('index.ejs');
});

app.get("/about",(req,res)=>{
  res.render("about")
})
app.get('/add_post', (req, res) => {
  res.render('add_post');
});

app.post('/photos', (req, res) => {
  console.log(req.body);
   res.redirect("/index") 
});

port = 3000;

app.listen(port, () => {
  console.log(`Portumuz : ${port}`);
});
