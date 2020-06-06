const express = require('express')
const hbs = require('hbs')
const path = require('path')
// const movies = require('../public/js/movies.js')


const app = express()
const port = process.env.PORT || 3000

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup hbs engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))
app.use(express.json());


// movie container
const movies = [{movieTitle: "Captain Marvel", movieYear: "2019"}, {movieTitle: "Mohana", movieYear: "2018"}]


app.get('/', (req, res) => {
  res.render('landing', {
    title: 'My Movie Land',
    content: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Repudiandae delectus dignissimos atque maxime corrupti molestiae reprehenderit saepe eum sit. Ab voluptas nostrum obcaecati neque dicta tempora repellat quam. Nihil ad voluptate voluptatum, amet impedit tempore quae quisquam ullam veritatis cumque dignissimos molestias maxime nisi, distinctio modi tenetur beatae iste? Enim?',
    name: 'Ayu Adiati'
  })
})

app.get('/movies', (req, res) => {
  res.render('movies', {
		title: 'Movie Database',
    name: 'Ayu Adiati',
    movies: movies

	});
})

app.get('/movies/new', (req, res) => {
  res.render('new', {
		title: 'Add New Movie',
		name: 'Ayu Adiati',
	});
})

app.post('/movies/new', (req, res) => {
  const movieTitle = req.body.title
  const movieYear = req.body.year

	const newMovie = {
		movieTitle,
		movieYear
	};

  movies.push(newMovie);

  res.redirect('/movies')
});



app.listen(port, () => console.log(`App listening on port ${port}!`))
