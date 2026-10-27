/**
 * PROYECTO: PORTAFOLIO INTERACTIVO - VALENTINA BARRIOS MÉNDEZ
 * Aplicación de temas del temario de JS para evaluación directa.
 */
console.log("¡Portafolio interactivo de Valentina Barrios cargado con éxito!"); 

// Objetos y Atributos
const infoPersonal = {
    nombre: "Valentina Barrios Méndez",
    rol: "Desarrolladora Web Frontend",
    ubicacion: "Cartagena, Colombia"
};

// Arreglos (Habilidades Técnicas)
const listaHabilidades = [
    { nombre: "HTML5 Semántico", nivel: 95 },
    { nombre: "CSS3 / Flexbox / Grid", nivel: 90 },
    { nombre: "JavaScript (ES6+)", nivel: 85 },
    { nombre: "Responsive Web Design", nivel: 92 }
];

// Arreglos (Proyectos de Ejemplo)
const listaProyectos = [
    { id: 1, titulo: "E-Commerce de Moda Real", categoria: "web", desc: "Sitio web responsivo con catálogo dinámico estructurado en Grid.", link: "#" },
    { id: 2, titulo: "Dashboard de Tareas Interactiva", categoria: "app", desc: "Aplicación interactiva que procesa arreglos y manipula el DOM en tiempo real.", link: "#" },
    { id: 3, titulo: "Landing Page Inmobiliaria", categoria: "web", desc: "Página de aterrizaje optimizada con formularios interactivos y estilos pastel.", link: "#" }
];

// Funciones Flecha y forEach para cargar Habilidades
const renderizarHabilidades = () => {
    const contenedor = document.getElementById("skillsContainer");
    if (!contenedor) return;
    contenedor.innerHTML = ""; 
    listaHabilidades.forEach(skill => {
        const htmlCard = `
            <div class="skill-card">
                <div class="skill-info">
                    <span>${skill.nombre}</span>
                    <span>${skill.nivel}%</span>
                </div>
                <div class="progress-bar-bg">
                    <div class="progress-bar-fill" data-level="${skill.nivel}"></div>
                </div>
            </div>
        `;
        contenedor.innerHTML += htmlCard;
    });
};

// CORRECCIÓN PROFESIONAL: Cambiado .map() por .forEach() para evitar código sucio
const renderizarProyectos = (categoriaFiltrada = "todos") => {
    const grid = document.getElementById("projectsGrid");
    if (!grid) return;
    grid.innerHTML = "";
    
    const proyectosAFiltrar = categoriaFiltrada === "todos" 
        ? listaProyectos 
        : listaProyectos.filter(p => p.categoria === categoriaFiltrada);
        
    proyectosAFiltrar.forEach(proy => {
        const card = document.createElement("div");
        card.classList.add("project-card");
        card.innerHTML = `
            <div class="project-visual">${proy.titulo}</div>
            <div class="project-info">
                <h3>${proy.titulo}</h3>
                <p>${proy.desc}</p>
                <a href="${proy.link}" class="project-link">Ver proyecto &rarr;</a>
            </div>
        `;
        grid.appendChild(card);
    });
};

// Función de Animación de Barras de Progreso al hacer Scroll (Bucle For...of)
const animarBarrasProgreso = () => {
    const barras = document.querySelectorAll(".progress-bar-fill");
    
    for (const barra of barras) {
        const posicionBarra = barra.getBoundingClientRect().top;
        const pantallaAltura = window.innerHeight;
        if (posicionBarra < pantallaAltura - 50) {
            const nivelFinal = barra.getAttribute("data-level");
            barra.style.width = `${nivelFinal}%`;
        }
    }
};

