const User = require("../models/User");
const {objectId} = require("mongodb");



async function signup(req, res) {

  try {
     const {name, email, phone, password} = req.body
    const dbUser = await User.create({name, email, phone, password})
    res
      .status(200)
      .json(dbUser)
  } catch (error) {
    res
      .status(500)
      .json(error)
    }
   

 }


  async function getUserById(req, res) {
    try {
      const dbUser = await User.findById(req.params.id)
      res
        .status(200)
        .json(dbUser)
    } catch (error) {
      res
        .status(500)
        .json(error)
    }
  }

  // async function updateUser(req, res) {
  // }

async function login(req, res) {

try {
  const {email, password} = req.body
  const dbUser = await User.findOne({email})
  if (!dbUser) {
    res
      .status(404)
      .json({message: "No user with that email!"})
    return
  }
  const validPassword = (password === dbUser.password)
  if (!validPassword) {
    res
      .status(404)
      .json({message: "Incorrect password!"})
    return
  }
  res
    .status(200)
    .json(dbUser._id)
} catch (error) {
  res
    .status(500)
    .json(error)
  }
  
}
async function logout(req, res) {
  try {
    if (req.session.loggedIn) {
      req.session.destroy(() => {
        res
          .status(204)
          .end()
      })
    } else {
      res
        .status(404)
        .end()
    }
  } catch (error) {
    res
      .status(500)
      .json(error)
  }
}

module.exports = {
  signup,
  // getUser,
  getUserById,
  // updateUser,
  login,
  logout
}
