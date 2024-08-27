import React, { useState, useEffect } from 'react';
import './Publicaciones.css'; // Asegúrate de enlazar el CSS aquí

const Publicaciones = () => {
    // Estado inicial para los datos del formulario
    const [formData, setFormData] = useState({
        Nombre_Publicacion: '',
        Cantidad: '',
        Descripcion_Publicacion: '',
        ID_Prenda: '',
        ID_Tipo_Publicacion: '',
        ID_Genero: '',
        ID_Talla: '',
        ID_Edad: '',
        Fecha_Publicacion: '', // La fecha se establece automáticamente en el useEffect
        Precio: '', // Estado para el precio
    });

    // Estado para el archivo de imagen
    const [imageFile, setImageFile] = useState(null);
    // Estado para errores
    const [errors, setErrors] = useState({});
    // Estados para las opciones de los select
    const [prendas, setPrendas] = useState([]);
    const [tiposPublicacion, setTiposPublicacion] = useState([]);
    const [generos, setGeneros] = useState([]);
    const [tallas, setTallas] = useState([]);
    const [edades, setEdades] = useState([]);
    const [showPrecio, setShowPrecio] = useState(false); // Estado para mostrar/ocultar el campo de precio

    // useEffect para cargar las opciones de los selects y la fecha de publicación
    useEffect(() => {
        const currentDate = new Date().toISOString().slice(0, 10);
        setFormData(prevFormData => ({
            ...prevFormData,
            Fecha_Publicacion: currentDate,
        }));

        // Cargar opciones de los selects desde el backend
        fetch('http://localhost:5000/prendas')
            .then(res => res.json())
            .then(data => setPrendas(data));

        fetch('http://localhost:5000/tipospublicacion')
            .then(res => res.json())
            .then(data => setTiposPublicacion(data));

        fetch('http://localhost:5000/generos')
            .then(res => res.json())
            .then(data => setGeneros(data));

        fetch('http://localhost:5000/tallas')
            .then(res => res.json())
            .then(data => setTallas(data));

        fetch('http://localhost:5000/edades')
            .then(res => res.json())
            .then(data => setEdades(data));
    }, []);

    // Función para formatear el precio con signo peso y puntos
    const formatPrice = (price) => {
        if (!price) return '';
        const num = parseFloat(price.replace(/[^0-9.]/g, ''));
        return isNaN(num) ? '' : `$${num.toLocaleString('es-CL')}`;
    };

    // Maneja el cambio del precio y formatea el valor en tiempo real
    const handlePrecioChange = (e) => {
        const value = e.target.value;
        const unformattedValue = value.replace(/[^\d]/g, ''); // Limpia el valor para obtener solo números
        const formattedPrice = formatPrice(unformattedValue); // Aplica formato
        setFormData({
            ...formData,
            Precio: formattedPrice // Usa el valor formateado
        });
    };

    // Maneja el cambio de los inputs del formulario
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });

        // Eliminar el error asociado a ese campo si existe
        if (errors[name]) {
            setErrors(prevErrors => ({
                ...prevErrors,
                [name]: '',
            }));
        }

        // Buscar el nombre del tipo de publicación seleccionada
        const tipoSeleccionado = tiposPublicacion.find(tipo => tipo.ID_Tipo_Publicacion === value);

        // Mostrar/ocultar el campo de precio basado en la selección de "Venta"
        if (name === 'ID_Tipo_Publicacion' && tipoSeleccionado && tipoSeleccionado.Nombre_Tipo_Publicacion === 'Venta') {
            setShowPrecio(true);
        } else if (name === 'ID_Tipo_Publicacion') {
            setShowPrecio(false);
            setFormData(prevFormData => ({
                ...prevFormData,
                Precio: '', // Limpiar el campo precio si no es "Venta"
            }));
        }
    };

    // Maneja el cambio del input de imagen, solo se permiten archivos de imagen
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            // Verificar si el tipo MIME del archivo comienza con "image/"
            if (file.type.startsWith('image/')) {
                setImageFile(file); // Guarda el archivo de imagen en el estado
                setErrors(prevErrors => ({
                    ...prevErrors,
                    Imagen_Publicacion: '', // Elimina cualquier error anterior de imagen
                }));
            } else {
                setErrors(prevErrors => ({
                    ...prevErrors,
                    Imagen_Publicacion: 'Por favor, selecciona un archivo de imagen válido.',
                }));
                setImageFile(null); // Resetea el archivo si no es válido
            }
        }
    };

    // Maneja la entrada de la cantidad, permitiendo solo números
    const handleCantidadInput = (e) => {
        const value = e.target.value;
        if (/^\d*$/.test(value)) { // Solo permite números positivos
            setFormData({
                ...formData,
                Cantidad: value
            });
        }
    };

    // Validar los campos del formulario
    const validateForm = () => {
        const newErrors = {};

        // Campos requeridos
        const requiredFields = ['Nombre_Publicacion', 'Cantidad', 'ID_Prenda', 'ID_Tipo_Publicacion', 'ID_Genero', 'ID_Talla', 'ID_Edad'];

        requiredFields.forEach(field => {
            if (!formData[field]) {
                newErrors[field] = 'Este campo es obligatorio';
            }
        });

        // Verificar que se haya seleccionado una imagen
        if (!imageFile) {
            newErrors.Imagen_Publicacion = 'Por favor, selecciona un archivo de imagen válido.';
        }

        return newErrors;
    };

    // Maneja el envío del formulario
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validar formulario
        const newErrors = validateForm();
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        const formDataToSend = new FormData(); // Crea un objeto FormData para enviar el formulario

        // Añade los datos del formulario a formDataToSend
        Object.keys(formData).forEach(key => {
            formDataToSend.append(key, formData[key]);
        });

        // Añade el archivo de imagen
        formDataToSend.append('Imagen_Publicacion', imageFile);

        const token = localStorage.getItem('token'); // Obtiene el token del localStorage

        try {
            // Envía los datos al backend
            const response = await fetch('http://localhost:5000/postcreation', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`, // Aquí se envía el token en el encabezado
                },
                body: formDataToSend, // Envia el objeto FormData con los datos y la imagen
            });

            const data = await response.text();
            alert(data); // Muestra una alerta con la respuesta del servidor

            // Limpiar el formulario después del envío exitoso
            setFormData({
                Nombre_Publicacion: '',
                Cantidad: '',
                Descripcion_Publicacion: '',
                ID_Prenda: '',
                ID_Tipo_Publicacion: '',
                ID_Genero: '',
                ID_Talla: '',
                ID_Edad: '',
                Fecha_Publicacion: new Date().toISOString().slice(0, 10),
                Precio: '',
            });
            setImageFile(null);
            setErrors({});
            setShowPrecio(false);

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
                    name="Fecha_Publicacion"
                    value={formData.Fecha_Publicacion}
                    disabled
                />
            </div>
            <h1>Crear Publicación</h1>
            <form onSubmit={handleSubmit} encType="multipart/form-data"> {/* Asegúrate de que el formulario puede manejar archivos */}
                <div className="form-group">
                    <label htmlFor="Nombre_Publicacion">Nombre de la Publicación</label>
                    <input
                        type="text"
                        name="Nombre_Publicacion"
                        placeholder="Nombre Publicación"
                        onChange={handleChange}
                        value={formData.Nombre_Publicacion}
                        required // Campo obligatorio
                    />
                    {errors.Nombre_Publicacion && <p className="error-message">{errors.Nombre_Publicacion}</p>}
                </div>
                <div className="form-inline-group">
                    <div className="form-group">
                        <label htmlFor="Cantidad">Cantidad</label>
                        <input
                            type="number"
                            name="Cantidad"
                            placeholder="Cantidad"
                            value={formData.Cantidad}
                            onInput={handleCantidadInput}
                            min="1"
                            required // Campo obligatorio
                        />
                        {errors.Cantidad && <p className="error-message">{errors.Cantidad}</p>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="ID_Prenda">Prenda</label>
                        <select name="ID_Prenda" onChange={handleChange} value={formData.ID_Prenda} required>
                            <option value="">Seleccione Prenda</option>
                            {prendas.map(prenda => (
                                <option key={prenda.ID_Prenda} value={prenda.ID_Prenda}>
                                    {prenda.Nombre_Prenda}
                                </option>
                            ))}
                        </select>
                        {errors.ID_Prenda && <p className="error-message">{errors.ID_Prenda}</p>}
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="Descripcion_Publicacion">Descripción</label>
                    <input
                        type="text"
                        name="Descripcion_Publicacion"
                        placeholder="Descripción Publicación"
                        onChange={handleChange}
                        value={formData.Descripcion_Publicacion}
                    />
                </div>
                <div className="form-inline-group">
                    <div className="form-group">
                        <label htmlFor="ID_Tipo_Publicacion">Tipo de Publicación</label>
                        <select name="ID_Tipo_Publicacion" onChange={handleChange} value={formData.ID_Tipo_Publicacion} required>
                            <option value="">Seleccione Tipo de Publicación</option>
                            {tiposPublicacion.map(tipo => (
                                <option key={tipo.ID_Tipo_Publicacion} value={tipo.ID_Tipo_Publicacion}>
                                    {tipo.Nombre_Tipo_Publicacion}
                                </option>
                            ))}
                        </select>
                        {errors.ID_Tipo_Publicacion && <p className="error-message">{errors.ID_Tipo_Publicacion}</p>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="ID_Genero">Género</label>
                        <select name="ID_Genero" onChange={handleChange} value={formData.ID_Genero} required>
                            <option value="">Seleccione Género</option>
                            {generos.map(genero => (
                                <option key={genero.ID_Genero} value={genero.ID_Genero}>
                                    {genero.Nombre_Genero}
                                </option>
                            ))}
                        </select>
                        {errors.ID_Genero && <p className="error-message">{errors.ID_Genero}</p>}
                    </div>
                </div>
                <div className="form-inline-group">
                    <div className="form-group">
                        <label htmlFor="ID_Talla">Talla</label>
                        <select name="ID_Talla" onChange={handleChange} value={formData.ID_Talla} required>
                            <option value="">Seleccione Talla</option>
                            {tallas.map(talla => (
                                <option key={talla.ID_Talla} value={talla.ID_Talla}>
                                    {talla.Nombre_Talla}
                                </option>
                            ))}
                        </select>
                        {errors.ID_Talla && <p className="error-message">{errors.ID_Talla}</p>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="ID_Edad">Edad</label>
                        <select name="ID_Edad" onChange={handleChange} value={formData.ID_Edad} required>
                            <option value="">Seleccione Edad</option>
                            {edades.map(edad => (
                                <option key={edad.ID_Edad} value={edad.ID_Edad}>
                                    {edad.Nombre_Edad}
                                </option>
                            ))}
                        </select>
                        {errors.ID_Edad && <p className="error-message">{errors.ID_Edad}</p>}
                    </div>
                </div>
                {showPrecio && (
                    <div className="form-group">
                        <label htmlFor="Precio">Precio</label>
                        <input
                            type="text"
                            name="Precio"
                            placeholder="Precio"
                            value={formData.Precio}
                            onChange={handlePrecioChange} // Actualiza el formato en tiempo real
                        />
                        {errors.Precio && <p className="error-message">{errors.Precio}</p>}
                    </div>
                )}
                <div className="form-group">
                    <label htmlFor="Imagen_Publicacion">Imagen</label>
                    <input
                        type="file"
                        name="Imagen_Publicacion"
                        onChange={handleImageChange}
                        accept="image/*" // Solo se aceptan imágenes
                        required // Campo obligatorio
                    />
                    {errors.Imagen_Publicacion && <p className="error-message">{errors.Imagen_Publicacion}</p>}
                </div>
                <button type="submit">Crear Publicación</button>
            </form>
        </div>
    );
};

export default Publicaciones;



