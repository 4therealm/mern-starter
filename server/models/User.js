const mongoose = require("mongoose");
// import bcrypt from "bcrypt";
const { Schema } = mongoose;
const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      // unique: true,
      match: [/.+@.+\..+/, "Please enter a valid email address"],
    },
    phone: {
      type: String,
      required: true,
      // unique: true,
      match: [/^\d{10}$/, "Please enter a valid phone number"],
    },
    password: {
      type: String,
      required: true,
      minlength: 5,
    },
    pets: [
      {
        type: Schema.Types.ObjectId,
        ref: "Pet",
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);
// UserSchema.pre("save", async function (next) {
//   if (!this.isModified("password")) {
//     return next();
//   }
//   try {
//     this.password = await bcrypt.hash(this.password, 10);
//     next();
//   } catch (err) {
//     return next(err);
//   }
// });

// // compare hashed password with user input password
// UserSchema.methods.comparePassword = async function (password) {
//   return await bcrypt.compare(password, this.password);
// };


const User = mongoose.model("User", UserSchema);

module.exports = User;