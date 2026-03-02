// Esperamos a que todo el DOM esté cargado antes de ejecutar el script
document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================================================
       0. PRELOADER (PANTALLA DE CARGA CON EFECTO TYPEWRITER)
       ========================================================================== */
    const preloader = document.getElementById('preloader');
    
    if (preloader) {
        // La animación CSS dura 2 segundos. Le daremos 2.5 segundos (2500 milisegundos)
        // en total para que el usuario alcance a ver el texto terminado antes de desaparecer.
        setTimeout(() => {
            preloader.classList.add('preloader-oculto');
            
            // Para que no estorbe en el código una vez invisible, lo quitamos del todo
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 800); // Esperamos los 0.8s que dura la transición en CSS
            
        }, 2500); 
    }

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

    /* ==========================================================================
       4. LÓGICA DEL CARRUSEL DE IMÁGENES
       ========================================================================== */
    const slide = document.querySelector('.carrusel-slide');
    const imagenes = document.querySelectorAll('.carrusel-slide img');
    const btnPrev = document.querySelector('.prev');
    const btnNext = document.querySelector('.next');
    
    // Verificamos que el carrusel exista en la página
    if (slide && imagenes.length > 0) {
        let contador = 0;
        const porcentajeDesplazamiento = 100; // Cada imagen ocupa el 100% del contenedor

        // Función para mover al siguiente slide
        btnNext.addEventListener('click', () => {
            if (contador >= imagenes.length - 1) {
                contador = 0; // Si llega al final, vuelve a la primera
            } else {
                contador++;
            }
            slide.style.transform = `translateX(-${porcentajeDesplazamiento * contador}%)`;
        });

        // Función para mover al slide anterior
        btnPrev.addEventListener('click', () => {
            if (contador <= 0) {
                contador = imagenes.length - 1; // Si está en la primera, va a la última
            } else {
                contador--;
            }
            slide.style.transform = `translateX(-${porcentajeDesplazamiento * contador}%)`;
        });
        
        // Autoplay del carrusel cada 5 segundos
        setInterval(() => {
            btnNext.click();
        }, 5000);
    }
    /* ==========================================================================
       5. LÓGICA DEL MENÚ HAMBURGUESA
       ========================================================================== */
    const menuHamburguesa = document.getElementById('menu-hamburguesa');
    const navLinksContainer = document.getElementById('nav-links');
    const linksDeNavegacion = document.querySelectorAll('.nav-links li a');

    if (menuHamburguesa && navLinksContainer) {
        // Abrir/Cerrar menú al tocar la hamburguesa
        menuHamburguesa.addEventListener('click', () => {
            navLinksContainer.classList.toggle('menu-activo');
            menuHamburguesa.classList.toggle('toggle'); // Activa la animación de la "X"
        });

        // Cerrar el menú automáticamente cuando se hace clic en un enlace
        linksDeNavegacion.forEach(enlace => {
            enlace.addEventListener('click', () => {
                navLinksContainer.classList.remove('menu-activo');
                menuHamburguesa.classList.remove('toggle');
            });
        });
    }
});