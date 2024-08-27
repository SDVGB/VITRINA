import React from 'react';
import './Perfil.css';

const Perfil = () => {
  return (
    <div className="perfil-container">
      <form className="perfil-form">
        <h2>Información de usuario</h2>
        <div className="form-group">
          <label>Email</label>
          <input type="email" value="yoanriba@gmail.com" disabled />
        </div>
        <div className="form-group">
          <label>Nombre</label>
          <input type="text" value="Joan" />
        </div>
        <div className="form-group">
          <label>Apellido</label>
          <input type="text" value="Rioseco" />
        </div>
        <div className="form-group">
          <label>Ciudad</label>
          <select>
            <option value="Region Metropolitana">Región Metropolitana</option>
            <option value="Talca">Talca</option>
           
          </select>
        </div>
        <div className="form-group">
          <label>Comuna</label>
          <input type="text" value="Cerro Navia" />
        </div>
        <div className="form-group">
          <label>
            <input type="checkbox" />
            Usar esta ubicación por defecto al publicar anuncios
          </label>
        </div>
        <div className="form-group">
          <label>Teléfono</label>
          <input type="tel" value="+569 9999 9999" />
        </div>
        <div className="form-group">
          <label>Compañía</label>
          <input type="text" />
        </div>
        <div className="form-group">
          <label>Cédula</label>
          <input type="text" />
        </div>
        <div className="form-group">
          <label>Acerca de la compañía</label>
          <textarea />
        </div>
        <div className="form-group">
          <label>Foto</label>
          <input type="file" />
        </div>
        <button type="submit" className="btn-submit">Guardar Cambios</button>
      </form>
    </div>
  );
};

export default Perfil;
