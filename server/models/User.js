const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      validate: {
        validator: function (email) {
          return String(email)
            .toLowerCase()
            .match(
              /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
        },
        message: (props) => `Email (${props.value}) is invalid!`,
      },
      trim: true,
    },

    password: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
    },
    
    passwordResetToken: {
      type: String,
    },
    resetPasswordExpires: {
      type: Date,
    },
    passwordChangedAt: {
      type: Date,
    },
    socket_id:{
      type:String
    },
    friends:[
      {
        type:mongoose.Schema.ObjectId,
        ref:"User",
      }
    ],
     createdAt: {
        type: Date,
        default: Date.now(),
      },
      updatedAt: {
        // unselect
        type: Date,
      },
      status: {
        type: String,
        enum: ["Online", "Offline"]
      }
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
