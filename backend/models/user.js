const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);
const userSchema = mongoose.Schema({
  _id:mongoose.Schema.Types.ObjectId,
  email:String,
  password:String

});

module.exports = mongoose.model('User',userSchema)