import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import User from "../models/user"

export const checkPermission = async (req, res, next) => {
try {
  if(!req.headers.authorization){
    return res.status(401).json({
      message: "bạn chưa đăng nhập"
    })
  }

  const token = await req.headers.authorization.split(" ")[1]

  jwt.verify(token,"123456",async(error,decoded)=>{
    if(error === "JsonWebTokenError"){
      return res.status(401).json({
        message: "token không hợp lệ"
      })
    }
  })

  const user = await User.findById(decoded.id);
  if(user.role !== "admin"){
    return res.status(403).json({
      message: "bạn không phải là admin"
    })
  }


  req.user = user
  next()
} catch (error) {
  return res.status(401).json({
    message: error
  })
}

}