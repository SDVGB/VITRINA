import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import ProductCarousel from '../../components/main-ecommerce/productCarousel';
import './home.css';

// Componente principal de la aplicación
const Home = () => {
  return (

    <div className="Home">
      <div style={{ minHeight: 'calc(100vh - 120px)' }}>
        <ProductCarousel />
        <div className="header-banner">
          <h2>Últimos artículos y comunicados</h2>
          <p>"Somos una vitrina que muestra un mundo sustentable"</p>
        </div>
        <div className="articles-container">
          <div className="articles-grid">
            <div className="article-card">
              <img src="https://i.pinimg.com/originals/f0/a2/69/f0a2698e9891635c30e55757b482b074.jpg" alt="Cuatro maneras para teñir la ropa y poder reutilizar" />
              <h3>Cuatro maneras para teñir la ropa y poder reutilizar</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              <button>See more</button>
            </div>
            <div className="article-card">
              <img src="https://c.files.bbci.co.uk/10077/production/_122955656_atacama-39.jpg" alt="La ruta de la ropa usada que termina como basura en el desierto" />
              <h3>La ruta de la ropa usada que termina como basura en el desierto</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              <button>See more</button>
            </div>
            <div className="article-card large">
              <img src="https://laropaamericana.cl/wp-content/uploads/2023/04/Cortavientos_De_Marca_Usado_La_Ropa_Americana_-Ropa_Usada_De_Marca_Santiago_Ropa_Americana_Online-89-1.jpg" alt="Nuevo! Chaqueta impermeable - L" />
              <h3>¡Nuevo! Chaqueta impermeable - L</h3>
              <p>Se regala chaqueta, marca Mountain Hardwear de hombre, sin uso. Entrega en metros a convenir. Contacto solo por correo.</p>
              <div className="buttons">
                <button>Contactar</button>
                <button>See more</button>
              </div>
            </div>
            <div className="article-card">
              <img src="https://a1.elespanol.com/cronicaglobal/2015/01/20/vida/vida_4760339_2175570_1706x960.jpg" alt="Top 5: Lugares de ropa usada en Santiago" />
              <h3>Top 5: Lugares de ropa usada en Santiago</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              <button>See more</button>
            </div>
            <div className="article-card">
              <img src="https://masdearte.com/media/prop_casaencendida_textil.jpg" alt="Nueva campaña Paris 'Moda circular'" />
              <h3>Nueva campaña Paris "Moda circular"</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              <button>See more</button>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Home