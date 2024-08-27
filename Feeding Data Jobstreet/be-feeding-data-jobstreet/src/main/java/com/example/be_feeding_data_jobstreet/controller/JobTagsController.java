package com.example.be_feeding_data_jobstreet.controller;

import com.example.be_feeding_data_jobstreet.entity.JobTag;
import com.example.be_feeding_data_jobstreet.model.AddJobTagRequestDTO;
import com.example.be_feeding_data_jobstreet.service.JobTagService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tags")
public class JobTagsController {

    @Autowired
    private JobTagService jobTagService;

    @PostMapping()
    public ResponseEntity<JobTag> addNewJobTag(@RequestBody AddJobTagRequestDTO request){
        JobTag jobTag = jobTagService.addNewJobTag(request);

        return ResponseEntity.ok(jobTag);
    }

    @GetMapping()
    public ResponseEntity<List<JobTag>> getAllJobTag(){
        return ResponseEntity.ok(jobTagService.getAllJobTag());
    }
}
