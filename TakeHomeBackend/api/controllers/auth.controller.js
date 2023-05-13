const {
  User,
  validateUser,
  validateLoginUser,
  validateEmail,
} = require("../data/user.model");
const jwt = require("jsonwebtoken");

const bcrypt = require("bcryptjs");
const { pick, isEmpty } = require("lodash");

module.exports.signUpUser = async (req, res) => {
  console.log("in signup api");
  const { error } = validateUser(req.body);
  if (error)
    return res
      .status(400)
      .send({ error: true, message: error.details[0].message });

  let user = await User.findOne({
    email: req.body.email.toLowerCase(),
    isDeleted: false,
  });
  if (user)
    return res.status(400).send({
      error: true,
      message: "Email or username is already registered",
    });

  user = new User({
    ...pick(req.body, ["first_name", "last_name", "email", "password"]),
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  user.email = user.email.toLowerCase();
  user.avatar = "https://reqres.in/img/faces/7-image.jpg";

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);

  await user.save();

  const token = user.generateAuthToken();
  res.header("token", token).send({
    data: {},
    error: false,
    message: "Your account is registered successfully",
  });
};

module.exports.loginUser = async (req, res) => {
  console.log("in user login api");
  const {
    body,
    body: { email, password },
  } = req;

  const { error } = validateLoginUser(body);
  if (error)
    return res
      .status(406)
      .send({ error: true, message: error.details[0].message });

  let user = await User.findOne(
    {
      email,
    },
    {
      first_name: 1,
      last_name: 1,
      email: 1,
      password: 1,

      avatar: 1,
      _id: 1,
    }
  );
  if (user) {
    bcrypt.compare(password, user.password).then((result) => {
      if (result) {
        const token = user.generateAuthToken();
        return res.send({
          data: {
            token,
            user: pick(user, [
              "first_name",
              "last_name",
              "email",

              "avatar",
              "_id",
            ]),
          },
          error: false,
          message: "Login successful",
        });
      }
      return res
        .status(400)
        .send({ error: true, message: "Invalid email or password" });
    });
  } else {
    return res.status(404).send({ error: true, message: "No User Found" });
  }
};
