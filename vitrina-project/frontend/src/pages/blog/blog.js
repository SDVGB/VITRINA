import React, { useState, useEffect } from 'react';
import { Pagination } from 'react-bootstrap';
import './blog.css';

const Blog = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [articulos, setArticulos] = useState([]);
  const postsPerPage = 10;

  useEffect(() => {
    fetch('http://localhost:5000/getallarticulos')
      .then(res => res.json())
      .then(data => setArticulos(data.articulos))
      .catch(err => console.error('Error fetching articles:', err));
  }, []);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = articulos.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const nextPage = () => setCurrentPage(prevPage => Math.min(prevPage + 1, pageNumbers.length));
  const prevPage = () => setCurrentPage(prevPage => Math.max(prevPage - 1, 1));

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(articulos.length / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="container mt-5 blog">
      <header className="blog-header">
        <h1>NOVEDADES</h1>
        <p>Blog dedicado a noticias y novedades de nuestra vitrina</p>
        <img src="https://s1.elespanol.com/2023/02/24/quincemil/vivir/moda-vivir/743936527_244743260_1706x960.jpg" alt="Ropa" className="main-image" />
      </header>
      <p className="date">{new Date().toLocaleDateString('es-ES', { day: '2-digit', month: 'long', year: 'numeric' })}</p>

      <div className="blog-posts">
        {currentPosts.map(post => (
          <div className="post" key={post.ID_Articulos}>
            <img src={`http://localhost:5000${post.Imagen_Articulos_Ruta}`} alt={post.Nombre_Articulo} />
            <div>
              <h4>{post.Nombre_Articulo}</h4>
              <p>{post.Descripcion_Articulos}</p>
              <a href={post.Link_Ref_Articulos}>Más Info...</a>
            </div>
          </div>
        ))}
      </div>

      <Pagination className="justify-content-center">
        <Pagination.Prev onClick={prevPage} disabled={currentPage === 1} />
        {pageNumbers.map(number => (
          <Pagination.Item key={number} active={number === currentPage} onClick={() => paginate(number)}>
            {number}
          </Pagination.Item>
        ))}
        <Pagination.Next onClick={nextPage} disabled={currentPage === pageNumbers.length} />
      </Pagination>
    </div>
  );
};

export default Blog;
