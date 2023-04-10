import Product from '../models/product'
import {productSchema} from '../schemas/product'


export const create = async (req,res) => {
    try {
      const {error} = productSchema.validate(req.body,{abortEarly: false})
      if(error){
        return res.status(401).json({
          message: error.details.map(err => err.message)
        })
      }

      const product = (await Product.create(req.body))
      return res.status(201).json({
        message: "thêm thành công",
        product
      })
    } catch (error) {
      return res.status(401).json({
        message: error.message
      })
    }
}

export const getAll = async (req,res) => {
  const {_page = 1,_order ="asc",_limit = 10,_sort="createAt" } =req.body
  const options = {
    page: _page,
  limit: _limit,
    sort: {[_sort]:_order=="desc" ? -1 : 1},
  }
  try {
    const product = await Product.paginate({},options)
    return res.status(201).json({

      message: "tất cả sản phẩm: ",
      product

    })
  } catch (error) {
    return res.status(401).json({
      message: error.message
    })
  }
}

export const get = async (req,res) => {
  try {
    const product = await Product.findById(req.params.id).populate("categoryId")
    return res.status(200).json({
      message: "chi tiết sản phẩm:",
      product
    })
  } catch (error) {
    return res.status(401).json({
      message: error.message
    })
  }
}

export const update = async (req,res) => {
  try {
    const product = await Product.findOneAndUpdate(req.params.id,req.body,{new: true})
    return res.status(200).json({
      message: "cập nhật sản phẩm thành công:",
      product
    })
  } catch (error) {
    return res.status(401).json({
      message: error.message
    })
  }
}

export const remove = async (req,res) => {
  try {
    const product = await Product.findOneAndDelete(req.params.id)
    return res.status(200).json({
      message: "xóa sản phẩm thành công:",
      product
    })
  } catch (error) {
    return res.status(401).json({
      message: error.message
    })
  }
}