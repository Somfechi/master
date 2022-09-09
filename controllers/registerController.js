const User = require('../models/User')
const Note = require('../models/Note')
const asyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt')


// CREATE NEW USERS
// @access Private
const handleNewUser = asyncHandler(async (req, res) => {
  const { firstname, lastname, username, email, dateOfBirth, password} = req.body

  // Confirm data
  if (!firstname || !lastname || !username || !email || !dateOfBirth || !password ) {
      return res.status(400).json({ message: 'All fields are required' })
  }

    // Check for duplicate username

  const duplicateName = await User.findOne({ username }).lean().exec()

  if (duplicateName) {
      return res.status(409).json({ message: 'Username already in use' })
  }
  //check if email already exist
    const duplicateEmail = await User.findOne({ email }).lean().exec()

    if (duplicateEmail){
      //if user exists
      return res.status(409).json({ message:'email already in use' })

    }
            

  // Hash password
  const hashedPwd = await bcrypt.hash(password, 10) // 10 salt rounds

  const userObject = { firstname, lastname, username, email, dateOfBirth, "password": hashedPwd }

  // Create and store new user 
  const user = await User.create(userObject)

  if (user) { //created 
      res.status(201).json({ message: `New user ${username} created` })
  } else {
      res.status(400).json({ message: 'Invalid user data received' })
  }
})



module.exports ={ handleNewUser } ;