import Product from "../model/product.js";

export const createProduct=async (req, res) => {
    try {
        const product = await Product({userId:req.userId,...req.body});
        await product.save();
        res.status(200).json({message:"Add New Product",product})
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

export const getAllProducts=async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json({message: "Products Data",products});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const updateProduct =async (req, res) => {
    try {
        const {id} = req.params
        const checkUser= await Product.findOne({_id:id})
        if(checkUser.userId.toString()  !== req.userId.toString()){
            return res.status(401).json({message:"You have no permission to update this product"})
        }
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, {new: true});
        if(!product) return res.status(404).json({message:"Product not found"})
        res.status(200).json({message:"Product updated successfully",product})
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const deleteProduct =async (req, res) => {
    try {
        const {id} = req.params
        const checkUser= await Product.findOne({_id:id})
        if(checkUser.userId.toString()  !== req.userId.toString()){
            return res.status(401).json({message:"You have no permission to delete this product"})
        }
        const product = await Product.findByIdAndDelete(req.params.id);
        if(!product) return res.status(404).json({message:"Product not found"})
        res.status(200).json({message:"Product deleted successfully"})
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}