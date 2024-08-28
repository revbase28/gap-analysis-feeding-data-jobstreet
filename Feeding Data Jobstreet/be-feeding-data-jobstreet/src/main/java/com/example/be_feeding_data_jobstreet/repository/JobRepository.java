package com.example.be_feeding_data_jobstreet.repository;

import com.example.be_feeding_data_jobstreet.entity.Job;
import jakarta.validation.constraints.NotNull;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface JobRepository extends JpaRepository<Job, String > {
    @NotNull
    Page<Job> findAll(@NotNull Pageable pageable);

    @Query("SELECT j FROM Job j JOIN j.jobTags t WHERE t.tag_id = :tagId")
    Page<Job> findAllByTag(Pageable pageable, @Param("tagId") Long tagId);

    @Query("SELECT j FROM Job j JOIN j.jobTags t WHERE t.tag_id = :tagId")
    List<Job> findAllByTag(@Param("tagId") Long tagId);
}
