import React, { useState, useEffect } from 'react';
import './Articulos.css'; // Asegúrate de enlazar el CSS aquí

const CrearArticulo = () => {
    const [formData, setFormData] = useState({
        Nombre_Articulo: '',
        Fecha_Articulo: '',
        Descripcion_Articulos: '',
        Link_Ref_Articulos: '',
    });

    const [imageFile, setImageFile] = useState(null);
    const [charCount, setCharCount] = useState({
        Descripcion_Articulos: 224,
        Link_Ref_Articulos: 224
    });
    const [errors, setErrors] = useState({});

    useEffect(() => {
        const currentDate = new Date().toISOString().slice(0, 10);
        setFormData(prevFormData => ({
            ...prevFormData,
            Fecha_Articulo: currentDate,
        }));
    }, []);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });

        if (name === 'Descripcion_Articulos' || name === 'Link_Ref_Articulos') {
            if (value.length > 224) {
                return;
            }

            setCharCount({
                ...charCount,
                [name]: 224 - value.length
            });
        }

        if (errors[name]) {
            setErrors(prevErrors => ({
                ...prevErrors,
                [name]: '',
            }));
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.type.startsWith('image/')) {
                setImageFile(file);
                setErrors(prevErrors => ({
                    ...prevErrors,
                    Imagen_Articulos_Ruta: '',
                }));
            } else {
                setErrors(prevErrors => ({
                    ...prevErrors,
                    Imagen_Articulos_Ruta: 'Por favor, selecciona un archivo de imagen válido.',
                }));
                setImageFile(null);
            }
        }
    };

    const validateForm = () => {
        const newErrors = {};
        const requiredFields = ['Nombre_Articulo', 'Descripcion_Articulos', 'Link_Ref_Articulos'];

        requiredFields.forEach(field => {
            if (!formData[field]) {
                newErrors[field] = 'Este campo es obligatorio';
            }
        });

        if (!imageFile) {
            newErrors.Imagen_Articulos_Ruta = 'Por favor, selecciona un archivo de imagen válido.';
        }

        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newErrors = validateForm();
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        const formDataToSend = new FormData();
        Object.keys(formData).forEach(key => {
            formDataToSend.append(key, formData[key]);
        });

        formDataToSend.append('Imagen_Articulos_Ruta', imageFile);

        const token = localStorage.getItem('token'); // Obtiene el token del localStorage

        try {
            const response = await fetch('http://localhost:5000/creararticulos', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`, // Aquí se envía el token en el encabezado
                },
                body: formDataToSend, // Envia el objeto FormData con los datos y la imagen
            });

            const data = await response.text();
            alert(data); // Muestra una alerta con la respuesta del servidor

            setFormData({
                Nombre_Articulo: '',
                Fecha_Articulo: '',
                Descripcion_Articulos: '',
                Link_Ref_Articulos: '',
            });
            setImageFile(null);
            setErrors({});
            setCharCount({
                Descripcion_Articulos: 224,
                Link_Ref_Articulos: 224
            });

        } catch (error) {
            console.error('Error submitting form:', error);
            alert('Error al enviar el formulario');
        }
    };

    return (
        <div className="form-container">
            <div className="date-container">
                <input
                    type="text"
                    name="Fecha_Articulo"
                    value={formData.Fecha_Articulo}
                    disabled
                />
            </div>
            <h1>Crear Artículo</h1>
            <form onSubmit={handleSubmit} encType="multipart/form-data"> 
                <div className="form-group">
                    <label htmlFor="Nombre_Articulo">Nombre del Artículo:</label>
                    <input
                        type="text"
                        name="Nombre_Articulo"
                        value={formData.Nombre_Articulo}
                        onChange={handleChange}
                        maxLength="100"
                        required
                    />
                    {errors.Nombre_Articulo && <p className="error-message">{errors.Nombre_Articulo}</p>}
                </div>

                <div className="form-group textarea-container">
                    <label htmlFor="Descripcion_Articulos">Descripción del Artículo:</label>
                    <textarea
                        name="Descripcion_Articulos"
                        value={formData.Descripcion_Articulos}
                        onChange={handleChange}
                        maxLength="224"
                        required
                    />
                    <span className="char-counter">
                        {charCount.Descripcion_Articulos} caracteres restantes
                    </span>
                    {errors.Descripcion_Articulos && <p className="error-message">{errors.Descripcion_Articulos}</p>}
                </div>

                <div className="form-group textarea-container">
                    <label htmlFor="Link_Ref_Articulos">Link de Referencia:</label>
                    <textarea
                        name="Link_Ref_Articulos"
                        value={formData.Link_Ref_Articulos}
                        onChange={handleChange}
                        maxLength="224"
                        required
                    />
                    <span className="char-counter">
                        {charCount.Link_Ref_Articulos} caracteres restantes
                    </span>
                    {errors.Link_Ref_Articulos && <p className="error-message">{errors.Link_Ref_Articulos}</p>}
                </div>

                <div className="form-group">
                    <label htmlFor="Imagen_Articulos_Ruta">Imagen del Artículo:</label>
                    <input
                        type="file"
                        name="Imagen_Articulos_Ruta"
                        onChange={handleImageChange}
                        accept="image/*"
                        required
                    />
                    {errors.Imagen_Articulos_Ruta && <p className="error-message">{errors.Imagen_Articulos_Ruta}</p>}
                </div>

                <button type="submit">Enviar</button>
            </form>
        </div>
    );
};

export default CrearArticulo;

