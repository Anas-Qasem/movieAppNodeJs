const User = require("../model/user-model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const _validateEmail = (email) => {
  return email.match(
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
};

//signUp
signUp = (req, res) => {
  const body = req.body;
  if (Object.keys(body).length === 0) {
    return res.status(400).json({
      message: "required Body",
    });
  }
  if (!_validateEmail(body.email)) {
    return res.status(400).json({
      message: "Not valid Email",
    });
  }
  // check if user exsit
  User.findOne({ email: body.email }).then((user) => {
    if (user) {
      return res.status(400).json({
        error: "User Already exsist" 
      })
    }
    // hash the password
    bcrypt.hash(body.password, 10, async function (err, hash) {
      // Store hash in your password DB.
      console.log(err, hash);
      if (err) {
        return res.status(403).json({ error: "please try another passowrd" });
      }
      const newuser = new User({
        userName: body.userName,
        email: body.email,
        password: hash,
      });
      newuser
        .save()
        .then((user) => {
          const token = jwt.sign(
            {
              exp: 60,
              data: user,
            },
            "secret"
          );

          console.log(token);
          return res.status(200).json({
            id: user._id,
            message: "User Created",
            token: token,
          });
        })
        .catch((err) => {
          return res.status(400).json({
            error: err,
          });
        });
    });
  });
};

module.exports = { signUp };
