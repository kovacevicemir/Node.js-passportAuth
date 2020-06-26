const express = require('express')
const router = express.Router();

//Login page
router.get('/login', (req,res) => res.render('Login'));

//Register
router.get('/register', (req,res) => res.render('register'));

//Dashboard
router.get('/dashboard', (req,res) => res.render('dashboard'))

module.exports = router;