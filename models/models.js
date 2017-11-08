var mongoose = require('mongoose');

//schema not required for monngo, safe not sorry
var userSchema = new mongoose.Schema({
  username: String,
  password: String,
  created_at: {type: Date, default: Date.now}
});

var postSchema = new mongoose.Schema({
  derp: String,
  username: String,
  time_stamp: {type: Date, default: Date.now}
});

var ChatSchema = mongoose.Schema({
  created: Date,
  content: String,
  username: String,
  room: String
});

//MongoDB Schemas
var chatMessage = new mongoose.Schema({
	username: String,
	message: String
});


mongoose.model("User", userSchema);
mongoose.model("Post", postSchema);
mongoose.model("Chat", ChatSchema);
mongoose.model('Message', chatMessage);