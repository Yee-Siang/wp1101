import mongoose from 'mongoose'
const Schema = mongoose.Schema;
const CostSchema = new Schema({
    UserID :    String,
    Title :     String,
    IsOutcome : Boolean,
    Money :     Number,
    Tag :       String,
    Day:       [String ,String ,String ]
    
},{
    collection: 'Cost'

});
const Cost = mongoose.model( 'Cost' , CostSchema );
export default Cost;