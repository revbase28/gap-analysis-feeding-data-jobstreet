package com.example.be_feeding_data_jobstreet.repository;

import com.example.be_feeding_data_jobstreet.entity.Job;
import jakarta.validation.constraints.NotNull;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface JobRepository extends JpaRepository<Job, String > {
    @NotNull
    Page<Job> findAll(@NotNull Pageable pageable);
}
