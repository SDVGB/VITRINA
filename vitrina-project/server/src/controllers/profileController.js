const connection = require('../models/db');
const path = require('path');
const fs = require('fs');

module.exports.updateProfileImage = (req, res) => {
    const userId = req.user.userId;

    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No se ha subido ninguna imagen.');
    }

    const imageFile = req.files.profileImage;
    const assetsDir = path.join(__dirname, '../assets/profile_images');

    if (!fs.existsSync(assetsDir)){
        fs.mkdirSync(assetsDir, { recursive: true });
    }

    const uploadPath = path.join(assetsDir, `${userId}_${imageFile.name}`);

    imageFile.mv(uploadPath, function(err) {
        if (err) {
            return res.status(500).send(`Error moviendo el archivo: ${err.message}`);
        }

        const imageUrl = `/assets/profile_images/${userId}_${imageFile.name}`;

        const query = "UPDATE Usuario SET Imagen_Perfil = ? WHERE ID_Rut = ?";
        connection.query(query, [imageUrl, userId], (err, result) => {
            if (err) {
                return res.status(500).send('Error actualizando la imagen de perfil.');
            }
            res.status(200).json({ message: 'Imagen de perfil actualizada con éxito.', imageUrl });
        });
    });
};
