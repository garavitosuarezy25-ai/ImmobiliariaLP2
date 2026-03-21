package example.demo.service;

import java.util.List;

import example.demo.model.Empleado;

public interface EmpleadoService {

    Empleado crear(Empleado e);
    Empleado editar(Long id, Empleado e);
    List<Empleado> listar();
    Empleado buscarPorId(Long id);
    void eliminar(Long id);
}
