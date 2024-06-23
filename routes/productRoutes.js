const router = require('express').Router();
const mongoose = require('mongoose')

const { Request } = require('node-fetch');
const Product = require('../models/Product');
const { HttpStatusCode } = require('axios');

router.post("/", (req, res) =>{
    let name = req.body.name;
    let price = req.body.price;
    let quantity = req.body.quantity;

    let newProduct = new Product({
        name: name,
        price: price,
        quantity: quantity
    });

    newProduct.save()
    .then((result)=>{
        res.json({
            success: true,
            msg: "Produto Adicionado",
            result:{
                name: result.name
            }

        })
    })
    .catch((err) =>{
        res.status(500).json({msg: err})
    })
});


router.get('/', async(req,res) =>{
    try {
        const products = await Product.find()
        res.status(200).json(products)
    } catch (error) {
        res.status(500).json({ error: error })
    }
})

router.get("/:id", async(req,res) =>{
    let id = req.params.id
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(422).json({status : HttpStatusCode.UnprocessableEntity,message: 'Produto não encontrado' });
    }
    try {
        const product = await Product.findById({_id:id})
        if(!product){
            return res.status(404).json({status : HttpStatusCode.UnprocessableEntity,message: 'Produto não encontrado' });
        }
        res.status(200).json(product)
    } catch (error) {
        res.status(500).json({error: error})
    }
})
//update
router.patch("/:id", async(req,res) =>{
    let id = req.params.id

    const {name,price,quantity} = req.body

    const product = {
        name,price,quantity
    }
    try{
        const updatedProduct =  await Product.updateOne({_id:id}, product)
        if(updatedProduct.matchedCount ===0){
            res.status(422).json({message:"Produto não encontrado"})
            return
        }
        res.status(200).json(product)
    }catch(error){
        res.status(500).json({error:error})
    }
})

router.delete("/:id", async(req,res) =>{
    const id = req.params.id;
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'ID inválido' });
    }
    
    try {
        const product = await Product.findOne({_id:id})
        const result =  await Product.deleteOne({_id:id})
        if (result.deletedCount === 0) {
            return res.status(422).json({ message: 'Produto não encontrado' });
        }
        
        res.status(200).json({data : product,message : "Produto Excluído com Sucesso "})
    } catch (error) {
        res.status(500).json({error:error})
    }
} )


module.exports = router