// Carga Inicial del DOM y Manejo de Eventos (Event Listeners)
document.addEventListener("DOMContentLoaded", () => {
    renderizarHabilidades();
    renderizarProyectos();
    
    // Menú Hamburguesa Responsivo con Animación de Botón Integrada
    const toggleBtn = document.getElementById("menuToggle");
    const navMenu = document.getElementById("navMenu");
    
    toggleBtn.addEventListener("click", () => {
        navMenu.classList.toggle("active");
        toggleBtn.classList.toggle("active"); // Añadido para activar animación visual en CSS
    });
    
    // Cerrar menú al hacer clic en un enlace (Mejora de UX en móviles)
    const navLinks = document.querySelectorAll("#navMenu a");
    navLinks.forEach(link => {
        link.addEventListener("click", () => {
            navMenu.classList.remove("active");
            toggleBtn.classList.remove("active");
        });
    });

    // Control de Filtros de Proyectos
    const filterButtons = document.querySelectorAll(".btn-filter");
    filterButtons.forEach(btn => {
        btn.addEventListener("click", (e) => {
            filterButtons.forEach(b => b.classList.remove("active"));
            e.target.classList.add("active");
            const categoria = e.target.getAttribute("data-category");
            renderizarProyectos(categoria); 
            // Re-ejecutar animación para asegurar que las barras mantengan su estado si se redibuja el DOM
            animarBarrasProgreso();
        });
    });

    // Validación de Formulario en Tiempo Real (Estructuras de Control If/Else)
    const formulario = document.getElementById("contactForm");
    const inputNombre = document.getElementById("nombre");
    const inputEmail = document.getElementById("email");
    const inputMensaje = document.getElementById("mensaje");

    const validarCampo = (input, elementoError, mensajeTexto) => {
        if (input.value.trim() === "") {
            elementoError.textContent = mensajeTexto;
            input.style.borderColor = "var(--error-color)";
            return false;
        } else {
            elementoError.textContent = "";
            input.style.borderColor = "var(--success-color)";
            return true;
        }
    };

    inputNombre.addEventListener("input", () => {
        validarCampo(inputNombre, document.getElementById("errorNombre"), "El nombre es obligatorio.");
    });

    inputEmail.addEventListener("input", () => {
        const errorContainer = document.getElementById("errorEmail");
        const emailValue = inputEmail.value.trim();
        // Validación más estricta de correo electrónico
        if (emailValue === "" || !emailValue.includes("@") || !emailValue.includes(".")) {
            errorContainer.textContent = "Introduce un correo válido (debe contener '@' y un dominio con '.').";
            inputEmail.style.borderColor = "var(--error-color)";
        } else {
            errorContainer.textContent = "";
            inputEmail.style.borderColor = "var(--success-color)";
        }
    });

    inputMensaje.addEventListener("input", () => {
        validarCampo(inputMensaje, document.getElementById("errorMensaje"), "El mensaje no puede estar vacío.");
    });

    // Evento Submit final con Operadores Lógicos
    formulario.addEventListener("submit", (e) => {
        e.preventDefault(); 
        const isNombreValido = validarCampo(inputNombre, document.getElementById("errorNombre"), "El nombre es obligatorio.");
        const isMensajeValido = validarCampo(inputMensaje, document.getElementById("errorMensaje"), "El mensaje no puede estar vacío.");
        
        const emailValue = inputEmail.value.trim();
        const isEmailValido = emailValue !== "" && emailValue.includes("@") && emailValue.includes(".");

        if (!isEmailValido) {
            document.getElementById("errorEmail").textContent = "Introduce un correo válido.";
            inputEmail.style.borderColor = "var(--error-color)";
        }

        if (isNombreValido && isEmailValido && isMensajeValido) {
            alert("¡Mensaje enviado con éxito! Tu formulario funciona perfectamente en tiempo real.");
            formulario.reset();
            [inputNombre, inputEmail, inputMensaje].forEach(i => i.style.borderColor = "#cbd5e1");
        }
    });

    // Escuchadores globales de scroll para las barras animadas
    window.addEventListener("scroll", animarBarrasProgreso);
    setTimeout(animarBarrasProgreso, 500);
});
