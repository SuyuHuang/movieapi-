import express from 'express';
import {
   getMovieReviews
} from '../tmdb-api';
import movieModel from './movieModel'
const router = express.Router();

router.get('/', (req, res, next) => {
  movieModel.find().then(movies => res.status(200).send(movies)).catch(next);
});

router.get('/:id', (req, res, next) => {
  const id = req.params.id;
  if(typeof(id)!='number'){
 
    res.status(34).json({
      success: false,
          status_code: 34,
          status_message: "The resource you requested could not be found.",
    });
  }
  movieModel.findByMovieDBId(id).then(movie => res.status(200).send(movie)).catch(next).catch((error)=>next(error));
  
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
router.post('/:id', async (req, res, next) => {
  try {
 
    const newFavourite = req.body.id;

    const userName = req.params.userName;
    const movie = await movieModel.findByMovieDBId(newFavourite);
    const user = await User.findByUserName(userName);

    if (user.favourites.includes(movie._id)) {
      res.status(401).json({
        code: 401,
        msg: 'The movie has appeared'
      });
    }
    else {
      await user.favourites.push(movie._id);
      await user.save();
      res.status(201).json(user);
    }
  } catch (error) {
    next(error);
  }
});


export default router;