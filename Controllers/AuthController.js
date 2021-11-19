const User = require("../models/User");
const bcrypt = require("bcrypt");
const gravatar = require("gravatar");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { registerValidation } = require("../validation");
const {loginValidation} =require("../validation");

exports.register = async (req, res,next) => {
 
    // validate input parameters
    const { error } =registerValidation(req.body);
    if (error) {
      res
        .status(400)
        .json({ error: error.details[0].message, status: "error" });
    }
    // check if user  already registered
    const emailExist=await User.findOne({ email: req.body.email })
    if(emailExist) return res.status(404).json({ errors:"user already registered..." })

    const avatar = gravatar.url(req.body.email, {
      s: "200",
      r: "pg",
      d: "mm",
    });
    const { username, email, password } = req.body;
    const newUser = new User({
      username,
      email,
      password,
      profileImg: avatar,
    }); 
    try {
        await bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) next(err);
            newUser.password = hash;
        newUser.save().then((savedUser) => res.status(200).json(savedUser))
            .catch((err) => next(err))
          });
      });
      
  } catch (error) {
    next(error);
  }
};
exports.login=async (req,res,next)=>{
  try {
    // validate input data
    const { error } =loginValidation(req.body);
    if (error) {
      res
        .status(400)
        .json({ error: error.details[0].message});
    }
      const user=await User.findOne({'email':req.body.email})
      !user && res.status(404).json('user not found'+req.body.email)

      const password=await bcrypt.compare(req.body.password,user.password)
      !password &&res.status(404).json('wrong password')
      
      //      create token
      const token=jwt.sign({payload:user},process.env.SECRET)
      res.header('auth-token',token).send(token)
    //  await jwt.sign({payload:user},process.env.SECRET,(error,token) =>{
    //       res.json(token);
    //   })
      // res.status(200).json(user)
  } catch (err) {
      next(err)   
  }
  
}