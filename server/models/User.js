import mongoose from "mongoose";

const Users = mongoose.model("user",{
        name: {
          type: String,
          required: true,
        },
        email: {
          type: String,
          required: true,
        },
        password: {
          type: String,
          required: true,
        },
        date: {
          type: Date,
          default: Date.now,
        },
        type: {
          type: String,
          default: 'user',
        },   
      });

export default Users;