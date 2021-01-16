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
  SpecificmovieModel.findByMovieDBId(id).then(actor => res.status(200).send(actor)).catch(next).catch((error)=>next(error));
  
});
 

router.get('/:id/reviews', async(req, res, next) => {
  try{
    const id = parseInt(req.params.id);

  const reviews=await getMovieReviews(id)
  res.status(200).send(reviews);
  }
  catch{
    next(error);
  }
});

router.post('/:id/reviews', async (req, res, next) => {
  try {
    const id =parseInt(req.params.id);
     const movie = await SpecificmovieModel.findByMovieDBId(id);
     const reviews = req.body.reviews;
     const author=req.body.author;
     await movie.review.push({"author":author,"reviews":reviews});
      await movie.save(); 

  }
  catch (error){
    next(error);
  }
});

router.post('/:id', async (req, res, next) => {
  try {

    const value = req.body.value;
    if(!value){
      res.status(403).json({
        code: 403,
        msg: 'Please enter the value'
      });
    }
    else if(typeof(value)!='number'){
      console.log(typeof(value))
      res.status(402).json({
        code: 402,
        msg: 'Please enter the valid rate'
      });

    }
    const id =req.params.id;
    
    const movie = await SpecificmovieModel.findByMovieDBId(id);
   
    if (movie!=null) {
      await movie.rate.push(value);
      await movie.save(); 
      res.status(201).json({
        code:201,
        msg: 'The rate has been updated'
        
        }); 
 
    }
    else {
      if(value!=null){
      res.status(401).json({
        code: 401,
        msg: 'The movie does not exist'
      });
    }
 
    }
    

 
  } catch (error) {
    next(error);
  }
});

  // router.post('/:id/:value', async(req, res, next,err) => {
  //   try{
  //     const id = parseInt(req.params.id);
  //     const value=parseFloat(req.params.value);
  //     RateMovies(id,value)

  
  //   }
  //   catch{
  //     console.log(err)
  //   }
  // });


export default router;