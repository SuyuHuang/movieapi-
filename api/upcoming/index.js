import express from 'express';
import {
   getUpcomingMovies
} from '../tmdb-api';
import upcomingMovieModel from './upcomingModel'
const router = express.Router();

router.get('/', (req, res, next) => {
  upcomingMovieModel.find().then(movies => res.status(200).send(movies)).catch(next);
});

router.get('/:id', (req, res, next) => {
  const id = parseInt(req.params.id);
  upcomingMovieModel.findByMovieDBId(id).then(movie => res.status(200).send(movie)).catch(next).catch((error)=>next(error));
  
});



export default router;