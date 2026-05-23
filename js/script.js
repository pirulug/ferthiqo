/**
 * FERTHIQO SAC - Lógica e Interactividad Front-End
 * Autor: Antigravity AI
 */

document.addEventListener('DOMContentLoaded', () => {
    // === 1. CAMBIO DE ESTADO DEL NAVBAR AL HACER SCROLL ===
    const navbar = document.querySelector('.navbar-custom');
    
    const handleNavbarScroll = () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    };

    // Escuchar el evento scroll y ejecutar al cargar la página
    window.addEventListener('scroll', handleNavbarScroll);
    handleNavbarScroll();

    // === 2. ANIMACIÓN REVEAL AL HACER SCROLL (Intersection Observer) ===
    const revealElements = document.querySelectorAll('.reveal');
    
    if ('IntersectionObserver' in window) {
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    // Una vez revelado, podemos dejar de observarlo si queremos que sea permanente
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.15, // Porcentaje del elemento visible para activar
            rootMargin: '0px 0px -50px 0px' // Margen inferior para anticipar la carga
        });

        revealElements.forEach(element => {
            revealObserver.observe(element);
        });
    } else {
        // Fallback para navegadores antiguos que no soportan IntersectionObserver
        revealElements.forEach(element => {
            element.classList.add('active');
        });
    }

    // === 3. NAVEGACIÓN ACTIVA EN EL NAVBAR AL HACER SCROLL ===
    const sections = document.querySelectorAll('section, header');
    const navLinks = document.querySelectorAll('.nav-link-custom');

    const highlightNavLink = () => {
        let scrollPosition = window.scrollY + 100; // Offset para compensar el navbar fijo

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    };

    window.addEventListener('scroll', highlightNavLink);
    highlightNavLink();

    // === 4. CERRAR MENÚ RESPONSIVE AL HACER CLICK EN UN ENLACE (Móviles) ===
    const navbarCollapse = document.querySelector('.navbar-collapse');
    const bsCollapse = navbarCollapse ? new bootstrap.Collapse(navbarCollapse, { toggle: false }) : null;

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navbarCollapse && navbarCollapse.classList.contains('show') && bsCollapse) {
                bsCollapse.hide();
            }
        });
    });

    // === 5. DETALLES DE PRODUCTO Y COTIZACIÓN POR WHATSAPP ===
    // Datos técnicos complementarios de los productos para la ventana modal
    const productDetails = {
        cemento: {
            title: 'Cemento Portland Tipo I - Alta Resistencia',
            desc: 'Cemento de resistencia superior ideal para vaciados de columnas, vigas, losas y cimentaciones exigentes. Excelente fraguado y durabilidad bajo normativas técnicas peruanas e internacionales (ASTM C-150).',
            specifications: [
                'Peso por bolsa: 42.5 kg',
                'Tipo: Portland Tipo I Co-procesado',
                'Uso: Estructural general, prefabricados',
                'Resistencia a compresión: > 280 kg/cm² a los 28 días'
            ],
            image: 'assets/images/cemento.png'
        },
        fierros: {
            title: 'Fierros Corrugados Estructurales (ASTM A615)',
            desc: 'Barras de acero de sección circular con resaltes (corrugas) de alta adherencia, ideales para refuerzo de concreto armado en viviendas, edificios y obras de infraestructura civil.',
            specifications: [
                'Grado: 60 (Fluencia mín. 4200 kg/cm²)',
                'Longitud estándar: 9.00 metros',
                'Diámetros disponibles: 6mm, 8mm, 3/8\", 1/2\", 5/8\", 3/4\", 1\"',
                'Normas: ASTM A615 / NTP 341.031'
            ],
            image: 'assets/images/fierros.png'
        },
        ladrillos: {
            title: 'Ladrillos King Kong de Arcilla de 18 Huecos',
            desc: 'Ladrillo estructural de alta cocción para muros portantes y tabiquería de albañilería confinada. Gran aislamiento térmico y acústico con resistencia al fuego y compresión.',
            specifications: [
                'Dimensiones: 9 x 12.5 x 23 cm aprox.',
                'Peso unitario: 2.7 kg',
                'Resistencia a compresión: Clase V (mín. 130 kg/cm²)',
                'Cocción: Hornos túnel continuos (sin carbón)'
            ],
            image: 'assets/images/ladrillos.png'
        },
        'arena-piedra': {
            title: 'Agregados Finos y Gruesos (Arena Fina, Gruesa y Piedra Chancada)',
            desc: 'Materiales seleccionados y zarandeados de canteras certificadas para mezclas de mortero, tarrajeo, asentado de ladrillos y preparación de concretos de alta calidad.',
            specifications: [
                'Arena Fina: Ideal para tarrajeos de muros y acabados finos',
                'Arena Gruesa: Apta para asentado de ladrillos y cimientos',
                'Piedra Chancada: Tamaños de 1/2\", 3/4\" y 1\" para mezclas de concreto',
                'Certificación: Libres de limos orgánicos y arcillas dañinas'
            ],
            image: 'assets/images/arena_piedra.png'
        },
        tuberias: {
            title: 'Tuberías y Conexiones de PVC para Agua y Desagüe',
            desc: 'Línea completa de tuberías rígidas y accesorios de PVC diseñados para instalaciones de agua fría a presión y sistemas de desagüe o ventilación sanitaria doméstica e industrial.',
            specifications: [
                'Clases: Clase 10 (Presión agua fría), Clase 7.5 y Desagüe',
                'Diámetros: Desde 1/2\" hasta 8\" pulgadas',
                'Longitud: 3 y 5 metros con campana para pegamento',
                'Normativa: NTP 399.002 / NTP 399.003'
            ],
            image: 'assets/images/tuberias.png'
        },
        herramientas: {
            title: 'Herramientas de Construcción y Seguridad Industrial',
            desc: 'Catálogo de herramientas manuales de alta gama para albañilería, encofrado e instalaciones, junto con equipos de protección personal (EPP) homologados para salvaguardar la integridad en obra.',
            specifications: [
                'Herramientas: Palas tramontina, carretillas buggies, cinceles, combos, niveles de burbuja',
                'Maquinaria menor: Mezcladoras de trompo, vibradores de concreto, rotomartillos',
                'EPP: Cascos ANSI Z89, lentes de seguridad, guantes de cuero de badana y botas con puntera de acero'
            ],
            image: 'assets/images/herramientas.png'
        },
        'bloques-agregados': {
            title: 'Bloques de Concreto Prefabricados y Agregados Mixtos',
            desc: 'Bloques de concreto vibrado de alta dosificación para construcción rápida de muros perimétricos, cercos y estructuras modulares autoportantes. Gran estabilidad dimensional.',
            specifications: [
                'Medidas estándar: 19 x 19 x 39 cm (estructural) y tabique (12cm y 9cm)',
                'Resistencia: > 70 kg/cm² en área bruta',
                'Ventajas: Ahorro de mortero de asentado y rapidez en obra',
                'Agregados: Hormigón mezclado de río para cimientos corridos'
            ],
            image: 'assets/images/bloques_agregados.png'
        }
    };

    // Configurar los listeners en los botones de "Ver Información" o "Detalles"
    const productButtons = document.querySelectorAll('.btn-product-detail');
    const modalElement = document.getElementById('productDetailModal');
    const modalTitle = document.getElementById('modalProductTitle');
    const modalDesc = document.getElementById('modalProductDesc');
    const modalImg = document.getElementById('modalProductImg');
    const modalSpecs = document.getElementById('modalProductSpecs');
    const modalWhatsAppBtn = document.getElementById('modalWhatsAppBtn');

    let currentModalInstance = null;
    if (modalElement) {
        currentModalInstance = new bootstrap.Modal(modalElement);
    }

    productButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const productId = button.getAttribute('data-product-id');
            const data = productDetails[productId];

            if (data && modalElement) {
                // Rellenar datos en la ventana modal
                modalTitle.textContent = data.title;
                modalDesc.textContent = data.desc;
                modalImg.src = data.image;
                modalImg.alt = data.title;

                // Limpiar y rellenar lista de especificaciones
                modalSpecs.innerHTML = '';
                data.specifications.forEach(spec => {
                    const li = document.createElement('li');
                    li.className = 'mb-2';
                    li.innerHTML = `<i class="bi bi-check-circle-fill text-primary me-2"></i> ${spec}`;
                    modalSpecs.appendChild(li);
                });

                // Configurar enlace de WhatsApp dinámico
                const phoneNumber = '51936288336'; // Reemplazar con el teléfono real de FERTHIQO
                const textMessage = encodeURIComponent(`Hola FERTHIQO SAC, deseo cotizar el producto: ${data.title}. Por favor, bríndame precios e información sobre la distribución.`);
                modalWhatsAppBtn.href = `https://wa.me/${phoneNumber}?text=${textMessage}`;

                // Mostrar la modal
                currentModalInstance.show();
            }
        });
    });

    // === 6. SIMULACIÓN DEL FORMULARIO DE CONTACTO ===
    const contactForm = document.getElementById('contactForm');
    const formAlertContainer = document.getElementById('formAlertContainer');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Obtener valores del formulario
            const nombre = document.getElementById('contactName').value.trim();
            const email = document.getElementById('contactEmail').value.trim();
            const telefono = document.getElementById('contactPhone').value.trim();
            const obra = document.getElementById('contactProject').value.trim();
            const mensaje = document.getElementById('contactMessage').value.trim();

            // Validación simple
            if (!nombre || !email || !telefono || !mensaje) {
                showAlert('Por favor, rellene todos los campos obligatorios (*).', 'danger');
                return;
            }

            // Simular carga de envío
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.innerHTML;
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Enviando...';

            setTimeout(() => {
                // Restaurar botón
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnText;

                // Mostrar éxito
                showAlert(`¡Muchas gracias ${nombre}! Tu mensaje ha sido enviado con éxito. Un asesor técnico de FERTHIQO SAC se contactará contigo a la brevedad al número ${telefono}.`, 'success');

                // Limpiar formulario
                contactForm.reset();
            }, 1500);
        });
    }

    const showAlert = (message, type) => {
        if (formAlertContainer) {
            formAlertContainer.innerHTML = `
                <div class="alert alert-${type} alert-dismissible fade show" role="alert">
                    <i class="bi ${type === 'success' ? 'bi-check-circle-fill' : 'bi-exclamation-triangle-fill'} me-2"></i>
                    ${message}
                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>
            `;
            // Desplazar suavemente a la alerta en pantallas móviles
            formAlertContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
    };
});
