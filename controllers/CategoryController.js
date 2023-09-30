import categoryModel from "../models/CategoryModel.js"
import slugify from 'slugify'
export const createCategoryController = async(req, res) =>{
    try {
        const {name} = req.body;
        if(!name){
            return res.status(401).send({
                message:'Name is required'

            })
        }
        const existingCategory = await categoryModel.findOne({name})
        if(existingCategory){
            return res.status(200).send({
                success:false,
                message:'category already exists'
            })
        }
        const category = await new categoryModel({name, slug:slugify(name)}).save()
        res.status(201).send({
            success:true,
            message:'New Category is created',
            category,
        })
    } catch (error) {
        //console.log(error)
        res.status(500).send({
            success:false,
            message:'Error in Category',
            error

        })
        
        
    }

}

// update ctaegory
export const updateCategoryController = async(req, res) =>{
    try {
        const {name} =req.body
        const {id} = req.params
        const category = await categoryModel.findByIdAndUpdate(id, {name, slug:slugify(name)},{new:true})
        res.status(200).send({
            success:true,
            message:'Category updated csuccessfully',
            category
        })
       
        
        
    } catch (error) {
        //console.log(error)
        res.status(500).send({
            success:false,
            message:'Error while updating category',
            error

        })
        
        
    }


}

// get all category
export const categoryController = async(req, res) =>{
    try {
        const category = await categoryModel.find({})
        res.status(200).send({
            success:true,
            message:'All categories list',
            category,
        })
        
    } catch (error) {
        //console.log(error)
        res.status(500).send({
            success:false,
            message:'Error while getting all categories',
            error
        })
        
    }

}

//single category
export const singleCategoryController = async(req, res) =>{
    try {
        
        const category = await categoryModel.findOne({slug:req.params.slug})
        res.status(200).send({
            success:true,
            message:'Get single category successfully',
            category
            
        })
        
    } catch (error) {
        //console.log(error)
        res.status(500).send({
            success:false,
            message:'Error while getting single category',
            error
        })
        
    }


}
//delete category
export const deleteCategoryController = async(req, res) =>{
    try {
        const {id} =req.params
        await categoryModel.findByIdAndDelete(id)
        res.status(200).send({
            success:true,
            message:'Category deleted successfully',
        })
        
    } catch (error) {
        //console.log(error)
        res.status(500).send({
            success:false,
            message:'Error while deleting category',
            error

        })
        
    }

}