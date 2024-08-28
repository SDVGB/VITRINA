import { useEffect } from 'react';

function Logeado({ setIsAuthenticated, setProfileImage }) {

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
    const checkToken = async () => {
      console.log('Iniciando verificación del token...');
      const token = localStorage.getItem('token');
      const hasReloaded = sessionStorage.getItem('hasReloaded'); 

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

            if (!hasReloaded) {
              sessionStorage.setItem('hasReloaded', 'true');
              window.location.reload();
            }
          } else {
            console.log('El token es válido.');
            setIsAuthenticated(true);

            const userId = decodedToken.userId;
            localStorage.setItem('usuarioActual', userId);

            const profileImageUrl = localStorage.getItem('profileImage');
            if (profileImageUrl) {
              setProfileImage(profileImageUrl);
            } else {
              setProfileImage('/assets/img/default_profile.png');
            }
          }
        } else {
          console.log('El token es inválido.');
          setIsAuthenticated(false);

          if (!hasReloaded) {
            sessionStorage.setItem('hasReloaded', 'true');
            window.location.reload();
          }
        }
      } else {
        console.log('No se encontró ningún token.');
        setIsAuthenticated(false);

        if (!hasReloaded) {
          sessionStorage.setItem('hasReloaded', 'true');
          window.location.reload();
        }
      }
    };

    checkToken(); 
    const intervalId = setInterval(checkToken, 5000);

    return () => clearInterval(intervalId); 
  }, [setIsAuthenticated, setProfileImage]);

  return null;
}

export default Logeado;
