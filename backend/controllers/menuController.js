const Menu = require('../models/menuModel');

const productCreate = async (req, res) =>{
    try {
        const newProduct = await Menu.create(req.body);
        res.status(201).send(newProduct);
    }catch(error){
        res.status(500).send({error:error.message});
    }
}
const getAllProducts = async (req,res)=>{
    try{
        const products = await Menu.find();
        res.status(200).send(products);
    }catch(error){
        res.status(500).send({error:error.message});
    }
}
const getProductById = async (req,res)=>{
    try{
        const product = await Menu.findById(req.params.id);
        if(!product){
            return res.status(404).send({error:'Product not found'});
        }
        res.status(200).send(product);
    }catch(error){
        res.status(500).send({error:error.message});
    }
}
const updateProduct = async (req,res)=>{
    try{
        const updatedProduct = await Menu.findByIdAndUpdate(req.params.id, req.body, {new:true, runValidators:true});
        if(!updatedProduct){
            return res.status(404).send({error:'Product not found'});
        }
        res.status(200).send(updatedProduct);
    }catch(error){
        res.status(500).send({error:error.message});
    }
}
 
const deleteProduct = async (req,res)=>{
    try{
        const deletedProduct = await Menu.findByIdAndDelete(req.params.id);
        if(!deletedProduct){
            return res.status(404).send({error:'Product not found'});
        }
        res.status(200).send({msg:'Product deleted successfully'});
    }catch(error){
        res.status(500).send({error:error.message});
    }
}
module.exports = {
    productCreate,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct
}