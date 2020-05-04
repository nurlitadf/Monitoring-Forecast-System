const express = require('express');

const { register, login } = require('../models/user');

const router = express.Router();

// router.post('/register', async (req, res, next) => {
//   const { username, password } = req.body;
//   // console.log(req.body);
//   register(username, password).then((response) => {
//     res.status(200).send(response);
//   });
// });

router.post('/login', async (req, res, next) => {
  const { username, password } = req.body;
  // console.log(req.body);
  login(username, password).then((response) => {
    console.log(response);
    res.status(200).send(response);
  });
});

module.exports = router;
