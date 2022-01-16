import mongoose from 'mongoose'
const Schema = mongoose.Schema;
const UserSchema = new Schema({
    UserID :    String,
    Password :  String, //Password的用處僅為驗證碼，而非密碼
    Nickname :  String,
    School :    String,
    AboutMe :   String,
    Birthday : [String ,String ,String ]
},{
    collection: 'User'

});
const User = mongoose.model( 'User' , UserSchema );
export default User;