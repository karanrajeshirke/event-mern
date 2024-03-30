
import userModel from "../models/userModel.js";
import bcryptjs from "bcryptjs";
import JWT from "jsonwebtoken";

export const registerController = async (req, res) => {
  try {
    let { name, email, password } = req.body;


    if (!name) {
      return res.status(401).send({ message: "name is required" });
    }
    if (!email) {
      return res.status(401).send({ message: "email is required" });
    }
    if (!password) {
      return res.status(401).send({ message: "password is required" });
    }
    
    const existingUser = await userModel.findOne({ email });

    if (existingUser) {
      return res.status(409).send({
        success: "false",
        message: "Already Register please login", 
      });
    }

    const hashedPassword = await bcryptjs.hash(password,10)

    const user = await new userModel({
      name,
      email,
      password: hashedPassword,
    }).save();

    res.status(201).send({
      success: "true",
      message: "Registered Successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Errror in Registeration",
      error,
    });
  }
};

export const loginController = async (req, res) => {
  try {
    let { email, password } = req.body;
    if (!email || !password) {
      return res.status(422).send({
        success: "false",
        message: "Enter Email & Password",
      });
    }

    let user = await userModel.findOne({ email });

    if (!user) {
      return res.status(404).send({
        success: "false",
        message: "Email is not registered",
      });
    }
    let comparePassword = await bcryptjs.compare(password, user.password);

    if (!comparePassword) {
      return res.status(401).send({
        success: "false",
        message: "Invalid Password",
      });
    }

    const token = JWT.sign({ _id: user._id }, "nosecret", {
      expiresIn: "7d",
    });

    res.status(200).send({
      success: true,
      message: "Logged In Successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Errror in Login",
      error,
    });
  }
};
