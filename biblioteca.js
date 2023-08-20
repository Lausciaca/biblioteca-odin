// se declaran variables iniciales
let libros = [];
const container_libros = document.getElementById('mostrar_libros')
const formulario = document.getElementById('formulario');

// clase libro
class Libro{
    constructor(titulo, autor, paginas){
        this.titulo = titulo;
        this.autor = autor;
        this.paginas = paginas;
        this.estado = "No leido";
    }
}

// funcion que permite capitalize los textos
function capitalize(texto){
    texto = texto.toLowerCase();
    return texto.charAt(0).toUpperCase() + texto.slice(1);
}

// recopila los datos del DOM y crea un nuevo libro
function almacenarDatos(){
    let titulo = document.getElementById('titulo_input').value;
    let autor = document.getElementById('autor_input').value;
    let paginas = document.getElementById('paginas_input').value;
    let libro = new Libro(titulo, autor, paginas);
    libros.push(libro);
    mostrar_libros();
};

// se refresca y vuelve a mostrar todos los libros del arrray libros
function mostrar_libros(){
    container_libros.innerHTML = "";

    libros.forEach(libro => {
        let container_libro = document.createElement('div');
        container_libro.classList.add('libro');

        const titulo_libro = crearTituloLibro(libro)
        const autor_libro = crearAutorLibro(libro)
        const paginas_libro = crearPaginasLibro(libro)
        const btnEliminar = crearBotonEliminar(libro)
        
        let estado_libro = document.createElement('div');
        estado_libro.classList.add('estado');
        

        let estado_libro_label = document.createElement('label');
        estado_libro_label.textContent = libro.estado;

        let estado_libro_checkbox = document.createElement('input');
        estado_libro_checkbox.type = 'checkbox';
        estado_libro_checkbox.style.display = 'none';


        estado_libro_label.appendChild(estado_libro_checkbox);
        estado_libro_label.addEventListener('click', () => {
            estado_libro_checkbox.checked = !estado_libro_checkbox.checked;
            libro.estado = estado_libro_checkbox.checked ? 'Leido' : 'No leido';
            estado_libro_label.textContent = libro.estado;
        });

    
        container_libro.appendChild(autor_libro);
        container_libro.appendChild(titulo_libro);
        container_libro.appendChild(paginas_libro);
        container_libro.appendChild(estado_libro);
        estado_libro.appendChild(estado_libro_label);
        estado_libro.appendChild(btnEliminar);

        container_libros.appendChild(container_libro);

    })

}

// al enviarse el form vuelve a la funcion para almacenar datos
formulario.addEventListener('submit', function(event){
    event.preventDefault();
    almacenarDatos();
});

// crea la parte visual del titulo
function crearTituloLibro(libro){
    let titulo_libro = document.createElement('p');
    titulo_libro.classList.add('titulo');
    titulo_libro.textContent = capitalize(libro.titulo);
    return titulo_libro;
}
// crea la parte visual del autor
function crearAutorLibro(libro){
    let autor_libro = document.createElement('p');
    autor_libro.classList.add('autor');
    autor_libro.textContent = libro.autor.toUpperCase();
    return autor_libro;
}
// crea la parte visual de las paginas
function crearPaginasLibro(libro){
    let paginas_libro = document.createElement('p');
    paginas_libro.classList.add('paginas');
    paginas_libro.textContent = libro.paginas + " Paginas";
    return paginas_libro;
}
// crea la parte visual del botoin
function crearBotonEliminar(libro) {
    const btnEliminar = document.createElement('button');
    btnEliminar.classList.add('btn');
    btnEliminar.classList.add('btn-danger');
    btnEliminar.textContent = 'Eliminar';
    btnEliminar.addEventListener('click', () => {
        eliminarLibro(libro);
    });
    return btnEliminar;
}
// permite encontrar un objeto dentro del array y crear un nuevo array sin el
function eliminarLibro(libro_a_eliminar) {
    libros = libros.filter(libro => libro !== libro_a_eliminar);
    mostrar_libros();
}