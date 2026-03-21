package example.demo.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;

import example.demo.model.Empleado;
import example.demo.repository.EmpleadoRepository;
import example.demo.service.EmpleadoService;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class EmpleadoServiceImpl implements EmpleadoService {

    private final EmpleadoRepository EmpleadoRepository;

    @Override
    public Empleado crear(Empleado empleado) {
        return EmpleadoRepository.save(empleado);
    }

    @Override
    public Empleado editar(Long id, Empleado empleado) {

        Empleado actual = EmpleadoRepository.findById(id).orElseThrow();

        actual.setIdEmpleado(empleado.getIdEmpleado());
        actual.setNombre(empleado.getNombre());
        actual.setApellido(empleado.getApellido());
        actual.setFechaNacimiento(empleado.getFechaNacimiento());
        actual.setDomicilio(empleado.getDomicilio());
        actual.setTelefono(empleado.getTelefono());
        actual.setCorreo(empleado.getCorreo());


        return EmpleadoRepository.save(actual);
    }
    

    @Override
    public List<Empleado> listar() {
        return EmpleadoRepository.findAll();
    }

    @Override
    public Empleado buscarPorId(Long id) {
        return EmpleadoRepository.findById(id).orElseThrow();
    }

    @Override
    public void eliminar(Long id) {
        EmpleadoRepository.deleteById(id);
    }
}