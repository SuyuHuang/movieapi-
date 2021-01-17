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

router.get('/:id/review', async(req, res, next) => {
  try{
    const id = parseInt(req.params.id);

    const movie = await SpecificmovieModel.findByMovieDBId(id);
  res.status(200).send(movie.review);
  }
  catch{
    next(error);
  }
});

router.get('/:id/review/:author', async(req, res, next) => {
  try{
    const id = parseInt(req.params.id);
const author=req.params.author

  const movie = await SpecificmovieModel.findByMovieDBId(id);
  console.log(movie.review)
  console.log(movie.review[0].author)
  const list=[]

  const specificreview=movie.review.filter((review)=>{

    if(review.author==author){
      list.push(review)
    }
  
  }
  );

  
  if(list.length==0){
    res.status(401).json({
      code: 401,
      msg: "The author has not wrote any reviews"
        
      })
  }
  else{
  res.status(201).json({
    code: 201,
    // msg: list,
    length: list.length
  
    })
  }}
  catch(error){
    next(error);
  }
});
router.post('/:id/reviews', async (req, res, next) => {
  try {
    const id =parseInt(req.params.id);
    console.log(id)
     const movie = await SpecificmovieModel.findByMovieDBId(id);
    
     const reviews = req.body.reviews;
     const author=req.body.author;
     await movie.review.push({"author":author,"reviews":reviews});
     
      await movie.save(); 
      if(reviews){
      res.status(201).json({
        code: 201,
        msg: 'The review has been updated',
        
          
        })
      }
      else{
        res.status(401).json({
          code: 401,
          msg: 'Please enter the reviews'
            
          })
      }
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

router.put('/:id/reviews/:author', async (req, res, next) => {
  try {
    const id=req.params.id

  const author=req.params.author
  const comment = req.body.reviews;
  const movie = await SpecificmovieModel.findByMovieDBId(id);
  // update({"name":"alex"},{$set:{"age":"30"}})
ischanged=false
  movie.update({"review.author":"Kenny"},{$set:{"review.reviews":"abcd"}})
  // movie.update({"review":[{type:Object,type:Object}]},{$set:{"review":[{"author":"Kenny","review":"abcd"}]}})
  movie.review.filter((review)=>{

    if(review.author==author){
      review.reviews=comment
      ischanged=true
    }
  
  }
  );

if(ischanged){
  res.status(201).json({
    code:201,
    msg: 'The rate has been updated',
    length:movie.review.length,
    movie:movie.review
    }); 
  }
  else{
    res.status(401).json({
      code:401,
      msg: 'There is no record in this author',
      }); 
  }
  }
  catch (error){
    next(error);
  }
});


router.delete('/:id/reviews/:author', async (req, res, next) => {
  try {
    const id=req.params.id
const list=[]
  const author=req.params.author
  const comment = req.body.reviews;
  const movie = await SpecificmovieModel.findByMovieDBId(id);

  var ischanged=false

  movie.review.filter((review)=>{

    if(review.author!=author){
      list.push({"author":review.author,"reviews":review.reviews})
      ischanged=true
    }
  
  })

movie.review=list
if(ischanged){
  res.status(201).json({
    code:201,
    msg: 'The remark has been deleted',
    length:movie.review.length,
    }); 
  }
  else{
    res.status(401).json({
      code:401,
      msg: 'There is no record in this author',
      }); 
  }
  }
  catch (error){
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