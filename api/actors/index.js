import express from 'express';

import actorModel from './actorModel'
const router = express.Router();

router.get('/', (req, res, next) => {
  actorModel.find().then(actors => res.status(200).send(actors)).catch(next);
});

router.get('/:id', (req, res, next) => {
  const id = parseInt(req.params.id);
  actorModel.findByActorDBId(id).then(actor => res.status(200).send(actor)).catch(next).catch((error)=>next(error));
  
});

router.get('/kind/:kind', (req, res, next) => {
  const kind=req.params.kind
  if (kind=="popularity") {
    actorModel.collection.find().sort({kind:1})
    actorModel.find().then(actors => res.status(200).send(actors)).catch(next);
  }
  else{
    res.status(401).json({
      code:401,
      msg: 'The actors can not be sorted by this kind'
      
      }); 
  }

  
});


export default router;