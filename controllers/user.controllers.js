const  User = require('../model/user.model.js');
const bcrypt = require("bcryptjs");
const {
  signAccessToken,
  signRefreshToken,
  verifyRefreshToken,
  signToken,
  verifyToken,
} = require('../middleware/auth.js');

const register = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    if (!req.body) {
      res
        .status(500)
        .json({ message: "Invalid inputs passed, please check your data." });
    }

    const doesExist = await User.findOne({ where: { email: email } });
    if (doesExist) {
      res.status(200).json({
        status: false,
        message: "Email Already Exist ",
      });
    }

    const pass = await bcrypt.hash(password, 5);
    const data = {
      first_name: firstName,
      last_name: lastName,
      email,
      password: pass,
    };

    const user = await User.create(data);
    res.status(200).json({
      status: true,
      message: "Create Account successfully",
      id: user.id,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: false, message: "Internal Server Error" });
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(200).send({ message: "email and password are required" });
    }
    const user = await User.findOne({ where: { email: email } });
    if (!user) {
      res.status(200).send({ message: "User not Register" });
    }

    var passwordIsValid = bcrypt.compareSync(password, user.password);
    if (!passwordIsValid) {
      return res.status(200).send({ message: "Invalid Password!" });
    }
    const accessToken = await signAccessToken(user);
    const refreshToken = await signRefreshToken(user);
    const savedUser = await User.findOne({ where: { email: req.body.email } });
    const userId = savedUser.id;

    res.json({
      status: true,
      message: "signin successful",
      data: {
        accessToken,
        accessExpiry: 24,
        refreshToken,
        refreshExpiry: 720,
        userId,
      },
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports = { register, login };
