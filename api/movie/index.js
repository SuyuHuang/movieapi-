import express from 'express';
import {
  getMovieReviews, RateMovies
} from '../tmdb-api';

import SpecificmovieModel from './SpecificamovieModel'
const router = express.Router();

router.get('/', (req, res, next) => {
  SpecificmovieModel.find().then(actor => res.status(200).send(actor)).catch(next);
});

router.get('/:id', (req, res, next) => {
  const id = parseInt(req.params.id);
  SpecificmovieModel.findByActorDBId(id).then(actor => res.status(200).send(actor)).catch(next).catch((error)=>next(error));
  
});
 

router.get('/:id/reviews', async(req, res, next) => {
  try{
    const id = parseInt(req.params.id);

  const reviews=await getMovieReviews(id)
  res.status(200).send(reviews);
  }
  catch{
    console.log(err)
  }
});

router.post('./:id/reviews',async(req,res,next)=>{

})

  router.post('/:id/:value', async(req, res, next,err) => {
    try{
      const id = parseInt(req.params.id);
      const value=parseFloat(req.params.value);
      RateMovies(id,value)

  
    }
    catch{
      console.log(err)
    }
  });


export default router;