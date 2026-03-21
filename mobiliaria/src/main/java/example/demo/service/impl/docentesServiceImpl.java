package villa_olimpica.demo.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import villa_olimpica.demo.model.docentes;
import villa_olimpica.demo.repository.docentesRepository;
import villa_olimpica.demo.service.docentesService;

@Service
@RequiredArgsConstructor
public class docentesServiceImpl implements docentesService {

    private final docentesRepository docentesRepository;

    @Override
    public docentes crear(docentes docente) {
        return docentesRepository.save(docente);
    }
  
    @Override
    public docentes editar(Long id, docentes docente) {

        docentes actual = docentesRepository.findById(id).orElseThrow();

        actual.setTipoDocumento(docente.getTipoDocumento());
        actual.setNombre(docente.getNombre());
        actual.setApellido(docente.getApellido());
        actual.setFechaNacimiento(docente.getFechaNacimiento());
        actual.setNivelEstudios(docente.getNivelEstudios());
        actual.setArea(docente.getArea());
        actual.setGrado(docente.getGrado());
        actual.setEps(docente.getEps());
        actual.setSalario(docente.getSalario());

        return docentesRepository.save(actual);
    }
    

    @Override
    public List<docentes> listar() {
        return docentesRepository.findAll();
    }

    @Override
    public docentes buscarPorId(Long id) {
        return docentesRepository.findById(id).orElseThrow();
    }

    @Override
    public void eliminar(Long id) {
        docentesRepository.deleteById(id);
    }
}