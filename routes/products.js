const router =require('express').Router()
const ProductController=require('../Controllers/ProductController')

router.get('/',ProductController.getAll)

router.get('/:id',ProductController.show)

router.post('/',ProductController.create)
// router.post('/test',(req,res)=>{
//     res.json(req.body)
// })
module.exports=router