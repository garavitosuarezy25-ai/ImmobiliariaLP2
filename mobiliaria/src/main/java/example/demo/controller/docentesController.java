package example.demo.controller;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import example.demo.model.Empleado;
import example.demo.service.EmpleadoService;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/docentes")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class docentesController {

    private final EmpleadoService EmpleadoService;

    @PostMapping
    public Empleado crear(@RequestBody Empleado e) {
        return EmpleadoService.crear(e);
    }

    @PutMapping("/{id}")
    public Empleado editar(@PathVariable Long id, @RequestBody Empleado e) {
        return EmpleadoService.editar(id, e);
    }

    @GetMapping
    public List<Empleado> listar() {
        return EmpleadoService.listar();
    }

    @GetMapping("/{id}")
    public Empleado buscar(@PathVariable Long id) {
        return EmpleadoService.buscarPorId(id);
    }

    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable Long id) {
        EmpleadoService.eliminar(id);
    }
}