const axios = require('axios');
const prompt = require("prompt-sync")();

const API_KEY = '83f58e2f79ab2e26f595ff2d69c0b9c3';

const BASE_URL = 'https://api.themoviedb.org/3';

async function getMovies(timeframe, sortby, maxResults) {
  const url = `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=${sortby}&primary_release_date.gte=${timeframe}&page=1&vote_count.gte=500`;
  const response = await axios.get(url);

  const results = response.data.results.slice(0, maxResults);

  return results;
}

async function getTVShows(timeframe, sortby, maxResults) {
    const url = `${BASE_URL}/discover/tv?api_key=${API_KEY}&language=en-US&sort_by=${sortby}&first_air_date.gte=${timeframe}&page=1&vote_count.gte=500`;
    const response = await axios.get(url);
  
    const results = response.data.results.slice(0, maxResults);
  
    return results;
  }

async function getMovieDetails(movieId) {
    const url = `${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&language=en-US&append_to_response=credits,reviews`;
    const response = await axios.get(url);
  
    return response.data;
  }

  async function getTVShowDetails(tvId) {
    const url = `${BASE_URL}/tv/${tvId}?api_key=${API_KEY}&language=en-US&append_to_response=credits,reviews`;
    const response = await axios.get(url);
  
    return response.data;
  }

(async () => {
    // Timeframe for shows that have released at a current or later date
  const timeframe = prompt("Please enter the timeframe for your movies and TV shows (XXX-XX-XX): ");

    // Choose from one of the many available sort options
    
    // Available options : popularity.asc, popularity.desc, release_date.asc, release_date.desc, revenue.asc, revenue.desc, primary_release_date.asc, primary_release_date.desc, original_title.asc, original_title.desc, vote_average.asc, vote_average.desc, vote_count.asc, vote_count.desc
  const sortby = prompt("Please enter the sorting method for your movies and TV shows (ex. popularity.asc, primary_release_date.desc): ");

   // Sets max allowed results
  const maxResults = parseInt(prompt("Please enter the max results for your list of movies and TV shows: "));
  

  const movies = await getMovies(timeframe, sortby, maxResults);
  console.log('Movies:', movies);

  const tvShows = await getTVShows(timeframe, sortby, maxResults);
  console.log('TV Shows:', tvShows);

  const movieID = parseInt(prompt("Please enter the ID of the movie you would like to get your movie details from: "))
  const tvID = parseInt(prompt("Please enter the ID of the TV show you would like to get your TV show details from: "))

  const movieDetails = await getMovieDetails(movieID);
  console.log('Movie details:', movieDetails);

  const tvDetails = await getTVShowDetails(tvID);
  console.log('TV Show details:', tvDetails);

})();