import dotenv from 'dotenv';
import express from 'express';
import moviesRouter from './api/movies';
import bodyParser from 'body-parser';
import './db';
import session from 'express-session';
import genresRouter from './api/genres'
import passport from './authenticate';
import loglevel from 'loglevel';
import {loadUsers, loadMovies,loadUpcomingMovies, loadActors} from './seedData';
import usersRouter from './api/users';
import upcomingRouter from './api/upcoming';
import actorRouter from './api/actors'
import SpecificactorRouter from './api/actor'
import SpecificmovieRouter from './api/movie'

dotenv.config();


if (process.env.NODE_ENV === 'test') {
  loglevel.setLevel('warn')
} else {
  loglevel.setLevel('info')
}

if (process.env.SEED_DB === 'true' && process.env.NODE_ENV === 'development') {
  loadUpcomingMovies();
  loadUsers();
  loadMovies();
  loadActors();

}

// eslint-disable-next-line no-unused-vars
const errHandler = (err, req, res, next) => {
  /* if the error in development then send stack trace to display whole error,
  if it's in production then just send error message  */
  // eslint-disable-next-line no-undef
  if(process.env.NODE_ENV === 'production') {
    return res.status(500).send(`Something went wrong!`);
  }
  res.status(500).send(`Hey!! You caught the error , ${err.stack} `);
};

const app = express();

const port = process.env.PORT ;

app.use(session({
  secret: 'ilikecake',
  resave: true,
  saveUninitialized: true
}));

app.use(passport.initialize());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use('/api/users', usersRouter);
app.use('/api/actors', actorRouter);
// app.use('/api/movies', passport.authenticate('jwt', {session: false}), moviesRouter);
app.use('/api/actor',SpecificactorRouter)
app.use('/api/movies', moviesRouter);
app.use('/api/movie', SpecificmovieRouter);
app.use('/api/upcoming', upcomingRouter); 
app.use('/api/genres', genresRouter); 
// try{
// app.use('/api/movies', moviesRouter);
// }
// catch(err){
//   console.log('错误为：'+err);

//     res.writeHead(200,{'Contet-Type':'text/html;charset=utf-8'});
//     res.write(err.toString());
//     res.end('');

// }
app.use(errHandler);

let server = app.listen(port, () => {
  loglevel.info(`Server running at ${port}`);
});

module.exports = server