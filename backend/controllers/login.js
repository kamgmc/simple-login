const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();
const User = require('../database/models/User');
const {decrypt} = require('../helpers/cipher');

router.post('/', async function (req, res) {
    const body = req.body;

    // Find user based on email
    const user = await User.findOne({
        where: {
            email: body.email.toString().trim().toLowerCase()
        }
    });

    // Validate user exists
    if (!user) {
        res.status(403).json({
            err: 'The email and password you entered does not match'
        });
        return;
    }

    // Validate password
    if (!bcrypt.compareSync(decrypt(body.password, 'APPLICATION_SECRET_KEY'), user.password)) {
        res.status(403).json({
            err: 'The email and password you entered does not match'
        });
        return;
    }

    // Creates JWT
    const token = jwt.sign({
            user: user
        }, 'DEVELOPMENT_SEED'
        , {expiresIn: '48h'});

    // Return response to the user
    res.json({
        user: user,
        token: token
    });
});

module.exports = router;
