import { useEffect } from 'react';

function Logeado({ setIsAuthenticated }) {

  function parseJwt(token) {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));
      return JSON.parse(jsonPayload);
    } catch (error) {
      console.error('Error al analizar el JWT:', error);
      return null;
    }
  }

  useEffect(() => {
    const checkToken = () => {
      console.log('Iniciando verificación del token...');
      const token = localStorage.getItem('token');
      if (token) {
        console.log('Token encontrado:', token);
        const decodedToken = parseJwt(token);
        console.log('Token decodificado:', decodedToken);
        if (decodedToken && decodedToken.exp) {
          const expirationDate = new Date(decodedToken.exp * 1000);
          console.log('Fecha de expiración del token:', expirationDate);
          if (expirationDate < new Date()) {
            console.log('El token ha expirado.');
            setIsAuthenticated(false);
            localStorage.removeItem('token');
            window.location.reload(); // Recargar la página si el token ha expirado
          } else {
            console.log('El token es válido.');
            setIsAuthenticated(true);
          }
        } else {
          console.log('El token es inválido.');
          setIsAuthenticated(false);
          window.location.reload(); // Recargar la página si el token es inválido
        }
      } else {
        console.log('No se encontró ningún token.');
        setIsAuthenticated(false);
        window.location.reload(); // Recargar la página si no hay token
      }
    };

    checkToken(); // Verificar token inmediatamente al montar el componente

    const intervalId = setInterval(checkToken, 60000); // Verificar cada 60 segundos

    return () => clearInterval(intervalId); // Limpiar intervalo al desmontar el componente
  }, [setIsAuthenticated]);

  return null; // No renderiza nada ya que es solo para verificar el token
}

export default Logeado;