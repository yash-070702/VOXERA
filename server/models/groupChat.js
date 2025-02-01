const mongoose = require("mongoose");

const groupChatSchema = new mongoose.Schema({
  participants: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
  ],
  creator:{
    type:mongoose.Schema.ObjectId,
    ref:"User",
  },

  messages: [
    {
      from: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
      },
      type: {
        type: String,
        enum: ["Text", "Media", "Document", "Link"],
      },
      created_at: {
        type: Date,
        default: Date.now(),
      },
      text: {
        type: String,
      },
      file: {
        type: String,
      },
    },
  ],
});

const groupChat = new mongoose.model("OneToOneMessage",groupChatSchema);
module.exports = groupChat;