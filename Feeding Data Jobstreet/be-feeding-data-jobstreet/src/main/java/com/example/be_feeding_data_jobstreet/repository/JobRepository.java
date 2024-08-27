package com.example.be_feeding_data_jobstreet.repository;

import com.example.be_feeding_data_jobstreet.entity.Job;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface JobRepository extends JpaRepository<Job, String > {
}
