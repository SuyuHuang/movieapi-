# Assignment 2 - Web API.

Name: Suyu Huang

## Features.


 
 + Feature 1 - In order to integrate with React, apis such as actors, upcoming, etc. were added. 
 + Feature 2 - In addition,actor and movie specific information was inserted into the online mongodb database based on the movie id inserted
 + Feature 3 - The review function: using an array to obtain two objects——author and review. The user can insert the query into database, get the reviews according to the author, update the review according to the input and delete the related author.
 + Feature 4 - In conjunction with the Assignment 1 job, the post was originally uploaded to tmdb and is now accepted by /movie and added to the database. The message shown in the react will be the one that the api reacts.



## API Configuration


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
| /api/upcoming |Gets a list of upcoming movies | N/A | N/A |
| /api/upcoming/{movieid} | Get a upcoming Movie | N/A | N/A | N/A
| /api/actors |Gets a list of actors | N/A | N/A |
| /api/actors/kind/:kind |Gets a list of actors sort by the given kind sequence | N/A | N/A |
| /api/actors/{actorid} | Get an actor | N/A | N/A | N/A
| /api/actor |Gets all the speific information of the actors | N/A | N/A |
| /api/actor/{actorid} |Gets a specific actor detail according to the input id | N/A | N/A |


If you have your API design on an online platform or graphic, please link to it (e.g. [Swaggerhub](https://app.swaggerhub.com/)).



## Integrating with React App

 
+ I used the getMovies in the react app, so i stored the data in the mongodb and fetched it in the react app 
~~~Javascript
export const getMovies= () => {

  return fetch('/api/movies', {
    headers: {
        'Content-Type': 'application/json'
    },
    method: 'get',
    
}).then(res => res.json())
};

~~~
+ Also, I have a post rate function in the React app. So after posting the request, a new record of rate will be added to the database
~~~Javascript


export const RateMovies=(id,value)=>{
  return fetch(`/api/movie/${id}`,{
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
~~~Javascript
~~~

## Extra features
https://movies-api-staging-suyu.herokuapp.com/
https://movieapi-2.herokuapp.com/
+ I deployed the application to heroku both by manual and automatic

## Independent learning.

I learned a lot while doing this lab. The first is dealing with object elements in arrays. Secondly, connecting with the post method in react and returning different outputs based on different input results was also a first exposure.






# Assignment 2 - Agile Software Practice.

Name: Suyu Huang
## Target Web API.


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
| /api/upcoming |Gets a list of upcoming movies | N/A | N/A |
| /api/upcoming/{movieid} | Get a upcoming Movie | N/A | N/A | N/A
| /api/actors |Gets a list of actors | N/A | N/A |
| /api/actors/kind/:kind |Gets a list of actors sort by the given kind sequence | N/A | N/A |
| /api/actors/{actorid} | Get an actor | N/A | N/A | N/A
| /api/actor |Gets all the speific information of the actors | N/A | N/A |
| /api/actor/{actorid} |Gets a specific actor detail according to the input id | N/A | N/A |
## Error/Exception Testing.

.... From the list of endpoints above, specify those that have error/exceptional test cases in your test code, the relevant test file and the nature of the test case(s), e.g.

+ Post /api/movie/:id - test when the new movie has no title, invalid release date, empty genre list. Test adding a movie without prior authentication. See tests/functional/api/movies/index.js 

+ Post /api/movie/:id - test when the rate is not a number, not a value object and no movie is found according to the id. Test inputing the string value, no value and invalid id. See tests/functional/api/movie/index.js
~~~Javascript
 
    it("should alert the body doesn't have the value", () => {
        request(api)
          .post(`/api/movie/${sampleMovie.id}`)
          .set("vae",8)
          .set("Accept", "application/json")
          .set("Authorization",'BEARER '+token)
          // .expect("Content-Type", /json/)
        .expect({
            code: 403,
            msg: 'Please enter the value'
          });
      });
      it("should alert that the value should be a number", () => {
        request(api)
          .post(`/api/movie/${sampleMovie.id}`)
          .set("value","aaa")
          .set("Accept", "application/json")
          .set("Authorization",'BEARER '+token)
          // .expect("Content-Type", /json/)
          .expect({
            code: 402,
            msg: 'Please enter the valid rate'
          });
      });
  });
  describe("when the id is invalid", () => {
    request(api)
    .post(`/api/movie/xxx`)
    .set("value",8)
    .set("Accept", "application/json")
    .set("Authorization",'BEARER '+token)
    // .expect("Content-Type", /json/)
    .expect({
        code: 401,
        msg: 'The movie does not exist'
    });
  })
});
~~~
+ Post /movie/:id/reviews - test when the post request has no review. Test sending a request without reviews. See tests/functional/api/movie/index.js 
~~~Javascript
 it("should alert when there is no review input", () => {
      request(api)
      .post(`/api/movie/${sampleMovie.id}/reviews`)
      .set("author","Kenny")

      .set("Accept", "application/json")
      .set("Authorization",'BEARER '+token)
      // .expect("Content-Type", /json/)
      .expect({
        code: 401,
          msg: 'Please enter the reviews'
      });
    })
  });
