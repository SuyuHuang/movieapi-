# Assignment 2 - Web API.

Name: Suyu Huang

## Features.

...... A bullet-point list of the ADDITIONAL features you have implemented in the API **THAT WERE NOT IN THE LABS** ......,
 
 + Feature 1 - In order to integrate with React, apis such as actors, upcoming, etc. were added. 
 + Feature 2 - In addition,actor and movie specific information was inserted into the online mongodb database based on the movie id inserted
 + Feature 3 - The review function: using an array to obtain two objects——author and review. The user can insert the query into database, get the reviews according to the author, update the review according to the input and delete the related author.
 + Feature 4 - In conjunction with the Assignment 1 job, the post was originally uploaded to tmdb and is now accepted by /movie and added to the database.



## API Configuration
Describe any configuration that needs to take place before running the API. For example, creating an ``.env`` and what variables to put in it. Give an example of how this might be structured/done.
REMEMBER: DON'T PUT YOUR OWN USERNAMES/PASSWORDS/AUTH KEYS IN THE README OR ON GITHUB, just placeholders as indicated below:

```bat
NODE_ENV=development
PORT=8080
HOST=localhost
TMDB_KEY=
mongoDB=
MONGO_DB=
SEED_DB=true
SECRET=
HEROKU_API_KEY=	
HEROKU_APP_NAME_STAGING=



 
```


## API Design
Give an overview of your web API design, perhaps similar to the following: 

|  |  GET | POST | PUT | DELETE
| -- | -- | -- | -- | -- 
| /api/movies |Gets a list of movies | N/A | N/A |
| /api/movies/kind/:kind |Gets a list of movies sort by the given kind sequence | N/A | N/A |
| /api/movies/{movieid} | Get a Movie | N/A | N/A | N/A
| /api/movies/{movieid}/reviews | Get all reviews for movie | Create a new review for Movie | N/A | N/A  
| /api/movie |Gets all the speific information of the movies | N/A | N/A |
| /api/movie/{movieid} |Gets a specific movie detail according to the input id | Rate the movie | N/A |
| /api/movie/{movieid}/reviews |Gets a specific movie review according to the input id |Post the review in the format [{author:author},{review,review}] | N/A |
| /api/movie/{movieid}/reviews/:author |Gets a specific movie revieew according to the input id, the movie was filtered by the author name |N/A| Update the author's review of a specific movie with the input review|Delete the author's review according to the input author

| ... | ... | ... | ... | ...

If you have your API design on an online platform or graphic, please link to it (e.g. [Swaggerhub](https://app.swaggerhub.com/)).


## Security and Authentication
Give details of authentication/ security implemented on the API(e.g. passport/sessions). Indicate which routes are protected.

## Integrating with React App

Describe how you integrated your React app with the API. Perhaps link to the React App repo and give an example of an API call from React App. For example: 

~~~Javascript
export const getMovies = () => {
  return fetch(
     '/api/movies',{headers: {
       'Authorization': window.localStorage.getItem('token')
    }
  }
  )
    .then(res => res.json())
    .then(json => {return json.results;});
};

~~~

## Extra features

. . Briefly explain any non-standard features, functional or non-functional, developed for the app.  

## Independent learning.

. . State the non-standard aspects of React/Express/Node (or other related technologies) that you researched and applied in this assignment . .  
