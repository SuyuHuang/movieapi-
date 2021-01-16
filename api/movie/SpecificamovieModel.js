import mongoose from 'mongoose';


const Schema = mongoose.Schema;


const SpecificmovieSchema = new Schema({
  id: { type: Number, required: true },
  also_known_as:{type:Array},
  biography:{type:String},
  name:{type:String},
  birthday:{type:String},
  known_for_department:{type:String},
  imdb_id:{type:String},
  genres:{type:Array},
  production_countries:{type:Object},
  spoken_languages:{type:Object},
  production_companies:{type:Array},
  review:[{type:String}],

  rate: [{type: Number}]



});
SpecificmovieSchema.statics.findByMovieDBId = function (id) {
  return this.findOne({ id: id });
};

export default mongoose.model('specificmovie', SpecificmovieSchema);


