const { request } = require("express");
const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  try {
    const { name, age, email, state, group, district, phoneNumber, gender } =
      req.body;
    let genderData = "Male";
    if (gender === false) {
      genderData = "Female";
    }
    const findUser = await userModel.findOne({
      email: email,
      phoneNumber: phoneNumber,
    });
    if (findUser) {
      return res.status(201).send("User Already Exists");
    }
    const user = await userModel.create({
      name,
      age,
      email,
      state,
      group,
      district,
      phoneNumber,
      gender: genderData,
    });
    user.save();

    res.status(200).send("User Registered Successfully");
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const login = async (req, res) => {
  try {
    const { email, phoneNumber } = req.body;
    const findUser = await userModel.findOne({
      email: email,
      phoneNumber: phoneNumber,
    });

    if (findUser) {
      const user = { email: email, phoneNumber: phoneNumber };
      const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
      return res.status(200).json({ token: accessToken, data: findUser });
    }
    return res.status(201).send("User Not Found");
  } catch (error) {
    return res.status(400).send("error");
  }
};

const update = async (req, res) => {
  try {
    const {
      name,
      age,
      email,
      state,
      group,
      district,
      phoneNumber,
      gender,
      donate,
    } = req.body;

    const findUser = await userModel.findOne({
      email: email,
      phoneNumber: phoneNumber,
    });
    if (findUser) {
      try {
        const update = await userModel.updateOne(
          { _id: findUser._id },
          {
            $set: {
              name: name,
              age: age,
              state: state,
              group: group,
              district: district,
              donate: donate,
            },
          }
        );

        return res.status(200).send("User Updated Successfully");
      } catch (error) {
        res.status(500).send(error.message);
      }
    } else {
      return res.status(404).send("User Not Found");
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const search = async (req, res) => {
  const { state, group, district } = req.body;
  const user = await userModel.find({
    state: state,
    group: group,
    district: district,
  });
  console.log(user);
  if (user.length === 0) {
    res.status(401).json({ message: "No User Found on this location Sorry!" });
  } else {
    res.status(200).json(user);
  }
};

module.exports = {
  register,
  login,
  update,
  search,
};
