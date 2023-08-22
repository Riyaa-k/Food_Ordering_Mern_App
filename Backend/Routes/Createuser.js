const express = require('express');
const { body, validationResult } = require('express-validator');
const router = express.Router();
const user = require('../models/User');

const jwt =require("jsonwebtoken");

const bcrypt=require('bcryptjs');
const jwtSecret="mynameisanshitakoshtaendtoendencryption";

// Router for create user signup
router.post(
  '/createuser',
  body('email').isEmail(),
  body('name').isLength({ min: 4 }),
  body('password', 'incorrect password').isLength({ min: 4 }),
  async (req, res) => {
    
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { password } = req.body;

    if (password) {
      await body('passwordConfirmation')
        .equals(password)
        .withMessage('passwords do not match')
        .run(req);
    }

    const salt=await bcrypt.genSalt(10);
    let secPassword=await bcrypt.hash(req.body.password,salt);

    try {
      await user.create({
        name: req.body.name,
        password: secPassword,
        email: req.body.email,
        location: req.body.location,
      });
      res.json({ success: true });
    } catch (error) {
      console.log(error);
      res.json({ success: false });
    }
  }
);

// Router for login user

router.post(
  '/loginuser',  body('email',"Enter valid email").isEmail(),
  
  body('password', 'incorrect password').exists(),
  async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { password } = req.body;

    if (password) {
      await body('passwordConfirmation')
        .equals(password)
        .withMessage('passwords do not match')
        .run(req);
    }

    let email = req.body.email;
    try {
      let userData = await user.findOne({ email });
      if (!userData) {
        return res.status(400).json({ errors: "Try logging with correct credential" })
      }
      const pwdCompare=await bcrypt.compare(req.body.password,userData.password);

      if (!pwdCompare) {
        return res.status(400).json({ errors: "Try logging with correct  Password" })

      }
      const data={
        user:{
          id:userData.id
        }
      }
      const authToken=jwt.sign(data,jwtSecret);
      return res.json({ success: true,authToken:authToken });



    } catch (error) {
      console.log(error);
      res.json({ success: false });
    }
  }
);



module.exports = router;

