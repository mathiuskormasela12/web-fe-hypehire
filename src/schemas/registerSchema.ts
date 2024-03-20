import * as yup from 'yup'

export const passwordRegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/

const registerSchema = yup.object({
  email: yup.string().email('Email is invalid').required('Email is required'),
  password: yup.string().required('Password is required').matches(passwordRegExp, 'Passworrd is too weak'),
  repeatPassword: yup.string().required('Repeat password is required').oneOf([yup.ref('password')], 'Password does not match')
})

export default registerSchema