// script.js

// Deshabilitar clic derecho
document.addEventListener('contextmenu', function(event) {
    event.preventDefault();
});

// Deshabilitar teclas específicas
document.onkeydown = function(e) {
    if (e.ctrlKey && e.shiftKey && (e.keyCode === 73 || e.keyCode === 74) || 
        e.ctrlKey && (e.keyCode === 85) || 
        e.keyCode === 123) {
        alert('No tienes permiso para inspeccionar o copiar contenido.');
        return false;
    }
};

document.getElementById('consultaForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const identificador = document.getElementById('identificador').value.trim();
    const resultado = document.getElementById('resultado');
    const modal = document.getElementById('modal'); // Referencia a la ventana modal
    const fechaExpiracionTexto = document.getElementById('fechaExpiracion'); // Referencia al campo de fecha en la ventana modal
    
    const claveSecreta = 'miClaveSuperSecreta';

    // Obtener datos de usuarios del almacenamiento local o inicializar un objeto vacío
    let usuariosCifrados = localStorage.getItem('usuarios');
    let usuarios = {};

    if (usuariosCifrados) {
        // Descifrar datos almacenados
        try {
            const bytes = CryptoJS.AES.decrypt(usuariosCifrados, claveSecreta);
            const textoDescifrado = bytes.toString(CryptoJS.enc.Utf8);
            usuarios = JSON.parse(textoDescifrado);
        } catch (error) {
            console.error('Error al descifrar los datos:', error);
        }
    }

    // Datos de usuarios predefinidos con correos electrónicos
    const usuariosPredefinidos = {
        'zavaletavillanueva062004@gmail.com': { fechaInicio: new Date('2024-08-26').toISOString(), diasPlan: 30 },
        'terronescarranzajasmin@gmail.com': { fechaInicio: new Date('2024-08-25').toISOString(), diasPlan: 30 },
        'ml4710256@gmail.com': { fechaInicio: new Date('2024-08-11').toISOString(), diasPlan: 180 },
        'aroninga151@gmail.com': { fechaInicio: new Date('2024-07-05').toISOString(), diasPlan: 365 },
        'mjerson.2308@gmail.com': { fechaInicio: new Date('2024-08-31').toISOString(), diasPlan: 93 }
    };

    // Añadir usuarios predefinidos a los usuarios actuales
    usuarios = { ...usuariosPredefinidos, ...usuarios };

    // Cifrar datos antes de almacenarlos
    const usuariosCifradosNuevo = CryptoJS.AES.encrypt(JSON.stringify(usuarios), claveSecreta).toString();
    localStorage.setItem('usuarios', usuariosCifradosNuevo);

    if (usuarios[identificador]) {
        // Obtener la fecha de inicio del usuario
        const fechaInicio = new Date(usuarios[identificador].fechaInicio);
        const diasPlan = usuarios[identificador].diasPlan;

        // Calcular días restantes
        const fechaActual = new Date();
        const diferenciaTiempo = fechaActual - fechaInicio;
        const diasRestantes = diasPlan - Math.floor(diferenciaTiempo / (1000 * 60 * 60 * 24));

        if (diasRestantes > 0) {
            resultado.innerText = `Te quedan ${diasRestantes} días de tu plan.`;
            resultado.classList.add('success');
            resultado.classList.remove('error');
        } else {
            resultado.innerText = 'Tu plan ha expirado.';
            resultado.classList.add('error');
            resultado.classList.remove('success');
            
            // Mostrar la ventana modal
            fechaExpiracionTexto.innerText = fechaInicio.toISOString().split('T')[0]; // Fecha en formato YYYY-MM-DD
            modal.style.display = 'block';
        }
    } else {
        resultado.innerText = 'No se encontró ninguna suscripción asociada a este identificador.';
        resultado.classList.add('error');
        resultado.classList.remove('success');
    }
});

// Cerrar la ventana modal
document.getElementById('closeModal').onclick = function() {
    document.getElementById('modal').style.display = 'none';
};

// Cerrar la ventana modal si el usuario hace clic fuera de la ventana
window.onclick = function(event) {
    if (event.target == document.getElementById('modal')) {
        document.getElementById('modal').style.display = 'none';
    }
};

// Redirigir al catálogo de productos al hacer clic en el botón
document.getElementById('catalogoButton').addEventListener('click', function() {
    window.location.href = 'https://j0rdmgl.github.io/DesinGuruShop.github.io/'; // Reemplaza con la URL de tu catálogo de productos
});
