import mongoose from 'mongoose'
const Schema = mongoose.Schema;

const WordSchema = new Schema({
    UserID : String,
    Word: String,
    Answer: String
},{collection: 'Word'});

const Word = mongoose.model( 'Word' , WordSchema );
export default Word;