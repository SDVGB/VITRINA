import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import ProductCarousel from '../../components/main-ecommerce/productCarousel';
import './home.css';

// Componente principal de la aplicación
const Home = () => {
  const [articulos, setArticulos] = useState([])

  const fetchArticulos = async () => {
    const respuesta = await fetch('http://localhost:5000/articulos?sort=Fecha_Articulo:desc&limit=4')
    const json = await respuesta.json()
    setArticulos(json.articulos)
  }

  useEffect(() => {
    const traerArticulos = fetchArticulos()
  }, [])

  return (
    <div className="Home">
      <div style={{ minHeight: 'calc(100vh - 120px)' }}>
        <ProductCarousel />
        <div className="header-banner">
          <h2>Últimos artículos y comunicados</h2>
          <p>"Somos una vitrina que muestra un mundo sustentable"</p>
        </div>
        {/* Se crea fila para poder utilizar columnas de bootstrap */}
        <div className='row'>
          {/* El div principal se deja al centro con una columna a la izquierda de distancia */}
          <div className="col-md-10 offset-md-1" id='Contenedor-Principal' >
            {/* Se crea nueva fila para divs interiores */}
            <div className='row'>
              {/* Las publicaciones del blog quedan a la izquierda utilizando la mitad de la pantalla */}
              <div className='col-md-6' id='Contenedor-publicaciones-blog'>
                <div className='row' >
                  {
                    articulos.map((articulo) => (
                      <div key={articulo.ID_Articulos} className="article-card col-md-6">
                        <img src={articulo.Imagen_Articulos_Ruta} alt={articulo.Nombre_Articulo} />
                        <h3>{articulo.Nombre_Articulo}</h3>
                        <p>{articulo.Descripcion_Articulos}</p>
                        <button>
                          <a href={articulo.Link_Ref_Articulos} target='_blank'>Ver más</a>
                        </button>
                      </div>
                    ))
                  }
                  
                </div>

              </div>
              {/* La última venta queda a la derecha utilizando la otra mitad de la pantalla */}
              <div className='col-md-6' id="Contenedor-ultima-venta">
                <div className="article-card large">
                  <img src="https://laropaamericana.cl/wp-content/uploads/2023/04/Cortavientos_De_Marca_Usado_La_Ropa_Americana_-Ropa_Usada_De_Marca_Santiago_Ropa_Americana_Online-89-1.jpg" alt="Nuevo! Chaqueta impermeable - L" />
                  <h3>¡Nuevo! Chaqueta impermeable - L</h3>
                  <p>Se regala chaqueta, marca Mountain Hardwear de hombre, sin uso. Entrega en metros a convenir. Contacto solo por correo.</p>
                  <div className="buttons">
                    <button>Contactar</button>
                    <button>Ver más</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home