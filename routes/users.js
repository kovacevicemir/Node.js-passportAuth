const express = require('express')
const router = express.Router();

//Login page
router.get('/login', (req,res) => res.send('Login'));

//Register
router.get('/register', (req,res) => res.send('registration'));

module.exports = router;