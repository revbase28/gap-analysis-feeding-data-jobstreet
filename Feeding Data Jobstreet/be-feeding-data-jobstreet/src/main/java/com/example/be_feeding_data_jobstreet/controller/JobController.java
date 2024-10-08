package com.example.be_feeding_data_jobstreet.controller;

import com.example.be_feeding_data_jobstreet.entity.Job;
import com.example.be_feeding_data_jobstreet.model.AddJobRequestDTO;
import com.example.be_feeding_data_jobstreet.model.UpdateJobRequestDTO;
import com.example.be_feeding_data_jobstreet.service.JobService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/job")
@CrossOrigin(origins = "http://localhost:5173")
public class JobController {

    @Autowired
    private JobService jobService;

    @GetMapping()
    public ResponseEntity<Page<Job>> getAllJob(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(required = false) Long tagId) {

        if (tagId != null) {
            return ResponseEntity.ok(jobService.getAllJobsByTags(page, size, tagId));
        }
        return ResponseEntity.ok(jobService.getAllJobs(page, size));
    }

    @GetMapping("/generate-excel")
    public ResponseEntity<InputStreamResource> exportToExcel(
            @RequestParam(required = false) Long tagId
    ) throws IOException {
        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.add("Content-Disposition", "attachment; filename=jobs.xlsx");

        return ResponseEntity.ok()
                .headers(httpHeaders)
                .contentType(MediaType.APPLICATION_OCTET_STREAM)
                .body(tagId != null ? new InputStreamResource(jobService.generateExcel(tagId)) : new InputStreamResource(jobService.generateExcel()));
    }

    @PostMapping()
    public ResponseEntity<Job> addNewJob(@RequestBody AddJobRequestDTO addJobRequestDTO) {
        return ResponseEntity.ok(jobService.addNewJob(addJobRequestDTO));
    }

    @PatchMapping("/{id}")
    public ResponseEntity<Job> updateJob(@PathVariable("id") String jobId, @RequestBody UpdateJobRequestDTO updateJobRequestDTO) throws Exception {
        return ResponseEntity.ok(jobService.updateJob(jobId, updateJobRequestDTO));
    }

    @PostMapping("/generate")
    public ResponseEntity<List<Job>> generateJob(@RequestParam Long tagId) throws Exception {
        return ResponseEntity.ok(jobService.generateJobs(tagId));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteJob(@PathVariable("id") String jobId) {
        jobService.deleteJob(jobId);
        return ResponseEntity.ok("Job Successfully Deleted");
    }

}
