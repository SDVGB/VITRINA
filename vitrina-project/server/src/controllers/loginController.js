const connection = require('../models/db');
const jwt = require('jsonwebtoken');

module.exports.login = (req, res) => {
    const {username, password} = req.body;
    const consult = "SELECT * FROM Usuario WHERE Correo_Usuario = ? AND Contraseña = ?";

    try {
        connection.query(consult, [username, password], (err, result) => {
            if (err) {
                res.send(err);
            }
            
            if (result.length > 0) {
                const token = jwt.sign({username}, "Stack", { expiresIn: "1m" }); // expires in 365 days
                res.send({token})
            } else {
                console.log('wrong user');
                res.send({message: 'wrong user'});
            }
        });
    } catch (e) {
        res.send(e);
    }
};
