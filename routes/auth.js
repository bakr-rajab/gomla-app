const router =require('express').Router()
const auth=require('./verifyToken')

const AuthController=require('../Controllers/AuthController')
// dotenv.config();


router.post('/register',AuthController.register)

router.post('/login',AuthController.login)

router.get('/currentUser',auth,(req, res)=>{
    // console.log(req['payload']);
        const {username,email,_id}=req.user.payload
     res.status(200).json({username,email,_id})
    
})

// function authenticateToken(req, res, next) {
//   const authHeader = req.headers['authorization']
//   const token = authHeader && authHeader.split(' ')[1]
//     // console.log(token);
//   if (token == null) return res.sendStatus(401)

//   jwt.verify(token, process.env.SECRET, (err, user) => {
    

//     if (err) return res.sendStatus(403)

//     req.user = user
//     // console.log(user)
//     next()
//   })
// }
module.exports=router