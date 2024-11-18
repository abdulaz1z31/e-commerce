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
    const result = await addOtp(username, otp);
    
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
     delete currenUser.password
     return {success:true, user:currenUser}
   } catch (error) {
      return {success:false, error}
   } 
}

export const activateUserService = async (userData, otpCode) => {
  try {
    const username = userData.username
    const otpData = await findUserOtp(username)
    if (!otpData.isExists) {
      throw new Error("something boroke")
    }
    console.log(otpData.otpCode, otpCode);
    
    if (otpData.otpCode != otpCode) {
      throw new Error("otp in not valid");
    }
    const result = await findUserByUsername(username)
    if (!result) {
      throw new Error("User not found");
    }
    const data = await updateuserByUsername(username)
    const {isUpdate, error, currenUser} = data
    if (isUpdate) {
      return {success:true, user : currenUser}
    } else {
      return {success:false, error}
    }
  } catch (error) {
    return {success:false, error}
  }
}

export const forgetPasswordService = async (userData) => {
  try {
    const {email, username} = userData
    const result = await findUserByUsername(username)
    if (!result) {
      throw new Error("User not found");
    }
    const otp = await otpGenerator();
    const optData = updateOtp(username, otp);
    if (!optData) {
      throw new Error("wrong plase try again");
    }
    await sendMail(
      email, 
      "OTP", 
      `This key for update your password : ${otp}\n
      This is postman link to change password \n
      http://localhost:3000/api/v1/auth/change/password/${userData.id}`
    );
    return {success:true, msg:"We send link and opt code for change password"}
  } catch (error) {
    return {success:false, error}
  }
}

export const changePasswordService = async (userData, data) => {
  try {
    const {username} = userData
    const otpData = await findUserOtp(username)
    if (!otpData.isExists) {
      throw new Error("something boroke")
    }
    
    if (data.otp != otpData.otpCode) {
      throw new Error("otp password is not valid");
    }
    const hashPassword = await generateHashPassword(data.newPassword);
    const check = updatePassword(username, hashPassword)
    if (check) {
      return {success:true}
    } else {
      throw new Error("someting borke");  
    }
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
    console.log(error);
    
    return false;
  }
};

export const updateOtp = async (username, otp) => {
  try {
    const data = await pool.query(
      `
      UPDATE otp
      SET otp = $1
      WHERE username = $2
      `,
      [otp, username]
    );
    return true;
  } catch (error) {
    return false;
  }
};

export const updateuserByUsername = async (username) => {
  try {
    const currenUser = await pool.query(
      `
      UPDATE users
      SET is_active = TRUE
      WHERE username = $1 RETURNING * 
      `,
      [username]
    )
    return {isUpdate:true, currenUser: currenUser.rows[0]}
  } catch (error) {
    return {isUpdate:false, error}
  }
}

export const findUserOtp = async (username) => {
    try {
      const data = await pool.query(
        `
        SELECT otp 
        FROM otp
        WHERE username = $1
        `,
        [username]
      )
     const otpCode = data.rows[0].otp
     return {isExists:true, otpCode}
    } catch (error) {
      return {isExists:false, error}
    }
}

export const updatePassword = async (username , password) => {
  try {
    const data = await pool.query(
      `
      UPDATE users
      SET password = $1
      WHERE username = $2
      `,
      [password, username]
    );
    return true
  } catch (error) {
    return false;
  }
}

export const checkIsActive = async (username) => {
  try {
    const result = await findUserByUsername(username)
    
  } catch (error) {
    
  }
}