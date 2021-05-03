const { response } = require("express");
const Usuario = require("../models/usuario");

const crearUsuario = async(req, res = response) => {
    try {
        const { email, password } = req.body;
        // Verificar que el email no exista
        const existeEmail = await Usuario.findOne({ email });
        if(existeEmail) {
            return res.status(400).json({
                ok: false,
                msg: 'El correo ya existe'
            });
        }
        // Encriptar Contraseña
        // Guardar usuario en BD
        const usuario = new Usuario(req.body);
        await usuario.save();
        res.json({
            usuario
        });
    } catch(error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
};

const login = async(req, res = response) => {
    const { email, password } = req.body;
    res.json({
        ok: true,
        msg: 'login',
        email,
        password
    });
};

const renewToken = async(req, res = response) => {
    res.json({
        ok: true,
        msg: 'renew'
    });
};

module.exports = {
    crearUsuario,
    login,
    renewToken
}

// ENPOINTS PRUEBAS DE RESPONSE ...

// const crearUsuario = async(req, res = response) => {
//     const { nombre, email, password } = req.body;
//     res.json({
//         ok: true,
//         msg: 'register',
//         nombre,
//         email,
//         password
//     });
// };

// const login = async(req, res = response) => {
//     const { email, password } = req.body;
//     res.json({
//         ok: true,
//         msg: 'login',
//         email,
//         password
//     });
// };

// const renewToken = async(req, res = response) => {
//     res.json({
//         ok: true,
//         msg: 'renew'
//     });
// };