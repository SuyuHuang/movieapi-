import userModel from '../api/users/userModel';

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
export async function insertRate() {
  console.log('Insert movies rate');
    try {
        await movieModel.collection.find().sort({popularity:1})
      await users.forEach(user => userModel.create(user));
      console.info(`${users.length} users were successfully stored.`);
    } catch (err) {
      console.error(`failed to Load user Data: ${err}`);
    }
  }
