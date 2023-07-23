import mongoose, { Schema } from 'mongoose';

const ChatSchema = new Schema({
    username:{
        type: String,
        required: true
    },
    message:{
        type: String,
        required: true
    }
},{
    versionKey: false
})

const Chat = mongoose.model('chat', ChatSchema)

export { Chat }