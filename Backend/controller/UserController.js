import { where } from "sequelize";
import { User } from "../model/UserModel.js";
import { sendEmail } from "../utils/SendEmail.js";
import jwt from "jsonwebtoken";
export const SECRET_KEY = "fksdfkjsdnfkj4@#$@fsd";

import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
import fs from "fs";
export const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const files = req.file;
    console.log(files);
    const filename = files.filename;

    if (!name || !email || !password || !files) {
      throw new Error("All field Are Mendotry");
    }

    let user = await User.findOne({ where: { email: email } });
    if (user) {
      throw new Error("User Already Exists");
    }

    const result = `http://localhost:4000/${filename}`;

    user = await User.create({
      name,
      email,
      password,
      image: result,
    });
    let id = user.id;
    let token = await jwt.sign({ id }, SECRET_KEY);
    // const url = `http://localhost:4000/api/v1/verify`
    // await sendEmail(user.email,'Verify email',url)
    const options = {
      expires: new Date(Date.now() + 15 * 60 * 60 * 1000),
      httpOnly: true,
      sameSite: "none",
      secure: true,
    };
    res.status(200).cookie("token", token, options).json({
      message: "Register SuccessFully",
      user,
    });
  } catch (error) {
    next(error);
  }
};
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      throw new Error("All field Are Mendotry");
    }
    let user = await User.findOne({ where: { email: email } });
    if (!user) {
      throw new Error("User Not Logged In");
    }

    let id = user.id;
    let token = await jwt.sign({ id }, SECRET_KEY);

    const options = {
      expires: new Date(Date.now() + 15 * 60 * 60 * 1000),
      httpOnly: true,
      sameSite: "none",
      secure: true,
    };
    res.status(200).cookie("token", token, options).json({
      message: "Login Success",
      user,
    });
  } catch (error) {
    next(error);
  }
};

export const getuser = async (req, res, next) => {
  try {
    let user = await User.findOne({ where: { id: req.user } });
    res.json({ success: true, user });
  } catch (error) {
    next(error);
  }
};

export const logout = async (req, res, next) => {
  try {
    res
      .status(200)
      .cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
        sameSite: "none",
        secure: true,
      })
      .json({
        message: "Logout SuccessFully",
      });
  } catch (error) {
    next(error);
  }
};

// export const verifyEmail = async(req,res,next)=>{
//     try {
//         const {token} = req.cookies

//         if(!token) throw new Error("Invalid User")
//             let decode = await jwt.verify(token,SECRET_KEY)
//         let id = decode.id

//         await User.update({isVerified:true},{where:{id}})
//       res.render('view')
//     } catch (error) {
//         next(error)
//     }
// }
