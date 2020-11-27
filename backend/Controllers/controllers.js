const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

const { registerValidation, loginValidation } = require("../validation");
const Admin = require("../Models/Admin");
const Teachers = require("../Models/Teachers");

const registerUser = async (req, res) => {
  const { error } = registerValidation(req.body);

  if (error) res.status(400).send(error.details[0].message);

  const emailExists = await Admin.findOne({ email: req.body.email });

  if (emailExists) return res.status(400).send("Email already exists");

  const hashedPassword = await bcrypt.hash(
    req.body.password,
    await bcrypt.genSalt(12)
  );

  const newAdmin = new Admin({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
  });

  try {
    const savedAdmin = await newAdmin.save();
    res.send(savedAdmin);
  } catch (err) {
    res.status(400).send(err);
  }
};

const loginUser = async (req, res) => {
  const { error } = loginValidation(req.body);
  if (error) res.status(400).send(error.details[0].message);

  const user = await Admin.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Email does not exist");

  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass) return res.status(400).send("Password is incorrect");

  //   console.log("user", user);

  const loginUser = { email: req.body.email };

  const accessToken = jwt.sign(loginUser, process.env.SECRET_KEY, {
    expiresIn: "150s",
  });

  res.status(200).json({
    message: "Login Successful",
    accessToken: accessToken,
    user: { email: user.email, name: user.name, userId: user._id },
  });
};

const checkUser = async (req, res) => {
  let loggedUser = await Admin.findOne({ email: req.user.email });
  // console.log(loggedUser);
  res.json(loggedUser);
};

const getTeachersRecords = async (req, res) => {
  const page = Number.parseInt(req.query.page);
  const limit = Number.parseInt(req.query.limit);
  const search = req.query.name;
  const gender = req.query.filter;
  const sort = req.query.sort === "asc" ? 1 : req.query.sort === "all" ? 0 : -1;
  // console.log(req.params.id);

  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  let searchParams = {
    adminId: req.params.id,
  };
  // name: JSON.parse(JSON.stringify(`/${search}/`)),
  // name: /a/,
  if (gender !== "all") {
    searchParams["gender"] = gender;
  }

  if (search !== "all") {
    searchParams["name"] = search;
  }

  // console.log(searchParams.name);
  // console.log(typeof searchParams.name);

  let adminTeachers = await Teachers.countDocuments(searchParams);

  // console.log("admin", adminTeachers);
  let results = {};

  results.totalCount = adminTeachers;
  if (endIndex < results.totalCount) {
    results.next = {
      page: page + 1,
      limit: limit,
    };
  }

  if (startIndex > 0) {
    results.prev = {
      page: page - 1,
      limit: limit,
    };
  }

  try {
    results.current = await Teachers.find(searchParams)
      .sort({ age: sort })
      .limit(limit)
      .skip(startIndex)
      .exec();
    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

const postTeacherRecord = async (req, res) => {
  let name = req.body.name;
  let age = req.body.age;
  let gender = req.body.gender;
  let avatar = req.file.path;
  let classes = req.body.classes;
  let adminId = req.body.adminId;

  let newTeacher = new Teachers({
    name,
    age,
    gender,
    avatar,
    classes,
    adminId,
  });
  // console.log("new Teacher", newTeacher);
  try {
    newTeacher
      .save()
      .then((newTeacher) =>
        res
          .status(200)
          .json({ message: "Teacher added successfully", data: newTeacher })
      );
  } catch (error) {
    res.status(400).json({ err: error });
  }
};

const deleteTeacherRecord = (req, res) => {
  let id = req.params.id;
  Teachers.findByIdAndDelete(id)
    .then((result) =>
      res
        .status(200)
        .json({ message: "Teacher Record deleted successfully", data: result })
    )
    .catch((err) => res.status(400).json({ error: err }));
};

module.exports = {
  registerUser,
  checkUser,
  loginUser,
  getTeachersRecords,
  postTeacherRecord,
  //   updateTeacherRecord,
  deleteTeacherRecord,
};
