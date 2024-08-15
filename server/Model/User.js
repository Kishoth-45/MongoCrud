const mongoose=require('mongoose')



const UserSchema = new mongoose.Schema({
    Name: {
      type: String,
      required: true
    },
    Description: {
      type: String,
      required: true
    },
    date: {
      type: Date,
      default: Date.now
    },
    time: {
      type: String,
      default: () => new Date().toLocaleTimeString()
    }
  });

const UserModel=mongoose.model('form',UserSchema)

module.exports=UserModel
