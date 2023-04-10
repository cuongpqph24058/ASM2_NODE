import joi from 'joi';

export const signupSchema = joi.object({
  name: joi.string().required().messages({
    "string.empty" : "bắt buộc phải nhập lại name",
    "any.required": "trường này bắt buộc phải nhập name",
  }),
  email: joi.string().email().required().messages({
    "string.empty" : "bắt buộc phải email",
    "any.required": "trường này bắt buộc phải nhập email",
  }),
  password: joi.string().required().min(6).messages({
    "string.empty" : "bắt buộc phải nhập lại mật khẩu",
    "string.min": "mật khẩu ít nhất {#limit} số ký tự",
    "any.required": "trường này bắt buộc phải nhập  password",
  }),
  confirmPassword:joi.string().valid(joi.ref("password")).required().messages({
    "string.empty" : "bắt buộc phải nhập lại mật khẩu",
    "any.only": "mật khẩu không khớp",
    "any.required": "trường này bắt buộc phải nhập confirm password",
  })
})

export const signinSchema = joi.object({
  email: joi.string().email().required().messages({
    "string.empty" : "bắt buộc phải email",
    "any.required": "trường này bắt buộc phải nhập email",
  }),
  password: joi.string().required().min(6).messages({
    "string.empty" : "bắt buộc phải nhập lại mật khẩu",
    "string.min": "mật khẩu ít nhất {#limit} số ký tự",
    "any.required": "trường này bắt buộc phải nhập  password",
  }),
})