let editandoId = null;

document.addEventListener("DOMContentLoaded", () => {
    console.log("JS Empleado cargado correctamente");

    const form = document.getElementById("formEmpleado");

    form.addEventListener("submit", guardar);

    limpiarFormulario();

    listar();
});

function limpiarFormulario() {
    document.getElementById("formEmpleado").reset();
    document.getElementById("idEmpleado").disabled = false;
    editandoId = null;
}

async function listar() {
    try {
        const response = await fetch(API.empleados);
        if (!response.ok) throw new Error(`Error ${response.status}: ${response.statusText}`);
        const data = await response.json();

        const tabla = document.getElementById("tablaEmpleados");
        tabla.innerHTML = "";

        data.forEach(e => {
            tabla.innerHTML += `
                <tr>
                    <td>${e.idEmpleado}</td>
                    <td>${e.nombre}</td>
                    <td>${e.apellido}</td>
                    <td>${e.fechaNacimiento ? e.fechaNacimiento.split("T")[0] : ""}</td>
                    <td>${e.domicilio || ""}</td>
                    <td>${e.telefono || ""}</td>
                    <td>${e.correo || ""}</td>
                    <td>
                        <button class="btn btn-warning btn-sm"
                            onclick="editar(
                                ${e.idEmpleado},
                                '${e.nombre}',
                                '${e.apellido}',
                                '${e.fechaNacimiento}',
                                '${e.domicilio}',
                                '${e.telefono}',
                                '${e.correo}'
                            )">
                            Editar
                        </button>

                        <button class="btn btn-danger btn-sm"
                            onclick="eliminar(${e.idEmpleado})">
                            Eliminar
                        </button>
                    </td>
                </tr>
            `;
        });
    } catch (error) {
        console.error("Error en listar():", error);
        alert("Error al cargar empleados: " + error.message);
    }
}

async function guardar(e) {
    e.preventDefault();

    console.log("Botón guardar empleado");

    try {
        const empleado = {
            idEmpleado: parseInt(document.getElementById("idEmpleado").value),
            nombre: document.getElementById("nombre").value,
            apellido: document.getElementById("apellido").value,
            fechaNacimiento: document.getElementById("fechaNacimiento").value,
            domicilio: document.getElementById("domicilio").value,
            telefono: document.getElementById("telefono").value,
            correo: document.getElementById("correo").value
        };

        if (editandoId) {

            const response = await fetch(`${API.empleados}/${editandoId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(empleado)
            });

            if (!response.ok) throw new Error(`Error ${response.status}: ${response.statusText}`);

            editandoId = null;
            alert("Empleado actualizado");

        } else {

            const response = await fetch(API.empleados, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(empleado)
            });

            if (!response.ok) throw new Error(`Error ${response.status}: ${response.statusText}`);

            alert("Empleado creado");
        }

        document.getElementById("formEmpleado").reset();
        document.getElementById("idEmpleado").disabled = false;

        await listar();

    } catch (error) {
        console.error("Error en guardar():", error);
        alert("Error al guardar: " + error.message);
    }
}

function editar(id, nombre, apellido, fecha, domicilio, telefono, correo) {

    editandoId = id;

    document.getElementById("idEmpleado").value = id;
    document.getElementById("idEmpleado").disabled = true;

    document.getElementById("nombre").value = nombre;
    document.getElementById("apellido").value = apellido;
    document.getElementById("fechaNacimiento").value = fecha;
    document.getElementById("domicilio").value = domicilio;
    document.getElementById("telefono").value = telefono;
    document.getElementById("correo").value = correo;
}

async function eliminar(id) {

    if (!confirm("¿Eliminar empleado?")) return;

    try {
        const response = await fetch(`${API.empleados}/${id}`, {
            method: "DELETE"
        });

        if (!response.ok) throw new Error(`Error ${response.status}: ${response.statusText}`);

        alert("Empleado eliminado");

        await listar();

    } catch (error) {
        console.error("Error en eliminar():", error);
        alert("Error al eliminar: " + error.message);
    }
}