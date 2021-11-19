const router =require('express').Router()
const CategoryController=require('../Controllers/CategoryController')
const ProductController=require('../Controllers/ProductController')

router.get('/',CategoryController.index)

router.get('/:id',CategoryController.show)

router.post('/',CategoryController.create)
// router.post('/test',(req,res)=>{
//     res.json(req.body)
// })
router.post('/:id/products',ProductController.createProduct)
router.get('/:id/products',ProductController.index)

module.exports=router