import { raw } from "express";
import { activateUserService, changePasswordService, forgetPasswordService, loginUserService, registerUserService, userProfileService } from "../service/index.service.js";

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

export const activateUser = async (req, res, next) => {
  try {
    const userPayload = req.payload
    const otpCode = req.body.otp
    const result = await activateUserService(userPayload, otpCode)
    const {success, error, user} = result
    
    if (success) {
      return res.status(201).send({message:"Successfully activated", user})
    } else {
      return res.status(400).send(error.message)
    }
  } catch (error) {
    next(error)
  }
}

export const forgetPassword = async (req, res, next) => {
  try {
    const userData = req.payload
    const result = await forgetPasswordService(userData)
    const {success, msg, error} = result
    if (success) {
      return res.status(201).send({msg})
    }
    return res.status(401).send(error)
  } catch (error) {
    next(error)
  }
}

export const changePassword = async (req, res, next) => {
  try {
    const userId = req.params.id 
    const userData = req.payload
    const data = req.body
    if (userId != userData.id) {
      return res.status(401).send("You cannot change others password")
    }
    const result = await changePasswordService(userData, data)
    const {success, error} = result
    if (success) {
      return res.status(201).send({msg:"password updated successfully"})
    }
    return res.status(400).send(error.message)
  } catch (error) {
    next(error)
  }
}
