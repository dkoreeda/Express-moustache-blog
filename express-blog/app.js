// console.log('hi');

const express = require('express');
const app = express();
const port = process.env.PORT || 8080;
const mustacheExpress = require('mustache-express');
const packageData = require('./data.js'); //return module.exports
// console.log('this is the object packageData: ')
// console.log(packageData);


app.listen(port, () => {
  console.log('Server started on ${port}');
});

app.engine('html', mustacheExpress());
app.set('view engine', 'html');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));

// app.get('/', (req, res) => {
//   console.log('index');
//   console.log(packageData);
//   res.render('index', packageData);
// });

app.get('/', (req, res) => {
  // console.log('index');
  // console.log(packageData);
  res.render('index', packageData);
});

app.get('/api/packages/', (req, res) => {
  console.log(packageData);
  // const package = packageData.packages;
  res.send(packageData);
});

app.get('/api/packages/:id', (req, res) => {
  const id = req.params.id;
  // console.log('index');
  console.log(packageData);
  const package = packageData.packages[id];
  res.send(package);
});

