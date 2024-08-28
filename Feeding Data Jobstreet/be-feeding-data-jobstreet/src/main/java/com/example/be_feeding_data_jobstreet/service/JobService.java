package com.example.be_feeding_data_jobstreet.service;

import com.example.be_feeding_data_jobstreet.entity.Job;
import com.example.be_feeding_data_jobstreet.entity.JobTag;
import com.example.be_feeding_data_jobstreet.model.AddJobRequestDTO;
import com.example.be_feeding_data_jobstreet.model.UpdateJobRequestDTO;
import com.example.be_feeding_data_jobstreet.repository.JobRepository;
import com.example.be_feeding_data_jobstreet.repository.JobTagRepository;
import com.example.be_feeding_data_jobstreet.tools.Patcher;
import com.example.be_feeding_data_jobstreet.tools.Tools;
import com.google.gson.JsonArray;
import jakarta.validation.ConstraintViolation;
import jakarta.validation.ConstraintViolationException;
import jakarta.validation.Validator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class JobService {

    @Autowired
    private JobRepository jobRepository;

    @Autowired
    private JobTagRepository jobTagRepository;

    @Autowired
    private Validator validator;

    public Page<Job> getAllJobs(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return jobRepository.findAll(pageable);
    }

    public Page<Job> getAllJobsByTags(int page, int size, Long tagId){
        Pageable pageable = PageRequest.of(page, size);
        return jobRepository.findAllByTag(pageable, tagId);
    }

    public Job addNewJob(AddJobRequestDTO addJobRequestDTO) {
        Set<ConstraintViolation<AddJobRequestDTO>> constraintViolations = validator.validate(addJobRequestDTO);

        if (!constraintViolations.isEmpty()) {
            throw new ConstraintViolationException(constraintViolations);
        }

        Set<JobTag> jobTags = addJobRequestDTO.getJobTags().stream().map(jobTagId -> {
            Optional<JobTag> optJobTag = jobTagRepository.findById(jobTagId);
            if (optJobTag.isEmpty()) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "There are no job tag with id " + jobTagId);
            }

            return optJobTag.get();
        }).collect(Collectors.toSet());

        Job newJob = Job.builder()
                .companyName(addJobRequestDTO.getCompanyName())
                .jobTags(jobTags)
                .jobLocation(addJobRequestDTO.getJobLocation())
                .jobTitle(addJobRequestDTO.getJobTitle())
                .salary(addJobRequestDTO.getSalary())
                .shortDesc(addJobRequestDTO.getShortDesc())
                .workType(addJobRequestDTO.getWorkType()).build();

        return jobRepository.save(newJob);
    }

    public List<Job> generateJobs(Long tagId) throws Exception {
        Optional<JobTag> optJobTag = jobTagRepository.findById(tagId);

        if(optJobTag.isEmpty()){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "There is no job tag with id " + tagId);
        }

        String keyword = optJobTag.get().getTag_desc();

        JsonArray jobJsonArray = Tools.scrapeJobData(keyword);
        ArrayList<Job> successfullyInsertedJobs = new ArrayList<>();

        if (jobJsonArray != null) {
            List<Job> jobs = jobJsonArray.asList().stream().map(jsonElement -> new Job(jsonElement.getAsJsonObject())).collect(Collectors.toList());
            for (Job job : jobs) {
                try {
                    Set<JobTag> jobTags = new HashSet<>();
                    jobTags.add(optJobTag.get());
                    job.setJobTags(jobTags);
                    Job insertedJob = jobRepository.save(job);
                    successfullyInsertedJobs.add(insertedJob);
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        }

        return successfullyInsertedJobs;
    }

    public void deleteJob(String id) {
        Optional<Job> optJob = jobRepository.findById(id);

        if(optJob.isEmpty()){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "There is no job with id " + id);
        }

        jobRepository.delete(optJob.get());
    }

    public Job updateJob(String id, UpdateJobRequestDTO updateJobRequestDTO) throws Exception {
        Optional<Job> optionalJob = jobRepository.findById(id);

        if(optionalJob.isEmpty()){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "There is no job with id " + id);
        }

        Set<JobTag> jobTags = null;
        if(updateJobRequestDTO.getJobTags() != null){
            jobTags = updateJobRequestDTO.getJobTags().stream().map(jobTagId -> {
                Optional<JobTag> optJobTag = jobTagRepository.findById(jobTagId);
                if (optJobTag.isEmpty()) {
                    throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "There are no job tag with id " + jobTagId);
                }

                return optJobTag.get();
            }).collect(Collectors.toSet());
        }

        Job currentJob = optionalJob.get();
        Job newJob = Job.builder()
                .companyName(updateJobRequestDTO.getCompanyName())
                .jobTags(jobTags)
                .jobLocation(updateJobRequestDTO.getJobLocation())
                .jobTitle(updateJobRequestDTO.getJobTitle())
                .salary(updateJobRequestDTO.getSalary())
                .shortDesc(updateJobRequestDTO.getShortDesc())
                .workType(updateJobRequestDTO.getWorkType()).build();

        //Check for null value in newCus field
        //If the field is not null, update value in currentCus field with value in newCus
        Patcher.jobPatcher(currentJob, newJob);

        System.out.println(currentJob.toString());

        return jobRepository.save(currentJob);
    }

    public ByteArrayInputStream generateExcel() throws IOException {
        List<Job> jobs = jobRepository.findAll();
        return Tools.generateExcel(jobs);
    }

    public ByteArrayInputStream generateExcel(Long tagId) throws IOException {
        List<Job> jobs = jobRepository.findAllByTag(tagId);
        return Tools.generateExcel(jobs);
    }
}
