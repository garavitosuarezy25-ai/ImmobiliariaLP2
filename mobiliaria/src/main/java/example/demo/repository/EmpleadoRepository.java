package example.demo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import example.demo.model.Empleado;

public interface EmpleadoRepository extends JpaRepository<Empleado, Long> {

    List<Empleado> findByidEmpleado(Long idEmpleado);

}