~~~
+ GET /movie/:id/reviews/author - test when the input author has not written anything. Test inputing the author that has not been posted before. See tests/functional/api/movie/index.js
~~~Javascript
  it("should alert when there is no review input", () => {
      request(api)
      .post(`/api/movie/${sampleMovie.id}/reviews/Kennyabc`)
      .send({"author":"Kenny","reviews":"abc"})
      .send({"author":"Kenny","reviews":"abc"})
      .send({"author":"Kennya","reviews":"abc"})
      .set("Accept", "application/json")
      .set("Authorization",'BEARER '+token)
      // .expect("Content-Type", /json/)
      .expect({
        code: 401,
        msg: "The author has not wrote any reviews"
      });
    })
  });
  ~~~
+ Put /movie/:id/reviews/:author - test when the input author has not written anything. Test inputing the author that has not been posted before. See tests/functional/api/movie/index.js
~~~Javascript
   it("should alert when the input author has not wrote anything", () => {
      request(api)
      .post(`/api/movie/${sampleMovie.id}/reviews`)
      .send({"author":"kenny","reviews":"abc"})
      .set("Accept", "application/json")
      .set("Authorization",'BEARER '+token)

     request(api)
      .put(`/api/movie/${sampleMovie.id}/reviews/:author`)
      .send({"author":"Kenny1","reviews":"abcd"})
      .set("Accept", "application/json")
      .set("Authorization",'BEARER '+token)
      .expect({
        code:401,
        msg: 'There is no record in this author',
      });
    
  });
  
  ~~~

  + Delete /movie/:id/reviews/:author - test when the input author has not written anything. Test inputing the author that has not been posted before. See tests/functional/api/movie/index.js
~~~Javascript
    it("should alert when there is no record in the input author", () => {
    request(api)
    .post(`/api/movie/${sampleMovie.id}/reviews`)
    .send({"author":"kenny","reviews":"abc"})
    .set("Accept", "application/json")
    .set("Authorization",'BEARER '+token)

   request(api)
    .delete(`/api/movie/${sampleMovie.id}/reviews/:author`)
    .send({"author":"Kenny1","reviews":"abcd"})
    .set("Accept", "application/json")
    .set("Authorization",'BEARER '+token)
    .expect({
      code:401,
      msg: 'There is no record in this author',
    });
  
});
  
  ~~~

    + GET /movies/kind/:kind - test when the input kind is not included in the database or can not be listed. Test inputing the kind that is not in database. See tests/functional/api/actors/index.js
~~~Javascript
   it("should return the error message the kind is invalid", () => {
      request(api)
        .get("/api/actors/kind/age")
        .set("Accept", "application/json")
        .set("Authorization",'BEARER '+token)
        .expect("Content-Type", /json/)
        .expect(401)
        .expect({
      
            code:401,
            msg: 'The actors can not be sorted by this kind'
            
         
        });
      
    });
  
  ~~~

## Continuous Delivery/Deployment.



+ https://dashboard.heroku.com/apps/movies-api-staging-suyu - Staging deployment
+ https://dashboard.heroku.com/apps/movieapi-2 - Production


+ Staging app overview 

![][staging]

+ Production app overview 

![][production]






[stagingapp]: ./img/stagingapp.png
[staging]:./img/staging.png
[production]: ./img/production.png