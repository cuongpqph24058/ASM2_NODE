import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import User from '../models/user'
import {signupSchema,signinSchema} from '../schemas/user'


export const signup = async (req, res) => {
try {
  const {error} = signupSchema.validate(req.body)
  if(error){
    return res.status(401).json({
      message: error.details.map(err => err.message)
    })
  }

  const userExist = await User.findOne({email: req.body.email})
  if(userExist){
    return res.status(401).json({
      message: "email đã tồn tại"
    })
  }

  const hashedPassword = await bcrypt.hash(req.body.password,10)
  
  const user = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword
  })

const token = jwt.sign({id: user._id},"123456",{expiresIn: "1d"})
user.password = undefined

  return res.status(201).json({
    message: "tài khoản đăng ký thành công",
    accessToken: token,
    user
  })

} catch (error) {
  return res.status(401).json({
    message: error.message
  })
}
}

export const signin = async (req, res) => {
  try {
    const {error} = signinSchema.validate(req.body)
  if(error){
    return res.status(401).json({
      message: error.details.map(err => err.message)
    })
  }

  const user = await User.findOne({email:req.body.email})
  if(!user){
    return res.status(401).json({
      message: "email chưa đăng ký"
    })
  }


  
const isMarst = await bcrypt.compare(req.body.password,user.password)
if(!isMarst){
  return res.status(401).json({
    message: "mật khẩu sai"
  })
}

const token = jwt.sign({id: user._id},"123456",{expiresIn: "1d"})
user.password = undefined

  return res.status(201).json({
    message: "đăng nhập thành công",
    accessToken: token,
    user
  })
  } catch (error) {
    return res.status(401).json({
      message: error.message
    })
  }
  }