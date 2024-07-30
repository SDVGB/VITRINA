import React, { useState, useEffect } from 'react';
import './blog.css';

const Blog = () => {
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    const date = new Date();
    const options = { day: '2-digit', month: 'long', year: 'numeric' };
    setCurrentDate(date.toLocaleDateString('es-ES', options));
  }, []);

  return (
    <div className="blog">
      <header className="blog-header">
        <h1>NOVEDADES</h1>
        <p>blog dedicado a noticias y novedades de nuestra vitrina</p>
        <img src="https://s1.elespanol.com/2023/02/24/quincemil/vivir/moda-vivir/743936527_244743260_1706x960.jpg" alt="Ropa" className="main-image" />
      </header>
      <div className="blog-post">
        <p>{currentDate}</p>
        <div className="post">
          <img src="https://i.pinimg.com/originals/f0/a2/69/f0a2698e9891635c30e55757b482b074.jpg" alt="Teñir ropa" />
          <div>
            <h4>CUATRO FORMAS DE TEÑIR ROPA</h4>
            <p>¿Te aburriste de las poleras básicas o tu prenda favorita perdió el color? En lugar de deshacerte de esa ropa, ¿por qué no le das una nueva oportunidad tiñéndola? Es un proceso realmente muy fácil y, en este artículo, te enseñamos cómo teñir ropa de forma casera paso a paso. Te damos varios métodos para que apliques el que más te parezca.</p>
            <a href="https://www.diariodecuyo.com.ar/tendencia/Como-tenir-ropa-con-anilina-20240429-0023.html">Más Info...</a>
          </div>
        </div>
        <div className="post">
          <img src="https://c.files.bbci.co.uk/10077/production/_122955656_atacama-39.jpg" alt="Ropa en el desierto" />
          <div>
            <h4>LA RUTA DE LA ROPA USADA QUE TERMINA COMO BASURA EN EL DESIERTO</h4>
            <p>Montañas de ropa desechada en el desierto de Atacama, uno de los destinos turísticos del norte chileno. Pero en Alto Hospicio ya forman parte del paisaje. Sus habitantes llevan más de dos décadas viviendo con la basura textil cerca de sus casas.</p>
            <a href="https://www.xataka.com/magnet/desierto-atacama-se-ha-convertido-gigantesco-basurero-ropa-usar-vender">Más Info...</a>
          </div>
        </div>
        <div className="post">
          <img src="https://a1.elespanol.com/cronicaglobal/2015/01/20/vida/vida_4760339_2175570_1706x960.jpg" alt="Lugares de ropa usada" />
          <div>
            <h4>TOP 5: LUGARES DE ROPA USADA EN SANTIAGO</h4>
            <p>Comprar ropa usada no es más una manera de ahorrar plata, o por lo menos, no solamente. También es una forma de conseguir prendas únicas y llenar de carácter tu guardarropa. Incorporar prendas de segunda puede ser una herramienta fundamental a la hora de construir tu propio estilo personal con elementos vintage. En Chile desde hace unos años la compra venta de ropa usada se ha convertido en uno de las principales tendencias de la moda, como en ningún otro país de América Latina.</p>
            <a href="https://faraisnake.com/descubre-las-5-mejores-tiendas-de-ropa-americana-en-santiago/">Más Info...</a>
          </div>
        </div>
        <div className="post">
          <img src="https://www.24horas.cl/24horas/site/artic/20231221/imag/foto_0000000220231221142417/ecocitex-reciclaje-ropa-reutilizar.jpg" alt="Ropa reciclada" />
          <div>
            <h4>LA EMPRESA CHILENA QUE LLEVA 209 TONELADAS DE ROPA RECICLADA</h4>
            <p>Ecocitex ha logrado un hito significativo al reciclar 209 toneladas de ropa, contribuyendo así a la reducción de residuos textiles y al fomento de prácticas respetuosas con el medio ambiente.</p>
            <a href="https://www.24horas.cl/conciencia-24-7/sostenibilidad/la-empresa-chilena-que-lleva-209-toneladas-de-ropa-reciclada">Más Info...</a>
          </div>
        </div>
        <div className="post">
          <img src="https://masdearte.com/media/prop_casaencendida_textil.jpg" alt="Crear alfombras" />
          <div>
            <h4>APRENDE A CREAR TUS PROPIAS ALFOMBRAS</h4>
            <p>Puedes crear tus propias alfombras a partir de retasos de tela que puedes encontrar en tu casa, solo necesitas materiales básicos de costura y toda tu creatividad para iniciar este proyecto.</p>
            <a href="https://masdearte.com/convocatorias/taller-creativo-de-reciclaje-textil/">Más Info...</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;
