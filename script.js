// Obtener el elemento de la lista de contactos
const contactList = document.getElementById('contact-list');

// Función para mostrar los contactos en la lista
function mostrarContactos(contactos) {
    // Vaciar la lista
    contactList.innerHTML = '';

    // Recorrer los contactos y agregarlos a la lista
    contactos.forEach(contacto => {
        const li = document.createElement('li');
        li.textContent = `${contacto.nombre} ${contacto.apellido} - Teléfono: ${contacto.telefono}`;
        contactList.appendChild(li);
    });
}

// Función para agregar un nuevo contacto
function agregarContacto(nombre, apellido, telefono) {
    // Crear el objeto de contacto
    const contacto = {
        nombre: nombre,
        apellido: apellido,
        telefono: telefono
    };

    // Enviar la solicitud POST para agregar el contacto
    fetch('http://www.raydelto.org/agenda.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(contacto)
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === 'ok') {
            // Si la respuesta es exitosa, actualizar la lista de contactos
            obtenerContactos();
        } else {
            // Mostrar un mensaje de error en caso de que la respuesta sea diferente a 'ok'
            alert('Error al agregar el contacto');
        }
    })
    .catch(error => {
        // Mostrar un mensaje de error en caso de que ocurra un error en la solicitud
        alert('Error en la solicitud');
    });
}

// Función para obtener los contactos de la agenda
function obtenerContactos() {
    // Enviar la solicitud GET para obtener los contactos
    fetch('http://www.raydelto.org/agenda.php')
    .then(response => response.json())
    .then(data => {
        // Mostrar los contactos en la lista
        mostrarContactos(data);
    })
    .catch(error => {
        // Mostrar un mensaje de error en caso de que ocurra un error en la solicitud
        alert('Error en la solicitud');
    });
}

// Evento de envío del formulario para agregar un nuevo contacto
document.getElementById('add-contact-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Evitar el envío del formulario

    // Obtener los valores del formulario
    const nombre = document.getElementById('nombre').value;
    const apellido = document.getElementById('apellido').value;
    const telefono = document.getElementById('telefono').value;

    // Agregar el nuevo contacto
    agregarContacto(nombre, apellido, telefono);

    // Restablecer los campos del formulario
    this.reset();
});

// Obtener los contactos al cargar la página
obtenerContactos();

