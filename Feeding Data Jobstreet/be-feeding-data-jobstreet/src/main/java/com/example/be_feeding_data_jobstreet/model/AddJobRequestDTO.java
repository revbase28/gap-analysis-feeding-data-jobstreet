package com.example.be_feeding_data_jobstreet.model;

import com.example.be_feeding_data_jobstreet.entity.JobTag;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Set;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class AddJobRequestDTO {
    @NotBlank
    private String jobTitle;

    @NotBlank
    private String companyName;

    @NotBlank
    private String jobLocation;

    private String salary;

    @NotBlank
    private String workType;

    @NotBlank
    private String shortDesc;

    @NotNull
    private Set<Long> jobTags;
}
