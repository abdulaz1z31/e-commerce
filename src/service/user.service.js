import {
  comparePassword,
  createTokens,
  generateHashPassword,
  otpGenerator,
  sendMail,
} from "../helpers/index.helper.js";
import { pool } from "../database/db.js";

export const registerUserService = async (userData) => {
  try {
    const { username, email, password, phone_number } = userData;
    const role = userData?.role || "user";
    const hashPassword = await generateHashPassword(password);
    const checkUser = await findUserByUsername(username);
    if (checkUser) {
      throw new Error("user already exists");
    }
    const otp = await otpGenerator();
    const result = addOtp(username, otp);
    if (!result) {
      throw new Error("wrong plase try again");
    }
    await sendMail(email, "OTP", `This is your password : ${otp}`);

    const data = await pool.query(
      `
      INSERT INTO users (email, password, username, role, phone_number) VALUES 
      ($1, $2, $3, $4, $5) RETURNING * ;
      `,
      [email, hashPassword, username, role, phone_number]
    );
    const user = data.rows[0];
    delete user.password;
    return { success: true, user };
  } catch (error) {
    return { success: false, error };
  }
};

export const loginUserService = async (userData) => {
  try {
    const { username, password } = userData;
    const currenUser = await findUserByUsername(username);
    if (!currenUser) {
      throw new Error("User not found");
    }
    const isEqualPassword = await comparePassword(
      password,
      currenUser.password
    );
    if (!isEqualPassword) {
      throw new Error("Username or password not valid");
    }
    const payload = {
      id: currenUser.id,
      username: currenUser.username,
      email: currenUser.email,
      role: currenUser.role,
      isActive: currenUser.is_active,
    };

    const token = await createTokens(payload);

    return { success: true , token};
  } catch (error) {
    return { success: false, error };
  }
};

export const userProfileService = async (username) => {
   try {
     const currenUser = await findUserByUsername(username)
     if (!currenUser) {
       throw new Error("wrong");
     }
     return {success:true, user:currenUser}
   } catch (error) {
      return {success:false, error}
   } 
}





export const createUserService = async () => {
  try {
    return "ok";
  } catch (error) {
    return "err";
  }
};

export const getAllUsersService = async () => {
  try {
    return "ok";
  } catch (error) {
    return "err";
  }
};

export const getUserByIdService = async () => {
  try {
    return "ok";
  } catch (error) {
    return "err";
  }
};

export const updateUserByIdService = async () => {
  try {
    return "ok";
  } catch (error) {
    return "err";
  }
};

export const deleteUserByIdService = async () => {
  try {
    return "ok";
  } catch (error) {
    return "err";
  }
};

export const findUserByUsername = async (username) => {
  try {
    const result = await pool.query(
      `
      SELECT *
      FROM users
      WHERE username = $1
      `,
      [username]
    );
    return result.rows[0];
  } catch (error) {
    return false;
  }
};

export const addOtp = async (username, otp) => {
  try {
    const data = await pool.query(
      `
      INSERT INTO otp ( username, otp ) VALUES
      ($1, $2) RETURNING id;
      `,
      [username, otp]
    );
    return data.rows[0];
  } catch (error) {
    return false;
  }
};
