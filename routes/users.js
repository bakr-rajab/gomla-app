const router =require('express').Router()
const User=require('../models/User')


router.get('/',async (req,res)=>{
    const user=await User.find({},{'username':1,'email':1,'_id':0})
     res.json(user)
})
router.get('/:id',(req,res)=>{
    res.send('get spesific users  '+req.params.id)
})

module.exports=router