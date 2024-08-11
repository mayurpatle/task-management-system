const express  = require('express')  ; 
const bcrypt =  require('bcrypt') ; 
const User =  require('../models/User') ;  
const jwt = require('jsonwebtoken');
const router  =  express.Router()   ;  


// @route   POST  /api/register   
// @desc    Register  a  new  user 
// @access  Public  

router.post('/register'  ,  async (req , res  )  => {
    const {username  ,  email  , password  }  = req.body ; 

    try {
        // Validate user input
        if (!username || !email || !password) {
            return res.status(400).json({ msg: 'Please enter all fields' });
        }

        // Check for valid email format (basic regex)
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ msg: 'Please enter a valid email' });
        }

        let user =  await User.findOne({username  }) ;  
        if (user) return res.status(400).json({msg: 'Username  already exists try  with another ' }) ;

        // check if the  user is  already present 
        user =  await User.findOne({email }) ;  
        if (user) return res.status(400).json({msg: 'User already exists' }) ;

        // create a  new  user Instance   
        user = new User({
            username  , 
            password   ,  
            email     
        });   

        // Hash the  password  before saving the user  
        const salt = await bcrypt.genSalt(10) ; 
        user.password = await bcrypt.hash(password, salt) ;

        // save the  user to the  database 
        await user.save() ;  

        res.status(201).json({ msg: 'User registered successfully' });
        
    }catch (error) {
    console.log(error);
    console.error(error.message);
    res.status(500).send('Server error');
    }

});  

// @route   POST /api/login
// @desc    Log in a user and return a JWT
// @access  Public
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the user exists
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    // Check if the password is correct
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    // Create a payload for the JWT
    const payload = {
      user: {
        id: user.id
      }
    };

    // Sign the JWT and send it back
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '1h' },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;

