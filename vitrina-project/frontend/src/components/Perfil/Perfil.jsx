import React, { useState, useEffect } from 'react';
import './Perfil.css';

const Perfil = ({ setProfileImage }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [isSaving, setIsSaving] = useState(false); // Estado para manejar el estado de guardado
  const [userInfo, setUserInfo] = useState({
    email: "",
    nombre: "",
    apellido: "",
    ciudad: "",
    comuna: "",
    telefono: "",
    compania: "",
    cedula: "",
    descripcion: "",
  });

  useEffect(() => {
    // Aquí podrías obtener los datos del usuario actual desde la API
    // y actualizar el estado userInfo si fuera necesario.
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
        if (setProfileImage) {
          setProfileImage(reader.result); // Actualizar la imagen en el Navbar
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveChanges = async (e) => {
    e.preventDefault();
    setIsSaving(true); // Deshabilitar el botón mientras se guarda
    try {
      const formData = new FormData();
      formData.append('profileImage', e.target.profileImage.files[0]);

      const response = await fetch('http://localhost:5000/updateProfileImage', {
        method: 'POST',
        body: formData,
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        const newImageUrl = data.imageUrl;

        // Actualiza localStorage con la nueva imagen
        localStorage.setItem('profileImage', newImageUrl);

        // Actualiza la imagen de perfil en el estado del App
        if (setProfileImage) {
          setProfileImage(newImageUrl);
        }
      } else {
        alert('Error al guardar los cambios.');
      }
    } catch (error) {
      console.error('Error al guardar los cambios:', error);
    } finally {
      setIsSaving(false); // Rehabilitar el botón después de guardar
    }
  };

  return (
    <div className="perfil-container">
      <form className="perfil-form" onSubmit={handleSaveChanges}>
        <h2>Información de usuario</h2>
        <div className="form-group">
          {selectedImage && <img src={selectedImage} alt="Profile Preview" className="image-preview-large" />}
        </div>
        <div className="form-group">
          <label>Email</label>
          <input type="email" name="email" value={userInfo.email} onChange={handleInputChange} />
        </div>
        <div className="form-group">
          <label>Nombre</label>
          <input type="text" name="nombre" value={userInfo.nombre} onChange={handleInputChange} />
        </div>
        <div className="form-group">
          <label>Apellido</label>
          <input type="text" name="apellido" value={userInfo.apellido} onChange={handleInputChange} />
        </div>
        <div className="form-group">
          <label>Ciudad</label>
          <select name="ciudad" value={userInfo.ciudad} onChange={handleInputChange}>
            <option value="Region Metropolitana">Región Metropolitana</option>
            <option value="Talca">Talca</option>
          </select>
        </div>
        <div className="form-group">
          <label>Comuna</label>
          <input type="text" name="comuna" value={userInfo.comuna} onChange={handleInputChange} />
        </div>
        <div className="form-group">
          <label>
            <input type="checkbox" />
            Usar esta ubicación por defecto al publicar anuncios
          </label>
        </div>
        <div className="form-group">
          <label>Teléfono</label>
          <input type="tel" name="telefono" value={userInfo.telefono} onChange={handleInputChange} />
        </div>
        <div className="form-group">
          <label>Compañía</label>
          <input type="text" name="compania" value={userInfo.compania} onChange={handleInputChange} />
        </div>
        <div className="form-group">
          <label>Cédula</label>
          <input type="text" name="cedula" value={userInfo.cedula} onChange={handleInputChange} />
        </div>
        <div className="form-group">
          <label>Acerca de la compañía</label>
          <textarea name="descripcion" value={userInfo.descripcion} onChange={handleInputChange} />
        </div>
        <div className="form-group">
          <label>Foto</label>
          <input type="file" name="profileImage" onChange={handleImageChange} />
        </div>
        <button type="submit" className="btn-submit" disabled={isSaving}>
          {isSaving ? 'Guardando...' : 'Guardar Cambios'}
        </button>
      </form>
    </div>
  );
};

export default Perfil;
