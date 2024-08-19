import React, { useState, useEffect } from 'react';
import LoginModal from "./loginmodal.jsx";
import Home from '../../pages/home.js';

function parseJwt(token) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}

const Vlogeado = () => {
    const [tokenExistAndStillValid, setTokenExistAndStillValid] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');  // Obtiene el token de localStorage
        if (token) {
            console.log('Token encontrado:', token);  // Verifica que el token se encuentra
            const parsedToken = parseJwt(token);
            console.log('Token decodificado:', parsedToken);
            if (parsedToken.exp * 1000 > Date.now()) {  // Verifica si el token es válido
                setTokenExistAndStillValid(true);
            } else {
                console.log('Token ha expirado.');
                localStorage.removeItem('token');  // Elimina el token si ha expirado
            }
        } else {
            console.log('No se encontró token en localStorage.');
        }
    }, []);  // Se ejecuta una vez cuando el componente se monta

    return (
        <>
            {tokenExistAndStillValid ? <Home /> : <LoginModal />}  // Muestra Home o Login dependiendo del token
        </>
    );
};

export default Vlogeado;
