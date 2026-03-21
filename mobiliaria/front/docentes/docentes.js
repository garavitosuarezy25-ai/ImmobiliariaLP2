let editandoId = null;

document.addEventListener("DOMContentLoaded", () => {
    console.log("JS cargado correctamente");

    const form = document.getElementById("formDocente");

    form.addEventListener("submit", guardar);

    limpiarFormulario();

    listar();
});

function limpiarFormulario() {
    document.getElementById("formDocente").reset();
    document.getElementById("docenteId").disabled = false;
    editandoId = null;
}

async function listar() {
    try {
        const response = await fetch(API.docentes);
        if (!response.ok) throw new Error(`Error ${response.status}: ${response.statusText}`);
        const data = await response.json();

        const tabla = document.getElementById("tablaDocentes");
        tabla.innerHTML = "";

        data.forEach(d => {
            tabla.innerHTML += `
                <tr>
                    <td>${d.docenteId}</td>
                    <td>${d.tipoDocumento}</td>
                    <td>${d.nombre}</td>
                    <td>${d.apellido}</td>
                    <td>${d.fechaNacimiento.split("T")[0]}</td>
                    <td>${d.nivelEstudios}</td>
                    <td>${d.area}</td>
                    <td>${d.grado}</td>
                    <td>${d.eps}</td>
                    <td>${d.salario}</td>
                    <td>
                        <button class="btn btn-warning btn-sm"
                            onclick="editar(
                                ${d.docenteId},
                                '${d.tipoDocumento}',
                                '${d.nombre}',
                                '${d.apellido}',
                                '${d.fechaNacimiento}',
                                '${d.nivelEstudios}',
                                '${d.area}',
                                '${d.grado}',
                                '${d.eps}',
                                ${d.salario}
                            )">
                            Editar
                        </button>

                        <button class="btn btn-danger btn-sm"
                            onclick="eliminar(${d.docenteId})">
                            Eliminar
                        </button>
                    </td>
                </tr>
            `;
        });
    } catch (error) {
        console.error("Error en listar():", error);
        alert("Error al cargar docentes: " + error.message);
    }
}

async function guardar(e) {
    e.preventDefault();

    console.log("Botón guardar presionado");

    try {
        const docente = {
    docenteId: parseInt(document.getElementById("docenteId").value),
    tipoDocumento: document.getElementById("tipoDocumento").value.toUpperCase(),
    nombre: document.getElementById("nombre").value,
    apellido: document.getElementById("apellido").value,
    fechaNacimiento: document.getElementById("fechaNacimiento").value,
    nivelEstudios: document.getElementById("nivelEstudios").value.toUpperCase(),
    area: document.getElementById("area").value.toUpperCase(),
    grado: document.getElementById("grado").value.toUpperCase(),
    eps: document.getElementById("eps").value.toUpperCase(),
    salario: parseInt(document.getElementById("salario").value)
};

        if (editandoId) {

            const response = await fetch(`${API.docentes}/${editandoId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(docente)
            });

            if (!response.ok) throw new Error(`Error ${response.status}: ${response.statusText}`);

            editandoId = null;
            alert("Docente actualizado");

        } else {

            const response = await fetch(API.docentes, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(docente)
            });

            if (!response.ok) throw new Error(`Error ${response.status}: ${response.statusText}`);

            alert("Docente creado");
        }

        document.getElementById("formDocente").reset();
        document.getElementById("docenteId").disabled = false;

        await listar();

    } catch (error) {
        console.error("Error en guardar():", error);
        alert("Error al guardar: " + error.message);
    }
}

function editar(id, tipoDoc, nombre, apellido, fecha, nivel, area, grado, eps, salario) {

    editandoId = id;

    document.getElementById("docenteId").value = id;
    document.getElementById("docenteId").disabled = true;

    document.getElementById("tipoDocumento").value = tipoDoc;
    document.getElementById("nombre").value = nombre;
    document.getElementById("apellido").value = apellido;
    document.getElementById("fechaNacimiento").value = fecha;
    document.getElementById("nivelEstudios").value = nivel;
    document.getElementById("area").value = area;
    document.getElementById("grado").value = grado;
    document.getElementById("eps").value = eps;
    document.getElementById("salario").value = salario;
}

async function eliminar(id) {

    if (!confirm("¿Eliminar docente?")) return;

    try {
        const response = await fetch(`${API.docentes}/${id}`, {
            method: "DELETE"
        });

        if (!response.ok) throw new Error(`Error ${response.status}: ${response.statusText}`);

        alert("Docente eliminado");

        await listar();

    } catch (error) {
        console.error("Error en eliminar():", error);
        alert("Error al eliminar: " + error.message);
    }
}