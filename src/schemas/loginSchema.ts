import * as yup from 'yup'

export const passwordRegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/


const loginSchema = yup.object({
  email: yup.string().email('Email is invalid').required('Email is required'),
  password: yup.string().required('Password is required').matches(passwordRegExp, 'Passworrd is too weak')
})

export default loginSchema