package com.example.be_feeding_data_jobstreet.service;

import com.example.be_feeding_data_jobstreet.entity.JobTag;
import com.example.be_feeding_data_jobstreet.model.AddJobRequestDTO;
import com.example.be_feeding_data_jobstreet.model.AddJobTagRequestDTO;
import com.example.be_feeding_data_jobstreet.repository.JobTagRepository;
import jakarta.validation.ConstraintViolation;
import jakarta.validation.ConstraintViolationException;
import jakarta.validation.Validator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;

@Service
public class JobTagService {

    @Autowired
    private JobTagRepository jobTagRepository;

    @Autowired
    private Validator validator;

    public List<JobTag> getAllJobTag(){
        return jobTagRepository.findAll();
    }

    public JobTag addNewJobTag(AddJobTagRequestDTO addJobTagRequestDTO){
        Set<ConstraintViolation<AddJobTagRequestDTO>> constraintViolations = validator.validate(addJobTagRequestDTO);

        if (constraintViolations.size() != 0) {
            throw new ConstraintViolationException(constraintViolations);
        }

        return jobTagRepository.save(JobTag.builder().tag_desc(addJobTagRequestDTO.getTagDesc()).build());
    }
}
