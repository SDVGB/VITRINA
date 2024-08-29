import { useEffect } from 'react';

function Logeado({ setIsAuthenticated, setProfileImage }) { // Agrega setProfileImage como prop

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

      // **Línea añadida**: Verifica si ya se recargó la página
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

            // **Líneas añadidas/modificadas**: Verifica si ya se recargó y marca la recarga
            if (!hasReloaded) {
              sessionStorage.setItem('hasReloaded', 'true'); // Marca que ya se ha recargado
              window.location.reload(); // Recarga la página
            }
          } else {
            console.log('El token es válido.');
            setIsAuthenticated(true);

            // **Agregado para hacer funcionar las notificaciones**
            // Almacena el RUT del usuario en el localStorage si el token es válido
            const userId = decodedToken.userId; // Esto debe coincidir con el nombre del campo en tu token JWT
            localStorage.setItem('usuarioActual', userId);

            // Cargar la imagen de perfil desde el servidor o el localStorage
            const profileImageUrl = localStorage.getItem('profileImage');
            if (profileImageUrl) {
              setProfileImage(profileImageUrl); // Actualizar la imagen de perfil en la barra de navegación
            } else {
              // Si no hay una imagen guardada, cargar la imagen por defecto
              setProfileImage('/assets/img/default_profile.png');
            }

            /* Código original que se reemplazó
            localStorage.setItem('usuarioActual', 'a'); // Esto tenía un valor fijo 'a', pero ahora se usa el RUT del usuario real
            */
          }
        } else {
          console.log('El token es inválido.');
          setIsAuthenticated(false);

          // **Líneas añadidas/modificadas**: Verifica si ya se recargó y marca la recarga
          if (!hasReloaded) {
            sessionStorage.setItem('hasReloaded', 'true'); // Marca que ya se ha recargado
            window.location.reload(); // Recarga la página
          }
        }
      } else {
        console.log('No se encontró ningún token.');
        setIsAuthenticated(false);

        /* Código original que se reemplazó
        console.log('No se encontró ningún token.');
        setIsAuthenticated(false);
        */

        // **Líneas añadidas/modificadas**: Verifica si ya se recargó y marca la recarga
        if (!hasReloaded) {
          sessionStorage.setItem('hasReloaded', 'true'); // Marca que ya se ha recargado
          window.location.reload(); // Recarga la página
        }
      }
    };

    checkToken(); // Verificar token inmediatamente al montar el componente

    const intervalId = setInterval(checkToken, 5000); // Verificar cada 60 segundos

    return () => clearInterval(intervalId); // Limpiar intervalo al desmontar el componente
  }, [setIsAuthenticated, setProfileImage]); // Asegúrate de incluir setProfileImage en las dependencias

  return null; // No renderiza nada ya que es solo para verificar el token
}

export default Logeado;
