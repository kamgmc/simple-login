const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const User = require('../database/models/User');
const userValidator = require('../database/validators/userValidator')

router.post('/', async function (req, res) {
    const body = req.body;
    let {firstName, lastName, email, password} = body;

    // Validates incoming body data
    if (!userValidator(body)) {
        res.status(400).json({err: 'Bad request'});
        return;
    }

    // Create user
    await User.create({
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: bcrypt.hashSync(password, 10)
    })
        .then(function (user) {
            res.json({data: user});
        })
        .catch(function (err) {
            res.status(403).json({
                errors: err.errors.map(function (error) {
                    return error.message;
                })
            });
        });
});

module.exports = router;
