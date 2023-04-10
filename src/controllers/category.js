import Category from '../models/category'
import Product from '../models/product'
import {categorySchema} from '../schemas/category'

export const create = async (req,res) => {
    try {

      const {error} = categorySchema.validate(req.body,{abortEarly: false})
      if(error){
        return res.status(401).json({
          message: error.details.map(err => err.message)
        })
      }

      const category = await Category.create(req.body)
      return res.status(201).json({
        message: "thêm thành công",
        category
      })
    } catch (error) {
      return res.status(401).json({
        message: error.message
      })
    }
}

export const getAll = async (req,res) => {
  try {
    const category = await Category.find()
    return res.status(201).json({
      message: "tất cả sản phẩm: ",
      category

    })
  } catch (error) {
    return res.status(401).json({
      message: error.message
    })
  }
}

export const get = async (req,res) => {
  try {
    const category = await Category.findById(req.params.id).populate("products")
    const product = await Product.find({categoryId: req.params.id})
    return res.status(200).json({
      message: "chi tiết danh mục:",
      category,product
    })
  } catch (error) {
    return res.status(401).json({
      message: error.message
    })
  }
}

export const update = async (req,res) => {
  try {
    const category = await Category.findOneAndUpdate(req.params.id,req.body,{new: true})
    return res.status(200).json({
      message: "cập nhật danh mục thành công:",
      category
    })
  } catch (error) {
    return res.status(401).json({
      message: error.message
    })
  }
}

export const remove = async (req,res) => {
  try {
    const category = await Category.findOneAndDelete(req.params.id)
    return res.status(200).json({
      message: "xóa danh mục thành công:",
      category
    })
  } catch (error) {
    return res.status(401).json({
      message: error.message
    })
  }
}