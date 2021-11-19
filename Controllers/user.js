const User=require('../models/User')
const {body}=require('express-validator/check')
const { validationResult } = require('express-validator/check');

exports.createUser = async (req, res, next) => {
    try {
       const errors = validationResult(req); // Finds the validation errors in this request and wraps them in an object with handy functions
 
       if (!errors.isEmpty()) {
         res.status(422).json({ errors: errors.array() });
         return;
       }
 
       const { username, email } = req.body
       
       const user = await User.create({
         username,
         email 
       }) 
       res.json(user)
    } catch(err) {
      return next(err)
    }
 }

exports.validate=(method)=>{
    switch (method) {
        case "createUser":{
                return[
                    body('username',"usernamedoesn't exist... ").exists(),
                    body('email',"invalid Email").exists().isEmail(),
                ]
            }
            
            break;
    
        default:
            break;
    }
}