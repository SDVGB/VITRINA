import React, { Fragment, useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import ProductCarousel from "../../components/main-ecommerce/productCarousel";
import "./home.css";
import { Link } from "react-router-dom";

// Componente principal de la aplicación
const Home = () => {
  // Se crean las variables de los articulos y la publicación que se va a mostrar
  const [articulos, setArticulos] = useState([]);
  const [publicacion, setPublicacion] = useState(null);

  // Se crean las funciones que traeran los artículos y la publicación desde el servidor
  const fetchArticulos = async () => {
    const respuesta = await fetch(
      "http://localhost:5000/articulos?sort=Fecha_Articulo:desc&limit=4"
    );
    const json = await respuesta.json();
    setArticulos(json.articulos);
  };
  const fetchPublicacion = async () => {
    const respuesta = await fetch("http://localhost:5000/publicacion");
    const json = await respuesta.json();
    setPublicacion(json.publicacion);
  };

  // Se utiliza useEffect para que traiga los artículos y la publicación al cargar el componente
  useEffect(() => {
    fetchArticulos();
    fetchPublicacion();
  }, []);

  return (
    <div className="Home">
      <div style={{ minHeight: "calc(100vh - 120px)" }}>
        <ProductCarousel />
        <div className="header-banner">
          <h2>Últimos artículos y comunicados</h2>
          <p>"Somos una vitrina que muestra un mundo sustentable"</p>
        </div>

        {/* El div principal se deja al centro con una columna a la izquierda de distancia */}
        <div id="Contenedor-Principal">
          {/* Las publicaciones del blog quedan a la izquierda utilizando la mitad de la pantalla */}
          <div id="Contenedor-publicaciones-blog">
            {/* Recorremos todos los artículos que se trajeron desde el servidor y creamos cada artículo */}
            {articulos.map((articulo) => (
              <div
                key={articulo.ID_Articulos}
                className="article-card"
              >
                <img
                  src={`http://localhost:5000${articulo.Imagen_Articulos_Ruta}`}
                  alt={articulo.Nombre_Articulo}
                />


                <h3>{articulo.Nombre_Articulo}</h3>
                <p>{articulo.Descripcion_Articulos}</p>
                <a
                  href={articulo.Link_Ref_Articulos}
                  target="_blank"
                  rel="noreferrer"
                >
                  <button>Ver más</button>
                </a>
              </div>

            ))}
          </div>
          {/* La última venta queda a la derecha utilizando la otra mitad de la pantalla */}
          <div id="Contenedor-ultima-venta">
            <div className="article-card large">
              {/* Si es que el servidor nos devuelve una publicación, la muestra */}
              {publicacion && (
                <Fragment>
                  <img
                    src={`http://localhost:5000${publicacion.Imagen_Publicacion_Rutas}`}
                    alt={`Nuevo! ${publicacion.Nombre_Publicacion} - L`}
                  />

                  <h3>¡Nuevo! {publicacion.Nombre_Publicacion} - L</h3>
                  <p>
                    Se regala chaqueta, marca Mountain Hardwear de hombre, sin
                    uso. Entrega en metros a convenir. Contacto solo por correo.
                  </p>
                  <div className="buttons">
                    <button>Contactar</button>
                    <Link to="/Ventas">
                      <button>Ver más</button>
                    </Link>
                  </div>
                </Fragment>
              )}

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
