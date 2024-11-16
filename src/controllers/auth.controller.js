import { loginUserService, registerUserService, userProfileService } from "../service/index.service.js";

export const registerUser = async (req, res, next) => {
  try {
    const userData = req.body;
    const result = await registerUserService(userData);
    const { user, success, error } = result;
    if (success) {
      return res.status(201).send({ message: "created", data: user });
    } else {
       res.status(400).send(error.message)
    }
  } catch (error) {
    next(error);
  }
};

export const loginUser = async (req, res, next) => {
  try {
    const userData = req.body;
    const result = await loginUserService(userData)
    const {success, error, token} = result
    
    if (success) {
        return res.status(200).json({message:"You are logged in successfully", token})
    } 
    return res.status(400).send(error.message)
  } catch (error) {
    next(error);
  }
};


export const userProfile = async (req, res, next) => {
   try {
     const currenUser = req.payload 
     const result = await userProfileService(currenUser.username)
     const {success, error, user} = result
     if (success) {
       return res.status(200).send({user})
     }
     return res.status(404).send(error.message)
   } catch (error) {
      next(error)
   }
}