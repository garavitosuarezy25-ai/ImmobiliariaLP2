package villa_olimpica.demo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import villa_olimpica.demo.model.docentes;

public interface docentesRepository extends JpaRepository<docentes, Long> {

    List<docentes> findByDocenteId(Long docenteId);

}