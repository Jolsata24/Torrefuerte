// Esperamos a que todo el DOM esté cargado antes de ejecutar el script
document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================================================
       1. EFECTO DEL HEADER AL HACER SCROLL (Shrink Header)
       ========================================================================== */
    const header = document.getElementById('header-principal');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            // Cuando bajamos, el header se hace más compacto
            header.style.padding = '0.5rem 2rem';
            header.style.boxShadow = '0 4px 15px rgba(0,0,0,0.1)';
        } else {
            // Volvemos al estado original arriba del todo
            header.style.padding = '1rem 2rem';
            header.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.05)';
        }
    });

    /* ==========================================================================
       2. SCROLL SPY (Resaltar enlace activo en el menú)
       ========================================================================== */
    const secciones = document.querySelectorAll('section');
    const enlacesMenu = document.querySelectorAll('.nav-links li a');

    // Configuramos el observador para que se active cuando el 60% de la sección sea visible
    const opcionesObserver = {
        root: null,
        rootMargin: '0px',
        threshold: 0.6 
    };

    const observador = new IntersectionObserver((entradas) => {
        entradas.forEach(entrada => {
            if (entrada.isIntersecting) {
                // Obtenemos el ID de la sección actual
                const idSeccion = entrada.target.getAttribute('id');
                
                // Removemos la clase 'activo' de todos los enlaces
                enlacesMenu.forEach(enlace => {
                    enlace.classList.remove('activo');
                    
                    // Si el href del enlace coincide con el ID de la sección, le agregamos la clase
                    if (enlace.getAttribute('href') === `#${idSeccion}`) {
                        enlace.classList.add('activo');
                    }
                });
            }
        });
    }, opcionesObserver);

    // Le decimos al observador que vigile todas las secciones
    secciones.forEach(seccion => {
        observador.observe(seccion);
    });

    /* ==========================================================================
       3. INTERCEPCIÓN DE FORMULARIOS (Simulación temporal)
       ========================================================================== */
    const formularios = document.querySelectorAll('form');
    
    formularios.forEach(form => {
        form.addEventListener('submit', (e) => {
            // Evitamos que la página se recargue por defecto
            e.preventDefault(); 
            
            // Aquí es donde más adelante haremos la petición asíncrona (Fetch API) hacia PHP
            
            // Mostramos un mensaje temporal
            const boton = form.querySelector('button[type="submit"]');
            const textoOriginal = boton.textContent;
            
            boton.textContent = '¡Enviado!';
            boton.style.backgroundColor = '#4caf50'; // Verde de éxito temporal
            boton.style.borderColor = '#4caf50';
            boton.style.color = '#ffffff';
            
            // Reseteamos el formulario
            form.reset();
            
            // Volvemos el botón a la normalidad después de 3 segundos
            setTimeout(() => {
                boton.textContent = textoOriginal;
                boton.style.backgroundColor = ''; // Vuelve a heredar de CSS
                boton.style.borderColor = '';
                boton.style.color = '';
            }, 3000);
        });
    });

});