document.addEventListener("DOMContentLoaded", () => {

    // Definimos las variables para los elementos del HTML
    const peliculasDiv = document.getElementById("peliculas");
    const mensajeDiv = document.getElementById("mensaje");
    const generoSelect = document.getElementById("genero");
    const buscarInput = document.getElementById("buscar");
    const ordenarAscendente = document.getElementById("ordenarAscendente");
    const ordenarDescendente = document.getElementById("ordenarDescendente");
    const buscarBtn = document.getElementById("buscarBtn");

    let peliculas = []; // Array para almacenar todas las pelis 
    let peliculasFiltradas = []; // Array para almacenar las pelis filtradas

    // Cargar el JSON de las películas
    fetch('peliculas.json')
        .then(response => response.json())
        .then(data => {
            peliculas = data;
            peliculasFiltradas = [...peliculas]; // Inicializamos el filtro con todas las películas
            console.log("Películas cargadas:", peliculas); // Imprimimos en consola
            mostrarPeliculas(peliculasFiltradas);
        })
        .catch(error => {
            console.error("Error al cargar el archivo JSON:", error);
            mensajeDiv.innerHTML = 'No se pudieron cargar las películas.';
        });

    // Función para mostrar las películas
    function mostrarPeliculas(peliculas) {
        peliculasDiv.innerHTML = ''; // Limpiar contenido anterior
        if (peliculas.length === 0) { // Si no hay películas
            mensajeDiv.innerHTML = 'No hay películas que coincidan con el filtro seleccionado.';
        } else {
            mensajeDiv.innerHTML = ''; // Limpiar mensaje de error
            peliculas.forEach(pelicula => {
                const div = document.createElement("div");
                div.classList.add("pelicula");
                div.innerHTML = `
                    <h3>${pelicula.titulo}</h3>
                    <p>${pelicula.genero} - ${pelicula.año}</p>
                    <img src="${pelicula.imagen}" alt="${pelicula.titulo}" width="150">
                `; // Muestra el título, género, año y la imagen
                peliculasDiv.appendChild(div); // Agrega la película al contenedor
            });
        }
    }

    // Filtrar por género
    generoSelect.addEventListener("change", () => {
        const generoSeleccionado = generoSelect.value; // Obtiene el género seleccionado
        peliculasFiltradas = generoSeleccionado
            ? peliculas.filter(pelicula => pelicula.genero === generoSeleccionado) // Filtrar por género
            : [...peliculas]; // Mostrar todas si no hay género seleccionado
        mostrarPeliculas(peliculasFiltradas);
    });

    // Botones de filtrado por género
    document.getElementById("animacion").addEventListener("click", () => filtrarPorGenero("Animación"));
    document.getElementById("accion").addEventListener("click", () => filtrarPorGenero("Acción"));
    document.getElementById("cienciaFiccion").addEventListener("click", () => filtrarPorGenero("Ciencia Ficción"));
    document.getElementById("romance").addEventListener("click", () => filtrarPorGenero("Romance"));

    // Función para filtrar por género
    function filtrarPorGenero(genero) {
        peliculasFiltradas = peliculas.filter(pelicula => pelicula.genero === genero); // Filtrar por género
        mostrarPeliculas(peliculasFiltradas);
    }

    // Buscar por título
    buscarBtn.addEventListener("click", () => {
        const query = buscarInput.value.toLowerCase().trim(); // Obtiene el texto de búsqueda
        const peliculasBuscadas = peliculasFiltradas.filter(pelicula => pelicula.titulo.toLowerCase().includes(query)); 
        mostrarPeliculas(peliculasBuscadas);
    });

    // Ordenar por año ascendente
    ordenarAscendente.addEventListener("click", () => {
        peliculasFiltradas.sort((a, b) => a.año - b.año); // Ordenar por año, PRIMERO A Y LUEGO B
        mostrarPeliculas(peliculasFiltradas);
    });

    // Ordenar por año descendente
    ordenarDescendente.addEventListener("click", () => {
        peliculasFiltradas.sort((a, b) => b.año - a.año); // Ordenar por año, PRIMERO B Y LUEGO A
        mostrarPeliculas(peliculasFiltradas);
    });
});
