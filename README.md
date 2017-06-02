# Express! Mustache!

![Imgur](https://im3.ezgif.com/tmp/ezgif-3-2790c1ea50.gif)

### Completion:
Completion is parts 1-3. As always, more is better, healthy living is Express.

#### What is express.js?

Express.js is a simple web framework for Node.js.

It's biggest highlights are:

- extremely lightweight/minimalistic (gives you the power to have more control over your application)
- easy to create routes
- very simple to apply middleware

## Part 1: Setting up Express

1. In the homework directory: `mkdir express-blog`
2. `cd express-blog`
3. `touch app.js`
3. `npm init` (Hit enter to accept the defaults and see the new [package.json](https://docs.npmjs.com/cli/init) file
4. `npm install express --save` (The `--save` option adds the module as a dependency in your package.json file. This allows anyone looking at your app (i.e. a dev team member) to be able to see what your app is "made of" and if they clone your app and run `npm i` all dependencies will be installed.)



Take a look at the package.json file. Express should be included as a dependency:

```json
"dependencies": {
  "express": "^4.14.1"
}
```

Let's start coding in `app.js`:

```javascript
// app.js

const express = require('express');
const app     = express();
const port    = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`Server started on ${port}`)
});
```
Let's run:
```bash
node app.js
```

Navigate to `http://localhost:8080` and you should see something logged to your Node console!

## Part 2: Routing in Express

Let's look at routes and handler callback functions in Express routes:

```javascript
app.get('/', (req, res) => {
  res.send('homepage');
});
```

Routes in Express are created using methods named after HTTP verbs. In the example above, we created a route to respond to GET requests at the root of the app. You will have a corresponding method on the app object for all the HTTP verbs.  In this example, we'll send back the `homepage` view as a response.

## Part 3: Templates in Express

Express comes with a default templating engine called [jade](http://jade-lang.com), a high performance template engine heavily influenced by [HAML](http://haml.info).  Like HAML, jade simplifies writing html by eliminating the need for parts of html tags and utilizing white space.

But we'll be using another common templating engine called [Mustache](https://github.com/janl/mustache.js).

Instead of sending some text when we hit our site let's have it serve an index page.

#### Install Mustache
First we need to install the Mustache package with npm:

```bash
npm install mustache-express --save
```

> Note: You can uninstall from a project with:*

> ```bash
npm uninstall mustache --save
```

#### Set up Mustache and render the index

Again, we'll use Mustache, at least in the beginning, because the syntax has a gentle learning curve. To change your rendering engine you'll need to edit your app's configuration in `app.js`. We also have to change what happens when a user GETs '/'. Let's get it to render our index template instead of sending 'homepage'.

```javascript
// app.js
const express = require('express');
const app = express();
const mustacheExpress = require('mustache-express');


app.engine('html', mustacheExpress());
app.set('view engine', 'html');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));


app.get('/', (req, res) => {
    res.render('index');
});

app.listen(port, () => {
  console.log(`Server started on ${port}`);
});
```

#### Creating views in Express

How about an mustache index page:

```bash
mkdir views
touch views/index.html

```

And add this code to `index.html`:

```html

<!doctype html>
<html lang="en">
<head>
  <title>Welcome to Express!></title>
</head>

<body>
  <h1>Introduction to Express</h1>
  <div class="container">
    <p> This is a paragraph of text. Yay! </p>
  </div>
</body>

```

## Part 4: Templating Our Data

Create a new file in the same directory as app.js called data.js. Add the following object to it.

```js
const packageData = {

    title: "Popular NPM Frameworks",
    text: "These are the most popular frameworks",

    packages: [
      {
        name: "Express",
        category: "Server-side Framework",
        img: "https://camo.githubusercontent.com/fc61dcbdb7a6e49d3adecc12194b24ab20dfa25b/68747470733a2f2f692e636c6f756475702e636f6d2f7a6659366c4c376546612d3330303078333030302e706e67"
      },
      {
        name: "Gulp",
        category: "Build System",
        img: "http://maxcdn.webappers.com/img/2014/01/gulp-js.jpg"
      },
      {
        name: "Mocha",
        category: "Testing Framework",
        img: "https://s3.amazonaws.com/dailyjs/images/posts/mocha-tests.png"
      },
      {
        name: "React",
        category: "Front-end Framework",
        img: "http://blog.addthiscdn.com/wp-content/uploads/2014/11/addthis-react-flux-javascript-scaling.png"
      },
      {
        name: "Passport",
        category: "Authentication Tool",
        img: "https://pbs.twimg.com/profile_images/599259952574693376/DMrPoJtc.png"
      },
      {
        name: "PG Promise",
        category: "Promises Interface for PostgeSQL Database",
        img: "https://camo.githubusercontent.com/625902581fcc8949a27ed425941a3c0c48b28a0d/687474703a2f2f73382e706f7374696d672e6f72672f6b3764747565386c782f70675f70726f6d6973652e6a7067"
      }
    ]
};
```

Make sure at the bottom of this file to use `module.exports` to send out the entire object when we require it in another file.

Let's add the following code to our app.js file.

```javascript
const packageData = require('./data');

app.get('/', (req, res) => {
  console.log("index");
  console.log(packageData);
  res.send("index", packageData);
});
```

Here, packageData is a required Module from the data.js file. Take a look at this file to see how the data is structured. By passing packageData into our res.send function, we can use the data in this object to fill conetent in our html file.

For example, given the following object:
``` js
const flinstones = {
  title: "The Flinstones",
  setting: "Bedrock",
  characters: [
    {
      name: "Wilma"
    },
    {
      name: "Fred"
    },
    {
      name: "Bamm-Bamm"
    },
    {
      name: "Barney"
    },
    {
      name: "Betty"
    }
  ]
}
```
We can apply it to our html like so:
```html
<h1>{{ title }}</h1>
<h3>Setting: {{ setting }}</h3>
<div class="characters">
  {{#characters}}
    <p> {{ name }}</p>
  {{/characters}}
</div>
```

Now, given the packageData object in our app.js file let's fill in our index.html file with the `title,`, `text`, and each package's `name`, `category`, and `img`.

After adding some styling, your page could looks something like this:

![Imgur](https://i.imgur.com/jYDktri.png)

# BONUSSSSSSSSS
If you got your templating to work, congrats! Now we are going to shift gears and work with an Express API!

### Step 1
Rename your index.html file to 'completion.html' and create a new index.html file in the same folder.

### Step 2
In your new html file add 2 buttons one with the class "allPackages" and one with the class "packageById"

Add an input field where you can type in the id of the package you want before you select the packageById button.

### Step 3
In your public/script.js file, create an event listener that will call another function called getData. This event listener should trigger when either button is clicked and find the value of the input field if the getPackageById button was clicked. When you call getData, make sure to pass in a variable indicating which button was clicked. Ex:
```
$('button').click(function(){
  if ($(this).hasClass('packageById')){
    getData('getPackageById');
  } else {
    getData('allPackages');
  }
})
```
### Step 4
In getData, create an AJAX call. The url should be "/api/packages/" if the allPackages button is clicked, or "/api/packages/" + the id number entered in the input field if the packageById button is clicked.

In your success function, call a method that will take your AJAX data as a parameter. This function should append the data to the page.

### Step 5
Now go back to your app.js file and comment out the `app.get('/')` function for now. Replace it with a new one that will render the new html file.

### Step 6
Let's set up the API routes! When you receive a request for '/api/packages' the app should return the entire packageData object. If the request is for '/api/packages/:id' then the app should only return data for the package that matches it's index number in the package array.

### Step 7
Style your page and figure out a way to handle errors in your AJAX function!
