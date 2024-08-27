package com.example.be_feeding_data_jobstreet.model;

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
public class UpdateJobRequestDTO {
    private String jobTitle;

    private String companyName;

    private String jobLocation;

    private String salary;

    private String workType;

    private String shortDesc;

    private Set<Long> jobTags;
}
