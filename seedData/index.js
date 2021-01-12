import userModel from '../api/users/userModel';
import movieModel from '../api/movies/movieModel';
import upcomingModel from '../api/upcoming/upcomingModel'
import ActorModel from '../api/actors/actorModel'
import {getUpcomingMovies,getActor,getActors,getMovies, getMovie} from '../api/tmdb-api'
import SpecificactorModel from '../api/actor/SpecificactorModel'
import SpecificmovieModel from '../api/movie/SpecificamovieModel'
const users = [
  {
    'username': 'user1',
    'password': 'test1',
  },
  {
    'username': 'user2',
    'password': 'test2',
  },
];


// deletes all user documents in collection and inserts test data
export async function loadUsers() {
  console.log('load user Data');
    try {
      await userModel.deleteMany();
      await users.forEach(user => userModel.create(user));
      console.info(`${users.length} users were successfully stored.`);
    } catch (err) {
      console.error(`failed to Load user Data: ${err}`);
    }
  }
  // export async function loadSpecificActor() {
  //   console.log('load Specific Actor  Data');
  //     try {
  //     await  getActors().then(async res => {
  //         actors=res
  //       });
  //     actors.map()

  //       }

  //     } catch (err) {
    
  //     }
  //   }

  export async function loadUpcomingMovies() {
    console.log('load upcomingmovies');
    try {
      getUpcomingMovies().then(async res => {
        await upcomingModel.deleteMany();
        await upcomingModel.collection.insertMany(res);
        console.info(`${res.length} Upcomingmovies were successfully stored.`);
      })
    } catch (err) {
      console.error(`failed to Load upcomingmovie Data: ${err}`);
    }
  }
  export async function loadActors() {
    console.log('load Actors');
    try {
      getActors().then(async res => {
        await ActorModel.deleteMany();
        await SpecificactorModel.deleteMany();
        await ActorModel.collection.insertMany(res);
        await ActorModel.collection.find().sort({popularity:1})
        console.info(`${res.length} Actors were successfully stored.`);
        res.map(async (actor)=>{
          await getActor(actor.id).then(async (res)=>{
       
            await SpecificactorModel.collection.insertOne(res,(err)=>{if(err) console.log(err);})
            
          }
          )
        })
      })
    } catch (err) {
      console.error(`failed to Load actor Data: ${err}`);
    }
  }
  // deletes all movies documents in collection and inserts test data
  export async function loadMovies() {
    console.log('load Movies');
    try {
      getMovies().then(async res => {
        await movieModel.deleteMany();
        await SpecificmovieModel.deleteMany();
        await movieModel.collection.insertMany(res);
        await movieModel.collection.find().sort({popularity:1})
        console.info(`${res.length} Movies were successfully stored.`);
        res.map(async (movie)=>{
          await getMovie(movie.id).then(async (res)=>{
       
            await SpecificmovieModel.collection.insertOne(res,(err)=>{if(err) console.log(err);})
            
          }
          )
        })
      })
    } catch (err) {
      console.error(`failed to Load actor Data: ${err}`);
    }
  }