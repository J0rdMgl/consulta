document.addEventListener('DOMContentLoaded', () => {
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
        const modal = document.getElementById('modal'); 
        const fechaExpiracionTexto = document.getElementById('fechaExpiracion');
        
        // Datos de usuarios predefinidos
        const usuariosPredefinidos = {
            'zavaletavillanueva062004@gmail.com': [
                { producto: 'Canva Pro Edu', fechaInicio: new Date('2024-08-26').toISOString(), diasPlan: 30 }
            ],
            'terronescarranzajasmin@gmail.com': [
                { producto: 'Canva Pro Edu', fechaInicio: new Date('2024-08-25').toISOString(), diasPlan: 30 }
            ],
            'ml4710256@gmail.com': [
                { producto: 'Canva Pro Edu', fechaInicio: new Date('2024-08-11').toISOString(), diasPlan: 180 }
            ],
            'aroninga151@gmail.com': [
                { producto: 'Canva Pro Edu', fechaInicio: new Date('2024-07-05').toISOString(), diasPlan: 365 }
            ],
            'mjerson.2308@gmail.com': [
                { producto: 'Canva Pro Edu', fechaInicio: new Date('2024-08-31').toISOString(), diasPlan: 93 }
            ],
            '+584248296284': [
                { producto: 'Chat GPT 4', fechaInicio: new Date('2024-08-31').toISOString(), diasPlan: 31 }
            ],
            'martinalvarezmunoz19@gmail.com': [
                { producto: 'Canva Pro Edu', fechaInicio: new Date('2024-08-31').toISOString(), diasPlan: 31 }
            ],
            'karlavertiz.02@gmail.com': [
                { producto: 'Canva Pro Edu', fechaInicio: new Date('2024-09-02').toISOString(), diasPlan: 183 }
            ]
        };

        if (usuariosPredefinidos[identificador]) {
            let mensajeResultado = '';
            let tieneSuscripcionesActivas = false;

            usuariosPredefinidos[identificador].forEach(suscripcion => {
                const fechaInicio = new Date(suscripcion.fechaInicio);
                const diasPlan = suscripcion.diasPlan;
                const fechaActual = new Date();
                const diferenciaTiempo = fechaActual - fechaInicio;
                const diasRestantes = diasPlan - Math.floor(diferenciaTiempo / (1000 * 60 * 60 * 24));

                if (diasRestantes > 0) {
                    mensajeResultado += `Producto: ${suscripcion.producto} - Te quedan ${diasRestantes} días de tu plan.\n`;
                    tieneSuscripcionesActivas = true;
                } else {
                    mensajeResultado += `Producto: ${suscripcion.producto} - Tu plan ha expirado.\n`;
                    fechaExpiracionTexto.innerText = fechaInicio.toISOString().split('T')[0];
                    modal.style.display = 'block';
                }
            });

            if (tieneSuscripcionesActivas) {
                resultado.classList.add('success');
                resultado.classList.remove('error');
            } else {
                resultado.classList.add('error');
                resultado.classList.remove('success');
            }

            resultado.innerText = mensajeResultado;
            resultado.style.display = 'block'; // Asegúrate de que el resultado sea visible
        } else {
            resultado.innerText = 'No se encontró ninguna suscripción asociada a este identificador.';
            resultado.classList.add('error');
            resultado.classList.remove('success');
            resultado.style.display = 'block'; // Asegúrate de que el resultado sea visible
        }
    });

    // Cerrar la ventana modal
    document.getElementById('closeModal').addEventListener('click', () => {
        document.getElementById('modal').style.display = 'none';
    });

    // Cerrar la ventana modal al hacer clic fuera de la ventana modal
    window.addEventListener('click', (event) => {
        if (event.target === document.getElementById('modal')) {
            document.getElementById('modal').style.display = 'none';
        }
    });
});
