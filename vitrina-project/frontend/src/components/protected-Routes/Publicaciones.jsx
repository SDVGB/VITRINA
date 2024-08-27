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
        recibirNotificaciones: false,
        Fecha_Publicacion: '', // La fecha se establece automáticamente en el useEffect
    });

    // Estado para el archivo de imagen
    const [imageFile, setImageFile] = useState(null);
    // Estados para las opciones de los select
    const [prendas, setPrendas] = useState([]);
    const [tiposPublicacion, setTiposPublicacion] = useState([]);
    const [generos, setGeneros] = useState([]);
    const [tallas, setTallas] = useState([]);
    const [edades, setEdades] = useState([]);

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

    // Maneja el cambio de los inputs del formulario
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    // Maneja el cambio del input de imagen
    const handleImageChange = (e) => {
        setImageFile(e.target.files[0]); // Guarda el archivo de imagen en el estado
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

    // Maneja el envío del formulario
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formDataToSend = new FormData(); // Crea un objeto FormData para enviar el formulario

        // Añade los datos del formulario a formDataToSend
        Object.keys(formData).forEach(key => {
            formDataToSend.append(key, formData[key]);
        });

        // Añade el archivo de imagen si existe
        if (imageFile) {
            formDataToSend.append('Imagen_Publicacion', imageFile);
        }

        const token = localStorage.getItem('token'); // Obtiene el token del localStorage
        console.log(token)

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
                    />
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
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="ID_Prenda">Prenda</label>
                        <select name="ID_Prenda" onChange={handleChange}>
                            <option value="">Seleccione Prenda</option>
                            {prendas.map(prenda => (
                                <option key={prenda.ID_Prenda} value={prenda.ID_Prenda}>
                                    {prenda.Nombre_Prenda}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="Descripcion_Publicacion">Descripción</label>
                    <input
                        type="text"
                        name="Descripcion_Publicacion"
                        placeholder="Descripción Publicación"
                        onChange={handleChange}
                    />
                </div>
                <div className="form-inline-group">
                    <div className="form-group">
                        <label htmlFor="ID_Tipo_Publicacion">Tipo de Publicación</label>
                        <select name="ID_Tipo_Publicacion" onChange={handleChange}>
                            <option value="">Seleccione Tipo de Publicación</option>
                            {tiposPublicacion.map(tipo => (
                                <option key={tipo.ID_Tipo_Publicacion} value={tipo.ID_Tipo_Publicacion}>
                                    {tipo.Nombre_Tipo_Publicacion}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="ID_Genero">Género</label>
                        <select name="ID_Genero" onChange={handleChange}>
                            <option value="">Seleccione Género</option>
                            {generos.map(genero => (
                                <option key={genero.ID_Genero} value={genero.ID_Genero}>
                                    {genero.Nombre_Genero}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="form-inline-group">
                    <div className="form-group">
                        <label htmlFor="ID_Talla">Talla</label>
                        <select name="ID_Talla" onChange={handleChange}>
                            <option value="">Seleccione Talla</option>
                            {tallas.map(talla => (
                                <option key={talla.ID_Talla} value={talla.ID_Talla}>
                                    {talla.Nombre_Talla}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="ID_Edad">Edad</label>
                        <select name="ID_Edad" onChange={handleChange}>
                            <option value="">Seleccione Edad</option>
                            {edades.map(edad => (
                                <option key={edad.ID_Edad} value={edad.ID_Edad}>
                                    {edad.Nombre_Edad}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="Imagen_Publicacion">Imagen</label>
                    <input
                        type="file"
                        name="Imagen_Publicacion"
                        onChange={handleImageChange} // Maneja la carga de archivos
                    />
                </div>
                <div className="button-container">
                    <button type="submit">Crear</button>
                </div>
            </form>
        </div>
    );
};

export default Publicaciones;
