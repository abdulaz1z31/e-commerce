import {hash, genSalt, compare} from "bcrypt"


const generateSalt = async () => await genSalt(10)

export const generateHashPassword = async (password) => {
    const salt = await generateSalt()
    const hashPassword = hash(password, salt)
    return hashPassword
}


export const comparePassword = async (userPassword, password) => {
    return compare(userPassword, password)
}