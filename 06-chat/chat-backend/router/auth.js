/*
    path: api/login
*/
const { Router } = require('express');
const { crearUsuario } = require('../controllers/auth');
const { login } = require('../controllers/auth');
const { renewToken } = require('../controllers/auth');

const router = Router();

// Crear nuevos usuarios
router.post('/new', crearUsuario);

// Login
router.post('/', login);

// Revalidar token
router.get('/renew', renewToken);

module.exports = router;