import fetch from 'node-fetch';

export const getMovies = () => {
    return fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.TMDB_KEY}&language=en-US&include_adult=false&page=1`
    )
      .then(res => res.json())
      .then(json => json.results);
  };

  export const getMovie = id => {
    return fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.TMDB_KEY}`
    ).then(res => res.json());
  };

  export const getGenres = () => {
    return fetch(
      `https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.TMDB_KEY}&language=en-US`
    ).then(res => res.json())
    .then(json => json.genres);
  };

  export const getMovieReviews = id => {
    return fetch(
      `https://api.themoviedb.org/3/movie/${id}/reviews?api_key=${process.env.TMDB_KEY}`
    )
      .then(res => res.json())
      .then(json => json.results);
  };

  export const getUpcomingMovies=()=>{
    return fetch(
      `https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.TMDB_KEY}&language=en-US&page=1`
    )
    .then(res=>res.json())
    .then(json=>json.results);
  }

  export const getActors = () => {
    return fetch(
  
      `https://api.themoviedb.org/3/person/popular?api_key=${process.env.TMDB_KEY}&language=en-US&page=1`
    )
      .then(res => res.json())
      .then(json => json.results);
  };


  export const getActor = person_id => {
    return fetch(
      `https://api.themoviedb.org/3/person/${person_id}?api_key=${process.env.TMDB_KEY}&language=en-US`
  
    )
      .then(res => res.json())
  
  };


  export const RateMovies=(id,value)=>{
    return fetch(`https://api.themoviedb.org/3/movie/${id}/rating?api_key=6ee3e9a0aa44e4dc5951e0598bae1695&session_id=7f569a2328c1d123b1320da412a2e7d920663d4e`,{
      body: JSON.stringify({value:value}), // must match 'Content-Type' header
          cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
          credentials: 'same-origin', // include, same-origin, *omit
          headers: {
            'user-agent': 'Mozilla/4.0 MDN Example',
            'content-type': 'application/json'
          },
          method: 'POST', // *GET, POST, PUT, DELETE, etc.
          mode: 'cors', // no-cors, cors, *same-origin
          redirect: 'follow', // manual, *follow, error
          referrer: 'no-referrer', // *client, no-referrer
    })
    .then(response => response.json())
  }
  // export const RateMovies = (id, value) => {
  //   return postData(`https://api.themoviedb.org/3/movie/${id}/rating?api_key=6ee3e9a0aa44e4dc5951e0598bae1695&session_id=7f569a2328c1d123b1320da412a2e7d920663d4e`, {value: value})
  // };
  // export const RateMovies=(id,value)=>{
  //   return fetch(`https://api.themoviedb.org/3/movie/${id}/rating?api_key=6ee3e9a0aa44e4dc5951e0598bae1695&session_id=7f569a2328c1d123b1320da412a2e7d920663d4e`, {
  //     body: JSON.stringify(data), // must match 'Content-Type' header
  //     cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
  //     credentials: 'same-origin', // include, same-origin, *omit
  //     headers: {
  //       'user-agent': 'Mozilla/4.0 MDN Example',
  //       'content-type': 'application/json'
  //     },
  //     method: 'POST', // *GET, POST, PUT, DELETE, etc.
  //     mode: 'cors', // no-cors, cors, *same-origin
  //     redirect: 'follow', // manual, *follow, error
  //     referrer: 'no-referrer', // *client, no-referrer
  //   })
  //     .then(response => response.json()) // parses response to JSON
  // }

  

