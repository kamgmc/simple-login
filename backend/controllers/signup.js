const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const User = require('../database/models/User');
const userValidator = require('../database/validators/userValidator')

router.post('/', async function (req, res) {
    const body = req.body;
    let {first_name, last_name, email, password} = body;

    if (!userValidator(body)){
        res.status(403).json({err: 'Bad request'});
        return;
    }
    await User.create({
        first_name: first_name,
        last_name: last_name,
        email: email,
        password: bcrypt.hashSync(password, 10)
    })
        .then(function (user) {
            res.json({data: user});
        })
        .catch(function (err) {
            res.status(500).json({err: err});
        });
});

module.exports = router;
