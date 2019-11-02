var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    uuid = require('uuid/v4'),
    methodOverride = require('method-override');

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');
app.use(methodOverride("_method"));

var cars = [
  {name: "tesla", image: "https://www.wsupercars.com/wallpapers/Tesla/2018-Tesla-Model-3-V7-1080.jpg", id: uuid(), comment: "what a nice car"}, 
  {name: "mercedez", image: "https://www.wsupercars.com/wallpapers/Mercedes-Benz/2018-Mercedes-Benz-S63-AMG-V2-1080.jpg", id: uuid(), comment: "what a nice car"}, 
  {name: "bmw", image: "https://www.wsupercars.com/wallpapers/BMW/2019-BMW-M5-Edition-35-V5-1080.jpg", id: uuid(), comment: "what a nice car"}, 
  {name: "audi", image: "https://www.wsupercars.com/wallpapers/Audi/2019-Audi-R8-V10-Decennium-V1-1080.jpg", id: uuid(), comment: "what a nice car"}
];

app.get('/', (req, res) =>{
  res.render('home');
})
// index
app.get('/cars', (req, res) =>{
  res.render('cars', {cars: cars})
})
// create
app.get('/cars/new', (req, res) =>{
  res.render("form")
})
// show
app.get('/cars/:id', (req, res) =>{
  var id = req.params.id;
  var showCar = cars.filter(car => car.id === id)[0];
  res.render("show", {showCar: showCar});
})
// edit
app.get('/cars/:id/edit', (req, res) =>{
  var id = req.params.id;
  var editCar = cars.filter(car => car.id === id)[0];
  res.render('edit', {editCar: editCar});
})
// create
app.post('/addcars', (req, res) =>{
  var name = req.body.name;
  var image = req.body.image;
  var comment = req.body.comment;
  var newcar = {
    name: name,
    image: image,
    id: uuid(), 
    comment: comment
  }
  cars.push(newcar);
  res.redirect('/cars');
})
// edit
app.put('/cars/:id', (req, res) =>{
  var id = req.params.id;
  var name = req.body.name;
  var image = req.body.image;
  var comment = req.body.comment;
  cars = cars.map(car => {
    if (car.id === id){
      return {...car, name: name, image: image, comment: comment};
    }else{
      return car;
    }
  })
  res.redirect(`/cars/${id}`);
})
// destroy
app.delete('/cars/:id', (req, res) =>{
  var id = req.params.id;
  cars = cars.filter(car => car.id !== id);
  res.redirect('/cars');
})

app.get('*', (req, res) =>{
  res.send("No Such Address")
})

app.listen(3000, () =>{
  console.log('server started')
})