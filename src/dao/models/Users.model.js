import mongoose, { Schema } from 'mongoose';


const UserSchema = new Schema({
    name : {
        type: String,
        required: true,
        trim: true,
    },
    lastname:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    }
}, {
    versionKey: false
})


const Users = mongoose.model('user', UserSchema)

export {Users}
